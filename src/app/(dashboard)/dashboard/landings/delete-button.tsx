'use client';

import { useRouter } from 'next/navigation';

export function DeleteLandingButton({ landingId, landingName }: { landingId: string; landingName: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${landingName}"? This cannot be undone.`)) return;

    const res = await fetch(`/api/landings/${landingId}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="ml-auto rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}
