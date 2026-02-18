// ---------------------------------------------------------------------------
// GDPR / ePrivacy consent manager
// ---------------------------------------------------------------------------

import type { ConsentCategory } from './types';

/** Shape of the persisted consent record. */
export type ConsentRecord = Record<ConsentCategory, boolean>;

const STORAGE_KEY = 'ls_consent';

const ALL_CATEGORIES: ConsentCategory[] = ['necessary', 'analytics', 'marketing'];

/** Default consent – only "necessary" is granted until the user opts in. */
const DEFAULT_CONSENT: ConsentRecord = {
  necessary: true,
  analytics: false,
  marketing: false,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStorage(): ConsentRecord | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    // Validate every expected key is present and boolean
    for (const cat of ALL_CATEGORIES) {
      if (typeof parsed[cat] !== 'boolean') return null;
    }
    return parsed as ConsentRecord;
  } catch {
    return null;
  }
}

function writeStorage(consent: ConsentRecord): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage full or blocked – fail silently.
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Return the current consent state.
 *
 * Falls back to `DEFAULT_CONSENT` when running server-side or when nothing
 * has been persisted yet.
 */
export function getConsent(): ConsentRecord {
  return readStorage() ?? { ...DEFAULT_CONSENT };
}

/**
 * Persist a full consent record.
 *
 * `necessary` is always forced to `true` regardless of the input to prevent
 * accidental denial of essential cookies.
 */
export function setConsent(consent: Partial<ConsentRecord>): ConsentRecord {
  const merged: ConsentRecord = {
    ...DEFAULT_CONSENT,
    ...consent,
    necessary: true, // always enforce
  };
  writeStorage(merged);
  // Dispatch a custom event so adapters / UI components can react.
  if (isBrowser()) {
    window.dispatchEvent(
      new CustomEvent('ls:consent-change', { detail: merged }),
    );
  }
  return merged;
}

/**
 * Convenience check: does the user currently consent to the given category?
 */
export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()[category] === true;
}

/**
 * Revoke all optional consent categories, keeping only "necessary".
 */
export function revokeAllConsent(): ConsentRecord {
  return setConsent({ necessary: true, analytics: false, marketing: false });
}

/**
 * Grant all consent categories at once.
 */
export function acceptAllConsent(): ConsentRecord {
  return setConsent({ necessary: true, analytics: true, marketing: true });
}

/**
 * Remove persisted consent entirely (e.g. on account deletion).
 */
export function clearConsent(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignored.
  }
}
