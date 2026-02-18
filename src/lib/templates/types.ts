// ---------------------------------------------------------------------------
// Template catalog types
// ---------------------------------------------------------------------------

import type { LandingSection } from '@/types/landing';

/** Broad industry sectors that group multiple categories */
export type TemplateSector =
  | 'technology'
  | 'commerce'
  | 'financial'
  | 'professional-services'
  | 'lifestyle'
  | 'hospitality'
  | 'social'
  | 'industrial'
  | 'creative'
  | 'campaigns';

/** Specific category within a sector */
export type TemplateCategory =
  | 'saas'
  | 'ecommerce'
  | 'finance'
  | 'real-estate'
  | 'health'
  | 'education'
  | 'marketing'
  | 'food'
  | 'travel'
  | 'events'
  | 'nonprofit'
  | 'automotive'
  | 'legal'
  | 'media'
  | 'b2b'
  | 'local'
  | 'special';

export interface TemplateDefinition {
  slug: string;
  name: string;
  description: string;
  category: TemplateCategory;
  sector: TemplateSector;
  tags: string[];
  thumbnail: ThumbnailStyle;
  sections: LandingSection[];
}

export interface ThumbnailStyle {
  gradient: string;
  icon: string;
}

export interface CategoryInfo {
  id: TemplateCategory;
  name: string;
  icon: string;
  sector: TemplateSector;
  count: number;
}

export interface SectorInfo {
  id: TemplateSector;
  name: string;
  icon: string;
  categories: TemplateCategory[];
}

// ---------------------------------------------------------------------------
// Sector definitions — each groups related categories
// ---------------------------------------------------------------------------

export const SECTORS: SectorInfo[] = [
  {
    id: 'technology',
    name: 'Tecnología',
    icon: 'cpu',
    categories: ['saas', 'b2b'],
  },
  {
    id: 'commerce',
    name: 'Comercio & Retail',
    icon: 'shopping-bag',
    categories: ['ecommerce'],
  },
  {
    id: 'financial',
    name: 'Sector Financiero',
    icon: 'landmark',
    categories: ['finance'],
  },
  {
    id: 'professional-services',
    name: 'Servicios Profesionales',
    icon: 'briefcase',
    categories: ['marketing', 'legal', 'local'],
  },
  {
    id: 'lifestyle',
    name: 'Estilo de Vida',
    icon: 'heart',
    categories: ['health', 'education', 'automotive'],
  },
  {
    id: 'hospitality',
    name: 'Hostelería & Turismo',
    icon: 'map-pin',
    categories: ['food', 'travel', 'real-estate'],
  },
  {
    id: 'social',
    name: 'Social & Comunidad',
    icon: 'users',
    categories: ['nonprofit', 'events'],
  },
  {
    id: 'creative',
    name: 'Creatividad & Media',
    icon: 'palette',
    categories: ['media'],
  },
  {
    id: 'campaigns',
    name: 'Campañas & Lanzamientos',
    icon: 'rocket',
    categories: ['special'],
  },
];

// ---------------------------------------------------------------------------
// Category metadata — name + icon + parent sector
// ---------------------------------------------------------------------------

export const CATEGORY_META: Record<TemplateCategory, { name: string; icon: string; sector: TemplateSector }> = {
  saas:          { name: 'SaaS & Tech',             icon: 'code',             sector: 'technology' },
  b2b:           { name: 'B2B & Enterprise',        icon: 'building',         sector: 'technology' },
  ecommerce:     { name: 'E-commerce',              icon: 'shopping-cart',    sector: 'commerce' },
  finance:       { name: 'Finanzas & Banca',        icon: 'credit-card',      sector: 'financial' },
  marketing:     { name: 'Marketing & Agencias',    icon: 'megaphone',        sector: 'professional-services' },
  legal:         { name: 'Legal & Profesional',     icon: 'briefcase',        sector: 'professional-services' },
  local:         { name: 'Negocios Locales',        icon: 'map-pin',          sector: 'professional-services' },
  health:        { name: 'Salud & Bienestar',       icon: 'heart',            sector: 'lifestyle' },
  education:     { name: 'Educación & Formación',   icon: 'book-open',        sector: 'lifestyle' },
  automotive:    { name: 'Automoción',              icon: 'car',              sector: 'lifestyle' },
  food:          { name: 'Restauración',            icon: 'utensils',         sector: 'hospitality' },
  travel:        { name: 'Viajes & Turismo',        icon: 'plane',            sector: 'hospitality' },
  'real-estate': { name: 'Inmobiliaria',            icon: 'home',             sector: 'hospitality' },
  nonprofit:     { name: 'ONGs & Causas',           icon: 'heart-handshake',  sector: 'social' },
  events:        { name: 'Eventos',                 icon: 'calendar',         sector: 'social' },
  media:         { name: 'Media & Entretenimiento', icon: 'play',             sector: 'creative' },
  special:       { name: 'Campañas Especiales',     icon: 'sparkles',         sector: 'campaigns' },
};

// ---------------------------------------------------------------------------
// Helper to derive sector from category
// ---------------------------------------------------------------------------

export function getSectorForCategory(category: TemplateCategory): TemplateSector {
  return CATEGORY_META[category].sector;
}
