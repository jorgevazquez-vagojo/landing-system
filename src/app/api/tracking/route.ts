import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const trackingSchema = z.object({
  landingId: z.string().min(1),
  visitorId: z.string().min(1),
  sessionId: z.string().optional(),
  events: z.array(z.object({
    type: z.string(),
    data: z.record(z.unknown()).default({}),
  })),
});

// Public endpoint — no auth required
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = trackingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  const { landingId, visitorId, events } = parsed.data;

  // Verify landing exists and get companyId
  const landing = await prisma.landing.findFirst({
    where: { id: landingId },
    select: { companyId: true },
  });
  if (!landing) return NextResponse.json({ error: 'Landing not found' }, { status: 404 });

  // Find or create session
  let sessionId = parsed.data.sessionId;
  if (!sessionId) {
    const session = await prisma.visitorSession.create({
      data: {
        visitorId,
        landingId,
        companyId: landing.companyId,
        device: events[0]?.data?.userAgent ? detectDevice(events[0].data.userAgent as string) : null,
        referrer: events[0]?.data?.referrer as string || null,
      },
    });
    sessionId = session.id;
  }

  // Batch insert events
  if (events.length > 0) {
    await prisma.pageEvent.createMany({
      data: events.map((e) => ({
        type: e.type,
        landingId,
        companyId: landing.companyId,
        sessionId,
        visitorId,
        data: e.data as unknown as string,
      })),
    });

    // Update session scroll depth
    const scrollEvents = events.filter((e) => e.type === 'scroll');
    if (scrollEvents.length > 0) {
      const maxDepth = Math.max(...scrollEvents.map((e) => (e.data.maxDepth as number) || 0));
      await prisma.visitorSession.update({
        where: { id: sessionId },
        data: { scrollDepth: maxDepth },
      });
    }
  }

  return NextResponse.json({ sessionId });
}

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile') || ua.includes('android')) return 'mobile';
  if (ua.includes('tablet') || ua.includes('ipad')) return 'tablet';
  return 'desktop';
}

// Get heatmap data for a landing
export async function GET(req: NextRequest) {
  const landingId = req.nextUrl.searchParams.get('landingId');
  const type = req.nextUrl.searchParams.get('type') || 'click';

  if (!landingId) return NextResponse.json({ error: 'landingId required' }, { status: 400 });

  const events = await prisma.pageEvent.findMany({
    where: { landingId, type },
    select: { data: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 5000,
  });

  return NextResponse.json(events);
}
