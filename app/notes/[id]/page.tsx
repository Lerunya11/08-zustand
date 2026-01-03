// app/notes/[id]/page.tsx

import type { Metadata } from 'next';

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

import NoteDetailsClient from './NoteDetails.client';
import css from './NoteDetails.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

type Props = {
  params: Promise<{ id: string }>;
};

function makeDescription(text: string, max = 120) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return 'Note details in NoteHub.';
  return normalized.length > max ? `${normalized.slice(0, max).trim()}…` : normalized;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const note: Note = await fetchNoteById(id);

    const title = `${note.title} | NoteHub`;
    const description = makeDescription(note.content);
    const url = `${APP_URL}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: OG_IMAGE,
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    const title = 'Note not found | NoteHub';
    const description = 'This note does not exist in NoteHub.';
    const url = `${APP_URL}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: OG_IMAGE,
            width: 1200,
            height: 630,
            alt: 'NoteHub',
          },
        ],
      },
    };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <main className={css.main}>
      <div className={css.container}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          
          <NoteDetailsClient id={id} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
