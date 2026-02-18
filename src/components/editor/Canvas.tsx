'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEditorStore } from '@/stores/editor-store';
import { SortableSection } from './SortableSection';
import { componentMap } from '@/components/landing';

export function Canvas() {
  const { sections, selectedSectionId, selectSection, moveSection, viewMode, isPreviewing } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = sections.findIndex((s) => s.id === active.id);
    const toIndex = sections.findIndex((s) => s.id === over.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      moveSection(fromIndex, toIndex);
    }
  }

  const widthClass = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  }[viewMode];

  if (isPreviewing) {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className={`mx-auto ${widthClass} transition-all duration-300`}>
          {sections.map((section) => {
            const Component = componentMap[section.type];
            if (!Component) return null;
            return <Component key={section.id} {...section.props} variant={section.variant} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full overflow-y-auto bg-gray-100 p-4"
      onClick={() => selectSection(null)}
    >
      <div className={`mx-auto ${widthClass} min-h-full bg-white shadow-sm rounded-lg transition-all duration-300`}>
        {sections.length === 0 ? (
          <div className="flex h-96 items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg font-medium">Drag components here</p>
              <p className="mt-1 text-sm">or click a component from the left panel</p>
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  isSelected={section.id === selectedSectionId}
                  onSelect={() => {
                    selectSection(section.id);
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
