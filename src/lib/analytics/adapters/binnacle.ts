// ---------------------------------------------------------------------------
// Binnacle CRM analytics adapter
// ---------------------------------------------------------------------------

import type {
  AnalyticsAdapter,
  AnalyticsEvent,
  ConsentCategory,
  LeadEvent,
  PageViewEvent,
} from '../types';

export interface BinnacleAnalyticsAdapterOptions {
  /** Base URL of the Binnacle API (no trailing slash) */
  apiUrl: string;
  /** API key for authentication */
  apiKey: string;
  /** Optional tenant identifier for multi-tenant deployments */
  tenantId?: string;
  /** Request timeout in milliseconds (default: 5 000) */
  timeoutMs?: number;
}

/**
 * Sends analytics events to the Binnacle CRM API so they are correlated
 * with leads and pipeline data inside Binnacle dashboards.
 *
 * Requires the "analytics" consent category.
 */
export class BinnacleAnalyticsAdapter implements AnalyticsAdapter {
  readonly name = 'Binnacle';
  readonly requiredConsent: ConsentCategory[] = ['analytics'];

  private apiUrl: string;
  private apiKey: string;
  private tenantId?: string;
  private timeoutMs: number;

  constructor(options: BinnacleAnalyticsAdapterOptions) {
    this.apiUrl = options.apiUrl.replace(/\/+$/, '');
    this.apiKey = options.apiKey;
    this.tenantId = options.tenantId;
    this.timeoutMs = options.timeoutMs ?? 5_000;
  }

  // ---- AnalyticsAdapter ---------------------------------------------------

  async init(): Promise<void> {
    // No client-side script injection needed – events go server-to-server.
    // Optionally, we could ping /health to validate credentials.
  }

  async trackPageView(event: PageViewEvent): Promise<void> {
    await this.send('/events/pageview', {
      url: event.url,
      title: event.title,
      referrer: event.referrer,
      utm: event.utm,
      timestamp: new Date().toISOString(),
    });
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    await this.send('/events/custom', {
      name: event.name,
      properties: event.properties,
      userId: event.userId,
      sessionId: event.sessionId,
      timestamp: event.timestamp ?? new Date().toISOString(),
    });
  }

  async trackLead(event: LeadEvent): Promise<void> {
    await this.send('/events/lead', {
      leadId: event.leadId,
      email: event.email,
      phone: event.phone,
      name: event.name,
      company: event.company,
      landingPageId: event.landingPageId,
      formId: event.formId,
      value: event.value,
      currency: event.currency,
      metadata: event.metadata,
      timestamp: new Date().toISOString(),
    });
  }

  destroy(): void {
    // Nothing to tear down.
  }

  // ---- helpers ------------------------------------------------------------

  private async send(path: string, body: Record<string, unknown>): Promise<void> {
    const url = `${this.apiUrl}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      };
      if (this.tenantId) {
        headers['X-Tenant-Id'] = this.tenantId;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.warn(
          `[BinnacleAnalytics] ${path} responded ${response.status}: ${text}`,
        );
      }
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') {
        console.warn(`[BinnacleAnalytics] Request to ${path} timed out`);
      } else {
        console.warn(`[BinnacleAnalytics] Request to ${path} failed:`, err);
      }
    } finally {
      clearTimeout(timer);
    }
  }
}
