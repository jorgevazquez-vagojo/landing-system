export type ConditionType =
  | 'utm_source'
  | 'utm_medium'
  | 'utm_campaign'
  | 'utm_content'
  | 'utm_term'
  | 'device'
  | 'country'
  | 'referrer'
  | 'time_range'
  | 'day_of_week'
  | 'returning_visitor'
  | 'url_param'
  | 'cookie';

export type Operator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'regex' | 'gt' | 'lt' | 'is_true' | 'is_false';

export interface Condition {
  type: ConditionType;
  operator: Operator;
  value: string;
  key?: string;
}

export interface PersonalizationAction {
  type: 'show_section' | 'hide_section' | 'replace_text' | 'replace_image' | 'redirect' | 'add_class';
  sectionId?: string;
  field?: string;
  value?: string;
}

export interface PersonalizationRuleConfig {
  id: string;
  name: string;
  conditions: Condition[];
  conditionLogic: 'and' | 'or';
  actions: PersonalizationAction[];
  priority: number;
}

export function getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function isReturningVisitor(): boolean {
  if (typeof window === 'undefined') return false;
  const visited = document.cookie.includes('ls_returning=1');
  if (!visited) {
    document.cookie = `ls_returning=1;path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  }
  return visited;
}

function getContextValue(condition: Condition): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);

  switch (condition.type) {
    case 'utm_source': return params.get('utm_source') || '';
    case 'utm_medium': return params.get('utm_medium') || '';
    case 'utm_campaign': return params.get('utm_campaign') || '';
    case 'utm_content': return params.get('utm_content') || '';
    case 'utm_term': return params.get('utm_term') || '';
    case 'device': return getDeviceType();
    case 'referrer': return document.referrer;
    case 'returning_visitor': return isReturningVisitor() ? 'true' : 'false';
    case 'day_of_week': return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
    case 'time_range': return `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`;
    case 'url_param': return params.get(condition.key || '') || '';
    case 'cookie': {
      const match = document.cookie.match(new RegExp(`${condition.key}=([^;]+)`));
      return match?.[1] || '';
    }
    case 'country': return '';
    default: return '';
  }
}

function evaluateCondition(condition: Condition): boolean {
  const actual = getContextValue(condition).toLowerCase();
  const expected = condition.value.toLowerCase();

  switch (condition.operator) {
    case 'equals': return actual === expected;
    case 'not_equals': return actual !== expected;
    case 'contains': return actual.includes(expected);
    case 'not_contains': return !actual.includes(expected);
    case 'starts_with': return actual.startsWith(expected);
    case 'ends_with': return actual.endsWith(expected);
    case 'regex': try { return new RegExp(expected).test(actual); } catch { return false; }
    case 'gt': return Number(actual) > Number(expected);
    case 'lt': return Number(actual) < Number(expected);
    case 'is_true': return actual === 'true';
    case 'is_false': return actual === 'false' || actual === '';
    default: return false;
  }
}

export function evaluateRule(rule: PersonalizationRuleConfig): boolean {
  if (rule.conditions.length === 0) return false;
  if (rule.conditionLogic === 'and') {
    return rule.conditions.every(evaluateCondition);
  }
  return rule.conditions.some(evaluateCondition);
}

export function applyPersonalizationRules(
  rules: PersonalizationRuleConfig[],
  sections: Array<{ id: string; props: Record<string, unknown> }>
): { sections: typeof sections; redirect?: string } {
  const sorted = [...rules].sort((a, b) => b.priority - a.priority);
  let redirect: string | undefined;
  const hiddenSections = new Set<string>();
  const textReplacements: Map<string, Record<string, string>> = new Map();

  for (const rule of sorted) {
    if (!evaluateRule(rule)) continue;

    for (const action of rule.actions) {
      switch (action.type) {
        case 'hide_section':
          if (action.sectionId) hiddenSections.add(action.sectionId);
          break;
        case 'replace_text':
          if (action.sectionId && action.field && action.value) {
            if (!textReplacements.has(action.sectionId)) textReplacements.set(action.sectionId, {});
            textReplacements.get(action.sectionId)![action.field] = action.value;
          }
          break;
        case 'redirect':
          if (action.value) redirect = action.value;
          break;
      }
    }
  }

  const result = sections
    .filter((s) => !hiddenSections.has(s.id))
    .map((s) => {
      const replacements = textReplacements.get(s.id);
      if (!replacements) return s;
      return { ...s, props: { ...s.props, ...replacements } };
    });

  return { sections: result, redirect };
}
