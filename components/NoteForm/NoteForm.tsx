'use client';

import type React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';
import type { CreateNotePayload, NoteTag } from '@/types/note';

import { useNoteDraftStore, initialDraft } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

const ALLOWED_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const normalizeTag = (value: string): NoteTag =>
  ALLOWED_TAGS.includes(value as NoteTag) ? (value as NoteTag) : 'Todo';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: (data: CreateNotePayload) => createNote(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });

      
      clearDraft();

      
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft({ title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft({ content: e.target.value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraft({ tag: normalizeTag(e.target.value) });
  };

  const handleSubmit = (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    const tag = normalizeTag(String(formData.get('tag') ?? initialDraft.tag));

    const values: CreateNotePayload = { title, content, tag };
    mutation.mutate(values);
  };

  const handleCancel = () => {
     
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleContentChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleTagChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>

        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating…' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
