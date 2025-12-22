'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';
import type { CreateNotePayload } from '@/lib/api';

import { useNoteDraftStore, initialDraft } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: (data: CreateNotePayload) => createNote(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft({ ...draft, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft({ ...draft, content: e.target.value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   
    setDraft({ ...draft, tag: e.target.value as CreateNotePayload['tag'] });
  };

  const handleSubmit = (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    const tag = String(formData.get('tag') ?? initialDraft.tag) as CreateNotePayload['tag'];

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
