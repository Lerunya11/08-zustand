'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

import css from './NoteDetails.module.css';

type NoteDetailsClientProps = {
  id: string;
};

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data, isPending, isError } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isPending) {
    return <p className={css.status}>Loading...</p>;
  }

  if (isError || !data) {
    return <p className={css.status}>Error: Failed to load note</p>;
  }

  return (
    <div className={css.note}>
      <h1 className={css.title}>{data.title}</h1>

      {data.content ? (
        <p className={css.content}>{data.content}</p>
      ) : (
        <p className={css.contentEmpty}>No content</p>
      )}

      <p className={css.tag}>{data.tag}</p>
      <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
}
