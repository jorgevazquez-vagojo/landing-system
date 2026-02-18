import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['MODAL', 'SLIDE_IN', 'STICKY_BAR', 'FULLSCREEN']).default('MODAL'),
  content: z.record(z.unknown()).default({}),
  style: z.record(z.unknown()).default({}),
  triggers: z.array(z.unknown()).default([]),
  targeting: z.record(z.unknown()).default({}),
  landingId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const landingId = req.nextUrl.searchParams.get('landingId');

  const where: Record<string, unknown> = { companyId };
  if (landingId) where.landingId = landingId;

  const popups = await prisma.popup.findMany({
    where,
    include: { _count: { select: { events: true } }, landing: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(popups);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const popup = await prisma.popup.create({
    data: {
      ...parsed.data,
      content: parsed.data.content as unknown as string,
      style: parsed.data.style as unknown as string,
      triggers: parsed.data.triggers as unknown as string,
      targeting: parsed.data.targeting as unknown as string,
      companyId,
    },
  });

  return NextResponse.json(popup, { status: 201 });
}
