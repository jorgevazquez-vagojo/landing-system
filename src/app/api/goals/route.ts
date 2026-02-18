import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

/**
 * GET /api/goals?landingId=xxx
 * Returns conversion goals for a landing.
 *
 * POST /api/goals
 * Creates a conversion goal for a landing.
 */

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const landingId = req.nextUrl.searchParams.get('landingId');
  if (!landingId) return NextResponse.json({ error: 'landingId required' }, { status: 400 });

  const landing = await prisma.landing.findFirst({
    where: { id: landingId },
    select: { settings: true },
  });

  if (!landing) return NextResponse.json({ error: 'Landing not found' }, { status: 404 });

  const settings = (landing.settings || {}) as Record<string, unknown>;
  const goals = (settings.conversionGoals || []) as Array<Record<string, unknown>>;

  // Enrich with event counts from tracking
  const enriched = await Promise.all(
    goals.map(async (goal) => {
      const eventCount = await prisma.pageEvent.count({
        where: {
          landingId,
          type: goal.type as string,
        },
      });
      return { ...goal, completions: eventCount };
    })
  );

  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { landingId, name, type, target, value } = body;

  if (!landingId || !name || !type) {
    return NextResponse.json({ error: 'landingId, name, and type required' }, { status: 400 });
  }

  const landing = await prisma.landing.findFirst({
    where: { id: landingId },
    select: { settings: true },
  });

  if (!landing) return NextResponse.json({ error: 'Landing not found' }, { status: 404 });

  const settings = (landing.settings || {}) as Record<string, unknown>;
  const goals = ((settings.conversionGoals || []) as Array<Record<string, unknown>>);

  const newGoal = {
    id: crypto.randomUUID(),
    name,
    type, // 'form_submit', 'button_click', 'scroll_depth', 'checkout_complete', 'page_time'
    target, // CSS selector or section ID
    value: value || 0, // monetary value per conversion
    createdAt: new Date().toISOString(),
  };

  goals.push(newGoal);

  await prisma.landing.update({
    where: { id: landingId },
    data: { settings: { ...settings, conversionGoals: goals } as unknown as Record<string, string> },
  });

  return NextResponse.json(newGoal, { status: 201 });
}
