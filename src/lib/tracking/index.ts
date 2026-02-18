export interface ClickEvent {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  target: string;
  timestamp: number;
}

export interface ScrollEvent {
  depth: number;
  maxDepth: number;
  timestamp: number;
}

export interface TrackingConfig {
  landingId: string;
  sessionId?: string;
  visitorId: string;
  batchSize?: number;
  flushInterval?: number;
}

let eventBuffer: Array<{ type: string; data: Record<string, unknown> }> = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let config: TrackingConfig | null = null;

export function initTracking(cfg: TrackingConfig): void {
  config = cfg;
  eventBuffer = [];
  if (flushTimer) clearInterval(flushTimer);
  flushTimer = setInterval(flushEvents, cfg.flushInterval || 5000);
}

export function trackClick(e: MouseEvent): void {
  if (!config) return;
  const target = e.target as HTMLElement;
  const rect = document.documentElement.getBoundingClientRect();
  eventBuffer.push({
    type: 'click',
    data: {
      x: e.clientX,
      y: e.clientY + window.scrollY,
      normalizedX: +(e.clientX / window.innerWidth).toFixed(4),
      normalizedY: +((e.clientY + window.scrollY) / document.documentElement.scrollHeight).toFixed(4),
      target: target.tagName.toLowerCase() + (target.className ? `.${target.className.split(' ')[0]}` : ''),
      viewportWidth: rect.width,
      timestamp: Date.now(),
    },
  });
  maybeFlush();
}

let maxScroll = 0;
export function trackScroll(): void {
  if (!config) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

  if (depth > maxScroll) {
    maxScroll = depth;
    eventBuffer.push({
      type: 'scroll',
      data: { depth, maxDepth: maxScroll, timestamp: Date.now() },
    });
    maybeFlush();
  }
}

export function trackPageView(): void {
  if (!config) return;
  eventBuffer.push({
    type: 'pageview',
    data: {
      url: window.location.href,
      referrer: document.referrer,
      timestamp: Date.now(),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      userAgent: navigator.userAgent,
    },
  });
  flushEvents();
}

function maybeFlush(): void {
  const batchSize = config?.batchSize || 20;
  if (eventBuffer.length >= batchSize) flushEvents();
}

async function flushEvents(): Promise<void> {
  if (!config || eventBuffer.length === 0) return;
  const events = [...eventBuffer];
  eventBuffer = [];

  try {
    await fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        landingId: config.landingId,
        visitorId: config.visitorId,
        sessionId: config.sessionId,
        events,
      }),
      keepalive: true,
    });
  } catch {
    // Re-add events on failure
    eventBuffer.unshift(...events);
  }
}

export function destroyTracking(): void {
  if (flushTimer) clearInterval(flushTimer);
  flushEvents();
  config = null;
  maxScroll = 0;
}
