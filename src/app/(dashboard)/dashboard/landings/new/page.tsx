'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewLandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await fetch('/api/landings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        description: formData.get('description'),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to create landing');
      setLoading(false);
      return;
    }

    const landing = await res.json();
    router.push(`/editor/${landing.id}`);
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <Link href="/dashboard/landings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to landings
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-foreground">New Landing Page</h1>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/50">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-card-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-shadow"
            placeholder="My Landing Page"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-card-foreground">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-shadow"
            placeholder="What is this landing page for?"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create & Edit'}
          </button>
          <Link
            href="/dashboard/landings"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
