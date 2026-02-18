import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/presence
 *
 * Lightweight presence system using in-memory store.
 * Receives heartbeats and returns active collaborators for a landing.
 */

interface PresenceEntry {
  userId: string;
  name: string;
  email: string;
  landingId: string;
  lastSeen: number;
}

// In-memory presence store (per-process; for production, use Redis)
const presenceStore = new Map<string, PresenceEntry>();

// Clean entries older than 30 seconds
function cleanStale() {
  const threshold = Date.now() - 30000;
  for (const [key, entry] of presenceStore) {
    if (entry.lastSeen < threshold) {
      presenceStore.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { landingId, userId, name, email } = body;

  if (!landingId || !userId) {
    return NextResponse.json({ error: 'landingId and userId required' }, { status: 400 });
  }

  // Update presence
  const key = `${landingId}:${userId}`;
  presenceStore.set(key, { userId, name, email, landingId, lastSeen: Date.now() });

  // Clean stale entries
  cleanStale();

  // Return active collaborators for this landing
  const collaborators: Array<{ id: string; name: string; email: string; lastActive: number }> = [];
  for (const entry of presenceStore.values()) {
    if (entry.landingId === landingId) {
      collaborators.push({
        id: entry.userId,
        name: entry.name,
        email: entry.email,
        lastActive: entry.lastSeen,
      });
    }
  }

  return NextResponse.json({ collaborators });
}
