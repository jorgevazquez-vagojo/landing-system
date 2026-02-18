// ---------------------------------------------------------------------------
// Lead sync: Landing System -> Binnacle CRM
// ---------------------------------------------------------------------------

import { BinnacleClient, BinnacleApiError } from './client';
import type { BinnacleLead } from './client';

/**
 * Internal lead representation coming from the landing system database.
 * Adapt this interface to match your Prisma model or whatever persistence
 * layer you use.
 */
export interface LocalLead {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
  landingPageId?: string;
  formId?: string;
  value?: number;
  currency?: string;
  metadata?: Record<string, unknown>;
  /** Binnacle CRM lead ID, set after the first successful sync */
  binnacleId?: string | null;
  /** Whether this lead has been synced to Binnacle */
  syncedToBinnacle?: boolean;
}

/**
 * Callback the caller must provide so `syncLeadToBinnacle` can persist the
 * Binnacle ID back into the local database.
 */
export type MarkAsSyncedFn = (
  localLeadId: string,
  binnacleLeadId: string,
) => Promise<void>;

export interface SyncResult {
  success: boolean;
  binnacleLeadId?: string;
  error?: string;
}

/**
 * Push a local lead to Binnacle CRM.
 *
 * - If the lead already has a `binnacleId` the function **updates** it.
 * - Otherwise it **creates** a new lead and calls `markAsSynced` so the
 *   caller can persist the returned Binnacle ID.
 *
 * Errors are caught and returned in the `SyncResult` so callers can decide
 * how to handle retries without try/catch.
 */
export async function syncLeadToBinnacle(
  client: BinnacleClient,
  lead: LocalLead,
  markAsSynced: MarkAsSyncedFn,
): Promise<SyncResult> {
  try {
    let binnacleLead: BinnacleLead;

    const payload = {
      email: lead.email,
      phone: lead.phone,
      name: lead.name,
      company: lead.company,
      source: 'landing-system',
      landingPageId: lead.landingPageId,
      formId: lead.formId,
      value: lead.value,
      currency: lead.currency,
      metadata: {
        ...lead.metadata,
        localLeadId: lead.id,
      },
    };

    if (lead.binnacleId) {
      // Update existing lead
      binnacleLead = await client.updateLead(lead.binnacleId, payload);
    } else {
      // Create new lead
      binnacleLead = await client.pushLead(payload);
      // Persist the mapping
      await markAsSynced(lead.id, binnacleLead.id);
    }

    return { success: true, binnacleLeadId: binnacleLead.id };
  } catch (err: unknown) {
    const message =
      err instanceof BinnacleApiError
        ? `${err.message} (HTTP ${err.statusCode})`
        : (err as Error).message;

    console.error(`[syncLeadToBinnacle] Failed for lead ${lead.id}: ${message}`);

    return { success: false, error: message };
  }
}

/**
 * Batch-sync multiple leads.  Returns individual results keyed by local ID.
 *
 * Leads are synced concurrently with a configurable concurrency limit to
 * avoid overwhelming the Binnacle API.
 */
export async function syncLeadsBatch(
  client: BinnacleClient,
  leads: LocalLead[],
  markAsSynced: MarkAsSyncedFn,
  concurrency = 5,
): Promise<Map<string, SyncResult>> {
  const results = new Map<string, SyncResult>();
  const queue = [...leads];

  async function worker(): Promise<void> {
    while (queue.length > 0) {
      const lead = queue.shift()!;
      const result = await syncLeadToBinnacle(client, lead, markAsSynced);
      results.set(lead.id, result);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, leads.length) },
    () => worker(),
  );
  await Promise.all(workers);

  return results;
}
