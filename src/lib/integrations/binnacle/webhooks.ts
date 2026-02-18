// ---------------------------------------------------------------------------
// Binnacle webhook handler
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Known Binnacle webhook event types.
 * Extend this union as Binnacle adds new webhook topics.
 */
export type BinnacleWebhookEventType =
  | 'lead.created'
  | 'lead.updated'
  | 'lead.deleted'
  | 'lead.status_changed'
  | 'deal.created'
  | 'deal.updated'
  | 'deal.won'
  | 'deal.lost';

export interface BinnacleWebhookPayload {
  /** Unique event ID (idempotency key) */
  id: string;
  /** Event type */
  event: BinnacleWebhookEventType;
  /** ISO-8601 timestamp of the event */
  timestamp: string;
  /** Tenant that originated the event */
  tenantId?: string;
  /** Event-specific data */
  data: Record<string, unknown>;
}

export interface WebhookHandlerOptions {
  /** HMAC secret used by Binnacle to sign payloads */
  signingSecret: string;
  /** Header name that carries the HMAC signature (default: "x-binnacle-signature") */
  signatureHeader?: string;
  /** Header name that carries the timestamp (default: "x-binnacle-timestamp") */
  timestampHeader?: string;
  /** Maximum age of a webhook in seconds before it is rejected (default: 300) */
  maxAgeSeconds?: number;
}

export interface WebhookResult {
  success: boolean;
  eventId?: string;
  eventType?: BinnacleWebhookEventType;
  error?: string;
}

/**
 * Callback map: callers register one handler per event type they care about.
 */
export type WebhookHandlerMap = Partial<
  Record<BinnacleWebhookEventType, (data: Record<string, unknown>) => Promise<void>>
>;

// ---------------------------------------------------------------------------
// Signature verification
// ---------------------------------------------------------------------------

/**
 * Verify the HMAC-SHA256 signature sent by Binnacle.
 *
 * The expected signature format is `sha256=<hex>`.
 */
function verifySignature(
  rawBody: string,
  signature: string,
  timestamp: string,
  secret: string,
): boolean {
  try {
    const signedPayload = `${timestamp}.${rawBody}`;
    const expected = createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex');
    const expectedBuffer = Buffer.from(`sha256=${expected}`, 'utf8');
    const receivedBuffer = Buffer.from(signature, 'utf8');

    if (expectedBuffer.length !== receivedBuffer.length) return false;
    return timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch {
    return false;
  }
}

/**
 * Guard against replay attacks: reject payloads older than `maxAgeSeconds`.
 */
function isTimestampFresh(timestamp: string, maxAgeSeconds: number): boolean {
  const ts = Number(timestamp);
  if (Number.isNaN(ts)) return false;
  const age = Math.abs(Date.now() / 1000 - ts);
  return age <= maxAgeSeconds;
}

// ---------------------------------------------------------------------------
// Public handler
// ---------------------------------------------------------------------------

/**
 * Validate and process an incoming Binnacle webhook.
 *
 * Usage example (Next.js API route):
 *
 * ```ts
 * export async function POST(req: Request) {
 *   const result = await handleBinnacleWebhook(
 *     await req.text(),
 *     Object.fromEntries(req.headers.entries()),
 *     {
 *       signingSecret: process.env.BINNACLE_WEBHOOK_SECRET!,
 *     },
 *     {
 *       'lead.created': async (data) => { ... },
 *       'lead.status_changed': async (data) => { ... },
 *     },
 *   );
 *   return Response.json(result, { status: result.success ? 200 : 400 });
 * }
 * ```
 */
export async function handleBinnacleWebhook(
  rawBody: string,
  headers: Record<string, string | undefined>,
  options: WebhookHandlerOptions,
  handlers: WebhookHandlerMap,
): Promise<WebhookResult> {
  const signatureHeader = options.signatureHeader ?? 'x-binnacle-signature';
  const timestampHeader = options.timestampHeader ?? 'x-binnacle-timestamp';
  const maxAge = options.maxAgeSeconds ?? 300;

  // --- Extract and normalise headers (case-insensitive lookup) -------------
  const normalised: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(headers)) {
    normalised[key.toLowerCase()] = value;
  }

  const signature = normalised[signatureHeader.toLowerCase()];
  const timestamp = normalised[timestampHeader.toLowerCase()];

  if (!signature || !timestamp) {
    return { success: false, error: 'Missing signature or timestamp header' };
  }

  // --- Timestamp freshness -------------------------------------------------
  if (!isTimestampFresh(timestamp, maxAge)) {
    return { success: false, error: 'Webhook timestamp is too old or invalid' };
  }

  // --- HMAC verification ---------------------------------------------------
  if (!verifySignature(rawBody, signature, timestamp, options.signingSecret)) {
    return { success: false, error: 'Invalid webhook signature' };
  }

  // --- Parse payload -------------------------------------------------------
  let payload: BinnacleWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as BinnacleWebhookPayload;
  } catch {
    return { success: false, error: 'Malformed JSON body' };
  }

  if (!payload.id || !payload.event || !payload.data) {
    return { success: false, error: 'Payload missing required fields (id, event, data)' };
  }

  // --- Dispatch to the matching handler ------------------------------------
  const handler = handlers[payload.event];
  if (!handler) {
    // No handler registered for this event type – acknowledge without error.
    return {
      success: true,
      eventId: payload.id,
      eventType: payload.event,
    };
  }

  try {
    await handler(payload.data);
  } catch (err: unknown) {
    const message = (err as Error).message ?? 'Unknown handler error';
    console.error(
      `[handleBinnacleWebhook] Handler for "${payload.event}" threw: ${message}`,
    );
    return {
      success: false,
      eventId: payload.id,
      eventType: payload.event,
      error: `Handler error: ${message}`,
    };
  }

  return {
    success: true,
    eventId: payload.id,
    eventType: payload.event,
  };
}
