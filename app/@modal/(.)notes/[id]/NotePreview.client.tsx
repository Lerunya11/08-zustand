'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

import css from './NotePreview.module.css';

type NotePreviewClientProps = {
  noteId: string;
};


export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError || !note) {
    content = <p>Failed to load note</p>;
  } else {
    content = (
      <section className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>

        {}
        {note.tag && <p>Tag: {note.tag}</p>}

        {}
        {note.createdAt && (
          <p>
            Created:{' '}
            {new Date(note.createdAt).toLocaleString('uk-UA', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        )}

        <p className={css.content}>{note.content}</p>
      </section>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

