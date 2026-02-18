// ---------------------------------------------------------------------------
// Google Analytics 4 adapter (gtag.js)
// ---------------------------------------------------------------------------

import type {
  AnalyticsAdapter,
  AnalyticsEvent,
  ConsentCategory,
  LeadEvent,
  PageViewEvent,
} from '../types';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export interface GA4AdapterOptions {
  /** GA4 measurement ID, e.g. "G-XXXXXXXXXX" */
  measurementId: string;
  /** Send page views automatically on init (default: false) */
  sendPageViewOnInit?: boolean;
  /** Extra config parameters forwarded to gtag('config', ...) */
  configParams?: Record<string, unknown>;
}

export class GA4Adapter implements AnalyticsAdapter {
  readonly name = 'GA4';
  readonly requiredConsent: ConsentCategory[] = ['analytics'];

  private measurementId: string;
  private sendPageViewOnInit: boolean;
  private configParams: Record<string, unknown>;

  constructor(options: GA4AdapterOptions) {
    this.measurementId = options.measurementId;
    this.sendPageViewOnInit = options.sendPageViewOnInit ?? false;
    this.configParams = options.configParams ?? {};
  }

  // ---- AnalyticsAdapter ---------------------------------------------------

  async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Inject gtag.js script if not already present
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer ?? [];
    if (!window.gtag) {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
    }

    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      send_page_view: this.sendPageViewOnInit,
      ...this.configParams,
    });
  }

  trackPageView(event: PageViewEvent): void {
    this.gtag('event', 'page_view', {
      page_location: event.url,
      page_title: event.title,
      page_referrer: event.referrer,
      ...(event.utm && {
        campaign_source: event.utm.source,
        campaign_medium: event.utm.medium,
        campaign_name: event.utm.campaign,
        campaign_term: event.utm.term,
        campaign_content: event.utm.content,
      }),
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    this.gtag('event', event.name, {
      ...event.properties,
      ...(event.userId && { user_id: event.userId }),
    });
  }

  trackLead(event: LeadEvent): void {
    this.gtag('event', 'generate_lead', {
      value: event.value ?? 0,
      currency: event.currency ?? 'EUR',
      lead_id: event.leadId,
      form_id: event.formId,
      landing_page_id: event.landingPageId,
      ...(event.metadata ?? {}),
    });
  }

  destroy(): void {
    // gtag.js does not expose a teardown API.
  }

  // ---- helpers ------------------------------------------------------------

  private gtag(...args: unknown[]): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag(...args);
    }
  }
}
