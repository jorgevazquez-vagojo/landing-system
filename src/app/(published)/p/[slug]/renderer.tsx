'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
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

interface ExperimentVariant {
  id: string;
  slug: string;
  name: string;
  weight: number;
  isControl: boolean;
  sections: unknown[];
}

interface ExperimentData {
  id: string;
  variants: ExperimentVariant[];
}

interface ActiveAssignment {
  experimentId: string;
  variantId: string;
}

function getVisitorId(): string {
  let id = document.cookie.match(/ls_visitor=([^;]+)/)?.[1];
  if (!id) {
    id = crypto.randomUUID();
    document.cookie = `ls_visitor=${id};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  }
  return id;
}

/** Get stored experiment assignments from cookie */
function getStoredAssignments(): Record<string, string> {
  const raw = document.cookie.match(/ls_ab=([^;]+)/)?.[1];
  if (!raw) return {};
  try { return JSON.parse(decodeURIComponent(raw)); } catch { return {}; }
}

/** Store experiment assignments in cookie */
function storeAssignments(assignments: Record<string, string>) {
  const value = encodeURIComponent(JSON.stringify(assignments));
  document.cookie = `ls_ab=${value};path=/;max-age=${30 * 24 * 60 * 60};SameSite=Lax`;
}

/** Weighted random variant selection */
function weightedRandom(variants: ExperimentVariant[]): ExperimentVariant {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;
  for (const v of variants) {
    random -= v.weight;
    if (random <= 0) return v;
  }
  return variants[variants.length - 1];
}

function TrackingScript({ landingId }: { landingId: string }) {
  useEffect(() => {
    const visitorId = getVisitorId();
    let sessionId: string | undefined;
    let maxScrollDepth = 0;
    const eventBuffer: Array<{ type: string; data: Record<string, unknown> }> = [];

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

/** Track A/B experiment view event */
function ExperimentTracker({ assignments }: { assignments: ActiveAssignment[] }) {
  useEffect(() => {
    if (assignments.length === 0) return;
    const visitorId = getVisitorId();

    // Fire view events for each experiment assignment
    for (const a of assignments) {
      fetch(`/api/experiments/${a.experimentId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'view',
          visitorId,
          variantId: a.variantId,
        }),
        keepalive: true,
      }).catch(() => { /* ignore tracking failures */ });
    }
  }, [assignments]);

  return null;
}

export function LandingRenderer({
  sections,
  landingId,
  dtrDefaults,
  experiments = [],
}: {
  sections: Section[];
  landingId: string;
  dtrDefaults?: DTRDefaults;
  experiments?: ExperimentData[];
}) {
  const [urlParams, setUrlParams] = useState<Record<string, string>>({});
  const [abSections, setAbSections] = useState<Section[] | null>(null);
  const [abAssignments, setAbAssignments] = useState<ActiveAssignment[]>([]);

  useEffect(() => {
    setUrlParams(getUrlParams());
  }, []);

  // A/B testing: assign variants client-side (cookie-sticky)
  const assignVariants = useCallback(() => {
    if (experiments.length === 0) return;

    const stored = getStoredAssignments();
    const newAssignments: ActiveAssignment[] = [];
    let variantSections: Section[] | null = null;

    for (const exp of experiments) {
      if (exp.variants.length === 0) continue;

      // Check for stored assignment
      let assignedVariant = stored[exp.id]
        ? exp.variants.find((v) => v.id === stored[exp.id])
        : undefined;

      // New assignment via weighted random
      if (!assignedVariant) {
        assignedVariant = weightedRandom(exp.variants);
        stored[exp.id] = assignedVariant.id;
      }

      newAssignments.push({
        experimentId: exp.id,
        variantId: assignedVariant.id,
      });

      // If variant has sections, use them instead of default
      if (!assignedVariant.isControl && Array.isArray(assignedVariant.sections) && assignedVariant.sections.length > 0) {
        variantSections = assignedVariant.sections as Section[];
      }
    }

    storeAssignments(stored);
    setAbAssignments(newAssignments);
    if (variantSections) setAbSections(variantSections);
  }, [experiments]);

  useEffect(() => {
    assignVariants();
  }, [assignVariants]);

  // Use variant sections if assigned, otherwise default sections
  const activeSections = abSections || sections;

  // Apply DTR (Dynamic Text Replacement)
  const processedSections = useMemo(() => {
    if (Object.keys(urlParams).length === 0 && !dtrDefaults) return activeSections;
    return activeSections.map((section) => ({
      ...section,
      props: replaceSectionProps(section.props, urlParams, dtrDefaults),
    }));
  }, [activeSections, urlParams, dtrDefaults]);

  return (
    <div data-landing-id={landingId}>
      <TrackingScript landingId={landingId} />
      <ExperimentTracker assignments={abAssignments} />
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
