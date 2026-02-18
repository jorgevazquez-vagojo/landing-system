'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface HeatmapPoint {
  data: { normalizedX: number; normalizedY: number; x?: number; y?: number };
}

export default function HeatmapsPage() {
  const [landings, setLandings] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [selectedLanding, setSelectedLanding] = useState('');
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([]);
  const [scrollData, setScrollData] = useState<Array<{ data: { depth: number } }>>([]);
  const [viewType, setViewType] = useState<'clicks' | 'scroll'>('clicks');
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<{ total: number; avgDuration: number; avgScrollDepth: number }>({
    total: 0, avgDuration: 0, avgScrollDepth: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetch('/api/landings').then((r) => r.json()).then((data) => {
      setLandings(data);
      setLoading(false);
    });
  }, []);

  const loadData = useCallback(async (landingId: string) => {
    setSelectedLanding(landingId);
    const [clicks, scrolls] = await Promise.all([
      fetch(`/api/tracking?landingId=${landingId}&type=click`).then((r) => r.json()),
      fetch(`/api/tracking?landingId=${landingId}&type=scroll`).then((r) => r.json()),
    ]);
    setHeatmapData(clicks);
    setScrollData(scrolls);

    // Simple session stats from data
    const uniqueVisitors = new Set(clicks.map((c: Record<string, unknown>) => (c as Record<string, unknown>).visitorId)).size;
    const avgDepth = scrolls.length > 0
      ? Math.round(scrolls.reduce((sum: number, s: { data: { depth: number } }) => sum + (s.data?.depth || 0), 0) / scrolls.length)
      : 0;
    setSessions({ total: uniqueVisitors, avgDuration: 0, avgScrollDepth: avgDepth });
  }, []);

  const drawHeatmap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || heatmapData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 800;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (viewType === 'clicks') {
      // Draw click heatmap
      for (const point of heatmapData) {
        const x = (point.data.normalizedX || 0) * canvas.width;
        const y = (point.data.normalizedY || 0) * canvas.height;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Draw scroll depth
      const depthBuckets: Record<number, number> = {};
      for (const s of scrollData) {
        const bucket = Math.floor((s.data?.depth || 0) / 10) * 10;
        depthBuckets[bucket] = (depthBuckets[bucket] || 0) + 1;
      }

      const maxCount = Math.max(...Object.values(depthBuckets), 1);
      for (let pct = 0; pct <= 100; pct += 10) {
        const count = depthBuckets[pct] || 0;
        const intensity = count / maxCount;
        const y = (pct / 100) * canvas.height;
        const height = canvas.height / 10;

        const r = Math.round(34 + intensity * 221);
        const g = Math.round(197 - intensity * 197);
        const b = Math.round(94 - intensity * 94);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + intensity * 0.5})`;
        ctx.fillRect(0, y, canvas.width, height);

        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.fillText(`${pct}% — ${count} visitors`, 10, y + height / 2 + 4);
      }
    }
  }, [heatmapData, scrollData, viewType]);

  useEffect(() => {
    drawHeatmap();
  }, [drawHeatmap]);

  if (loading) return <div className="p-6 text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Heatmaps & Analytics</h1>
        <p className="text-sm text-muted-foreground">Understand how visitors interact with your landing pages</p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <select
          value={selectedLanding}
          onChange={(e) => loadData(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a landing page</option>
          {landings.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
        <div className="flex rounded-lg border border-border">
          <button
            onClick={() => setViewType('clicks')}
            className={`px-4 py-2 text-sm font-medium ${viewType === 'clicks' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Click Map
          </button>
          <button
            onClick={() => setViewType('scroll')}
            className={`px-4 py-2 text-sm font-medium ${viewType === 'scroll' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Scroll Depth
          </button>
        </div>
      </div>

      {/* Stats */}
      {selectedLanding && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/50">
            <p className="text-sm text-muted-foreground">Unique Visitors</p>
            <p className="mt-1 text-2xl font-bold text-card-foreground">{sessions.total}</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/50">
            <p className="text-sm text-muted-foreground">Click Events</p>
            <p className="mt-1 text-2xl font-bold text-card-foreground">{heatmapData.length}</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/50">
            <p className="text-sm text-muted-foreground">Avg. Scroll Depth</p>
            <p className="mt-1 text-2xl font-bold text-card-foreground">{sessions.avgScrollDepth}%</p>
          </div>
        </div>
      )}

      {/* Heatmap canvas */}
      {selectedLanding ? (
        <div className="flex justify-center rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/50">
          {heatmapData.length === 0 && scrollData.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <p className="text-lg font-medium">No data yet</p>
              <p className="mt-1 text-sm">Publish your landing page and wait for visitors</p>
            </div>
          ) : (
            <canvas ref={canvasRef} className="rounded-lg border border-border shadow-sm" style={{ maxWidth: 600 }} />
          )}
        </div>
      ) : (
        <div className="rounded-xl bg-card py-20 text-center shadow-sm ring-1 ring-border/50">
          <p className="text-muted-foreground">Select a landing page to view heatmap data</p>
        </div>
      )}
    </div>
  );
}
