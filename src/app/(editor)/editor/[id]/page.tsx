'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEditorStore } from '@/stores/editor-store';
import { Canvas } from '@/components/editor/Canvas';
import { ComponentPalette } from '@/components/editor/ComponentPalette';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { TopToolbar } from '@/components/editor/TopToolbar';
import { LayerPanel } from '@/components/editor/LayerPanel';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { init, sections, settings, seoMeta, setIsSaving, isPreviewing } = useEditorStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLanding() {
      const res = await fetch(`/api/landings/${id}`);
      if (!res.ok) {
        setError('Landing not found');
        setLoading(false);
        return;
      }
      const data = await res.json();
      init({
        id: data.id,
        name: data.name,
        sections: data.sections || [],
        settings: data.settings || {},
        seoMeta: data.seoMeta || {},
      });
      setLoading(false);
    }
    loadLanding();
  }, [id, init]);

  async function handleSave() {
    setIsSaving(true);
    await fetch(`/api/landings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections, settings, seoMeta }),
    });
    useEditorStore.setState({ isDirty: false, isSaving: false });
  }

  async function handlePublish() {
    setIsSaving(true);
    await fetch(`/api/landings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections, settings, seoMeta, status: 'PUBLISHED' }),
    });
    useEditorStore.setState({ isDirty: false, isSaving: false });
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          useEditorStore.temporal.getState().redo();
        } else {
          useEditorStore.temporal.getState().undo();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button onClick={() => router.push('/dashboard/landings')} className="mt-4 text-blue-600 hover:underline">
            Back to landings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <TopToolbar onSave={handleSave} onPublish={handlePublish} />
      <div className="flex flex-1 overflow-hidden">
        {!isPreviewing && (
          <div className="flex flex-col">
            <ComponentPalette />
            <LayerPanel />
          </div>
        )}
        <div className="flex-1">
          <Canvas />
        </div>
        {!isPreviewing && <PropertiesPanel />}
      </div>
    </div>
  );
}
