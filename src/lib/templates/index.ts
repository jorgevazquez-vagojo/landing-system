// ---------------------------------------------------------------------------
// Template catalog — public API
// ---------------------------------------------------------------------------

export type {
  TemplateDefinition,
  TemplateCategory,
  TemplateSector,
  CategoryInfo,
  SectorInfo,
  ThumbnailStyle,
} from './types';

export {
  CATEGORY_META,
  SECTORS,
  getSectorForCategory,
} from './types';

// Lazy-loaded batches to avoid loading everything upfront
import { batch1Templates } from './catalog-batch-1';
import { batch2Templates } from './catalog-batch-2';
import { batch3Templates } from './catalog-batch-3';
import { batch4Templates } from './catalog-batch-4';
import type { TemplateDefinition, TemplateCategory, TemplateSector } from './types';
import { CATEGORY_META, SECTORS } from './types';

/** Full template catalog — all templates across all categories */
export const ALL_TEMPLATES: TemplateDefinition[] = [
  ...batch1Templates,
  ...batch2Templates,
  ...batch3Templates,
  ...batch4Templates,
];

/** Get a single template by slug */
export function getTemplate(slug: string): TemplateDefinition | undefined {
  return ALL_TEMPLATES.find(t => t.slug === slug);
}

/** Filter templates by category */
export function getTemplatesByCategory(category: TemplateCategory): TemplateDefinition[] {
  return ALL_TEMPLATES.filter(t => t.category === category);
}

/** Filter templates by sector */
export function getTemplatesBySector(sector: TemplateSector): TemplateDefinition[] {
  const sectorDef = SECTORS.find(s => s.id === sector);
  if (!sectorDef) return [];
  return ALL_TEMPLATES.filter(t => sectorDef.categories.includes(t.category));
}

/** Search templates by name, description, or tags */
export function searchTemplates(query: string): TemplateDefinition[] {
  const q = query.toLowerCase();
  return ALL_TEMPLATES.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

/** Get category counts for building filter UI */
export function getCategoryCounts(): Record<TemplateCategory, number> {
  const counts = {} as Record<TemplateCategory, number>;
  for (const key of Object.keys(CATEGORY_META) as TemplateCategory[]) {
    counts[key] = 0;
  }
  for (const t of ALL_TEMPLATES) {
    counts[t.category] = (counts[t.category] || 0) + 1;
  }
  return counts;
}

/** Get sector counts for building sector filter UI */
export function getSectorCounts(): Record<TemplateSector, number> {
  const counts = {} as Record<TemplateSector, number>;
  for (const sector of SECTORS) {
    counts[sector.id] = getTemplatesBySector(sector.id).length;
  }
  return counts;
}
