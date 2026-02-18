import { NextResponse } from 'next/server';
import {
  ALL_TEMPLATES,
  getTemplatesByCategory,
  getTemplatesBySector,
  searchTemplates,
  getCategoryCounts,
  getSectorCounts,
  CATEGORY_META,
  SECTORS,
} from '@/lib/templates';
import type { TemplateCategory, TemplateSector } from '@/lib/templates';

export const dynamic = 'force-static';

/**
 * GET /api/templates
 *
 * Query params:
 *   ?category=saas          — filter by category
 *   ?sector=technology      — filter by sector
 *   ?q=search+term          — full-text search
 *   ?meta=true              — return only metadata (no sections) for faster listing
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as TemplateCategory | null;
  const sector = searchParams.get('sector') as TemplateSector | null;
  const query = searchParams.get('q');
  const metaOnly = searchParams.get('meta') === 'true';

  let templates = ALL_TEMPLATES;

  if (category) {
    templates = getTemplatesByCategory(category);
  } else if (sector) {
    templates = getTemplatesBySector(sector);
  }

  if (query) {
    const searched = searchTemplates(query);
    const slugSet = new Set(searched.map(t => t.slug));
    templates = templates.filter(t => slugSet.has(t.slug));
  }

  const result = metaOnly
    ? templates.map(({ slug, name, description, category: cat, sector: sec, tags, thumbnail }) => ({
        slug, name, description, category: cat, sector: sec, tags, thumbnail,
        sectionCount: ALL_TEMPLATES.find(t => t.slug === slug)?.sections.length ?? 0,
      }))
    : templates;

  return NextResponse.json({
    total: result.length,
    categories: CATEGORY_META,
    sectors: SECTORS,
    categoryCounts: getCategoryCounts(),
    sectorCounts: getSectorCounts(),
    templates: result,
  }, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' },
  });
}
