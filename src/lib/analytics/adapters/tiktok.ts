// ---------------------------------------------------------------------------
// TikTok Pixel adapter (ttq)
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
    ttq?: {
      load: (pixelId: string) => void;
      page: () => void;
      track: (eventName: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
      instances?: unknown[];
      _i?: unknown[];
    };
    TiktokAnalyticsObject?: string;
  }
}

export interface TikTokAdapterOptions {
  /** TikTok Pixel ID */
  pixelId: string;
}

export class TikTokAdapter implements AnalyticsAdapter {
  readonly name = 'TikTok';
  readonly requiredConsent: ConsentCategory[] = ['marketing'];

  private pixelId: string;

  constructor(options: TikTokAdapterOptions) {
    this.pixelId = options.pixelId;
  }

  // ---- AnalyticsAdapter ---------------------------------------------------

  async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Bootstrap the TikTok pixel object if it does not exist yet
    if (!window.ttq) {
      const ttq: Record<string, unknown> = {};
      ttq._i = [];
      ttq.methods = [
        'page',
        'track',
        'identify',
        'instances',
        'debug',
        'on',
        'off',
        'once',
        'ready',
        'alias',
        'group',
        'enableCookie',
        'disableCookie',
      ];

      // Create stub methods
      (ttq.methods as string[]).forEach((method: string) => {
        (ttq as Record<string, unknown>)[method] = function () {
          // eslint-disable-next-line prefer-rest-params
          const args = Array.from(arguments);
          args.unshift(method);
          ((ttq as Record<string, unknown[]>)._i as unknown[]).push(args);
          return ttq;
        };
      });

      ttq.load = function (pixelId: string) {
        const scriptId = 'analytics-tiktok';
        if (document.getElementById(scriptId)) return;
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${pixelId}&lib=ttq`;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript?.parentNode?.insertBefore(script, firstScript);
      };

      window.ttq = ttq as unknown as Window['ttq'];
      window.TiktokAnalyticsObject = 'ttq';
    }

    window.ttq!.load(this.pixelId);
    window.ttq!.page();
  }

  trackPageView(_event: PageViewEvent): void {
    this.ttq()?.page();
  }

  trackEvent(event: AnalyticsEvent): void {
    this.ttq()?.track(event.name, {
      ...event.properties,
      timestamp: event.timestamp,
    });
  }

  trackLead(event: LeadEvent): void {
    // Identify the user if we have PII (hashed on TikTok's side)
    if (event.email || event.phone) {
      this.ttq()?.identify({
        ...(event.email && { email: event.email }),
        ...(event.phone && { phone_number: event.phone }),
      });
    }

    this.ttq()?.track('SubmitForm', {
      content_id: event.formId,
      content_name: event.landingPageId,
      value: event.value ?? 0,
      currency: event.currency ?? 'EUR',
    });
  }

  destroy(): void {
    // The TikTok Pixel does not expose a teardown API.
  }

  // ---- helpers ------------------------------------------------------------

  private ttq(): Window['ttq'] | undefined {
    return typeof window !== 'undefined' ? window.ttq : undefined;
  }
}
