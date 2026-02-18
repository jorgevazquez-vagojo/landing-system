export interface DynamicTextConfig {
  defaultValues?: Record<string, string>;
}

const VARIABLE_REGEX = /\{\{(\w+)\}\}/g;

export function extractVariables(text: string): string[] {
  const matches: string[] = [];
  let match;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    if (!matches.includes(match[1])) matches.push(match[1]);
  }
  return matches;
}

export function replaceVariables(
  text: string,
  params: Record<string, string>,
  defaults?: Record<string, string>
): string {
  return text.replace(VARIABLE_REGEX, (_, key) => {
    return params[key] || defaults?.[key] || `{{${key}}}`;
  });
}

export function getUrlParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => {
    params[key] = decodeURIComponent(value);
  });
  // Map common UTM parameters
  if (params.utm_campaign) params.campaign = params.utm_campaign;
  if (params.utm_source) params.source = params.utm_source;
  if (params.utm_medium) params.medium = params.utm_medium;
  if (params.utm_term) params.keyword = params.utm_term;
  if (params.utm_content) params.content = params.utm_content;
  return params;
}

export function replaceSectionProps(
  props: Record<string, unknown>,
  params: Record<string, string>,
  defaults?: Record<string, string>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      result[key] = replaceVariables(value, params, defaults);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) => {
        if (typeof item === 'string') return replaceVariables(item, params, defaults);
        if (typeof item === 'object' && item !== null) {
          return replaceSectionProps(item as Record<string, unknown>, params, defaults);
        }
        return item;
      });
    } else if (typeof value === 'object' && value !== null) {
      result[key] = replaceSectionProps(value as Record<string, unknown>, params, defaults);
    } else {
      result[key] = value;
    }
  }
  return result;
}
