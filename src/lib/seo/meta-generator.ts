// ---------------------------------------------------------------------------
// Meta tag generator for landing pages
// ---------------------------------------------------------------------------

/**
 * Shape of the `seoMeta` JSON stored on a Landing record.
 */
export interface SeoMeta {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app';
  canonical?: string;
  noIndex?: boolean;
}

/**
 * Minimal landing representation consumed by the meta generator.
 */
export interface LandingForMeta {
  name: string;
  slug: string;
  description?: string | null;
  seoMeta?: SeoMeta | Record<string, unknown>;
}

/**
 * A single `<meta>` tag expressed as a name/property + content pair.
 */
export interface MetaTag {
  /** Use `name` for standard meta tags, `property` for Open Graph. */
  key: 'name' | 'property';
  keyValue: string;
  content: string;
}

/**
 * Full set of meta values returned by the generator.
 */
export interface MetaTagSet {
  title: string;
  description: string;
  tags: MetaTag[];
}

const MAX_TITLE_LENGTH = 70;
const MAX_DESCRIPTION_LENGTH = 160;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 3).trimEnd() + '...';
}

/**
 * Generate a complete set of meta tags for a landing page.
 *
 * Priority order for each field:
 *   1. Explicit `seoMeta` override on the landing
 *   2. Landing-level `name` / `description`
 *   3. Sensible fallback
 */
export function generateMetaTags(landing: LandingForMeta): MetaTagSet {
  const seo = (landing.seoMeta ?? {}) as SeoMeta;

  const title = truncate(seo.title || landing.name, MAX_TITLE_LENGTH);

  const description = truncate(
    seo.description || landing.description || '',
    MAX_DESCRIPTION_LENGTH,
  );

  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const ogImage = seo.ogImage || '';
  const twitterCard = seo.twitterCard || 'summary_large_image';

  const tags: MetaTag[] = [
    { key: 'name', keyValue: 'description', content: description },
    { key: 'property', keyValue: 'og:title', content: ogTitle },
    { key: 'property', keyValue: 'og:description', content: ogDescription },
    { key: 'name', keyValue: 'twitter:card', content: twitterCard },
    { key: 'name', keyValue: 'twitter:title', content: ogTitle },
    { key: 'name', keyValue: 'twitter:description', content: ogDescription },
  ];

  if (ogImage) {
    tags.push({ key: 'property', keyValue: 'og:image', content: ogImage });
    tags.push({ key: 'name', keyValue: 'twitter:image', content: ogImage });
  }

  if (seo.canonical) {
    tags.push({ key: 'name', keyValue: 'canonical', content: seo.canonical });
  }

  if (seo.noIndex) {
    tags.push({ key: 'name', keyValue: 'robots', content: 'noindex, nofollow' });
  }

  return { title, description, tags };
}
