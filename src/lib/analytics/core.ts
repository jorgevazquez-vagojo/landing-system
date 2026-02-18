// ---------------------------------------------------------------------------
// AnalyticsManager – singleton that orchestrates every registered adapter
// ---------------------------------------------------------------------------

import type {
  AnalyticsAdapter,
  AnalyticsEvent,
  ConsentCategory,
  LeadEvent,
  PageViewEvent,
} from './types';
import { getConsent } from './consent';

/**
 * Central analytics orchestrator.
 *
 * Use `AnalyticsManager.getInstance()` to obtain the singleton, then register
 * as many adapters as needed.  Every public tracking method fans out to all
 * adapters whose required consent categories are currently granted.
 */
export class AnalyticsManager {
  // ---- singleton ----------------------------------------------------------
  private static instance: AnalyticsManager | null = null;

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  /** Reset the singleton – useful in tests. */
  static resetInstance(): void {
    AnalyticsManager.instance = null;
  }

  // ---- state --------------------------------------------------------------
  private adapters: Map<string, AnalyticsAdapter> = new Map();
  private initialised = false;
  private debug = false;

  private constructor() {}

  // ---- adapter management -------------------------------------------------

  /**
   * Register an adapter.  Duplicate names are silently replaced so hot-reload
   * scenarios work without extra bookkeeping.
   */
  registerAdapter(adapter: AnalyticsAdapter): void {
    this.adapters.set(adapter.name, adapter);
    this.log(`Adapter registered: ${adapter.name}`);
  }

  /** Remove a previously registered adapter by name. */
  removeAdapter(name: string): boolean {
    const adapter = this.adapters.get(name);
    if (adapter?.destroy) {
      try {
        adapter.destroy();
      } catch (err) {
        this.warn(`Error destroying adapter "${name}":`, err);
      }
    }
    const deleted = this.adapters.delete(name);
    if (deleted) this.log(`Adapter removed: ${name}`);
    return deleted;
  }

  /** Return the list of currently registered adapter names. */
  getAdapterNames(): string[] {
    return Array.from(this.adapters.keys());
  }

  // ---- lifecycle ----------------------------------------------------------

  /** Enable or disable debug logging. */
  setDebug(enabled: boolean): void {
    this.debug = enabled;
  }

  /**
   * Initialise every registered adapter.
   * Safe to call more than once – subsequent calls are no-ops.
   */
  async init(): Promise<void> {
    if (this.initialised) return;

    for (const [name, adapter] of this.adapters) {
      if (!this.hasRequiredConsent(adapter)) {
        this.log(`Skipping init for "${name}" (missing consent)`);
        continue;
      }
      try {
        await adapter.init();
        this.log(`Adapter initialised: ${name}`);
      } catch (err) {
        this.warn(`Failed to initialise adapter "${name}":`, err);
      }
    }

    this.initialised = true;
  }

  // ---- tracking -----------------------------------------------------------

  async trackPageView(event: PageViewEvent): Promise<void> {
    await this.fanOut((adapter) => adapter.trackPageView(event), 'trackPageView');
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    const enriched: AnalyticsEvent = {
      ...event,
      timestamp: event.timestamp ?? new Date().toISOString(),
    };
    await this.fanOut((adapter) => adapter.trackEvent(enriched), 'trackEvent');
  }

  async trackLead(event: LeadEvent): Promise<void> {
    await this.fanOut((adapter) => adapter.trackLead(event), 'trackLead');
  }

  // ---- internals ----------------------------------------------------------

  /**
   * Fan a callback out to every adapter that currently has the required
   * consent, catching errors per-adapter so one failure never blocks others.
   */
  private async fanOut(
    fn: (adapter: AnalyticsAdapter) => void | Promise<void>,
    methodName: string,
  ): Promise<void> {
    const tasks: Promise<void>[] = [];

    for (const [name, adapter] of this.adapters) {
      if (!this.hasRequiredConsent(adapter)) {
        this.log(`Skipping ${methodName} for "${name}" (missing consent)`);
        continue;
      }

      tasks.push(
        Promise.resolve()
          .then(() => fn(adapter))
          .catch((err) => {
            this.warn(`Error in ${methodName} for "${name}":`, err);
          }),
      );
    }

    await Promise.all(tasks);
  }

  /** Check whether the user has granted every consent category the adapter needs. */
  private hasRequiredConsent(adapter: AnalyticsAdapter): boolean {
    const consent = getConsent();
    return adapter.requiredConsent.every(
      (cat: ConsentCategory) => consent[cat] === true,
    );
  }

  private log(...args: unknown[]): void {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log('[AnalyticsManager]', ...args);
    }
  }

  private warn(...args: unknown[]): void {
    // Warnings are always emitted regardless of debug flag.
    // eslint-disable-next-line no-console
    console.warn('[AnalyticsManager]', ...args);
  }
}
