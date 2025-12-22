import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

export type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

export const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (patch) =>
        set((state) => ({
          draft: { ...state.draft, ...patch },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
