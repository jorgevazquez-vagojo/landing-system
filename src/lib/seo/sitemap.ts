// ---------------------------------------------------------------------------
// XML Sitemap generator
// ---------------------------------------------------------------------------

/**
 * Minimal landing representation used by the sitemap generator.
 */
export interface LandingForSitemap {
  slug: string;
  status: string;
  updatedAt: Date | string;
  /** Optional per-page change frequency */
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Optional priority between 0.0 and 1.0 */
  priority?: number;
}

/**
 * Escape special XML characters in a string.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format a date as a W3C Datetime string (YYYY-MM-DD) suitable for sitemaps.
 */
function formatW3CDate(date: Date | string): string {
  return new Date(date).toISOString().split('T')[0];
}

/**
 * Generate an XML sitemap string for the given landing pages.
 *
 * Only landings with `status === 'PUBLISHED'` are included.
 *
 * @param landings - Array of landing page records.
 * @param baseUrl  - The root URL of the site (e.g. `https://example.com`).
 * @returns A well-formed XML sitemap string.
 */
export function generateSitemap(
  landings: LandingForSitemap[],
  baseUrl: string,
): string {
  // Strip trailing slash from base URL
  const base = baseUrl.replace(/\/+$/, '');

  const published = landings.filter((l) => l.status === 'PUBLISHED');

  const urls = published.map((landing) => {
    const loc = `${base}/${escapeXml(landing.slug)}`;
    const lastmod = formatW3CDate(landing.updatedAt);
    const changefreq = landing.changeFreq || 'weekly';
    const priority = landing.priority ?? 0.8;

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n');
  });

  // Include the homepage as the first entry
  const homepageEntry = [
    '  <url>',
    `    <loc>${base}/</loc>`,
    `    <changefreq>daily</changefreq>`,
    `    <priority>1.0</priority>`,
    '  </url>',
  ].join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    homepageEntry,
    ...urls,
    '</urlset>',
  ].join('\n');
}
