// ---------------------------------------------------------------------------
// Analytics type definitions
// ---------------------------------------------------------------------------

/**
 * Base analytics event shared by every tracker.
 */
export interface AnalyticsEvent {
  /** Machine-readable event name, e.g. "cta_click" */
  name: string;
  /** Arbitrary key/value payload attached to the event */
  properties?: Record<string, unknown>;
  /** ISO-8601 timestamp – defaults to Date.now() when omitted */
  timestamp?: string;
  /** Optional user / session identifier */
  userId?: string;
  /** Optional session identifier */
  sessionId?: string;
}

/**
 * Specialised event emitted on every page navigation.
 */
export interface PageViewEvent {
  /** Fully-qualified URL */
  url: string;
  /** Document title */
  title?: string;
  /** HTTP referrer */
  referrer?: string;
  /** UTM / campaign parameters */
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

/**
 * Event emitted when a visitor submits a lead form.
 */
export interface LeadEvent {
  /** Internal lead identifier */
  leadId: string;
  /** Email address (may be hashed for privacy) */
  email?: string;
  /** Contact phone */
  phone?: string;
  /** Full name */
  name?: string;
  /** Company / organisation */
  company?: string;
  /** Identifier of the landing page that captured the lead */
  landingPageId?: string;
  /** Identifier of the form that was submitted */
  formId?: string;
  /** Value attributed to this lead (e.g. estimated deal size) */
  value?: number;
  /** ISO 4217 currency code */
  currency?: string;
  /** Arbitrary extra fields collected by the form */
  metadata?: Record<string, unknown>;
}

/**
 * Consent categories aligned with GDPR / ePrivacy requirements.
 */
export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

/**
 * Contract every analytics adapter must implement.
 *
 * Adapters are registered with the central `AnalyticsManager` and are called
 * in order when events fire.  Each adapter declares which consent categories
 * it requires so the manager can skip it when consent is missing.
 */
export interface AnalyticsAdapter {
  /** Human-readable adapter name (e.g. "GA4", "Facebook Pixel") */
  readonly name: string;

  /** Consent categories this adapter needs before it may fire */
  readonly requiredConsent: ConsentCategory[];

  /**
   * Inject third-party scripts / pixels.
   * Called once when the manager initialises.
   */
  init(): void | Promise<void>;

  /**
   * Track a page view.
   */
  trackPageView(event: PageViewEvent): void | Promise<void>;

  /**
   * Track a generic custom event.
   */
  trackEvent(event: AnalyticsEvent): void | Promise<void>;

  /**
   * Track a lead capture / conversion event.
   */
  trackLead(event: LeadEvent): void | Promise<void>;

  /**
   * Optional teardown hook (e.g. remove scripts, flush queues).
   */
  destroy?(): void | Promise<void>;
}
