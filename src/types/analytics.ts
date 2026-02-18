export interface AnalyticsEvent {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
}

export interface PageViewEvent {
  path: string;
  title?: string;
  referrer?: string;
  landingId?: string;
}

export interface LeadEvent {
  email: string;
  landingId: string;
  source: string;
  formData?: Record<string, unknown>;
}

export interface AnalyticsAdapter {
  name: string;
  init(config: Record<string, string>): void;
  trackPageView(event: PageViewEvent): void;
  trackEvent(event: AnalyticsEvent): void;
  trackLead(event: LeadEvent): void;
}
