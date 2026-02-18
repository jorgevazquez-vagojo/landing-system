'use client';

import Link from 'next/link';
import { useEditorStore, type ViewMode } from '@/stores/editor-store';

type RightPanel = 'properties' | 'ai';

interface TopToolbarProps {
  onSave: () => void;
  onPublish: () => void;
  rightPanel?: RightPanel;
  onToggleRightPanel?: (panel: RightPanel) => void;
}

export function TopToolbar({ onSave, onPublish, rightPanel = 'properties', onToggleRightPanel }: TopToolbarProps) {
  const { landingName, isDirty, isSaving, isPreviewing, viewMode, setViewMode, setIsPreviewing } = useEditorStore();
  const { undo, redo, pastStates, futureStates } = useEditorStore.temporal.getState();

  const viewModes: { mode: ViewMode; icon: string; label: string }[] = [
    { mode: 'desktop', icon: 'M4 6h16v10H4V6zm2 12h12', label: 'Desktop' },
    { mode: 'tablet', icon: 'M6 4h12v16H6V4z', label: 'Tablet' },
    { mode: 'mobile', icon: 'M8 3h8v18H8V3z', label: 'Mobile' },
  ];

  return (
    <div className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      {/* Left: Back + name */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/landings" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="font-semibold text-gray-900">{landingName}</span>
        {isDirty && <span className="h-2 w-2 rounded-full bg-orange-400" title="Unsaved changes" />}
      </div>

      {/* Center: View mode + preview + panel toggle */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-gray-200 p-0.5">
          {viewModes.map((vm) => (
            <button
              key={vm.mode}
              onClick={() => setViewMode(vm.mode)}
              className={`rounded-md px-2.5 py-1.5 ${viewMode === vm.mode ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title={vm.label}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={vm.icon} />
              </svg>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsPreviewing(!isPreviewing)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${isPreviewing ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {isPreviewing ? 'Edit' : 'Preview'}
        </button>

        <div className="mx-1 h-6 w-px bg-gray-200" />

        {/* Right panel toggle */}
        {onToggleRightPanel && !isPreviewing && (
          <div className="flex items-center rounded-lg border border-gray-200 p-0.5">
            <button
              onClick={() => onToggleRightPanel('properties')}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${rightPanel === 'properties' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Properties"
            >
              Props
            </button>
            <button
              onClick={() => onToggleRightPanel('ai')}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${rightPanel === 'ai' ? 'bg-purple-50 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="AI Copywriter"
            >
              AI
            </button>
          </div>
        )}
      </div>

      {/* Right: Undo/Redo, Save, Publish */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => undo()}
          disabled={pastStates.length === 0}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
          title="Undo"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 0 1 0 10H9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 6l-4 4 4 4" />
          </svg>
        </button>
        <button
          onClick={() => redo()}
          disabled={futureStates.length === 0}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
          title="Redo"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 0 0 0 10h4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 6l4 4-4 4" />
          </svg>
        </button>

        <div className="mx-1 h-6 w-px bg-gray-200" />

        <button
          onClick={onSave}
          disabled={!isDirty || isSaving}
          className="rounded-lg bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onPublish}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
