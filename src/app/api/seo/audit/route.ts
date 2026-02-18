import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

interface AuditResult {
  score: number;
  issues: { severity: 'error' | 'warning' | 'info'; message: string }[];
}

function auditLanding(landing: { name: string; description: string | null; seoMeta: unknown; sections: unknown }): AuditResult {
  const issues: AuditResult['issues'] = [];
  let score = 100;
  const meta = (landing.seoMeta || {}) as Record<string, string>;
  const sections = (landing.sections || []) as Array<{ type: string; props: Record<string, unknown> }>;

  // Title checks
  const title = meta.title || landing.name;
  if (!title) { issues.push({ severity: 'error', message: 'Page title is missing' }); score -= 15; }
  else if (title.length < 30) { issues.push({ severity: 'warning', message: `Title too short (${title.length} chars, recommend 30-60)` }); score -= 5; }
  else if (title.length > 60) { issues.push({ severity: 'warning', message: `Title too long (${title.length} chars, recommend 30-60)` }); score -= 5; }

  // Description checks
  const desc = meta.description || landing.description;
  if (!desc) { issues.push({ severity: 'error', message: 'Meta description is missing' }); score -= 15; }
  else if (desc.length < 120) { issues.push({ severity: 'warning', message: `Description too short (${desc.length} chars, recommend 120-160)` }); score -= 5; }
  else if (desc.length > 160) { issues.push({ severity: 'warning', message: `Description too long (${desc.length} chars, recommend 120-160)` }); score -= 5; }

  // OG tags
  if (!meta.ogTitle) { issues.push({ severity: 'warning', message: 'Missing Open Graph title' }); score -= 5; }
  if (!meta.ogDescription) { issues.push({ severity: 'warning', message: 'Missing Open Graph description' }); score -= 5; }
  if (!meta.ogImage) { issues.push({ severity: 'error', message: 'Missing Open Graph image' }); score -= 10; }

  // Structure checks
  const hasHero = sections.some((s) => s.type === 'hero');
  if (!hasHero) { issues.push({ severity: 'warning', message: 'No hero section (H1 heading)' }); score -= 10; }

  const hasCta = sections.some((s) => s.type === 'cta' || s.type === 'contact-form');
  if (!hasCta) { issues.push({ severity: 'info', message: 'Consider adding a CTA or contact form' }); score -= 5; }

  if (sections.length < 3) { issues.push({ severity: 'info', message: 'Landing has fewer than 3 sections' }); score -= 5; }

  if (!meta.canonicalUrl) { issues.push({ severity: 'info', message: 'Consider adding a canonical URL' }); score -= 2; }

  return { score: Math.max(0, score), issues };
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const { searchParams } = new URL(req.url);
  const landingId = searchParams.get('landingId');

  if (landingId) {
    const landing = await prisma.landing.findFirst({ where: { id: landingId, companyId } });
    if (!landing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(auditLanding(landing));
  }

  const landings = await prisma.landing.findMany({ where: { companyId } });
  const results = landings.map((l) => ({ id: l.id, name: l.name, slug: l.slug, ...auditLanding(l) }));
  return NextResponse.json(results);
}
