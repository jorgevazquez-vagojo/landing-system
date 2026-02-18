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
                <th className="px-6 py-3 font-medium">Lift vs Control</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => {
                const controlRate = control ? parseFloat(control.conversionRate) : 0;
                const thisRate = parseFloat(s.conversionRate);
                const lift = controlRate > 0 ? (((thisRate - controlRate) / controlRate) * 100).toFixed(1) : '0.0';

                return (
                  <tr key={s.variantId} className="border-b border-border/50 last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-card-foreground">{s.name}</span>
                        {s.isControl && <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">Control</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{s.weight}%</td>
                    <td className="px-6 py-4 text-sm text-card-foreground">{s.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-card-foreground">{s.conversions.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-card-foreground">{s.conversionRate}%</span>
                      {/* Conversion bar */}
                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(parseFloat(s.conversionRate) * 5, 100)}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {s.isControl ? (
                        <span className="text-sm text-muted-foreground">Baseline</span>
                      ) : (
                        <span className={`text-sm font-medium ${parseFloat(lift) > 0 ? 'text-green-600 dark:text-green-400' : parseFloat(lift) < 0 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
                          {parseFloat(lift) > 0 ? '+' : ''}{lift}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
