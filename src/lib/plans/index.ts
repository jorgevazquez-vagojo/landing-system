/**
 * Plan System — Freemium feature gating
 *
 * Plans: FREE, PRO, ENTERPRISE
 * Feature limits enforced at API level and UI level via PlanGate component
 */

export type PlanId = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface PlanFeatures {
  maxLandings: number;
  maxPopups: number;
  aiCopywriting: boolean;
  heatmaps: boolean;
  abTesting: boolean;
  multiStepForms: boolean;
  stripeCheckout: boolean;
  personalization: boolean;
  accessibility: boolean;
  customDomain: boolean;
  whiteLabel: boolean;
  sso: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  removeBranding: boolean;
  teamMembers: number;
  exportData: boolean;
}

export interface PlanDefinition {
  id: PlanId;
  name: string;
  description: string;
  price: number; // monthly USD, 0 = free
  yearlyPrice: number; // yearly USD
  features: PlanFeatures;
  popular?: boolean;
}

export const PLANS: Record<PlanId, PlanDefinition> = {
  FREE: {
    id: 'FREE',
    name: 'Free',
    description: 'Get started with landing pages',
    price: 0,
    yearlyPrice: 0,
    features: {
      maxLandings: 3,
      maxPopups: 1,
      aiCopywriting: false,
      heatmaps: false,
      abTesting: false,
      multiStepForms: false,
      stripeCheckout: false,
      personalization: false,
      accessibility: false,
      customDomain: false,
      whiteLabel: false,
      sso: false,
      apiAccess: false,
      prioritySupport: false,
      removeBranding: false,
      teamMembers: 1,
      exportData: false,
    },
  },
  PRO: {
    id: 'PRO',
    name: 'Pro',
    description: 'Everything you need to convert',
    price: 49,
    yearlyPrice: 468, // $39/mo billed yearly
    popular: true,
    features: {
      maxLandings: -1, // unlimited
      maxPopups: -1,
      aiCopywriting: true,
      heatmaps: true,
      abTesting: true,
      multiStepForms: true,
      stripeCheckout: true,
      personalization: true,
      accessibility: true,
      customDomain: true,
      whiteLabel: false,
      sso: false,
      apiAccess: true,
      prioritySupport: true,
      removeBranding: true,
      teamMembers: 5,
      exportData: true,
    },
  },
  ENTERPRISE: {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    description: 'Full platform, your brand',
    price: 199,
    yearlyPrice: 1908, // $159/mo billed yearly
    features: {
      maxLandings: -1,
      maxPopups: -1,
      aiCopywriting: true,
      heatmaps: true,
      abTesting: true,
      multiStepForms: true,
      stripeCheckout: true,
      personalization: true,
      accessibility: true,
      customDomain: true,
      whiteLabel: true,
      sso: true,
      apiAccess: true,
      prioritySupport: true,
      removeBranding: true,
      teamMembers: -1, // unlimited
      exportData: true,
    },
  },
};

/** Get plan definition by ID */
export function getPlan(planId: PlanId): PlanDefinition {
  return PLANS[planId] || PLANS.FREE;
}

/** Check if a feature is available in a plan */
export function hasFeature(planId: PlanId, feature: keyof PlanFeatures): boolean {
  const plan = getPlan(planId);
  const value = plan.features[feature];
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  return false;
}

/** Check if usage is within plan limits */
export function checkLimit(planId: PlanId, feature: 'maxLandings' | 'maxPopups' | 'teamMembers', currentCount: number): {
  allowed: boolean;
  limit: number;
  current: number;
  remaining: number;
} {
  const plan = getPlan(planId);
  const limit = plan.features[feature];
  const isUnlimited = limit === -1;

  return {
    allowed: isUnlimited || currentCount < limit,
    limit: isUnlimited ? Infinity : limit,
    current: currentCount,
    remaining: isUnlimited ? Infinity : Math.max(0, limit - currentCount),
  };
}

/** Get list of features available in a plan for display */
export function getPlanFeatureList(planId: PlanId): string[] {
  const plan = getPlan(planId);
  const f = plan.features;
  const list: string[] = [];

  list.push(f.maxLandings === -1 ? 'Unlimited landing pages' : `Up to ${f.maxLandings} landing pages`);
  list.push(f.maxPopups === -1 ? 'Unlimited popups' : `Up to ${f.maxPopups} popup`);
  if (f.aiCopywriting) list.push('AI copywriting (BYOK)');
  if (f.heatmaps) list.push('Heatmaps & analytics');
  if (f.abTesting) list.push('A/B testing');
  if (f.multiStepForms) list.push('Multi-step forms');
  if (f.stripeCheckout) list.push('Stripe checkout');
  if (f.personalization) list.push('Personalization rules');
  if (f.accessibility) list.push('Accessibility audit');
  if (f.customDomain) list.push('Custom domain');
  if (f.removeBranding) list.push('Remove branding');
  if (f.whiteLabel) list.push('White label');
  if (f.sso) list.push('SSO / SAML');
  if (f.apiAccess) list.push('API access');
  if (f.prioritySupport) list.push('Priority support');
  if (f.teamMembers === -1) list.push('Unlimited team members');
  else if (f.teamMembers > 1) list.push(`Up to ${f.teamMembers} team members`);
  if (f.exportData) list.push('Data export');

  return list;
}
