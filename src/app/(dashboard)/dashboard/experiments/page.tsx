'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Experiment {
  id: string;
  name: string;
  description?: string;
  status: string;
  landing: { name: string; slug: string };
  variants: { id: string; name: string; weight: number; isControl: boolean }[];
  _count: { events: number };
  createdAt: string;
}

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experiments').then((r) => r.json()).then((data) => {
      setExperiments(data);
      setLoading(false);
    });
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/experiments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setExperiments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  }

  if (loading) return <div className="p-6 text-muted-foreground">Loading experiments...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">A/B Testing</h1>
          <p className="text-sm text-muted-foreground">Run experiments to optimize conversion rates</p>
        </div>
      </div>

      {experiments.length === 0 ? (
        <div className="rounded-xl bg-card py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/20">
            <svg className="h-8 w-8 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-card-foreground">No experiments yet</h3>
          <p className="mt-1 text-muted-foreground">Create an A/B test from the landing editor</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiments.map((exp) => (
            <div key={exp.id} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{exp.name}</h3>
                  {exp.description && <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>}
                  <p className="mt-1 text-xs text-muted-foreground">Landing: {exp.landing.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    exp.status === 'RUNNING' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                    exp.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                    exp.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                  }`}>
                    {exp.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {exp.variants.map((v) => (
                  <div key={v.id} className={`rounded-lg border p-3 ${v.isControl ? 'border-blue-200 bg-blue-50/50 dark:border-blue-500/30 dark:bg-blue-500/10' : 'border-border'}`}>
                    <div className="text-sm font-medium text-card-foreground">{v.name}</div>
                    <div className="text-xs text-muted-foreground">{v.weight}% traffic</div>
                    {v.isControl && <div className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">Control</div>}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                {exp.status === 'DRAFT' && (
                  <button onClick={() => updateStatus(exp.id, 'RUNNING')} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                    Start
                  </button>
                )}
                {exp.status === 'RUNNING' && (
                  <>
                    <button onClick={() => updateStatus(exp.id, 'PAUSED')} className="rounded-lg bg-yellow-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-700">
                      Pause
                    </button>
                    <button onClick={() => updateStatus(exp.id, 'COMPLETED')} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                      Complete
                    </button>
                  </>
                )}
                {exp.status === 'PAUSED' && (
                  <button onClick={() => updateStatus(exp.id, 'RUNNING')} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                    Resume
                  </button>
                )}
                <Link href={`/dashboard/experiments/${exp.id}`} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20">
                  View Results
                </Link>
                <span className="ml-auto text-xs text-muted-foreground">{exp._count.events} events</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
