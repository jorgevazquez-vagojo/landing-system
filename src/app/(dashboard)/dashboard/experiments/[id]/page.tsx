'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface VariantStats {
  variantId: string;
  name: string;
  slug: string;
  weight: number;
  isControl: boolean;
  views: number;
  conversions: number;
  conversionRate: string;
}

interface SignificanceResult {
  zScore: number;
  pValue: number;
  confidenceLevel: number;
  isSignificant: boolean;
  lift: number;
  liftCI: [number, number];
  sampleSizeNeeded: number;
  powerReached: boolean;
}

/** Normal CDF approximation (Abramowitz & Stegun) */
function normalCDF(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const t = 1.0 / (1.0 + p * Math.abs(x));
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2);
  return 0.5 * (1.0 + sign * y);
}

/** Z-test for two proportions */
function zTestProportions(
  conversionsA: number, viewsA: number,
  conversionsB: number, viewsB: number,
): SignificanceResult {
  const pA = viewsA > 0 ? conversionsA / viewsA : 0;
  const pB = viewsB > 0 ? conversionsB / viewsB : 0;
  const lift = pA > 0 ? ((pB - pA) / pA) * 100 : 0;

  // Pooled proportion
  const pPool = (viewsA + viewsB) > 0 ? (conversionsA + conversionsB) / (viewsA + viewsB) : 0;
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / Math.max(viewsA, 1) + 1 / Math.max(viewsB, 1)));

  const zScore = se > 0 ? (pB - pA) / se : 0;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore))); // two-tailed

  // Confidence interval for lift (using delta method)
  const seA = viewsA > 0 ? Math.sqrt((pA * (1 - pA)) / viewsA) : 0;
  const seB = viewsB > 0 ? Math.sqrt((pB * (1 - pB)) / viewsB) : 0;
  const seDiff = Math.sqrt(seA * seA + seB * seB);
  const z95 = 1.96;
  const lowerDiff = (pB - pA) - z95 * seDiff;
  const upperDiff = (pB - pA) + z95 * seDiff;
  const liftCI: [number, number] = pA > 0
    ? [(lowerDiff / pA) * 100, (upperDiff / pA) * 100]
    : [0, 0];

  // Sample size needed for 80% power, 5% significance, to detect a 10% relative lift
  const mde = pA * 0.1; // minimum detectable effect = 10% relative lift
  const zAlpha = 1.96, zBeta = 0.842;
  const sampleSizeNeeded = mde > 0
    ? Math.ceil((2 * pPool * (1 - pPool) * Math.pow(zAlpha + zBeta, 2)) / (mde * mde))
    : 1000;
  const powerReached = viewsA >= sampleSizeNeeded && viewsB >= sampleSizeNeeded;

  // Confidence level
  const confidenceLevel = (1 - pValue) * 100;

  return {
    zScore,
    pValue,
    confidenceLevel: Math.min(confidenceLevel, 99.99),
    isSignificant: pValue < 0.05,
    lift,
    liftCI,
    sampleSizeNeeded,
    powerReached,
  };
}

