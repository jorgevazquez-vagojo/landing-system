export interface ComponentDefinition {
  type: string;
  name: string;
  icon: string;
  category: 'header' | 'content' | 'cta' | 'social-proof' | 'media' | 'form' | 'layout' | 'footer';
  variants: VariantDefinition[];
  defaultProps: Record<string, unknown>;
  propsSchema: PropSchema[];
}

export interface VariantDefinition {
  id: string;
  name: string;
  thumbnail?: string;
}

export interface PropSchema {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'number' | 'color' | 'image' | 'url' | 'select' | 'toggle' | 'array' | 'object';
  options?: { label: string; value: string }[];
  defaultValue?: unknown;
  group?: string;
}
