// components/NoteList/NoteList.tsx
'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';

import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <div>
              <Link
                href={`/notes/${note.id}`}
                className={css.link}
              >
                View details
              </Link>

              <button
                type="button"
                className={css.button}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