export default function ExperimentResultsPage() {
  const params = useParams();
  const id = params.id as string;
  const [stats, setStats] = useState<VariantStats[]>([]);
  const [experiment, setExperiment] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/experiments/${id}`).then((r) => r.json()),
      fetch(`/api/experiments/${id}/events`).then((r) => r.json()),
    ]).then(([exp, st]) => {
      setExperiment(exp);
      setStats(st);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-6 text-muted-foreground">Loading results...</div>;
  if (!experiment) return <div className="p-6 text-red-500">Experiment not found</div>;

  const totalViews = stats.reduce((sum, s) => sum + s.views, 0);
  const totalConversions = stats.reduce((sum, s) => sum + s.conversions, 0);
  const control = stats.find((s) => s.isControl);
  const bestVariant = [...stats].sort((a, b) => parseFloat(b.conversionRate) - parseFloat(a.conversionRate))[0];

  // Calculate significance for each non-control variant
  const significanceMap = new Map<string, SignificanceResult>();
  if (control) {
    for (const s of stats) {
      if (s.isControl) continue;
      significanceMap.set(
        s.variantId,
        zTestProportions(control.conversions, control.views, s.conversions, s.views)
      );
    }
  }

  // Determine winner
  let winner: { name: string; confidence: number } | null = null;
  for (const [variantId, sig] of significanceMap) {
    if (sig.isSignificant && sig.lift > 0) {
      const variant = stats.find((s) => s.variantId === variantId);
      if (variant && (!winner || sig.confidenceLevel > winner.confidence)) {
        winner = { name: variant.name, confidence: sig.confidenceLevel };
      }
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/experiments" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back to experiments
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-foreground">{experiment.name as string}</h1>
        <p className="text-sm text-muted-foreground">
          Status: <span className="font-medium">{experiment.status as string}</span>
        </p>
      </div>

      {/* Winner banner */}
      {winner && (
        <div className="mb-6 rounded-xl bg-green-50 p-4 ring-1 ring-green-200 dark:bg-green-500/10 dark:ring-green-500/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
              <svg className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <p className="font-semibold text-green-800 dark:text-green-300">
                Winner: {winner.name}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                {winner.confidence.toFixed(1)}% confidence — statistically significant
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/50">
          <p className="text-sm text-muted-foreground">Total Visitors</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">{totalViews.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/50">
          <p className="text-sm text-muted-foreground">Total Conversions</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">{totalConversions.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/50">
          <p className="text-sm text-muted-foreground">Avg. Conversion Rate</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">
            {totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(2) : '0.00'}%
          </p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/50">
          <p className="text-sm text-muted-foreground">Best Variant</p>
          <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
            {bestVariant?.name || '-'}
          </p>
        </div>
      </div>

      {/* Variant breakdown */}
      <div className="rounded-xl bg-card shadow-sm ring-1 ring-border/50">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">Variant Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-6 py-3 font-medium">Variant</th>
                <th className="px-6 py-3 font-medium">Traffic</th>
                <th className="px-6 py-3 font-medium">Visitors</th>
                <th className="px-6 py-3 font-medium">Conversions</th>
                <th className="px-6 py-3 font-medium">Conv. Rate</th>
                <th className="px-6 py-3 font-medium">Lift</th>
                <th className="px-6 py-3 font-medium">Significance</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => {
                const sig = significanceMap.get(s.variantId);

                return (
                  <tr key={s.variantId} className="border-b border-border/50 last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-card-foreground">{s.name}</span>
                        {s.isControl && <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">Control</span>}
                        {sig?.isSignificant && sig.lift > 0 && (
                          <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700 dark:bg-green-500/20 dark:text-green-400">Winner</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{s.weight}%</td>
                    <td className="px-6 py-4 text-sm text-card-foreground">{s.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-card-foreground">{s.conversions.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-card-foreground">{s.conversionRate}%</span>
                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(parseFloat(s.conversionRate) * 5, 100)}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {s.isControl ? (
                        <span className="text-sm text-muted-foreground">Baseline</span>
                      ) : sig ? (
                        <div>
                          <span className={`text-sm font-medium ${sig.lift > 0 ? 'text-green-600 dark:text-green-400' : sig.lift < 0 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
                            {sig.lift > 0 ? '+' : ''}{sig.lift.toFixed(1)}%
                          </span>
                          <div className="text-xs text-muted-foreground">
                            CI: [{sig.liftCI[0].toFixed(1)}%, {sig.liftCI[1].toFixed(1)}%]
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {s.isControl ? (
                        <span className="text-sm text-muted-foreground">-</span>
                      ) : sig ? (
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  sig.confidenceLevel >= 95 ? 'bg-green-500' :
                                  sig.confidenceLevel >= 80 ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}
                                style={{ width: `${sig.confidenceLevel}%` }}
                              />
                            </div>
                            <span className={`text-xs font-medium ${
                              sig.isSignificant ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                            }`}>
                              {sig.confidenceLevel.toFixed(1)}%
                            </span>
                          </div>
                          {!sig.powerReached && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              Need ~{sig.sampleSizeNeeded.toLocaleString()} visitors/variant
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistical notes */}
      <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Statistical significance is calculated using a two-proportion z-test (two-tailed, alpha=0.05).
          Confidence intervals use the delta method at 95% level.
          Minimum sample size estimated for 80% power to detect a 10% relative lift.
        </p>
      </div>
    </div>
  );
}
