'use client';

import { useEffect, useState, useCallback } from 'react';
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

interface Landing {
  id: string;
  name: string;
  slug: string;
  status: string;
}

interface VariantInput {
  name: string;
  slug: string;
  weight: number;
  isControl: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadExperiments = useCallback(() => {
    fetch('/api/experiments')
      .then((r) => r.json())
      .then((data) => {
        setExperiments(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadExperiments();
  }, [loadExperiments]);

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

  async function deleteExperiment(id: string) {
    await fetch(`/api/experiments/${id}`, { method: 'DELETE' });
    setExperiments((prev) => prev.filter((e) => e.id !== id));
  }

  if (loading) return <div className="p-6 text-muted-foreground">Loading experiments...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">A/B Testing</h1>
          <p className="text-sm text-muted-foreground">Run experiments to optimize conversion rates</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          + New Experiment
        </button>
      </div>

      {experiments.length === 0 ? (
        <div className="rounded-xl bg-card py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/20">
            <svg className="h-8 w-8 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-card-foreground">No experiments yet</h3>
          <p className="mt-1 text-muted-foreground">Create your first A/B test to start optimizing</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create Experiment
          </button>
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
                  <>
                    <button onClick={() => updateStatus(exp.id, 'RUNNING')} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                      Start
                    </button>
                    <button onClick={() => deleteExperiment(exp.id)} className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700">
                      Delete
                    </button>
                  </>
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

      {showModal && (
        <CreateExperimentModal
          onClose={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false);
            loadExperiments();
          }}
        />
      )}
    </div>
  );
}

function CreateExperimentModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [landings, setLandings] = useState<Landing[]>([]);
  const [loadingLandings, setLoadingLandings] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [landingId, setLandingId] = useState('');
  const [variants, setVariants] = useState<VariantInput[]>([
    { name: 'Control', slug: 'control', weight: 50, isControl: true },
    { name: 'Variant B', slug: 'variant-b', weight: 50, isControl: false },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/landings')
      .then((r) => r.json())
      .then((data) => {
        setLandings(Array.isArray(data) ? data : []);
        setLoadingLandings(false);
      });
  }, []);

  function addVariant() {
    const letter = String.fromCharCode(67 + variants.length - 1); // C, D, E...
    setVariants([...variants, {
      name: `Variant ${letter}`,
      slug: `variant-${letter.toLowerCase()}`,
      weight: 0,
      isControl: false,
    }]);
  }

  function removeVariant(index: number) {
    if (variants.length <= 2) return;
    setVariants(variants.filter((_, i) => i !== index));
  }

  function updateVariant(index: number, updates: Partial<VariantInput>) {
    setVariants(variants.map((v, i) => {
      if (i !== index) return updates.isControl ? { ...v, isControl: false } : v;
      const updated = { ...v, ...updates };
      if (updates.name && !variants[index].slug.includes('-edited')) {
        updated.slug = slugify(updates.name);
      }
      return updated;
    }));
  }

  function distributeEvenly() {
    const w = Math.floor(100 / variants.length);
    const remainder = 100 - w * variants.length;
    setVariants(variants.map((v, i) => ({
      ...v,
      weight: w + (i === 0 ? remainder : 0),
    })));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim()) { setError('Experiment name is required'); return; }
    if (!landingId) { setError('Select a landing page'); return; }

    const totalWeight = variants.reduce((s, v) => s + v.weight, 0);
    if (totalWeight !== 100) { setError(`Weights must sum to 100 (currently ${totalWeight})`); return; }
    if (!variants.some((v) => v.isControl)) { setError('One variant must be marked as Control'); return; }

    setSaving(true);
    const res = await fetch('/api/experiments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        description: description.trim() || undefined,
        landingId,
        variants: variants.map((v) => ({
          name: v.name,
          slug: v.slug,
          weight: v.weight,
          isControl: v.isControl,
          sections: [],
        })),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error?.toString() || 'Failed to create experiment');
      setSaving(false);
      return;
    }

    onCreated();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card shadow-2xl ring-1 ring-border">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">New Experiment</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-6 py-4">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Landing selector */}
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Landing Page</label>
              {loadingLandings ? (
                <div className="text-sm text-muted-foreground">Loading landings...</div>
              ) : (
                <select
                  value={landingId}
                  onChange={(e) => setLandingId(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="">Select a landing page...</option>
                  {landings.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.status.toLowerCase()})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Experiment Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Homepage Hero Test"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Description <span className="text-muted-foreground">(optional)</span></label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What are you testing?"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Variants */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-card-foreground">Variants</label>
                <div className="flex gap-2">
                  <button type="button" onClick={distributeEvenly} className="text-xs text-primary hover:underline">
                    Distribute evenly
                  </button>
                  {variants.length < 5 && (
                    <button type="button" onClick={addVariant} className="text-xs text-primary hover:underline">
                      + Add variant
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {variants.map((v, i) => (
                  <div key={i} className={`rounded-lg border p-3 ${v.isControl ? 'border-blue-200 bg-blue-50/30 dark:border-blue-500/30 dark:bg-blue-500/5' : 'border-border'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => updateVariant(i, { name: e.target.value })}
                        className="flex-1 rounded border border-border bg-background px-2 py-1 text-sm text-foreground"
                      />
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={v.weight}
                          onChange={(e) => updateVariant(i, { weight: parseInt(e.target.value) || 0 })}
                          className="w-16 rounded border border-border bg-background px-2 py-1 text-center text-sm text-foreground"
                        />
                        <span className="text-xs text-muted-foreground">%</span>
                      </div>
                      <label className="flex items-center gap-1 text-xs text-muted-foreground">
                        <input
                          type="radio"
                          name="control"
                          checked={v.isControl}
                          onChange={() => updateVariant(i, { isControl: true })}
                          className="text-primary"
                        />
                        Control
                      </label>
                      {variants.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(i)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Weight total indicator */}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-full rounded-full transition-all ${
                      variants.reduce((s, v) => s + v.weight, 0) === 100 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(variants.reduce((s, v) => s + v.weight, 0), 100)}%` }}
                  />
                </div>
                <span className={`text-xs font-medium ${
                  variants.reduce((s, v) => s + v.weight, 0) === 100 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {variants.reduce((s, v) => s + v.weight, 0)}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              {saving ? 'Creating...' : 'Create Experiment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
