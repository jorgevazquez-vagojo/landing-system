'use client';

import { useEffect, useState, useMemo } from 'react';
import { componentMap } from '@/components/landing';
import { PopupRenderer } from '@/components/landing/PopupRenderer';
import { getUrlParams, replaceSectionProps } from '@/lib/dynamic-text';

interface Section {
  id: string;
  type: string;
  variant?: string;
  props: Record<string, unknown>;
  order: number;
}

interface DTRDefaults {
  [key: string]: string;
}

function getVisitorId(): string {
  let id = document.cookie.match(/ls_visitor=([^;]+)/)?.[1];
  if (!id) {
    id = crypto.randomUUID();
    document.cookie = `ls_visitor=${id};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  }
  return id;
}

function TrackingScript({ landingId }: { landingId: string }) {
  useEffect(() => {
    const visitorId = getVisitorId();
    let sessionId: string | undefined;
    let maxScrollDepth = 0;
    const eventBuffer: Array<{ type: string; data: Record<string, unknown> }> = [];

    // Track page view
    eventBuffer.push({
      type: 'pageview',
      data: {
        url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      },
    });

    // Click tracking
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      eventBuffer.push({
        type: 'click',
        data: {
          x: e.clientX,
          y: e.clientY + window.scrollY,
          normalizedX: +(e.clientX / window.innerWidth).toFixed(4),
          normalizedY: +((e.clientY + window.scrollY) / document.documentElement.scrollHeight).toFixed(4),
          target: target.tagName.toLowerCase() + (target.className ? `.${String(target.className).split(' ')[0]}` : ''),
          timestamp: Date.now(),
        },
      });
      if (eventBuffer.length >= 20) flush();
    }

    // Scroll tracking
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      if (depth > maxScrollDepth) {
        maxScrollDepth = depth;
        eventBuffer.push({
          type: 'scroll',
          data: { depth, maxDepth: maxScrollDepth, timestamp: Date.now() },
        });
      }
    }

    async function flush() {
      if (eventBuffer.length === 0) return;
      const events = eventBuffer.splice(0, eventBuffer.length);
      try {
        const res = await fetch('/api/tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ landingId, visitorId, sessionId, events }),
          keepalive: true,
        });
        const data = await res.json();
        if (data.sessionId) sessionId = data.sessionId;
      } catch {
        eventBuffer.unshift(...events);
      }
    }

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const interval = setInterval(flush, 5000);

    // Initial flush
    flush();

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      flush();
    };
  }, [landingId]);

  return null;
}

export function LandingRenderer({
  sections,
  landingId,
  dtrDefaults,
}: {
  sections: Section[];
  landingId: string;
  dtrDefaults?: DTRDefaults;
}) {
  const [urlParams, setUrlParams] = useState<Record<string, string>>({});

  useEffect(() => {
    setUrlParams(getUrlParams());
  }, []);

  // Apply DTR (Dynamic Text Replacement)
  const processedSections = useMemo(() => {
    if (Object.keys(urlParams).length === 0 && !dtrDefaults) return sections;
    return sections.map((section) => ({
      ...section,
      props: replaceSectionProps(section.props, urlParams, dtrDefaults),
    }));
  }, [sections, urlParams, dtrDefaults]);

  return (
    <div data-landing-id={landingId}>
      <TrackingScript landingId={landingId} />
      {processedSections
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          const Component = componentMap[section.type];
          if (!Component) return null;
          return (
            <Component
              key={section.id}
              {...section.props}
              variant={section.variant}
            />
          );
        })}
      <PopupRenderer landingId={landingId} />
    </div>
  );
}
