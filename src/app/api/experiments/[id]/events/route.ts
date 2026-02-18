import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const eventSchema = z.object({
  type: z.enum(['view', 'conversion', 'click', 'bounce']),
  visitorId: z.string().min(1),
  variantId: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

// Public endpoint — no auth required (called from published pages)
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  const experiment = await prisma.experiment.findFirst({
    where: { id, status: 'RUNNING' },
    select: { id: true },
  });
  if (!experiment) return NextResponse.json({ error: 'Experiment not active' }, { status: 404 });

  const variant = await prisma.experimentVariant.findFirst({
    where: { id: parsed.data.variantId, experimentId: id },
  });
  if (!variant) return NextResponse.json({ error: 'Variant not found' }, { status: 404 });

  await prisma.experimentEvent.create({
    data: {
      type: parsed.data.type,
      visitorId: parsed.data.visitorId,
      variantId: parsed.data.variantId,
      experimentId: id,
      metadata: (parsed.data.metadata || {}) as Record<string, string>,
    },
  });

  return NextResponse.json({ success: true });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const variants = await prisma.experimentVariant.findMany({
    where: { experimentId: id },
    include: { events: { select: { type: true, visitorId: true } } },
  });

  const stats = variants.map((v) => {
    const uniqueViews = new Set(v.events.filter((e) => e.type === 'view').map((e) => e.visitorId)).size;
    const uniqueConversions = new Set(v.events.filter((e) => e.type === 'conversion').map((e) => e.visitorId)).size;
    return {
      variantId: v.id,
      name: v.name,
      slug: v.slug,
      weight: v.weight,
      isControl: v.isControl,
      views: uniqueViews,
      conversions: uniqueConversions,
      conversionRate: uniqueViews > 0 ? ((uniqueConversions / uniqueViews) * 100).toFixed(2) : '0.00',
    };
  });

  return NextResponse.json(stats);
}
