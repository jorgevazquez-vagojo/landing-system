'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { componentMap } from '@/components/landing';
import { useEditorStore } from '@/stores/editor-store';
import type { LandingSection } from '@/types/landing';

interface Props {
  section: LandingSection;
  isSelected: boolean;
  onSelect: () => void;
}

export function SortableSection({ section, isSelected, onSelect }: Props) {
  const { removeSection, duplicateSection } = useEditorStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Component = componentMap[section.type];
  if (!Component) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-blue-300'}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Toolbar */}
      <div className={`absolute -top-8 left-0 z-10 flex items-center gap-1 rounded-t-lg bg-blue-500 px-2 py-1 text-xs text-white ${isSelected || 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-0.5 hover:bg-blue-600 rounded"
          title="Drag to reorder"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          </svg>
        </button>
        <span className="px-1 font-medium capitalize">{section.type.replace('-', ' ')}</span>
        <button
          onClick={(e) => { e.stopPropagation(); duplicateSection(section.id); }}
          className="p-0.5 hover:bg-blue-600 rounded"
          title="Duplicate"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
          className="p-0.5 hover:bg-red-500 rounded"
          title="Delete"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Component render */}
      <div className="pointer-events-none">
        <Component {...section.props} variant={section.variant} />
      </div>
    </div>
  );
}
