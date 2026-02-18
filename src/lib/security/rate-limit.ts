// ---------------------------------------------------------------------------
// In-memory rate limiter
// ---------------------------------------------------------------------------

/**
 * Result of a rate-limit check.
 */
export interface RateLimitResult {
  /** Whether the request is allowed. */
  allowed: boolean;
  /** Number of remaining requests in the current window. */
  remaining: number;
  /** Milliseconds until the window resets. */
  resetMs: number;
}

/**
 * Internal record for each tracked key.
 */
interface WindowRecord {
  /** Number of requests made in the current window. */
  count: number;
  /** Timestamp (ms) when the current window started. */
  windowStart: number;
}

/**
 * A simple in-memory, sliding-window rate limiter backed by a `Map`.
 *
 * Suitable for single-process deployments. For multi-instance deployments
 * replace with a Redis-based implementation.
 *
 * @example
 * ```ts
 * const limiter = new RateLimiter(100, 60_000); // 100 req / 60s
 *
 * const result = limiter.check(request.ip);
 * if (!result.allowed) {
 *   return new Response('Too Many Requests', { status: 429 });
 * }
 * ```
 */
export class RateLimiter {
  private store = new Map<string, WindowRecord>();
  private cleanupIntervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * @param maxRequests - Maximum number of requests allowed per window.
   * @param windowMs   - Length of the rate-limit window in milliseconds.
   */
  constructor(
    public readonly maxRequests: number,
    public readonly windowMs: number,
  ) {
    if (maxRequests <= 0) {
      throw new Error('maxRequests must be a positive integer');
    }
    if (windowMs <= 0) {
      throw new Error('windowMs must be a positive integer');
    }

    // Periodically clean up expired entries to prevent unbounded memory growth
    this.cleanupIntervalId = setInterval(() => this.cleanup(), windowMs * 2);
    // Unref the timer so it does not prevent Node.js from exiting
    if (typeof this.cleanupIntervalId === 'object' && 'unref' in this.cleanupIntervalId) {
      this.cleanupIntervalId.unref();
    }
  }

  /**
   * Check whether a request identified by `key` is allowed.
   *
   * Each call counts as one request. If the limit has been reached the call
   * returns `allowed: false` but does **not** increment the counter further.
   */
  check(key: string): RateLimitResult {
    const now = Date.now();
    const record = this.store.get(key);

    // No record or window expired: start a new window
    if (!record || now - record.windowStart >= this.windowMs) {
      this.store.set(key, { count: 1, windowStart: now });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetMs: this.windowMs,
      };
    }

    const elapsed = now - record.windowStart;
    const resetMs = this.windowMs - elapsed;

    // Limit reached
    if (record.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetMs,
      };
    }

    // Allow and increment
    record.count++;
    return {
      allowed: true,
      remaining: this.maxRequests - record.count,
      resetMs,
    };
  }

  /**
   * Reset the counter for a specific key.
   */
  reset(key: string): void {
    this.store.delete(key);
  }

  /**
   * Remove all expired entries from the store.
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.store) {
      if (now - record.windowStart >= this.windowMs) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Tear down the limiter and stop the cleanup timer.
   */
  destroy(): void {
    if (this.cleanupIntervalId !== null) {
      clearInterval(this.cleanupIntervalId);
      this.cleanupIntervalId = null;
    }
    this.store.clear();
  }
}
