// ---------------------------------------------------------------------------
// LinkedIn Insight Tag adapter (lintrk)
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
    lintrk?: (action: string, data?: Record<string, unknown>) => void;
    _linkedin_data_partner_ids?: string[];
  }
}

export interface LinkedInAdapterOptions {
  /** LinkedIn partner / insight tag ID */
  partnerId: string;
}

export class LinkedInAdapter implements AnalyticsAdapter {
  readonly name = 'LinkedIn';
  readonly requiredConsent: ConsentCategory[] = ['marketing'];

  private partnerId: string;

  constructor(options: LinkedInAdapterOptions) {
    this.partnerId = options.partnerId;
  }

  // ---- AnalyticsAdapter ---------------------------------------------------

  async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids ?? [];
    if (!window._linkedin_data_partner_ids.includes(this.partnerId)) {
      window._linkedin_data_partner_ids.push(this.partnerId);
    }

    // Inject the Insight Tag script if not already present
    if (!document.querySelector('script[src*="snap.licdn.com/li.lms-analytics"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      document.head.appendChild(script);
    }
  }

  trackPageView(_event: PageViewEvent): void {
    // The LinkedIn Insight Tag automatically tracks page views once loaded.
    // Calling lintrk is only needed for conversion events.
  }

  trackEvent(event: AnalyticsEvent): void {
    this.lintrk('track', {
      conversion_id: event.name,
      ...event.properties,
    });
  }

  trackLead(event: LeadEvent): void {
    this.lintrk('track', {
      conversion_id: 'lead',
      value: {
        lead_id: event.leadId,
        form_id: event.formId,
        landing_page_id: event.landingPageId,
        value: event.value,
        currency: event.currency ?? 'EUR',
      },
    });
  }

  destroy(): void {
    // The Insight Tag does not expose a teardown API.
  }

  // ---- helpers ------------------------------------------------------------

  private lintrk(action: string, data?: Record<string, unknown>): void {
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk(action, data);
    }
  }
}
