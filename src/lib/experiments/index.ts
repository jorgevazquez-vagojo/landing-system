import { prisma } from '@/lib/db';

export function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = document.cookie.match(/ls_visitor=([^;]+)/)?.[1];
  if (!id) {
    id = crypto.randomUUID();
    document.cookie = `ls_visitor=${id};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  }
  return id;
}

export function getAssignedVariant(experimentId: string): string | null {
  if (typeof window === 'undefined') return null;
  const cookie = document.cookie.match(new RegExp(`ls_exp_${experimentId}=([^;]+)`))?.[1];
  return cookie || null;
}

export function setAssignedVariant(experimentId: string, variantId: string): void {
  if (typeof window === 'undefined') return;
  document.cookie = `ls_exp_${experimentId}=${variantId};path=/;max-age=${30 * 24 * 60 * 60};SameSite=Lax`;
}

export function pickVariantByWeight(variants: { id: string; weight: number }[]): string {
  const total = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * total;
  for (const v of variants) {
    random -= v.weight;
    if (random <= 0) return v.id;
  }
  return variants[0].id;
}

export async function getExperimentStats(experimentId: string) {
  const variants = await prisma.experimentVariant.findMany({
    where: { experimentId },
    include: {
      events: {
        select: { type: true, visitorId: true },
      },
    },
  });

  return variants.map((v) => {
    const views = new Set(v.events.filter((e) => e.type === 'view').map((e) => e.visitorId)).size;
    const conversions = new Set(v.events.filter((e) => e.type === 'conversion').map((e) => e.visitorId)).size;
    return {
      id: v.id,
      name: v.name,
      slug: v.slug,
      weight: v.weight,
      isControl: v.isControl,
      views,
      conversions,
      conversionRate: views > 0 ? ((conversions / views) * 100).toFixed(2) : '0.00',
    };
  });
}
