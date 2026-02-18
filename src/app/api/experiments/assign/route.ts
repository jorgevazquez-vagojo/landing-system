import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * POST /api/experiments/assign
 *
 * Public endpoint (no auth) — called from published pages.
 * Assigns a visitor to an experiment variant using weighted random selection.
 * If the visitor already has an assignment (via prior event), returns the same variant.
 *
 * Body: { landingId: string, visitorId: string }
 * Returns: { experiments: [{ experimentId, variantId, variantSlug, sections }] }
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { landingId, visitorId } = body;

  if (!landingId || !visitorId) {
    return NextResponse.json({ error: 'landingId and visitorId required' }, { status: 400 });
  }

  // Find all running experiments for this landing
  const experiments = await prisma.experiment.findMany({
    where: { landingId, status: 'RUNNING' },
    include: { variants: true },
  });

  if (experiments.length === 0) {
    return NextResponse.json({ experiments: [] });
  }

  const assignments = [];

  for (const exp of experiments) {
    // Check if visitor already has a view event for this experiment
    const existingEvent = await prisma.experimentEvent.findFirst({
      where: { experimentId: exp.id, visitorId, type: 'view' },
      select: { variantId: true },
    });

    let assignedVariant;

    if (existingEvent) {
      // Sticky assignment — return the same variant
      assignedVariant = exp.variants.find((v) => v.id === existingEvent.variantId);
    }

    if (!assignedVariant) {
      // Weighted random assignment
      assignedVariant = weightedRandom(exp.variants);

      // Record the view event for sticky assignment
      await prisma.experimentEvent.create({
        data: {
          type: 'view',
          visitorId,
          variantId: assignedVariant.id,
          experimentId: exp.id,
        },
      });
    }

    assignments.push({
      experimentId: exp.id,
      variantId: assignedVariant.id,
      variantSlug: assignedVariant.slug,
      variantName: assignedVariant.name,
      isControl: assignedVariant.isControl,
      sections: assignedVariant.sections,
    });
  }

  return NextResponse.json({ experiments: assignments });
}

function weightedRandom<T extends { id: string; weight: number }>(variants: T[]): T {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;

  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) return variant;
  }

  // Fallback to last variant
  return variants[variants.length - 1];
}
