// ---------------------------------------------------------------------------
// Facebook / Meta Pixel adapter (fbq)
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
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export interface FacebookPixelAdapterOptions {
  /** Meta Pixel ID */
  pixelId: string;
  /** Automatically call fbq('track', 'PageView') on init (default: false) */
  autoPageView?: boolean;
}

export class FacebookPixelAdapter implements AnalyticsAdapter {
  readonly name = 'FacebookPixel';
  readonly requiredConsent: ConsentCategory[] = ['marketing'];

  private pixelId: string;
  private autoPageView: boolean;

  constructor(options: FacebookPixelAdapterOptions) {
    this.pixelId = options.pixelId;
    this.autoPageView = options.autoPageView ?? false;
  }

  // ---- AnalyticsAdapter ---------------------------------------------------

  async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Inject the Facebook Pixel base code if not already loaded
    if (!window.fbq) {
      const fbq = function fbq(...args: unknown[]) {
        const f = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
        if (f.callMethod) {
          f.callMethod(...args);
        } else {
          f.queue.push(args);
        }
      } as unknown as Window['fbq'];

      const f = fbq as unknown as Record<string, unknown>;
      f.push = fbq;
      f.loaded = true;
      f.version = '2.0';
      f.queue = [];

      window.fbq = fbq;
      window._fbq = fbq;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }

    this.fbq('init', this.pixelId);

    if (this.autoPageView) {
      this.fbq('track', 'PageView');
    }
  }

  trackPageView(_event: PageViewEvent): void {
    this.fbq('track', 'PageView');
  }

  trackEvent(event: AnalyticsEvent): void {
    this.fbq('trackCustom', event.name, {
      ...event.properties,
      timestamp: event.timestamp,
    });
  }

  trackLead(event: LeadEvent): void {
    this.fbq('track', 'Lead', {
      content_name: event.formId ?? 'lead_form',
      value: event.value ?? 0,
      currency: event.currency ?? 'EUR',
      lead_id: event.leadId,
      landing_page_id: event.landingPageId,
    });
  }

  destroy(): void {
    // The Pixel SDK does not expose a teardown API.
  }

  // ---- helpers ------------------------------------------------------------

  private fbq(...args: unknown[]): void {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq(...args);
    }
  }
}
