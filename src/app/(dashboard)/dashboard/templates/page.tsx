import Link from 'next/link';
import {
  ALL_TEMPLATES,
  CATEGORY_META,
  SECTORS,
  getCategoryCounts,
  getSectorCounts,
} from '@/lib/templates';
import type { TemplateCategory, TemplateSector } from '@/lib/templates';

export const dynamic = 'force-static';

interface Props {
  searchParams: Promise<{ sector?: string; category?: string; q?: string }>;
}

export default async function TemplatesPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedSector = params.sector as TemplateSector | undefined;
  const selectedCategory = params.category as TemplateCategory | undefined;
  const searchQuery = params.q?.toLowerCase();

  // Filter templates
  let templates = ALL_TEMPLATES;

  if (selectedCategory) {
    templates = templates.filter(t => t.category === selectedCategory);
  } else if (selectedSector) {
    const sectorDef = SECTORS.find(s => s.id === selectedSector);
    if (sectorDef) {
      templates = templates.filter(t => sectorDef.categories.includes(t.category));
    }
  }

  if (searchQuery) {
    templates = templates.filter(t =>
      t.name.toLowerCase().includes(searchQuery) ||
      t.description.toLowerCase().includes(searchQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
  }

  const categoryCounts = getCategoryCounts();
  const sectorCounts = getSectorCounts();

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-sm text-muted-foreground">
          {ALL_TEMPLATES.length} plantillas profesionales organizadas por sector e industria.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form method="GET" className="flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={params.q || ''}
            placeholder="Buscar plantillas por nombre, descripción o etiquetas..."
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {selectedSector && <input type="hidden" name="sector" value={selectedSector} />}
          {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Sector pills */}
      <div className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sector</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/templates"
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              !selectedSector && !selectedCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Todos ({ALL_TEMPLATES.length})
          </Link>
          {SECTORS.map(sector => (
            <Link
              key={sector.id}
              href={`/dashboard/templates?sector=${sector.id}`}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedSector === sector.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {sector.name} ({sectorCounts[sector.id] || 0})
            </Link>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div className="mb-6">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categoría</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(CATEGORY_META) as [TemplateCategory, typeof CATEGORY_META[TemplateCategory]][])
            .filter(([, meta]) => !selectedSector || meta.sector === selectedSector)
            .map(([id, meta]) => (
              <Link
                key={id}
                href={`/dashboard/templates?category=${id}`}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground ring-1 ring-border hover:ring-primary/50'
                }`}
              >
                {meta.name} ({categoryCounts[id] || 0})
              </Link>
            ))}
        </div>
      </div>

      {/* Template grid */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {templates.length} {templates.length === 1 ? 'plantilla' : 'plantillas'}
          {selectedCategory && ` en ${CATEGORY_META[selectedCategory]?.name}`}
          {selectedSector && !selectedCategory && ` en ${SECTORS.find(s => s.id === selectedSector)?.name}`}
          {searchQuery && ` para "${searchQuery}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Blank page card */}
        {!searchQuery && (
          <Link
            href="/dashboard/landings/new"
            className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-xl text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              +
            </div>
            <h3 className="mt-3 text-sm font-semibold text-card-foreground">Página en blanco</h3>
            <p className="mt-1 text-xs text-muted-foreground">Empezar desde cero</p>
          </Link>
        )}

        {/* Template cards */}
        {templates.map((template) => (
          <div
            key={template.slug}
            className="group rounded-xl bg-card shadow-sm ring-1 ring-border/50 transition-all hover:shadow-lg hover:ring-border overflow-hidden"
          >
            {/* Thumbnail */}
            <div
              className="aspect-[16/10] flex items-center justify-center relative"
              style={{ background: template.thumbnail.gradient }}
            >
              <span className="text-4xl opacity-60">{template.thumbnail.icon}</span>
              <div className="absolute bottom-2 left-2 flex gap-1">
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  {template.sections.length} secciones
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                <Link
                  href={`/dashboard/landings/new?templateSlug=${template.slug}`}
                  className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-gray-900 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-gray-50"
                >
                  Usar plantilla
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-card-foreground truncate">{template.name}</h3>
              </div>
              <p className="mb-2.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {template.description}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {CATEGORY_META[template.category]?.name || template.category}
                </span>
                {template.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/50 py-16 text-center">
          <p className="text-lg font-medium text-muted-foreground">No se encontraron plantillas</p>
          <p className="mt-1 text-sm text-muted-foreground/70">Prueba con otros filtros o términos de búsqueda.</p>
          <Link
            href="/dashboard/templates"
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Ver todas
          </Link>
        </div>
      )}
    </div>
  );
}
