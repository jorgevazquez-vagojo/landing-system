import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * /llms.txt — Machine-readable site description for LLM crawlers.
 * Follows the emerging llms.txt standard (https://llmstxt.org).
 */
export async function GET() {
  const baseUrl = process.env.AUTH_URL || 'http://localhost:3000';

  const landings = await prisma.landing.findMany({
    where: { status: 'PUBLISHED' },
    select: { name: true, slug: true, description: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });

  const lines = [
    '# Landing System',
    '',
    '> Landing System is a self-hosted landing page platform with drag-and-drop editor, A/B testing, AI copywriting, heatmaps, popups, multi-step forms, personalization, and accessibility auditing.',
    '',
    '## Published Pages',
    '',
    ...landings.map(
      (l) =>
        `- [${l.name}](${baseUrl}/p/${l.slug}): ${l.description || 'Landing page'}`,
    ),
    '',
    '## Technical Documentation',
    '',
    `- [Sitemap](${baseUrl}/sitemap.xml): All published pages`,
    `- [Robots](${baseUrl}/robots.txt): Crawler rules`,
    '',
    '## Features',
    '',
    '- Drag-and-drop visual editor with 19+ components',
    '- A/B testing with automatic variant assignment',
    '- AI copywriting (BYOK: OpenAI, Anthropic, Google)',
    '- Dynamic Text Replacement for Google Ads optimization',
    '- Built-in heatmaps and click/scroll analytics',
    '- Multi-step forms with progressive profiling',
    '- Personalization rules engine (UTM, device, geo, time)',
    '- WCAG 2.1 AA accessibility auditing',
    '- Popups and sticky bars with trigger engine',
    '- Server-side rendering for full crawlability',
    '',
    '## Stack',
    '',
    '- Next.js 15, React 19, TypeScript, Tailwind 4',
    '- PostgreSQL + Prisma ORM, multi-tenant',
    '- NextAuth 5 JWT authentication',
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
