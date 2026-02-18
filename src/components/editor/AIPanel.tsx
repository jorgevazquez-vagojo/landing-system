'use client';

import { useState } from 'react';
import { useEditorStore } from '@/stores/editor-store';

const GENERATE_TYPES = [
  { id: 'headline', label: 'Headline', description: 'Generate a compelling headline' },
  { id: 'description', label: 'Description', description: 'Generate a persuasive description' },
  { id: 'cta', label: 'CTA Button', description: 'Generate a high-converting CTA' },
  { id: 'full_section', label: 'Full Section', description: 'Generate complete section content' },
] as const;

const PROVIDERS = [
  { id: 'openai', label: 'OpenAI (GPT-4o)' },
  { id: 'anthropic', label: 'Anthropic (Claude)' },
  { id: 'google', label: 'Google (Gemini)' },
] as const;

const TONES = ['Professional', 'Casual', 'Urgent', 'Friendly', 'Bold', 'Minimalist'];

export function AIPanel() {
  const { sections, selectedSectionId, updateSectionProps } = useEditorStore();
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<string>('headline');
  const [provider, setProvider] = useState<string>('openai');
  const [tone, setTone] = useState('Professional');
  const [industry, setIndustry] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          type,
          provider,
          context: {
            tone,
            industry: industry || undefined,
            existingContent: selectedSection ? JSON.stringify(selectedSection.props) : undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate');
    } finally {
      setLoading(false);
    }
  }

  function applyResult() {
    if (!selectedSectionId || !result) return;

    if (type === 'headline') {
      updateSectionProps(selectedSectionId, { title: result });
    } else if (type === 'description') {
      updateSectionProps(selectedSectionId, { subtitle: result });
    } else if (type === 'cta') {
      updateSectionProps(selectedSectionId, { ctaText: result });
    } else if (type === 'full_section') {
      try {
        const parsed = JSON.parse(result);
        updateSectionProps(selectedSectionId, parsed);
      } catch {
        updateSectionProps(selectedSectionId, { title: result });
      }
    }
    setResult('');
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto border-l border-gray-200 bg-white p-4" style={{ width: 320 }}>
      <div className="mb-4 flex items-center gap-2">
        <svg className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">AI Copywriter</h2>
      </div>

      {/* Provider */}
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-600">AI Provider</label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
        >
          {PROVIDERS.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Generate type */}
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-600">Generate</label>
        <div className="grid grid-cols-2 gap-1">
          {GENERATE_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                type === t.id ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-600">Tone</label>
        <div className="flex flex-wrap gap-1">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                tone === t ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Industry */}
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-600">Industry (optional)</label>
        <input
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="e.g., SaaS, E-commerce, Real Estate"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
        />
      </div>

      {/* Prompt */}
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-600">Describe what you want</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A headline for a fitness app targeting millennials"
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
        />
      </div>

      <button
        onClick={generate}
        disabled={loading || !prompt.trim()}
        className="mb-4 w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate with AI'}
      </button>

      {error && (
        <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {result && (
        <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-3">
          <p className="mb-2 text-xs font-medium text-purple-600">Generated content:</p>
          <p className="whitespace-pre-wrap text-sm text-gray-800">{result}</p>
          <div className="mt-3 flex gap-2">
            {selectedSectionId && (
              <button
                onClick={applyResult}
                className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
              >
                Apply to section
              </button>
            )}
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              Copy
            </button>
            <button
              onClick={generate}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
