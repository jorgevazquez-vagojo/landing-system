// ---------------------------------------------------------------------------
// LLM Content Extractor — generates machine-readable plain text from sections
// ---------------------------------------------------------------------------
// LLM crawlers (GPTBot, ClaudeBot, PerplexityBot) benefit from having a
// clean text representation of the page content. This module extracts
// meaningful text from landing sections and generates a hidden HTML block
// that crawlers can parse without executing JavaScript.

interface Section {
  type: string;
  props: Record<string, unknown>;
  order: number;
}

/**
 * Extract a plain-text summary from landing sections for LLM consumption.
 * Returns an HTML string meant to be embedded in a hidden div.
 */
export function extractLlmContent(
  sections: Section[],
  landingName: string,
  landingDescription?: string | null,
): string {
  const parts: string[] = [];

  parts.push(`<h1>${escapeHtml(landingName)}</h1>`);
  if (landingDescription) {
    parts.push(`<p>${escapeHtml(landingDescription)}</p>`);
  }

  const sorted = [...sections].sort((a, b) => a.order - b.order);

  for (const section of sorted) {
    const content = extractSectionContent(section);
    if (content) parts.push(content);
  }

  return parts.join('\n');
}

function extractSectionContent(section: Section): string | null {
  const { type, props } = section;

  switch (type) {
    case 'hero':
      return formatHero(props);
    case 'features':
      return formatFeatures(props);
    case 'cta':
      return formatCta(props);
    case 'pricing':
      return formatPricing(props);
    case 'faq':
      return formatFaq(props);
    case 'testimonials':
      return formatTestimonials(props);
    case 'stats':
      return formatStats(props);
    case 'rich-text':
      return formatRichText(props);
    case 'contact-form':
      return formatContactForm(props);
    case 'comparison':
      return formatComparison(props);
    default:
      return formatGeneric(props);
  }
}

function formatHero(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  if (props.subtitle) lines.push(`<p>${escapeHtml(String(props.subtitle))}</p>`);
  if (props.ctaText) lines.push(`<p><strong>${escapeHtml(String(props.ctaText))}</strong></p>`);
  lines.push('</section>');
  return lines.join('\n');
}

function formatFeatures(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  if (props.subtitle) lines.push(`<p>${escapeHtml(String(props.subtitle))}</p>`);
  const items = props.items || props.features;
  if (Array.isArray(items)) {
    lines.push('<ul>');
    for (const item of items) {
      if (typeof item === 'object' && item !== null) {
        const f = item as Record<string, unknown>;
        const title = f.title || f.name || '';
        const desc = f.description || f.text || '';
        lines.push(`<li><strong>${escapeHtml(String(title))}</strong>: ${escapeHtml(String(desc))}</li>`);
      }
    }
    lines.push('</ul>');
  }
  lines.push('</section>');
  return lines.join('\n');
}

function formatCta(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  if (props.subtitle) lines.push(`<p>${escapeHtml(String(props.subtitle))}</p>`);
  if (props.ctaText) lines.push(`<p><strong>${escapeHtml(String(props.ctaText))}</strong></p>`);
  lines.push('</section>');
  return lines.join('\n');
}

function formatPricing(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  const plans = props.plans || props.items;
  if (Array.isArray(plans)) {
    for (const plan of plans) {
      if (typeof plan === 'object' && plan !== null) {
        const p = plan as Record<string, unknown>;
        lines.push(`<article>`);
        if (p.name) lines.push(`<h3>${escapeHtml(String(p.name))}</h3>`);
        if (p.price) lines.push(`<p>Price: ${escapeHtml(String(p.price))}</p>`);
        if (p.description) lines.push(`<p>${escapeHtml(String(p.description))}</p>`);
        const features = p.features;
        if (Array.isArray(features)) {
          lines.push('<ul>');
          for (const f of features) lines.push(`<li>${escapeHtml(String(f))}</li>`);
          lines.push('</ul>');
        }
        lines.push('</article>');
      }
    }
  }
  lines.push('</section>');
  return lines.join('\n');
}

function formatFaq(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  const items = props.items;
  if (Array.isArray(items)) {
    for (const item of items) {
      if (typeof item === 'object' && item !== null) {
        const q = item as Record<string, unknown>;
        if (q.question) lines.push(`<h3>${escapeHtml(String(q.question))}</h3>`);
        if (q.answer) lines.push(`<p>${escapeHtml(String(q.answer))}</p>`);
      }
    }
  }
  lines.push('</section>');
  return lines.join('\n');
}

function formatTestimonials(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  const items = props.items || props.testimonials;
  if (Array.isArray(items)) {
    for (const item of items) {
      if (typeof item === 'object' && item !== null) {
        const t = item as Record<string, unknown>;
        lines.push('<blockquote>');
        if (t.quote || t.text) lines.push(`<p>${escapeHtml(String(t.quote || t.text))}</p>`);
        if (t.name || t.author) lines.push(`<cite>${escapeHtml(String(t.name || t.author))}${t.role ? `, ${escapeHtml(String(t.role))}` : ''}</cite>`);
        lines.push('</blockquote>');
      }
    }
  }
  lines.push('</section>');
  return lines.join('\n');
}

function formatStats(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  const items = props.items || props.stats;
  if (Array.isArray(items)) {
    lines.push('<dl>');
    for (const item of items) {
      if (typeof item === 'object' && item !== null) {
        const s = item as Record<string, unknown>;
        if (s.label || s.name) lines.push(`<dt>${escapeHtml(String(s.label || s.name))}</dt>`);
        if (s.value || s.number) lines.push(`<dd>${escapeHtml(String(s.value || s.number))}</dd>`);
      }
    }
    lines.push('</dl>');
  }
  lines.push('</section>');
  return lines.join('\n');
}

function formatRichText(props: Record<string, unknown>): string {
  if (props.content && typeof props.content === 'string') {
    return `<section>${props.content}</section>`;
  }
  return '';
}

function formatContactForm(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  if (props.subtitle) lines.push(`<p>${escapeHtml(String(props.subtitle))}</p>`);
  lines.push('<p>Contact form available on this page.</p>');
  lines.push('</section>');
  return lines.join('\n');
}

function formatComparison(props: Record<string, unknown>): string {
  const lines: string[] = ['<section>'];
  if (props.title) lines.push(`<h2>${escapeHtml(String(props.title))}</h2>`);
  lines.push('</section>');
  return lines.join('\n');
}

function formatGeneric(props: Record<string, unknown>): string | null {
  const text: string[] = [];
  for (const key of ['title', 'subtitle', 'heading', 'description', 'text', 'content']) {
    if (props[key] && typeof props[key] === 'string') {
      text.push(escapeHtml(String(props[key])));
    }
  }
  if (text.length === 0) return null;
  return `<section><p>${text.join(' — ')}</p></section>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
