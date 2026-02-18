export interface LandingSection {
  id: string;
  type: string;
  variant?: string;
  props: Record<string, unknown>;
  order: number;
}

export interface LandingSettings {
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    borderRadius?: string;
  };
  analytics?: {
    ga4Id?: string;
    gtmId?: string;
    facebookPixelId?: string;
    linkedinPartnerId?: string;
    tiktokPixelId?: string;
  };
  customCss?: string;
  customHead?: string;
  favicon?: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}
