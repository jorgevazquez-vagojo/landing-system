import { create } from 'zustand';
import { temporal } from 'zundo';
import { v4 as uuid } from 'uuid';
import type { LandingSection, LandingSettings, SeoMeta } from '@/types/landing';

export type ViewMode = 'desktop' | 'tablet' | 'mobile';

interface EditorState {
  landingId: string | null;
  landingName: string;
  sections: LandingSection[];
  settings: LandingSettings;
  seoMeta: SeoMeta;
  selectedSectionId: string | null;
  viewMode: ViewMode;
  isDirty: boolean;
  isSaving: boolean;
  isPreviewing: boolean;

  // Actions
  init: (data: { id: string; name: string; sections: LandingSection[]; settings: LandingSettings; seoMeta: SeoMeta }) => void;
  addSection: (type: string, variant?: string, index?: number) => void;
  removeSection: (id: string) => void;
  moveSection: (fromIndex: number, toIndex: number) => void;
  updateSectionProps: (id: string, props: Record<string, unknown>) => void;
  updateSectionVariant: (id: string, variant: string) => void;
  selectSection: (id: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setSettings: (settings: Partial<LandingSettings>) => void;
  setSeoMeta: (meta: Partial<SeoMeta>) => void;
  setIsSaving: (saving: boolean) => void;
  setIsPreviewing: (previewing: boolean) => void;
  duplicateSection: (id: string) => void;
}

export const useEditorStore = create<EditorState>()(
  temporal(
    (set) => ({
      landingId: null,
      landingName: '',
      sections: [],
      settings: {},
      seoMeta: {},
      selectedSectionId: null,
      viewMode: 'desktop',
      isDirty: false,
      isSaving: false,
      isPreviewing: false,

      init: (data) =>
        set({
          landingId: data.id,
          landingName: data.name,
          sections: data.sections,
          settings: data.settings,
          seoMeta: data.seoMeta,
          selectedSectionId: null,
          isDirty: false,
        }),

      addSection: (type, variant, index) =>
        set((state) => {
          const newSection: LandingSection = {
            id: uuid(),
            type,
            variant: variant || 'default',
            props: {},
            order: index ?? state.sections.length,
          };
          const sections = [...state.sections];
          if (index !== undefined) {
            sections.splice(index, 0, newSection);
          } else {
            sections.push(newSection);
          }
          return {
            sections: sections.map((s, i) => ({ ...s, order: i })),
            selectedSectionId: newSection.id,
            isDirty: true,
          };
        }),

      removeSection: (id) =>
        set((state) => ({
          sections: state.sections
            .filter((s) => s.id !== id)
            .map((s, i) => ({ ...s, order: i })),
          selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
          isDirty: true,
        })),

      moveSection: (fromIndex, toIndex) =>
        set((state) => {
          const sections = [...state.sections];
          const [moved] = sections.splice(fromIndex, 1);
          sections.splice(toIndex, 0, moved);
          return {
            sections: sections.map((s, i) => ({ ...s, order: i })),
            isDirty: true,
          };
        }),

      updateSectionProps: (id, props) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === id ? { ...s, props: { ...s.props, ...props } } : s
          ),
          isDirty: true,
        })),

      updateSectionVariant: (id, variant) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === id ? { ...s, variant } : s
          ),
          isDirty: true,
        })),

      selectSection: (id) => set({ selectedSectionId: id }),

      setViewMode: (mode) => set({ viewMode: mode }),

      setSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
          isDirty: true,
        })),

      setSeoMeta: (meta) =>
        set((state) => ({
          seoMeta: { ...state.seoMeta, ...meta },
          isDirty: true,
        })),

      setIsSaving: (saving) => set({ isSaving: saving }),

      setIsPreviewing: (previewing) => set({ isPreviewing: previewing }),

      duplicateSection: (id) =>
        set((state) => {
          const section = state.sections.find((s) => s.id === id);
          if (!section) return state;
          const idx = state.sections.findIndex((s) => s.id === id);
          const dup: LandingSection = {
            ...section,
            id: uuid(),
            order: idx + 1,
          };
          const sections = [...state.sections];
          sections.splice(idx + 1, 0, dup);
          return {
            sections: sections.map((s, i) => ({ ...s, order: i })),
            selectedSectionId: dup.id,
            isDirty: true,
          };
        }),
    }),
    { limit: 50 }
  )
);
