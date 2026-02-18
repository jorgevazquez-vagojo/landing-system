'use client';

import { useEffect, useState } from 'react';

interface AuditResult {
  id: string;
  score: number;
  issues: Array<{
    id: string;
    type: 'error' | 'warning' | 'info';
    rule: string;
    message: string;
    sectionType?: string;
    suggestion?: string;
  }>;
  summary: { errors: number; warnings: number; info: number; passed: number; total: number };
  landing?: { name: string; slug: string };
  createdAt: string;
}

export default function AccessibilityPage() {
  const [landings, setLandings] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedLanding, setSelectedLanding] = useState('');
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [auditing, setAuditing] = useState(false);
  const [history, setHistory] = useState<AuditResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/landings').then((r) => r.json()),
      fetch('/api/accessibility').then((r) => r.json()),
    ]).then(([lands, hist]) => {
      setLandings(lands);
      setHistory(hist);
      setLoading(false);
    });
  }, []);

  async function runAudit() {
    if (!selectedLanding) return;
    setAuditing(true);
    const res = await fetch('/api/accessibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ landingId: selectedLanding }),
    });
    const result = await res.json();
    setAudit(result);
    setAuditing(false);
  }

  if (loading) return <div className="p-6 text-muted-foreground">Loading...</div>;

  const scoreColor = (score: number) =>
    score >= 90 ? 'text-green-600 dark:text-green-400' :
    score >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
    'text-red-600 dark:text-red-400';

  const scoreBg = (score: number) =>
    score >= 90 ? 'bg-green-100 dark:bg-green-500/20' :
    score >= 70 ? 'bg-yellow-100 dark:bg-yellow-500/20' :
    'bg-red-100 dark:bg-red-500/20';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Accessibility Audit</h1>
        <p className="text-sm text-muted-foreground">WCAG 2.1 AA compliance checker — ensure your pages are accessible to everyone</p>
      </div>

      {/* Audit controls */}
      <div className="mb-6 flex items-center gap-4">
        <select
          value={selectedLanding}
          onChange={(e) => setSelectedLanding(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a landing page</option>
          {landings.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
        <button
          onClick={runAudit}
          disabled={!selectedLanding || auditing}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {auditing ? 'Auditing...' : 'Run Audit'}
        </button>
      </div>

      {/* Audit result */}
      {audit && (
        <div className="mb-6 space-y-4">
          {/* Score card */}
          <div className="flex items-center gap-6 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/50">
            <div className={`flex h-24 w-24 items-center justify-center rounded-full ${scoreBg(audit.score)}`}>
              <span className={`text-3xl font-bold ${scoreColor(audit.score)}`}>{audit.score}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-card-foreground">Accessibility Score</h2>
              <div className="mt-2 flex gap-4 text-sm">
                <span className="text-red-600 dark:text-red-400">{audit.summary.errors} errors</span>
                <span className="text-yellow-600 dark:text-yellow-400">{audit.summary.warnings} warnings</span>
                <span className="text-blue-600 dark:text-blue-400">{audit.summary.info} info</span>
                <span className="text-green-600 dark:text-green-400">{audit.summary.passed}/{audit.summary.total} rules passed</span>
              </div>
            </div>
          </div>

          {/* Issues list */}
          {audit.issues.length > 0 && (
            <div className="rounded-xl bg-card shadow-sm ring-1 ring-border/50">
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-lg font-semibold text-card-foreground">Issues Found</h2>
              </div>
              <div className="divide-y divide-border/50">
                {audit.issues.map((issue) => (
                  <div key={issue.id} className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                        issue.type === 'error' ? 'bg-red-500' : issue.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}>
                        {issue.type === 'error' ? '!' : issue.type === 'warning' ? '?' : 'i'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{issue.message}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">Rule: {issue.rule} {issue.sectionType && `| Section: ${issue.sectionType}`}</p>
                        {issue.suggestion && (
                          <p className="mt-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                            Fix: {issue.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Audit history */}
      {history.length > 0 && (
        <div className="rounded-xl bg-card shadow-sm ring-1 ring-border/50">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-card-foreground">Audit History</h2>
          </div>
          <div className="divide-y divide-border/50">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <span className="font-medium text-card-foreground">{h.landing?.name || 'Unknown'}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{new Date(h.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${scoreBg(h.score)} ${scoreColor(h.score)}`}>
                  {h.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
