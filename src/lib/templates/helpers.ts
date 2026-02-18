// ---------------------------------------------------------------------------
// Section factory helpers for template generation
// ---------------------------------------------------------------------------

import type { LandingSection } from '@/types/landing';

let counter = 0;
function uid(prefix: string) { return `${prefix}-${++counter}`; }

export function resetCounter() { counter = 0; }

// ---------------------------------------------------------------------------
// Section builders
// ---------------------------------------------------------------------------

export function nav(logo: string, links: string[], order: number): LandingSection {
  return {
    id: uid('nav'), type: 'navigation', variant: 'default', order,
    props: { logo, links: links.map(l => ({ label: l, url: `#${l.toLowerCase().replace(/\s+/g, '-')}` })) },
  };
}

export function hero(
  title: string, subtitle: string, cta: string, order: number,
  variant: string = 'centered', extra: Record<string, unknown> = {},
): LandingSection {
  return {
    id: uid('hero'), type: 'hero', variant, order,
    props: { title, subtitle, ctaText: cta, ctaUrl: '#', ...extra },
  };
}

export function features(
  title: string, subtitle: string,
  items: { title: string; description: string; icon: string }[],
  order: number, variant: string = 'grid-3',
): LandingSection {
  return {
    id: uid('feat'), type: 'features', variant, order,
    props: { title, subtitle, items },
  };
}

export function stats(items: { value: string; label: string }[], order: number, variant = 'row'): LandingSection {
  return { id: uid('stats'), type: 'stats', variant, order, props: { items } };
}

export function testimonials(
  title: string,
  items: { name: string; role: string; quote: string }[],
  order: number, variant = 'cards',
): LandingSection {
  return { id: uid('test'), type: 'testimonials', variant, order, props: { title, items } };
}

export function pricing(
  title: string, subtitle: string,
  plans: { name: string; price: string; description: string; features: string[]; ctaText: string; highlighted?: boolean }[],
  order: number, variant = 'three-tier',
): LandingSection {
  return { id: uid('pricing'), type: 'pricing', variant, order, props: { title, subtitle, plans } };
}

export function faq(
  title: string,
  items: { question: string; answer: string }[],
  order: number, variant = 'accordion',
): LandingSection {
  return { id: uid('faq'), type: 'faq', variant, order, props: { title, items } };
}

export function cta(title: string, subtitle: string, ctaText: string, order: number, variant = 'banner'): LandingSection {
  return { id: uid('cta'), type: 'cta', variant, order, props: { title, subtitle, ctaText, ctaUrl: '#' } };
}

export function contactForm(title: string, subtitle: string, order: number, variant = 'default'): LandingSection {
  return { id: uid('form'), type: 'contact-form', variant, order, props: { title, subtitle, buttonText: 'Send' } };
}

export function logoCloud(title: string, order: number, variant = 'with-title'): LandingSection {
  return { id: uid('logos'), type: 'logo-cloud', variant, order, props: { title, logos: [] } };
}

export function footer(companyName: string, order: number, variant = 'simple'): LandingSection {
  return {
    id: uid('footer'), type: 'footer', variant, order,
    props: { companyName, year: 2026, links: [{ label: 'Privacy', url: '#' }, { label: 'Terms', url: '#' }, { label: 'Contact', url: '#' }] },
  };
}

export function comparison(
  title: string,
  items: Record<string, unknown>[],
  order: number, variant = 'table',
): LandingSection {
  return { id: uid('comp'), type: 'comparison', variant, order, props: { title, items } };
}

export function gallery(title: string, images: string[], order: number, variant = 'grid'): LandingSection {
  return { id: uid('gallery'), type: 'gallery', variant, order, props: { title, images } };
}

export function video(title: string, url: string, order: number, variant = 'embed'): LandingSection {
  return { id: uid('video'), type: 'video', variant, order, props: { title, url } };
}

export function countdown(title: string, date: string, order: number, variant = 'default'): LandingSection {
  return { id: uid('cd'), type: 'countdown', variant, order, props: { title, targetDate: date } };
}

export function richText(content: string, order: number, variant = 'default'): LandingSection {
  return { id: uid('rt'), type: 'rich-text', variant, order, props: { content } };
}

export function divider(order: number, variant = 'line'): LandingSection {
  return { id: uid('div'), type: 'divider', variant, order, props: {} };
}

export function multiStepForm(
  title: string,
  steps: { title: string; fields: { name: string; type: string; label: string }[] }[],
  order: number, variant = 'default',
): LandingSection {
  return { id: uid('msf'), type: 'multi-step-form', variant, order, props: { title, steps } };
}

// ---------------------------------------------------------------------------
// Template builder — shorthand for TemplateDefinition
// ---------------------------------------------------------------------------

import type { TemplateDefinition, TemplateCategory, TemplateSector } from './types';

export function tpl(
  slug: string, name: string, description: string,
  category: TemplateCategory, sector: TemplateSector,
  tags: string[], gradient: string, icon: string,
  sections: LandingSection[],
): TemplateDefinition {
  resetCounter();
  return { slug, name, description, category, sector, tags, thumbnail: { gradient, icon }, sections };
}
