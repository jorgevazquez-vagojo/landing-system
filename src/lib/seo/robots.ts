// ---------------------------------------------------------------------------
// robots.txt generator
// ---------------------------------------------------------------------------

/**
 * Options for customising the generated robots.txt.
 */
export interface RobotsOptions {
  /** Additional Disallow paths (e.g. ['/admin', '/api']) */
  disallow?: string[];
  /** Additional Allow paths */
  allow?: string[];
  /** Extra sitemap URLs (appended alongside the default one) */
  extraSitemaps?: string[];
}

/**
 * Generate a `robots.txt` file content.
 *
 * By default it allows all crawlers and references the sitemap at
 * `{baseUrl}/sitemap.xml`.
 *
 * @param baseUrl - The root URL of the site (e.g. `https://example.com`).
 * @param options - Optional overrides.
 * @returns The full robots.txt content as a string.
 */
export function generateRobots(
  baseUrl: string,
  options: RobotsOptions = {},
): string {
  const base = baseUrl.replace(/\/+$/, '');
  const lines: string[] = [];

  lines.push('User-agent: *');

  // Allow rules
  if (options.allow && options.allow.length > 0) {
    for (const path of options.allow) {
      lines.push(`Allow: ${path}`);
    }
  }

  // Disallow rules
  if (options.disallow && options.disallow.length > 0) {
    for (const path of options.disallow) {
      lines.push(`Disallow: ${path}`);
    }
  } else {
    // Explicitly allow everything when no disallow rules are provided
    lines.push('Disallow:');
  }

  lines.push('');

  // Sitemaps
  lines.push(`Sitemap: ${base}/sitemap.xml`);
  if (options.extraSitemaps) {
    for (const sitemap of options.extraSitemaps) {
      lines.push(`Sitemap: ${sitemap}`);
    }
  }

  lines.push('');

  return lines.join('\n');
}
