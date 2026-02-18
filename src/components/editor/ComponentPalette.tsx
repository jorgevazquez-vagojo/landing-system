'use client';

import { componentRegistry } from '@/components/landing';
import { useEditorStore } from '@/stores/editor-store';

const categoryLabels: Record<string, string> = {
  header: 'Header',
  content: 'Content',
  cta: 'Call to Action',
  'social-proof': 'Social Proof',
  media: 'Media',
  form: 'Forms',
  layout: 'Layout',
  footer: 'Footer',
};

const categoryOrder = ['header', 'content', 'cta', 'social-proof', 'media', 'form', 'layout', 'footer'];

export function ComponentPalette() {
  const { addSection } = useEditorStore();

  const grouped = categoryOrder.reduce<Record<string, typeof componentRegistry>>((acc, cat) => {
    const items = componentRegistry.filter((c) => c.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="h-full overflow-y-auto border-r border-gray-200 bg-white p-4" style={{ width: 260 }}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Components</h2>

      {Object.entries(grouped).map(([category, components]) => (
        <div key={category} className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            {categoryLabels[category] || category}
          </h3>
          <div className="space-y-1">
            {components.map((comp) => (
              <button
                key={comp.type}
                onClick={() => addSection(comp.type, comp.variants[0]?.id)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded bg-gray-100 text-xs">
                  {comp.name.charAt(0)}
                </span>
                <span className="font-medium">{comp.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
