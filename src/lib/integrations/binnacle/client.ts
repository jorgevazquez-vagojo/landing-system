// ---------------------------------------------------------------------------
// Binnacle CRM API client
// ---------------------------------------------------------------------------

/**
 * Lead as represented in the Binnacle CRM.
 */
export interface BinnacleLead {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
  status?: string;
  score?: number;
  source?: string;
  landingPageId?: string;
  formId?: string;
  value?: number;
  currency?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface BinnacleClientOptions {
  /** Base URL of the Binnacle API (no trailing slash) */
  apiUrl: string;
  /** API key for authentication */
  apiKey: string;
  /** Optional tenant identifier */
  tenantId?: string;
  /** Request timeout in milliseconds (default: 10 000) */
  timeoutMs?: number;
}

/**
 * Lightweight HTTP client for the Binnacle CRM REST API.
 *
 * Covers the lead lifecycle: create, read, update.  Easily extensible to
 * additional endpoints (deals, contacts, etc.) as the integration matures.
 */
export class BinnacleClient {
  private apiUrl: string;
  private apiKey: string;
  private tenantId?: string;
  private timeoutMs: number;

  constructor(options: BinnacleClientOptions) {
    this.apiUrl = options.apiUrl.replace(/\/+$/, '');
    this.apiKey = options.apiKey;
    this.tenantId = options.tenantId;
    this.timeoutMs = options.timeoutMs ?? 10_000;
  }

  // ---- Lead CRUD ----------------------------------------------------------

  /**
   * Create a new lead in Binnacle.
   *
   * @returns The created lead as returned by the API.
   */
  async pushLead(lead: Omit<BinnacleLead, 'id' | 'createdAt' | 'updatedAt'>): Promise<BinnacleLead> {
    return this.request<BinnacleLead>('POST', '/leads', lead);
  }

  /**
   * Retrieve an existing lead by its Binnacle ID.
   */
  async getLead(leadId: string): Promise<BinnacleLead> {
    return this.request<BinnacleLead>('GET', `/leads/${encodeURIComponent(leadId)}`);
  }

  /**
   * Partially update an existing lead.
   *
   * @returns The updated lead.
   */
  async updateLead(
    leadId: string,
    data: Partial<Omit<BinnacleLead, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<BinnacleLead> {
    return this.request<BinnacleLead>('PATCH', `/leads/${encodeURIComponent(leadId)}`, data);
  }

  // ---- HTTP layer ---------------------------------------------------------

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = `${this.apiUrl}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      };
      if (this.tenantId) {
        headers['X-Tenant-Id'] = this.tenantId;
      }

      const init: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };
      if (body !== undefined && method !== 'GET') {
        init.body = JSON.stringify(body);
      }

      const response = await fetch(url, init);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        throw new BinnacleApiError(
          `Binnacle API ${method} ${path} returned ${response.status}`,
          response.status,
          errorBody,
        );
      }

      // Some endpoints (e.g. DELETE) may return 204 with no body
      const text = await response.text();
      if (!text) return undefined as unknown as T;
      return JSON.parse(text) as T;
    } catch (err: unknown) {
      if (err instanceof BinnacleApiError) throw err;
      if ((err as Error).name === 'AbortError') {
        throw new BinnacleApiError(
          `Binnacle API ${method} ${path} timed out after ${this.timeoutMs}ms`,
          0,
          '',
        );
      }
      throw new BinnacleApiError(
        `Binnacle API ${method} ${path} failed: ${(err as Error).message}`,
        0,
        '',
      );
    } finally {
      clearTimeout(timer);
    }
  }
}

// ---------------------------------------------------------------------------
// Custom error class
// ---------------------------------------------------------------------------

export class BinnacleApiError extends Error {
  /** HTTP status code (0 if the request never completed) */
  readonly statusCode: number;
  /** Raw response body */
  readonly responseBody: string;

  constructor(message: string, statusCode: number, responseBody: string) {
    super(message);
    this.name = 'BinnacleApiError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}
