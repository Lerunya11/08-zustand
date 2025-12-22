import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub.',
  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub.',
    url: `${APP_URL}/notes/action/create`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Create note' }],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
