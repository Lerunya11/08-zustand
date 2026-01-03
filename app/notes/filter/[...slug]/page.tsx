import type { Metadata } from 'next';

import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';
import type { FetchNotesParams } from '@/lib/api';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ search?: string; page?: string }>;
};

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

function normalizeTag(raw: string | undefined): NoteTag | undefined {
  if (!raw) return undefined;

  
  if (raw.toLowerCase() === 'all') return undefined;

  
  const found = TAGS.find((t) => t.toLowerCase() === raw.toLowerCase());
  return found;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tagRaw = slug?.[0];
  const tag = normalizeTag(tagRaw);

  const tagLabel = tag ?? 'All';
  const title = `Notes: ${tagLabel} | NoteHub`;
  const description = `Browse notes filtered by: ${tagLabel}.`;

  const url = `${APP_URL}/notes/filter/${tag ? tag : 'all'}`;

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

export default async function NotesPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const tagRaw = slug?.[0];
  const tag = normalizeTag(tagRaw);

  const page = sp.page ? Number(sp.page) : 1;
  const search = sp.search ?? '';

  const initialParams: FetchNotesParams = {
  tag,
  page: Number.isFinite(page) && page > 0 ? page : 1,
  search,
  perPage: 12, 
};


  return <NotesClient initialParams={initialParams} />;
}
