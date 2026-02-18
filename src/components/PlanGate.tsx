'use client';

import { type PlanId, type PlanFeatures, hasFeature, PLANS } from '@/lib/plans';

interface PlanGateProps {
  feature: keyof PlanFeatures;
  planId: PlanId;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * PlanGate — conditionally renders children based on plan access.
 * Shows upgrade prompt when feature is not available.
 */
export function PlanGate({ feature, planId, children, fallback }: PlanGateProps) {
  if (hasFeature(planId, feature)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // Find the minimum plan that has this feature
  const upgradePlan = (['PRO', 'ENTERPRISE'] as PlanId[]).find((p) => hasFeature(p, feature));
  const plan = upgradePlan ? PLANS[upgradePlan] : PLANS.PRO;

  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        {plan.name} Feature
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Upgrade to {plan.name} to unlock this feature
      </p>
      <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Upgrade to {plan.name} — ${plan.price}/mo
      </button>
    </div>
  );
}

/**
 * PoweredByBadge — shown on Free plan published pages.
 */
export function PoweredByBadge({ planId }: { planId: PlanId }) {
  if (planId !== 'FREE') return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <a
        href="https://landing-system.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-lg ring-1 ring-gray-200 backdrop-blur-sm hover:bg-white"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
        Powered by Landing System
      </a>
    </div>
  );
}
