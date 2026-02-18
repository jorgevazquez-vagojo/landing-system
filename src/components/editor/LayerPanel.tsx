'use client';

import { useEditorStore } from '@/stores/editor-store';

export function LayerPanel() {
  const { sections, selectedSectionId, selectSection, removeSection, moveSection } = useEditorStore();

  return (
    <div className="border-t border-gray-200 bg-white p-3" style={{ maxHeight: 200 }}>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Layers</h3>
      {sections.length === 0 ? (
        <p className="text-xs text-gray-400">No sections yet</p>
      ) : (
        <div className="space-y-0.5">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`flex items-center justify-between rounded px-2 py-1.5 text-xs cursor-pointer ${
                section.id === selectedSectionId
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => selectSection(section.id)}
            >
              <span className="font-medium capitalize">{section.type.replace('-', ' ')}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); if (index > 0) moveSection(index, index - 1); }}
                  disabled={index === 0}
                  className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30"
                  title="Move up"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); if (index < sections.length - 1) moveSection(index, index + 1); }}
                  disabled={index === sections.length - 1}
                  className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30"
                  title="Move down"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                  className="p-0.5 hover:bg-red-100 hover:text-red-600 rounded"
                  title="Delete"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
