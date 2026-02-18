'use client';

import { useEffect, useState } from 'react';

interface Popup {
  id: string;
  name: string;
  type: string;
  status: string;
  landing?: { name: string } | null;
  _count: { events: number };
  createdAt: string;
}

export default function PopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newPopup, setNewPopup] = useState({ name: '', type: 'MODAL' as string });

  useEffect(() => {
    loadPopups();
  }, []);

  function loadPopups() {
    fetch('/api/popups').then((r) => r.json()).then((data) => {
      setPopups(data);
      setLoading(false);
    });
  }

  async function createPopup() {
    if (!newPopup.name) return;
    await fetch('/api/popups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newPopup.name,
        type: newPopup.type,
        content: {
          title: 'Wait! Before you go...',
          body: 'Get 10% off your first order',
          ctaText: 'Claim Discount',
        },
        triggers: [{ type: 'exit_intent' }],
        targeting: { frequency: 'once' },
      }),
    });
    setShowCreate(false);
    setNewPopup({ name: '', type: 'MODAL' });
    loadPopups();
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    await fetch(`/api/popups/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    loadPopups();
  }

  async function deletePopup(id: string) {
    await fetch(`/api/popups/${id}`, { method: 'DELETE' });
    loadPopups();
  }

  if (loading) return <div className="p-6 text-muted-foreground">Loading popups...</div>;

  const typeIcons: Record<string, string> = {
    MODAL: 'M4 4h16v16H4z',
    SLIDE_IN: 'M15 3h6v18h-6',
    STICKY_BAR: 'M3 3h18v4H3z',
    FULLSCREEN: 'M3 3h18v18H3z',
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Popups & Sticky Bars</h1>
          <p className="text-sm text-muted-foreground">Create popups to capture leads and boost conversions</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
          + New Popup
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/50">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">Create Popup</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Name</label>
              <input
                value={newPopup.name}
                onChange={(e) => setNewPopup((p) => ({ ...p, name: e.target.value }))}
                placeholder="Exit intent popup"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Type</label>
              <select
                value={newPopup.type}
                onChange={(e) => setNewPopup((p) => ({ ...p, type: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="MODAL">Modal</option>
                <option value="SLIDE_IN">Slide-in</option>
                <option value="STICKY_BAR">Sticky Bar</option>
                <option value="FULLSCREEN">Fullscreen</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={createPopup} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create</button>
            <button onClick={() => setShowCreate(false)} className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80">Cancel</button>
          </div>
        </div>
      )}

      {popups.length === 0 && !showCreate ? (
        <div className="rounded-xl bg-card py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20">
            <svg className="h-8 w-8 text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-card-foreground">No popups yet</h3>
          <p className="mt-1 text-muted-foreground">Create exit-intent popups, slide-ins, and sticky bars</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popups.map((popup) => (
            <div key={popup.id} className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/50">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={typeIcons[popup.type] || typeIcons.MODAL} />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{popup.name}</h3>
                    <p className="text-xs text-muted-foreground">{popup.type}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  popup.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                  popup.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                }`}>
                  {popup.status}
                </span>
              </div>
              {popup.landing && <p className="mb-2 text-xs text-muted-foreground">Landing: {popup.landing.name}</p>}
              <p className="mb-4 text-sm text-muted-foreground">{popup._count.events} events</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(popup.id, popup.status)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                    popup.status === 'ACTIVE' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {popup.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                </button>
                <button onClick={() => deletePopup(popup.id)} className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
