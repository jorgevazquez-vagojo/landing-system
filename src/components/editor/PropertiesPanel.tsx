'use client';

import { useEditorStore } from '@/stores/editor-store';
import { componentRegistry } from '@/components/landing';

export function PropertiesPanel() {
  const { sections, selectedSectionId, updateSectionProps, updateSectionVariant } = useEditorStore();

  const section = sections.find((s) => s.id === selectedSectionId);
  if (!section) {
    return (
      <div className="flex h-full items-center justify-center border-l border-gray-200 bg-white p-4" style={{ width: 300 }}>
        <p className="text-sm text-gray-400">Select a section to edit its properties</p>
      </div>
    );
  }

  const definition = componentRegistry.find((c) => c.type === section.type);

  return (
    <div className="h-full overflow-y-auto border-l border-gray-200 bg-white p-4" style={{ width: 300 }}>
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">Properties</h2>
      <p className="mb-4 text-xs text-gray-400 capitalize">{section.type.replace('-', ' ')}</p>

      {/* Variant selector */}
      {definition && definition.variants.length > 1 && (
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium text-gray-600">Variant</label>
          <select
            value={section.variant || 'default'}
            onChange={(e) => updateSectionVariant(section.id, e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            {definition.variants.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Property editors */}
      {definition?.propsSchema.map((prop) => (
        <div key={prop.name} className="mb-4">
          <label className="mb-1 block text-xs font-medium text-gray-600">{prop.label}</label>
          {prop.type === 'text' || prop.type === 'url' ? (
            <input
              type={prop.type === 'url' ? 'url' : 'text'}
              value={(section.props[prop.name] as string) || ''}
              onChange={(e) => updateSectionProps(section.id, { [prop.name]: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          ) : prop.type === 'textarea' || prop.type === 'richtext' ? (
            <textarea
              value={(section.props[prop.name] as string) || ''}
              onChange={(e) => updateSectionProps(section.id, { [prop.name]: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          ) : prop.type === 'number' ? (
            <input
              type="number"
              value={(section.props[prop.name] as number) || 0}
              onChange={(e) => updateSectionProps(section.id, { [prop.name]: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          ) : prop.type === 'color' ? (
            <input
              type="color"
              value={(section.props[prop.name] as string) || '#000000'}
              onChange={(e) => updateSectionProps(section.id, { [prop.name]: e.target.value })}
              className="h-10 w-full cursor-pointer rounded-lg border border-gray-200"
            />
          ) : prop.type === 'image' ? (
            <input
              type="url"
              value={(section.props[prop.name] as string) || ''}
              onChange={(e) => updateSectionProps(section.id, { [prop.name]: e.target.value })}
              placeholder="Image URL"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          ) : prop.type === 'select' ? (
            <select
              value={(section.props[prop.name] as string) || ''}
              onChange={(e) => updateSectionProps(section.id, { [prop.name]: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              {prop.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : prop.type === 'toggle' ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!section.props[prop.name]}
                onChange={(e) => updateSectionProps(section.id, { [prop.name]: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-gray-600">Enabled</span>
            </label>
          ) : prop.type === 'array' ? (
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-400">
                {Array.isArray(section.props[prop.name])
                  ? `${(section.props[prop.name] as unknown[]).length} items`
                  : 'No items'}
              </p>
              <textarea
                value={JSON.stringify(section.props[prop.name] || [], null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    updateSectionProps(section.id, { [prop.name]: parsed });
                  } catch { /* ignore parse errors while typing */ }
                }}
                rows={6}
                className="mt-2 w-full rounded border border-gray-100 px-2 py-1 font-mono text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
