'use client';

import { useEffect, useState, useCallback } from 'react';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  color: string;
  lastActive: number;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];

function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

export function CollaborationBar({ landingId }: { landingId: string }) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | null>(null);

  // Load current user session
  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((session) => {
        if (session?.user) {
          setCurrentUser({
            id: session.user.id || session.user.email,
            name: session.user.name || 'Anonymous',
            email: session.user.email || '',
          });
        }
      })
      .catch(() => {});
  }, []);

  // Presence heartbeat
  const sendHeartbeat = useCallback(async () => {
    if (!currentUser) return;
    try {
      const res = await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landingId,
          userId: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.collaborators) {
          setCollaborators(
            data.collaborators
              .filter((c: Collaborator) => c.id !== currentUser.id)
              .map((c: Collaborator, i: number) => ({ ...c, color: COLORS[i % COLORS.length] }))
          );
        }
      }
    } catch {
      // Presence is best-effort
    }
  }, [landingId, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 10000);
    return () => clearInterval(interval);
  }, [currentUser, sendHeartbeat]);

  if (collaborators.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      <div className="mr-1 h-4 w-px bg-gray-200" />
      <div className="flex -space-x-1.5">
        {collaborators.slice(0, 5).map((c) => (
          <div
            key={c.id}
            title={`${c.name} is editing`}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
            style={{ backgroundColor: c.color }}
          >
            {getInitials(c.name)}
          </div>
        ))}
        {collaborators.length > 5 && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-400 text-[10px] font-bold text-white">
            +{collaborators.length - 5}
          </div>
        )}
      </div>
      <span className="ml-1 text-xs text-gray-500">
        {collaborators.length} editing
      </span>
    </div>
  );
}
