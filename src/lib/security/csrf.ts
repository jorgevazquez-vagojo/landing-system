// ---------------------------------------------------------------------------
// CSRF token generation and validation
// ---------------------------------------------------------------------------

import { randomBytes, timingSafeEqual } from 'crypto';

/**
 * Length of the generated CSRF token in bytes (hex-encoded = 2x characters).
 */
const TOKEN_BYTE_LENGTH = 32;

/**
 * Default token expiry in milliseconds (1 hour).
 */
const DEFAULT_EXPIRY_MS = 60 * 60 * 1000;

/**
 * Configuration options for token generation.
 */
export interface CsrfOptions {
  /** Token expiry in milliseconds. Default: 3600000 (1 hour). */
  expiryMs?: number;
}

/**
 * A CSRF token with embedded expiry.
 * Format: `<hex-random>.<expiry-timestamp>`
 */
export interface CsrfToken {
  /** The full token string to embed in forms / headers. */
  token: string;
  /** The expiry time as a Unix timestamp (ms). */
  expiresAt: number;
}

/**
 * Result of a CSRF token validation.
 */
export interface CsrfValidationResult {
  valid: boolean;
  reason?: 'missing' | 'malformed' | 'expired' | 'invalid';
}

/**
 * Generate a cryptographically secure CSRF token.
 *
 * The token encodes its own expiry so validation does not require server-side
 * storage (stateless). In production you should additionally bind the token
 * to the user session to prevent token-fixation attacks.
 *
 * @param options - Optional configuration.
 * @returns The generated token and its expiry timestamp.
 *
 * @example
 * ```ts
 * const { token } = generateToken();
 * // Set as a cookie or embed in a hidden form field
 * ```
 */
export function generateToken(options: CsrfOptions = {}): CsrfToken {
  const expiryMs = options.expiryMs ?? DEFAULT_EXPIRY_MS;
  const expiresAt = Date.now() + expiryMs;
  const random = randomBytes(TOKEN_BYTE_LENGTH).toString('hex');
  const token = `${random}.${expiresAt}`;

  return { token, expiresAt };
}

/**
 * Validate a CSRF token.
 *
 * @param token          - The token received from the client.
 * @param expectedToken  - The token previously issued (e.g. stored in a cookie or session).
 * @returns Validation result indicating whether the token is valid.
 *
 * @example
 * ```ts
 * const result = validateToken(req.body._csrf, req.cookies._csrf);
 * if (!result.valid) {
 *   return new Response('Forbidden', { status: 403 });
 * }
 * ```
 */
export function validateToken(
  token: string | undefined | null,
  expectedToken?: string | null,
): CsrfValidationResult {
  if (!token) {
    return { valid: false, reason: 'missing' };
  }

  // Parse expiry from token
  const dotIndex = token.lastIndexOf('.');
  if (dotIndex === -1) {
    return { valid: false, reason: 'malformed' };
  }

  const expiryStr = token.slice(dotIndex + 1);
  const expiry = Number(expiryStr);
  if (Number.isNaN(expiry)) {
    return { valid: false, reason: 'malformed' };
  }

  // Check expiry
  if (Date.now() > expiry) {
    return { valid: false, reason: 'expired' };
  }

  // If an expected token is provided, do a timing-safe comparison
  if (expectedToken !== undefined && expectedToken !== null) {
    try {
      const tokenBuffer = Buffer.from(token, 'utf8');
      const expectedBuffer = Buffer.from(expectedToken, 'utf8');

      if (tokenBuffer.length !== expectedBuffer.length) {
        return { valid: false, reason: 'invalid' };
      }

      if (!timingSafeEqual(tokenBuffer, expectedBuffer)) {
        return { valid: false, reason: 'invalid' };
      }
    } catch {
      return { valid: false, reason: 'invalid' };
    }
  }

  return { valid: true };
}
