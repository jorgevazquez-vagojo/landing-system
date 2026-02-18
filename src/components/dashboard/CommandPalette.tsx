'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: string;
  action: () => void;
  category: 'navigate' | 'action' | 'landing' | 'template';
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [landings, setLandings] = useState<Array<{ id: string; name: string; slug: string; status: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load landings for search
  useEffect(() => {
    if (!open) return;
    fetch('/api/landings')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setLandings(data); })
      .catch(() => {});
  }, [open]);

  const navigationCommands: Command[] = [
    { id: 'nav-dash', label: 'Go to Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1', action: () => router.push('/dashboard'), category: 'navigate', keywords: ['home'] },
    { id: 'nav-landings', label: 'Go to Landings', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', action: () => router.push('/dashboard/landings'), category: 'navigate', keywords: ['pages'] },
    { id: 'nav-templates', label: 'Go to Templates', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z', action: () => router.push('/dashboard/templates'), category: 'navigate' },
    { id: 'nav-leads', label: 'Go to Leads', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', action: () => router.push('/dashboard/leads'), category: 'navigate', keywords: ['contacts', 'submissions'] },
    { id: 'nav-experiments', label: 'Go to A/B Testing', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', action: () => router.push('/dashboard/experiments'), category: 'navigate', keywords: ['split test', 'ab'] },
    { id: 'nav-popups', label: 'Go to Popups', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', action: () => router.push('/dashboard/popups'), category: 'navigate' },
    { id: 'nav-heatmaps', label: 'Go to Heatmaps', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', action: () => router.push('/dashboard/heatmaps'), category: 'navigate', keywords: ['analytics', 'tracking'] },
    { id: 'nav-accessibility', label: 'Go to Accessibility', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', action: () => router.push('/dashboard/accessibility'), category: 'navigate', keywords: ['wcag', 'a11y'] },
    { id: 'nav-seo', label: 'Go to SEO', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', action: () => router.push('/dashboard/seo'), category: 'navigate', keywords: ['search engine'] },
    { id: 'nav-settings', label: 'Go to Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', action: () => router.push('/dashboard/settings'), category: 'navigate' },
  ];

  const actionCommands: Command[] = [
    { id: 'act-new-landing', label: 'Create New Landing', icon: 'M12 4v16m8-8H4', action: () => router.push('/dashboard/landings/new'), category: 'action', keywords: ['new page'] },
    { id: 'act-new-experiment', label: 'Create New Experiment', icon: 'M12 4v16m8-8H4', action: () => router.push('/dashboard/experiments'), category: 'action', keywords: ['new test', 'ab test'] },
  ];

  const landingCommands: Command[] = landings.map((l) => ({
    id: `landing-${l.id}`,
    label: l.name,
    description: `/${l.slug} · ${l.status.toLowerCase()}`,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    action: () => router.push(`/editor/${l.id}`),
    category: 'landing' as const,
    keywords: [l.slug],
  }));

  const allCommands = [...actionCommands, ...navigationCommands, ...landingCommands];

  const filteredCommands = query.trim()
    ? allCommands.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(q) ||
          cmd.description?.toLowerCase().includes(q) ||
          cmd.keywords?.some((k) => k.includes(q))
        );
      })
    : allCommands.slice(0, 15);

  // Keyboard shortcut to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation
  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setOpen(false);
      }
    }
  }, [filteredCommands, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  const groupedCommands: Record<string, Command[]> = {};
  for (const cmd of filteredCommands) {
    const group = cmd.category === 'action' ? 'Actions' :
                  cmd.category === 'navigate' ? 'Navigation' :
                  cmd.category === 'landing' ? 'Landings' : 'Templates';
    if (!groupedCommands[group]) groupedCommands[group] = [];
    groupedCommands[group].push(cmd);
  }

  let globalIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700">
          <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search commands, pages, landings..."
            className="w-full border-0 bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
          />
          <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 sm:block dark:border-gray-700">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">No results found</div>
          ) : (
            Object.entries(groupedCommands).map(([group, commands]) => (
              <div key={group}>
                <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {group}
                </div>
                {commands.map((cmd) => {
                  globalIndex++;
                  const index = globalIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${
                        selectedIndex === index
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <svg className="h-4 w-4 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={cmd.icon} />
                      </svg>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">{cmd.label}</div>
                        {cmd.description && <div className="truncate text-xs opacity-60">{cmd.description}</div>}
                      </div>
                      {selectedIndex === index && (
                        <kbd className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 dark:border-gray-700">
                          ↵
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-gray-200 px-4 py-2 dark:border-gray-700">
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <kbd className="rounded border border-gray-200 px-1 py-0.5 text-[10px] dark:border-gray-700">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <kbd className="rounded border border-gray-200 px-1 py-0.5 text-[10px] dark:border-gray-700">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <kbd className="rounded border border-gray-200 px-1 py-0.5 text-[10px] dark:border-gray-700">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
