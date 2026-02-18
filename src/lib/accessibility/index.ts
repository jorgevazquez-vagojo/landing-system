export interface A11yIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  sectionId?: string;
  sectionType?: string;
  field?: string;
  suggestion?: string;
}

export interface A11yAuditResult {
  score: number;
  issues: A11yIssue[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
    passed: number;
    total: number;
  };
}

interface Section {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

function checkImageAlt(sections: Section[]): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (const s of sections) {
    if (s.props.image && !s.props.imageAlt && !s.props.alt) {
      issues.push({
        id: `img-alt-${s.id}`,
        type: 'error',
        rule: 'img-alt',
        message: `Image in "${s.type}" section is missing alt text`,
        sectionId: s.id,
        sectionType: s.type,
        field: 'image',
        suggestion: 'Add descriptive alt text to the image for screen readers',
      });
    }
    if (Array.isArray(s.props.images)) {
      const images = s.props.images as Array<Record<string, unknown>>;
      images.forEach((img, i) => {
        if (img.url && !img.alt) {
          issues.push({
            id: `img-alt-${s.id}-${i}`,
            type: 'error',
            rule: 'img-alt',
            message: `Image ${i + 1} in "${s.type}" gallery is missing alt text`,
            sectionId: s.id,
            sectionType: s.type,
            suggestion: 'Add alt text to each gallery image',
          });
        }
      });
    }
    if (Array.isArray(s.props.logos)) {
      const logos = s.props.logos as Array<Record<string, unknown>>;
      logos.forEach((logo, i) => {
        if ((logo.url || logo.src) && !logo.alt && !logo.name) {
          issues.push({
            id: `logo-alt-${s.id}-${i}`,
            type: 'warning',
            rule: 'img-alt',
            message: `Logo ${i + 1} in logo cloud is missing alt text`,
            sectionId: s.id,
            sectionType: s.type,
            suggestion: 'Add company name as alt text for each logo',
          });
        }
      });
    }
  }
  return issues;
}

function checkHeadingHierarchy(sections: Section[]): A11yIssue[] {
  const issues: A11yIssue[] = [];
  let hasH1 = false;

  for (const s of sections) {
    if (s.type === 'hero') hasH1 = true;
    if (s.type === 'rich-text' && typeof s.props.content === 'string') {
      const content = s.props.content as string;
      const headings = content.match(/<h(\d)[^>]*>/g);
      if (headings) {
        let prevLevel = 1;
        for (const h of headings) {
          const level = parseInt(h.match(/<h(\d)/)?.[1] || '1');
          if (level > prevLevel + 1) {
            issues.push({
              id: `heading-order-${s.id}`,
              type: 'warning',
              rule: 'heading-order',
              message: `Heading level skipped (h${prevLevel} → h${level}) in rich text section`,
              sectionId: s.id,
              sectionType: s.type,
              suggestion: `Use h${prevLevel + 1} instead of h${level} for proper hierarchy`,
            });
          }
          prevLevel = level;
        }
      }
    }
  }

  if (!hasH1) {
    issues.push({
      id: 'missing-h1',
      type: 'error',
      rule: 'heading-order',
      message: 'Page is missing a main heading (H1). Add a Hero section.',
      suggestion: 'Add a Hero section at the top of your page for the main H1 heading',
    });
  }

  return issues;
}

function checkColorContrast(sections: Section[]): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (const s of sections) {
    if (s.props.backgroundColor && s.props.textColor) {
      const bg = s.props.backgroundColor as string;
      const text = s.props.textColor as string;
      const ratio = calculateContrastRatio(bg, text);
      if (ratio < 4.5) {
        issues.push({
          id: `contrast-${s.id}`,
          type: 'error',
          rule: 'color-contrast',
          message: `Insufficient color contrast (${ratio.toFixed(1)}:1) in "${s.type}" section. WCAG AA requires 4.5:1`,
          sectionId: s.id,
          sectionType: s.type,
          suggestion: 'Increase the contrast between background and text colors',
        });
      }
    }
  }
  return issues;
}

function checkFormLabels(sections: Section[]): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (const s of sections) {
    if (s.type === 'contact-form') {
      if (!s.props.submitText) {
        issues.push({
          id: `form-submit-${s.id}`,
          type: 'warning',
          rule: 'form-label',
          message: 'Form submit button has no text',
          sectionId: s.id,
          sectionType: s.type,
          suggestion: 'Add descriptive text to the submit button (e.g., "Send Message")',
        });
      }
    }
  }
  return issues;
}

function checkLinkText(sections: Section[]): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (const s of sections) {
    if (s.props.ctaText) {
      const text = (s.props.ctaText as string).toLowerCase();
      if (['click here', 'read more', 'learn more', 'here'].includes(text)) {
        issues.push({
          id: `link-text-${s.id}`,
          type: 'warning',
          rule: 'link-text',
          message: `Generic link text "${s.props.ctaText}" in "${s.type}" section`,
          sectionId: s.id,
          sectionType: s.type,
          field: 'ctaText',
          suggestion: 'Use descriptive link text that explains the destination or action',
        });
      }
    }
  }
  return issues;
}

function checkVideoAccessibility(sections: Section[]): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (const s of sections) {
    if (s.type === 'video' && s.props.url && !s.props.transcript && !s.props.captions) {
      issues.push({
        id: `video-captions-${s.id}`,
        type: 'warning',
        rule: 'video-captions',
        message: 'Video section has no captions or transcript',
        sectionId: s.id,
        sectionType: s.type,
        suggestion: 'Add captions or a transcript for video content',
      });
    }
  }
  return issues;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m || m.length < 3) return null;
  return { r: parseInt(m[0], 16), g: parseInt(m[1], 16), b: parseInt(m[2], 16) };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function calculateContrastRatio(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return 21;
  const l1 = relativeLuminance(c1.r, c1.g, c1.b);
  const l2 = relativeLuminance(c2.r, c2.g, c2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function auditSections(sections: Section[]): A11yAuditResult {
  const checks = [
    checkImageAlt,
    checkHeadingHierarchy,
    checkColorContrast,
    checkFormLabels,
    checkLinkText,
    checkVideoAccessibility,
  ];

  const allIssues: A11yIssue[] = [];
  const totalRules = 6;
  let passedRules = totalRules;

  for (const check of checks) {
    const issues = check(sections);
    if (issues.length > 0) {
      passedRules--;
      allIssues.push(...issues);
    }
  }

  const errors = allIssues.filter((i) => i.type === 'error').length;
  const warnings = allIssues.filter((i) => i.type === 'warning').length;
  const info = allIssues.filter((i) => i.type === 'info').length;

  const score = Math.max(0, Math.round(
    100 - (errors * 15) - (warnings * 5) - (info * 1)
  ));

  return {
    score,
    issues: allIssues,
    summary: {
      errors,
      warnings,
      info,
      passed: passedRules,
      total: totalRules,
    },
  };
}
