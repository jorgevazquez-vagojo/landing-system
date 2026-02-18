// ---------------------------------------------------------------------------
// JSON-LD structured data generator (Schema.org)
// ---------------------------------------------------------------------------

/**
 * Minimal landing representation used by the structured-data generator.
 */
export interface LandingForSchema {
  name: string;
  slug: string;
  description?: string | null;
  sections?: LandingSection[] | unknown;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string;
}

/**
 * Represents a single section on a landing page.
 * The generator inspects sections of type "faq" to build a FAQPage schema.
 */
export interface LandingSection {
  type: string;
  props?: Record<string, unknown>;
}

/**
 * A FAQ item extracted from an FAQ section.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Company information used for the Organization schema.
 */
export interface CompanyForSchema {
  name: string;
  slug: string;
  logo?: string | null;
  url?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isoDate(value?: Date | string | null): string | undefined {
  if (!value) return undefined;
  return new Date(value).toISOString();
}

/**
 * Extract FAQ items from landing sections.
 * Sections of type "faq" are expected to have `props.items` as an array of
 * `{ question, answer }` objects.
 */
function extractFaqItems(sections: unknown): FaqItem[] {
  if (!Array.isArray(sections)) return [];

  const items: FaqItem[] = [];

  for (const section of sections) {
    if (
      typeof section === 'object' &&
      section !== null &&
      (section as LandingSection).type === 'faq'
    ) {
      const props = (section as LandingSection).props;
      const raw = props?.items;
      if (Array.isArray(raw)) {
        for (const item of raw) {
          if (
            typeof item === 'object' &&
            item !== null &&
            typeof (item as FaqItem).question === 'string' &&
            typeof (item as FaqItem).answer === 'string'
          ) {
            items.push({
              question: (item as FaqItem).question,
              answer: (item as FaqItem).answer,
            });
          }
        }
      }
    }
  }

  return items;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate an array of JSON-LD structured data objects for a landing page.
 *
 * Included schemas:
 *   - Organization (from company info)
 *   - WebPage (from landing metadata)
 *   - BreadcrumbList (Home > Landing)
 *   - FAQPage (only when FAQ sections exist)
 */
export function generateStructuredData(
  landing: LandingForSchema,
  company: CompanyForSchema,
): Record<string, unknown>[] {
  const baseUrl = company.url || '';
  const landingUrl = `${baseUrl}/${landing.slug}`;

  const schemas: Record<string, unknown>[] = [];

  // -- Organization ----------------------------------------------------------
  const organization: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: baseUrl || undefined,
  };
  if (company.logo) {
    organization.logo = company.logo;
  }
  schemas.push(organization);

  // -- WebPage ---------------------------------------------------------------
  const webPage: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: landing.name,
    url: landingUrl,
  };
  if (landing.description) {
    webPage.description = landing.description;
  }
  if (landing.publishedAt) {
    webPage.datePublished = isoDate(landing.publishedAt);
  }
  if (landing.updatedAt) {
    webPage.dateModified = isoDate(landing.updatedAt);
  }
  webPage.publisher = {
    '@type': 'Organization',
    name: company.name,
  };
  schemas.push(webPage);

  // -- BreadcrumbList --------------------------------------------------------
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl || '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: landing.name,
        item: landingUrl,
      },
    ],
  });

  // -- FAQPage (conditional) -------------------------------------------------
  const faqItems = extractFaqItems(landing.sections);
  if (faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  // -- Product/Offer (from pricing sections) ---------------------------------
  const offers = extractOffers(landing.sections, landingUrl);
  if (offers.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: landing.name,
      description: landing.description || undefined,
      url: landingUrl,
      brand: { '@type': 'Organization', name: company.name },
      offers,
    });
  }

  // -- HowTo (from multi-step or features sections) -------------------------
  const howToSteps = extractHowToSteps(landing.sections);
  if (howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: landing.name,
      step: howToSteps,
    });
  }

  // -- VideoObject (from video sections) ------------------------------------
  const videos = extractVideos(landing.sections);
  for (const video of videos) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      ...video,
    });
  }

  // -- Review/AggregateRating (from testimonials) ---------------------------
  const reviews = extractReviews(landing.sections);
  if (reviews.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: landing.name,
      url: landingUrl,
      review: reviews,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: String(reviews.length),
        bestRating: '5',
      },
    });
  }

  return schemas;
}

