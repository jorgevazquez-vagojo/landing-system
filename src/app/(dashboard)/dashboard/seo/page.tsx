import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function getSeoScore(landing: { name: string; description: string | null; seoMeta: unknown; sections: unknown }): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  const meta = (landing.seoMeta || {}) as Record<string, unknown>;
  const sections = (landing.sections || []) as Array<{ type: string; props: Record<string, unknown> }>;

  if (!meta.title && !landing.name) { issues.push('Missing page title'); score -= 15; }
  else if ((meta.title as string || landing.name).length < 30) { issues.push('Title is too short (min 30 chars)'); score -= 5; }
  else if ((meta.title as string || landing.name).length > 60) { issues.push('Title is too long (max 60 chars)'); score -= 5; }

  if (!meta.description && !landing.description) { issues.push('Missing meta description'); score -= 15; }
  else if ((meta.description as string || landing.description || '').length < 120) { issues.push('Meta description too short'); score -= 5; }

  if (!meta.ogTitle) { issues.push('Missing Open Graph title'); score -= 5; }
  if (!meta.ogDescription) { issues.push('Missing Open Graph description'); score -= 5; }
  if (!meta.ogImage) { issues.push('Missing Open Graph image'); score -= 10; }

  const hasHero = sections.some((s) => s.type === 'hero');
  if (!hasHero) { issues.push('No hero section (H1)'); score -= 10; }

  if (sections.length < 3) { issues.push('Landing has fewer than 3 sections'); score -= 5; }

  const hasCta = sections.some((s) => s.type === 'cta' || s.type === 'contact-form');
  if (!hasCta) { issues.push('No CTA or contact form'); score -= 5; }

  return { score: Math.max(0, score), issues };
}

export default async function SeoPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const landings = await prisma.landing.findMany({
    where: { companyId },
    orderBy: { updatedAt: 'desc' },
  });

  const audits = landings.map((landing) => ({
    ...landing,
    seo: getSeoScore(landing),
  }));

  const avgScore = audits.length > 0
    ? Math.round(audits.reduce((sum, a) => sum + a.seo.score, 0) / audits.length)
    : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">SEO Audit</h1>
        <p className="text-sm text-gray-500">Review and improve your landing pages&apos; search engine optimization.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500">Average SEO Score</p>
          <p className={`mt-2 text-4xl font-bold ${avgScore >= 80 ? 'text-green-600' : avgScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {avgScore}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500">Total Pages</p>
          <p className="mt-2 text-4xl font-bold text-gray-900">{landings.length}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500">Issues Found</p>
          <p className="mt-2 text-4xl font-bold text-orange-600">
            {audits.reduce((sum, a) => sum + a.seo.issues.length, 0)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {audits.map((landing) => (
          <div key={landing.id} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold text-white ${
                  landing.seo.score >= 80 ? 'bg-green-500' : landing.seo.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {landing.seo.score}
                </div>
                <div>
                  <Link href={`/editor/${landing.id}`} className="font-semibold text-gray-900 hover:text-primary">
                    {landing.name}
                  </Link>
                  <p className="text-sm text-gray-500">/{landing.slug}</p>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                landing.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {landing.status}
              </span>
            </div>
            {landing.seo.issues.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {landing.seo.issues.map((issue, i) => (
                  <span key={i} className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs text-orange-700">
                    {issue}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
