// ---------------------------------------------------------------------------
// Google Tag Manager adapter (dataLayer)
// ---------------------------------------------------------------------------

import type {
  AnalyticsAdapter,
  AnalyticsEvent,
  ConsentCategory,
  LeadEvent,
  PageViewEvent,
} from '../types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Window {
    // dataLayer is typed via gtm
  }
}

type DataLayerEntry = Record<string, unknown>;
type DataLayerArray = DataLayerEntry[];

export interface GTMAdapterOptions {
  /** GTM container ID, e.g. "GTM-XXXXXXX" */
  containerId: string;
  /** Custom dataLayer variable name (default: "dataLayer") */
  dataLayerName?: string;
}

export class GTMAdapter implements AnalyticsAdapter {
  readonly name = 'GTM';
  readonly requiredConsent: ConsentCategory[] = ['analytics'];

  private containerId: string;
  private dataLayerName: string;

  constructor(options: GTMAdapterOptions) {
    this.containerId = options.containerId;
    this.dataLayerName = options.dataLayerName ?? 'dataLayer';
  }

  // ---- AnalyticsAdapter ---------------------------------------------------

  async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Initialise the dataLayer array
    (window as unknown as Record<string, unknown>)[this.dataLayerName] =
      (window as unknown as Record<string, unknown>)[this.dataLayerName] ?? [];

    this.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    // Inject the GTM snippet if not already present
    if (!document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src =
        `https://www.googletagmanager.com/gtm.js?id=${this.containerId}` +
        `&l=${this.dataLayerName}`;
      document.head.appendChild(script);
    }
  }

  trackPageView(event: PageViewEvent): void {
    this.push({
      event: 'page_view',
      page_url: event.url,
      page_title: event.title,
      page_referrer: event.referrer,
      ...(event.utm && {
        utm_source: event.utm.source,
        utm_medium: event.utm.medium,
        utm_campaign: event.utm.campaign,
        utm_term: event.utm.term,
        utm_content: event.utm.content,
      }),
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    this.push({
      event: event.name,
      ...event.properties,
      ...(event.userId && { user_id: event.userId }),
      ...(event.sessionId && { session_id: event.sessionId }),
      event_timestamp: event.timestamp,
    });
  }

  trackLead(event: LeadEvent): void {
    this.push({
      event: 'generate_lead',
      lead_id: event.leadId,
      lead_email: event.email,
      lead_phone: event.phone,
      lead_name: event.name,
      lead_company: event.company,
      landing_page_id: event.landingPageId,
      form_id: event.formId,
      lead_value: event.value,
      lead_currency: event.currency,
      ...event.metadata,
    });
  }

  destroy(): void {
    // GTM does not expose a teardown API.
  }

  // ---- helpers ------------------------------------------------------------

  private push(data: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;
    const dl = (window as unknown as Record<string, unknown>)[this.dataLayerName] as
      | DataLayerArray
      | undefined;
    if (Array.isArray(dl)) {
      dl.push(data);
    }
  }
}
