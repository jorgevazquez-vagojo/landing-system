// ---------------------------------------------------------------------------
// Content Security Policy header generator
// ---------------------------------------------------------------------------

/**
 * CSP directive configuration.
 * Each key is a CSP directive name and the value is an array of allowed sources.
 */
export type CspDirectives = Record<string, string[]>;

/**
 * Options for customising the generated CSP header.
 */
export interface CspOptions {
  /** Extra directives to merge (values are appended to defaults). */
  extra?: CspDirectives;
  /** Whether to include 'unsafe-inline' for style-src (needed for Tailwind). Default: true */
  allowInlineStyles?: boolean;
  /** Whether this is a report-only header. Default: false */
  reportOnly?: boolean;
  /** URI to send CSP violation reports to. */
  reportUri?: string;
}

/**
 * Build the default CSP directives.
 *
 * The policy is strict but pragmatic:
 *   - Inline styles are allowed (Tailwind CSS injects utility styles)
 *   - Images are allowed from any HTTPS origin (user-uploaded / CDN)
 *   - Scripts are restricted to 'self' (extend via `extra` if needed)
 *   - Frames and objects are blocked by default
 */
function buildDefaults(allowInlineStyles: boolean): CspDirectives {
  return {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'", ...(allowInlineStyles ? ["'unsafe-inline'"] : [])],
    'img-src': ["'self'", 'https:', 'data:'],
    'font-src': ["'self'", 'https:', 'data:'],
    'connect-src': ["'self'", 'https:'],
    'media-src': ["'self'", 'https:'],
    'object-src': ["'none'"],
    'frame-src': ["'none'"],
    'frame-ancestors': ["'self'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': [],
  };
}

/**
 * Merge extra directives into the base set.
 * Extra values are appended (deduplicated) to existing directives.
 */
function mergeDirectives(base: CspDirectives, extra: CspDirectives): CspDirectives {
  const merged = { ...base };

  for (const [directive, sources] of Object.entries(extra)) {
    if (!merged[directive]) {
      merged[directive] = [...sources];
    } else {
      const existing = new Set(merged[directive]);
      for (const src of sources) {
        existing.add(src);
      }
      merged[directive] = Array.from(existing);
    }
  }

  return merged;
}

/**
 * Serialise a directives map into a CSP header string.
 */
function serialise(directives: CspDirectives): string {
  return Object.entries(directives)
    .map(([directive, sources]) => {
      if (sources.length === 0) return directive;
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
}

/**
 * Generate a Content-Security-Policy header string.
 *
 * @param options - Optional overrides and extensions.
 * @returns The full CSP header value.
 *
 * @example
 * ```ts
 * // Default strict policy
 * const csp = generateCSPHeaders();
 *
 * // Allow Google Analytics scripts
 * const csp = generateCSPHeaders({
 *   extra: {
 *     'script-src': ['https://www.googletagmanager.com'],
 *     'connect-src': ['https://www.google-analytics.com'],
 *   },
 * });
 * ```
 */
export function generateCSPHeaders(options: CspOptions = {}): string {
  const { extra, allowInlineStyles = true, reportUri } = options;

  let directives = buildDefaults(allowInlineStyles);

  if (extra) {
    directives = mergeDirectives(directives, extra);
  }

  if (reportUri) {
    directives['report-uri'] = [reportUri];
  }

  return serialise(directives);
}

/**
 * Return the CSP header name based on whether it is report-only.
 */
export function getCspHeaderName(reportOnly = false): string {
  return reportOnly
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy';
}
