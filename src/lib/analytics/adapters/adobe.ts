// ---------------------------------------------------------------------------
// Adobe Analytics adapter (AppMeasurement / s object)
// ---------------------------------------------------------------------------

import type {
  AnalyticsAdapter,
  AnalyticsEvent,
  ConsentCategory,
  LeadEvent,
  PageViewEvent,
} from '../types';

/**
 * Minimal typing for the Adobe Analytics `s` (AppMeasurement) global.
 * In production, projects typically install @types/adobe-analytics or a
 * custom .d.ts.  These stubs cover the subset we use.
 */
interface AdobeAnalyticsObject {
  /* properties */
  pageName?: string;
  pageURL?: string;
  referrer?: string;
  channel?: string;
  campaign?: string;
  prop1?: string;
  prop2?: string;
  eVar1?: string;
  eVar2?: string;
  eVar3?: string;
  eVar4?: string;
  eVar5?: string;
  events?: string;
  products?: string;
  linkTrackVars?: string;
  linkTrackEvents?: string;

  /* methods */
  t: () => void;
  tl: (
    linkObject: true | HTMLElement | null,
    linkType: string,
    linkName: string,
    overrides?: Record<string, unknown>,
  ) => void;
  clearVars: () => void;
}

declare global {
  interface Window {
    s?: AdobeAnalyticsObject;
  }
}

export interface AdobeAdapterOptions {
  /** Adobe Analytics report suite ID */
  reportSuiteId: string;
  /** Tracking server hostname */
  trackingServer: string;
  /** URL to the AppMeasurement.js library (if you need to inject it) */
  scriptUrl?: string;
}

export class AdobeAdapter implements AnalyticsAdapter {
  readonly name = 'Adobe';
  readonly requiredConsent: ConsentCategory[] = ['analytics'];

  private reportSuiteId: string;
  private trackingServer: string;
  private scriptUrl?: string;

  constructor(options: AdobeAdapterOptions) {
    this.reportSuiteId = options.reportSuiteId;
    this.trackingServer = options.trackingServer;
    this.scriptUrl = options.scriptUrl;
  }

  // ---- AnalyticsAdapter ---------------------------------------------------

  async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Optionally inject AppMeasurement.js
    if (
      this.scriptUrl &&
      !document.querySelector(`script[src="${this.scriptUrl}"]`)
    ) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = this.scriptUrl!;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Adobe AppMeasurement'));
        document.head.appendChild(script);
      });
    }

    // Basic configuration – assumes `s` object is defined by AppMeasurement
    const s = this.getS();
    if (!s) return;

    (s as unknown as Record<string, string>).account = this.reportSuiteId;
    (s as unknown as Record<string, string>).trackingServer = this.trackingServer;
  }

  trackPageView(event: PageViewEvent): void {
    const s = this.getS();
    if (!s) return;

    s.pageName = event.title ?? event.url;
    s.pageURL = event.url;
    s.referrer = event.referrer ?? '';
    s.campaign = event.utm?.campaign ?? '';

    s.t(); // fire the page view beacon
  }

  trackEvent(event: AnalyticsEvent): void {
    const s = this.getS();
    if (!s) return;

    s.linkTrackVars = 'eVar1,eVar2,events';
    s.linkTrackEvents = event.name;
    s.events = event.name;
    s.eVar1 = event.name;
    s.eVar2 = JSON.stringify(event.properties ?? {});

    s.tl(true, 'o', event.name);
  }

  trackLead(event: LeadEvent): void {
    const s = this.getS();
    if (!s) return;

    s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,events,products';
    s.linkTrackEvents = 'event10';
    s.events = 'event10';
    s.eVar1 = event.leadId;
    s.eVar2 = event.formId ?? '';
    s.eVar3 = event.landingPageId ?? '';
    s.eVar4 = event.email ?? '';
    s.eVar5 = event.company ?? '';
    s.products = event.value != null ? `;lead;;;${event.value}` : '';

    s.tl(true, 'o', 'Lead Capture');
    s.clearVars();
  }

  destroy(): void {
    // AppMeasurement does not expose a teardown API.
  }

  // ---- helpers ------------------------------------------------------------

  private getS(): AdobeAnalyticsObject | undefined {
    return typeof window !== 'undefined' ? window.s : undefined;
  }
}
