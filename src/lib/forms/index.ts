export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date' | 'url' | 'hidden';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
  conditionalOn?: {
    fieldId: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_empty';
    value?: string;
  };
  progressiveProfile?: boolean;
}

export interface FormStep {
  id: string;
  title?: string;
  description?: string;
  fields: FormField[];
}

export interface FormConfig {
  id: string;
  name: string;
  steps: FormStep[];
  settings: {
    submitText?: string;
    successMessage?: string;
    redirectUrl?: string;
    progressBar?: boolean;
    allowSave?: boolean;
    progressiveProfileCookie?: string;
  };
}

export function evaluateCondition(
  condition: FormField['conditionalOn'],
  formData: Record<string, string>
): boolean {
  if (!condition) return true;
  const value = formData[condition.fieldId] || '';

  switch (condition.operator) {
    case 'equals':
      return value === condition.value;
    case 'not_equals':
      return value !== condition.value;
    case 'contains':
      return value.includes(condition.value || '');
    case 'not_empty':
      return value.trim().length > 0;
    default:
      return true;
  }
}

export function getProfiledFields(cookieName: string): string[] {
  if (typeof window === 'undefined') return [];
  const cookie = document.cookie.match(new RegExp(`${cookieName}=([^;]+)`))?.[1];
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie));
  } catch {
    return [];
  }
}

export function saveProfiledFields(cookieName: string, fieldNames: string[]): void {
  if (typeof window === 'undefined') return;
  const existing = getProfiledFields(cookieName);
  const merged = [...new Set([...existing, ...fieldNames])];
  document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(merged))};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
}

export function validateField(field: FormField, value: string): string | null {
  if (field.required && !value.trim()) return `${field.label} is required`;

  if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Invalid email address';
  }

  if (field.validation) {
    const v = field.validation;
    if (v.pattern && !new RegExp(v.pattern).test(value)) return `Invalid format`;
    if (v.minLength && value.length < v.minLength) return `Minimum ${v.minLength} characters`;
    if (v.maxLength && value.length > v.maxLength) return `Maximum ${v.maxLength} characters`;
    if (v.min !== undefined && Number(value) < v.min) return `Minimum value is ${v.min}`;
    if (v.max !== undefined && Number(value) > v.max) return `Maximum value is ${v.max}`;
  }

  return null;
}
