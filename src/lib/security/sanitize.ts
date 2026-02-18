// ---------------------------------------------------------------------------
// Server-side HTML sanitizer (no external dependencies)
// ---------------------------------------------------------------------------

/**
 * Configuration for the HTML sanitizer.
 */
export interface SanitizeOptions {
  /** HTML tags that are allowed through the sanitizer. */
  allowedTags?: string[];
  /** HTML attributes that are allowed on any tag. */
  allowedAttributes?: string[];
  /** Attributes allowed only on specific tags, e.g. { a: ['href', 'title'] }. */
  allowedAttributesByTag?: Record<string, string[]>;
  /** Allow `href` attributes with `javascript:` protocol. Default: false */
  allowJavascriptUrls?: boolean;
}

const DEFAULT_ALLOWED_TAGS = [
  'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
  'span', 'div', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr', 'sub', 'sup', 'small',
];

const DEFAULT_ALLOWED_ATTRIBUTES = ['class', 'id', 'style'];

const DEFAULT_ALLOWED_ATTRIBUTES_BY_TAG: Record<string, string[]> = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'width', 'height', 'loading'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan', 'scope'],
};

/**
 * Escape all HTML entities in a string so it renders as plain text.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Check whether a URL value is safe (not a `javascript:` URI, etc.).
 */
function isSafeUrl(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('vbscript:') ||
    trimmed.startsWith('data:text/html')
  ) {
    return false;
  }
  return true;
}

/**
 * Sanitize an HTML string to prevent XSS attacks.
 *
 * Uses a regex-based approach suitable for server-side rendering where
 * DOMParser is unavailable. It strips disallowed tags entirely and removes
 * disallowed attributes from permitted tags.
 *
 * @param html - The raw HTML input.
 * @param options - Optional configuration to customise allowed tags / attributes.
 * @returns Sanitized HTML string.
 *
 * @example
 * ```ts
 * sanitizeHtml('<script>alert("xss")</script><p>Hello</p>');
 * // => '<p>Hello</p>'
 *
 * sanitizeHtml('<a href="javascript:alert(1)">Click</a>');
 * // => '<a>Click</a>'
 * ```
 */
export function sanitizeHtml(html: string, options: SanitizeOptions = {}): string {
  const {
    allowedTags = DEFAULT_ALLOWED_TAGS,
    allowedAttributes = DEFAULT_ALLOWED_ATTRIBUTES,
    allowedAttributesByTag = DEFAULT_ALLOWED_ATTRIBUTES_BY_TAG,
    allowJavascriptUrls = false,
  } = options;

  const allowedTagSet = new Set(allowedTags.map((t) => t.toLowerCase()));

  // Remove <script>, <style>, <iframe>, <object>, <embed>, <form> and their content entirely
  let sanitized = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?(?:\/>|<\/embed>)/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '');

  // Remove all event handler attributes (on*)
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '');

  // Process remaining tags
  sanitized = sanitized.replace(
    /<\/?([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^>]*)?)\s*\/?>/g,
    (fullMatch, tagName: string, attributeString: string) => {
      const tag = tagName.toLowerCase();

      // Strip disallowed tags entirely
      if (!allowedTagSet.has(tag)) {
        return '';
      }

      // Closing tags: return as-is (no attributes)
      if (fullMatch.startsWith('</')) {
        return `</${tag}>`;
      }

      // Parse and filter attributes
      const tagSpecificAttrs = allowedAttributesByTag[tag] || [];
      const allAllowed = new Set([...allowedAttributes, ...tagSpecificAttrs]);

      const filteredAttrs: string[] = [];
      const attrRegex = /([a-zA-Z_][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
      let attrMatch: RegExpExecArray | null;

      while ((attrMatch = attrRegex.exec(attributeString)) !== null) {
        const attrName = attrMatch[1].toLowerCase();
        const attrValue = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';

        if (!allAllowed.has(attrName)) continue;

        // Block dangerous URLs unless explicitly allowed
        if ((attrName === 'href' || attrName === 'src') && !allowJavascriptUrls) {
          if (!isSafeUrl(attrValue)) continue;
        }

        // Sanitize style attribute: remove expressions and url() with javascript
        if (attrName === 'style') {
          const safeStyle = attrValue
            .replace(/expression\s*\(/gi, '')
            .replace(/url\s*\(\s*['"]?\s*javascript:/gi, '');
          filteredAttrs.push(`${attrName}="${escapeHtml(safeStyle)}"`);
          continue;
        }

        filteredAttrs.push(`${attrName}="${escapeHtml(attrValue)}"`);
      }

      // Handle boolean attributes (e.g. on standalone tags)
      const booleanAttrRegex = /\s+([a-zA-Z_][\w-]*)(?=\s|\/|>|$)/g;
      let boolMatch: RegExpExecArray | null;
      while ((boolMatch = booleanAttrRegex.exec(attributeString)) !== null) {
        const name = boolMatch[1].toLowerCase();
        if (allAllowed.has(name) && !filteredAttrs.some((a) => a.startsWith(name + '='))) {
          filteredAttrs.push(name);
        }
      }

      const selfClosing = fullMatch.endsWith('/>') ? ' /' : '';
      const attrs = filteredAttrs.length > 0 ? ' ' + filteredAttrs.join(' ') : '';

      return `<${tag}${attrs}${selfClosing}>`;
    },
  );

  return sanitized;
}
