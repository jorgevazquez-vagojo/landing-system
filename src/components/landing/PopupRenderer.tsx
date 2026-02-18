'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { PopupConfig } from '@/lib/popups/triggers';
import { shouldShowPopup, markPopupShown } from '@/lib/popups/triggers';

function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = document.cookie.match(/ls_visitor=([^;]+)/)?.[1];
  if (!id) {
    id = crypto.randomUUID();
    document.cookie = `ls_visitor=${id};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  }
  return id;
}

export function PopupRenderer({ landingId }: { landingId: string }) {
  const [popups, setPopups] = useState<PopupConfig[]>([]);
  const [activePopup, setActivePopup] = useState<PopupConfig | null>(null);
  const triggeredRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    fetch(`/api/popups/public?landingId=${landingId}`)
      .then((r) => r.json())
      .then((data) => setPopups(data))
      .catch(() => {});
  }, [landingId]);

  const trackEvent = useCallback((popupId: string, type: string) => {
    const visitorId = getVisitorId();
    fetch('/api/popups/public', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ popupId, type, visitorId }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  const showPopup = useCallback((popup: PopupConfig) => {
    if (triggeredRef.current.has(popup.id)) return;
    if (!shouldShowPopup(popup.id, popup.targeting)) return;

    triggeredRef.current.add(popup.id);
    setActivePopup(popup);
    trackEvent(popup.id, 'impression');
    markPopupShown(popup.id, popup.targeting.frequency || 'once');
  }, [trackEvent]);

  const closePopup = useCallback(() => {
    if (activePopup) trackEvent(activePopup.id, 'close');
    setActivePopup(null);
  }, [activePopup, trackEvent]);

  // Setup triggers
  useEffect(() => {
    if (popups.length === 0) return;

    const cleanups: Array<() => void> = [];

    for (const popup of popups) {
      const triggers = popup.triggers || [];

      for (const trigger of triggers) {
        if (trigger.type === 'exit_intent') {
          const handler = (e: MouseEvent) => {
            if (e.clientY <= 0) showPopup(popup);
          };
          document.addEventListener('mouseout', handler);
          cleanups.push(() => document.removeEventListener('mouseout', handler));
        }

        if (trigger.type === 'time_delay') {
          const timer = setTimeout(() => showPopup(popup), (trigger.value || 5) * 1000);
          cleanups.push(() => clearTimeout(timer));
        }

        if (trigger.type === 'scroll_percent') {
          const handler = () => {
            const scrollPct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPct >= (trigger.value || 50)) showPopup(popup);
          };
          window.addEventListener('scroll', handler, { passive: true });
          cleanups.push(() => window.removeEventListener('scroll', handler));
        }

        if (trigger.type === 'page_load') {
          showPopup(popup);
        }
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, [popups, showPopup]);

  if (!activePopup) return null;

  const { content, style, type } = activePopup;

  if (type === 'STICKY_BAR') {
    return (
      <div
        className="fixed left-0 right-0 top-0 z-[9999] flex items-center justify-center gap-4 px-4 py-3"
        style={{ backgroundColor: style.backgroundColor || '#1e40af', color: style.textColor || '#ffffff' }}
      >
        <span className="text-sm font-medium">{content.body || content.title}</span>
        {content.ctaText && (
          <a
            href={content.ctaUrl || '#'}
            onClick={() => trackEvent(activePopup.id, 'click')}
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            style={{ backgroundColor: style.ctaColor || '#ffffff', color: style.backgroundColor || '#1e40af' }}
          >
            {content.ctaText}
          </a>
        )}
        <button onClick={closePopup} className="ml-2 text-white/80 hover:text-white">&times;</button>
      </div>
    );
  }

  const isSlideIn = type === 'SLIDE_IN';
  const isFullscreen = type === 'FULLSCREEN';
  const position = style.position || 'center';

  const slidePositions: Record<string, string> = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'center': 'bottom-4 right-4',
    'top': 'top-4 right-4',
    'bottom': 'bottom-4 right-4',
  };
  const positionClasses = isSlideIn
    ? slidePositions[position] || 'bottom-4 right-4'
    : 'inset-0 flex items-center justify-center';

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      {(style.overlay !== false || isFullscreen) && (
        <div className="absolute inset-0 bg-black/50" onClick={closePopup} />
      )}

      {/* Popup */}
      <div className={`${isSlideIn ? `fixed ${positionClasses}` : `relative ${positionClasses} h-full`}`}>
        <div
          className={`relative ${isFullscreen ? 'flex h-full w-full items-center justify-center' : ''}`}
          style={{
            maxWidth: isFullscreen ? '100%' : (style.maxWidth || '480px'),
            borderRadius: style.borderRadius || '12px',
          }}
        >
          <div
            className="relative overflow-hidden shadow-2xl"
            style={{
              backgroundColor: style.backgroundColor || '#ffffff',
              color: style.textColor || '#1f2937',
              borderRadius: style.borderRadius || '12px',
              maxWidth: style.maxWidth || '480px',
              width: '100%',
            }}
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="p-8">
              {content.image && (
                <img src={content.image} alt="" className="mb-4 w-full rounded-lg object-cover" style={{ maxHeight: 200 }} />
              )}
              {content.title && <h3 className="mb-2 text-2xl font-bold">{content.title}</h3>}
              {content.body && <p className="mb-4 text-base opacity-80">{content.body}</p>}
              {content.ctaText && (
                <a
                  href={content.ctaUrl || '#'}
                  onClick={() => trackEvent(activePopup.id, 'click')}
                  className="inline-block rounded-lg px-6 py-3 text-sm font-medium text-white"
                  style={{ backgroundColor: style.ctaColor || '#2563eb' }}
                >
                  {content.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