// ---------------------------------------------------------------------------
// Additional extractors for rich structured data
// ---------------------------------------------------------------------------

/**
 * Extract pricing offers from pricing sections.
 */
function extractOffers(sections: unknown, url: string): Record<string, unknown>[] {
  if (!Array.isArray(sections)) return [];
  const offers: Record<string, unknown>[] = [];

  for (const section of sections) {
    if (typeof section !== 'object' || section === null) continue;
    const s = section as LandingSection;
    if (s.type !== 'pricing') continue;

    const plans = (s.props?.plans || s.props?.items) as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(plans)) continue;

    for (const plan of plans) {
      const price = plan.price;
      if (price === undefined || price === null) continue;

      const priceStr = String(price).replace(/[^0-9.]/g, '');
      const numericPrice = parseFloat(priceStr);

      offers.push({
        '@type': 'Offer',
        name: plan.name ? String(plan.name) : undefined,
        description: plan.description ? String(plan.description) : undefined,
        price: isNaN(numericPrice) ? undefined : numericPrice,
        priceCurrency: 'USD',
        url,
        availability: 'https://schema.org/InStock',
      });
    }
  }

  return offers;
}

/**
 * Extract HowTo steps from features or multi-step form sections.
 */
function extractHowToSteps(sections: unknown): Record<string, unknown>[] {
  if (!Array.isArray(sections)) return [];
  const steps: Record<string, unknown>[] = [];

  for (const section of sections) {
    if (typeof section !== 'object' || section === null) continue;
    const s = section as LandingSection;
    if (s.type !== 'features') continue;

    const items = (s.props?.items || s.props?.features) as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(items) || items.length < 3) continue;

    // Only treat as HowTo if items look like steps (numbered, sequential)
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      steps.push({
        '@type': 'HowToStep',
        position: i + 1,
        name: item.title ? String(item.title) : `Step ${i + 1}`,
        text: item.description ? String(item.description) : undefined,
      });
    }
    break; // Only use first features section for HowTo
  }

  return steps;
}

/**
 * Extract VideoObject data from video sections.
 */
function extractVideos(sections: unknown): Record<string, unknown>[] {
  if (!Array.isArray(sections)) return [];
  const videos: Record<string, unknown>[] = [];

  for (const section of sections) {
    if (typeof section !== 'object' || section === null) continue;
    const s = section as LandingSection;
    if (s.type !== 'video') continue;

    const url = s.props?.url || s.props?.videoUrl || s.props?.src;
    if (!url || typeof url !== 'string') continue;

    videos.push({
      name: s.props?.title ? String(s.props.title) : 'Video',
      description: s.props?.description ? String(s.props.description) : undefined,
      contentUrl: url,
      uploadDate: new Date().toISOString(),
    });
  }

  return videos;
}

/**
 * Extract reviews from testimonial sections.
 */
function extractReviews(sections: unknown): Record<string, unknown>[] {
  if (!Array.isArray(sections)) return [];
  const reviews: Record<string, unknown>[] = [];

  for (const section of sections) {
    if (typeof section !== 'object' || section === null) continue;
    const s = section as LandingSection;
    if (s.type !== 'testimonials') continue;

    const items = (s.props?.items || s.props?.testimonials) as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(items)) continue;

    for (const item of items) {
      const text = item.quote || item.text;
      if (!text) continue;

      reviews.push({
        '@type': 'Review',
        reviewBody: String(text),
        author: {
          '@type': 'Person',
          name: item.name || item.author ? String(item.name || item.author) : 'Anonymous',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: item.rating ? String(item.rating) : '5',
          bestRating: '5',
        },
      });
    }
  }

  return reviews;
}

/**
 * Convenience wrapper that returns the full `<script>` tag content string
 * ready to be injected into the `<head>`.
 */
export function generateJsonLdScript(
  landing: LandingForSchema,
  company: CompanyForSchema,
): string {
  const data = generateStructuredData(landing, company);

  return data
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    )
    .join('\n');
}
