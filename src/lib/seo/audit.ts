// ---------------------------------------------------------------------------
// SEO audit for landing pages
// ---------------------------------------------------------------------------

/**
 * Severity levels for audit recommendations.
 */
export type AuditSeverity = 'error' | 'warning' | 'info';

/**
 * A single audit recommendation.
 */
export interface AuditRecommendation {
  rule: string;
  severity: AuditSeverity;
  message: string;
  /** Points deducted for this issue (higher = worse) */
  penalty: number;
}

/**
 * Result of an SEO audit.
 */
export interface AuditResult {
  /** Score from 0 (terrible) to 100 (perfect) */
  score: number;
  /** Individual recommendations, sorted by severity */
  recommendations: AuditRecommendation[];
}

/**
 * Shape of the `seoMeta` JSON stored on a Landing.
 */
interface SeoMeta {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

/**
 * Represents a section in the landing JSON for audit purposes.
 */
interface AuditSection {
  type: string;
  props?: Record<string, unknown>;
}

/**
 * Minimal landing representation consumed by the auditor.
 */
export interface LandingForAudit {
  name: string;
  slug: string;
  description?: string | null;
  seoMeta?: SeoMeta | Record<string, unknown>;
  sections?: AuditSection[] | unknown;
}

// ---------------------------------------------------------------------------
// Individual checkers
// ---------------------------------------------------------------------------

function checkTitle(landing: LandingForAudit, recs: AuditRecommendation[]): void {
  const seo = (landing.seoMeta ?? {}) as SeoMeta;
  const title = seo.title || landing.name || '';

  if (!title) {
    recs.push({
      rule: 'title-missing',
      severity: 'error',
      message: 'Page title is missing. Every page must have a unique title.',
      penalty: 25,
    });
    return;
  }

  if (title.length < 20) {
    recs.push({
      rule: 'title-too-short',
      severity: 'warning',
      message: `Page title is only ${title.length} characters. Aim for 30-60 characters.`,
      penalty: 10,
    });
  }

  if (title.length > 70) {
    recs.push({
      rule: 'title-too-long',
      severity: 'warning',
      message: `Page title is ${title.length} characters. It will be truncated in search results (max ~60-70).`,
      penalty: 5,
    });
  }
}

function checkDescription(landing: LandingForAudit, recs: AuditRecommendation[]): void {
  const seo = (landing.seoMeta ?? {}) as SeoMeta;
  const description = seo.description || landing.description || '';

  if (!description) {
    recs.push({
      rule: 'description-missing',
      severity: 'error',
      message: 'Meta description is missing. Add a compelling description for search results.',
      penalty: 20,
    });
    return;
  }

  if (description.length < 50) {
    recs.push({
      rule: 'description-too-short',
      severity: 'warning',
      message: `Meta description is only ${description.length} characters. Aim for 120-160 characters.`,
      penalty: 10,
    });
  }

  if (description.length > 160) {
    recs.push({
      rule: 'description-too-long',
      severity: 'info',
      message: `Meta description is ${description.length} characters. It may be truncated (max ~160).`,
      penalty: 3,
    });
  }
}

function checkOpenGraph(landing: LandingForAudit, recs: AuditRecommendation[]): void {
  const seo = (landing.seoMeta ?? {}) as SeoMeta;

  if (!seo.ogTitle && !seo.title && !landing.name) {
    recs.push({
      rule: 'og-title-missing',
      severity: 'warning',
      message: 'Open Graph title is missing. Social shares will lack a title.',
      penalty: 10,
    });
  }

  if (!seo.ogDescription && !seo.description && !landing.description) {
    recs.push({
      rule: 'og-description-missing',
      severity: 'warning',
      message: 'Open Graph description is missing. Social shares will lack context.',
      penalty: 8,
    });
  }

  if (!seo.ogImage) {
    recs.push({
      rule: 'og-image-missing',
      severity: 'warning',
      message: 'Open Graph image is missing. Social shares will have no preview image.',
      penalty: 10,
    });
  }
}

function checkSlug(landing: LandingForAudit, recs: AuditRecommendation[]): void {
  if (!landing.slug) {
    recs.push({
      rule: 'slug-missing',
      severity: 'error',
      message: 'URL slug is missing.',
      penalty: 15,
    });
    return;
  }

  if (landing.slug.length > 75) {
    recs.push({
      rule: 'slug-too-long',
      severity: 'warning',
      message: `URL slug is ${landing.slug.length} characters. Keep URLs short and descriptive.`,
      penalty: 5,
    });
  }

  if (/[A-Z]/.test(landing.slug)) {
    recs.push({
      rule: 'slug-uppercase',
      severity: 'info',
      message: 'URL slug contains uppercase characters. Lowercase URLs are preferred.',
      penalty: 3,
    });
  }
}

function checkHeadingsAndImages(
  landing: LandingForAudit,
  recs: AuditRecommendation[],
): void {
  const sections = landing.sections;
  if (!Array.isArray(sections) || sections.length === 0) {
    recs.push({
      rule: 'no-content',
      severity: 'warning',
      message: 'Landing page has no sections. Add content to improve SEO.',
      penalty: 15,
    });
    return;
  }

  // Check for heading structure: look for an h1 in sections
  let hasH1 = false;
  let imagesWithoutAlt = 0;
  let totalImages = 0;

  for (const section of sections as AuditSection[]) {
    const props = section.props ?? {};

    // Check for headings
    if (props.headingLevel === 'h1' || props.tag === 'h1' || section.type === 'hero') {
      hasH1 = true;
    }

    // Check images for alt text
    if (props.image || props.src || props.backgroundImage) {
      totalImages++;
      if (!props.alt && !props.imageAlt) {
        imagesWithoutAlt++;
      }
    }

    // Check items arrays (e.g., gallery, features)
    const items = props.items;
    if (Array.isArray(items)) {
      for (const item of items) {
        if (typeof item === 'object' && item !== null) {
          const it = item as Record<string, unknown>;
          if (it.image || it.src) {
            totalImages++;
            if (!it.alt && !it.imageAlt) {
              imagesWithoutAlt++;
            }
          }
        }
      }
    }
  }

  if (!hasH1) {
    recs.push({
      rule: 'missing-h1',
      severity: 'warning',
      message: 'No H1 heading detected. Each page should have exactly one H1.',
      penalty: 10,
    });
  }

  if (imagesWithoutAlt > 0) {
    recs.push({
      rule: 'images-missing-alt',
      severity: 'warning',
      message: `${imagesWithoutAlt} of ${totalImages} image(s) lack alt text. Add descriptive alt attributes for accessibility and SEO.`,
      penalty: Math.min(imagesWithoutAlt * 3, 15),
    });
  }
}

function checkCanonical(landing: LandingForAudit, recs: AuditRecommendation[]): void {
  const seo = (landing.seoMeta ?? {}) as SeoMeta;
  if (!seo.canonical) {
    recs.push({
      rule: 'canonical-missing',
      severity: 'info',
      message: 'No canonical URL set. Consider adding one to avoid duplicate content issues.',
      penalty: 3,
    });
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const SEVERITY_ORDER: Record<AuditSeverity, number> = {
  error: 0,
  warning: 1,
  info: 2,
};

/**
 * Run a comprehensive SEO audit on a landing page.
 *
 * Returns a score between 0 and 100 plus actionable recommendations.
 */
export function auditLanding(landing: LandingForAudit): AuditResult {
  const recommendations: AuditRecommendation[] = [];

  checkTitle(landing, recommendations);
  checkDescription(landing, recommendations);
  checkOpenGraph(landing, recommendations);
  checkSlug(landing, recommendations);
  checkHeadingsAndImages(landing, recommendations);
  checkCanonical(landing, recommendations);

  // Calculate score
  const totalPenalty = recommendations.reduce((sum, r) => sum + r.penalty, 0);
  const score = Math.max(0, Math.min(100, 100 - totalPenalty));

  // Sort by severity (errors first)
  recommendations.sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  return { score, recommendations };
}
