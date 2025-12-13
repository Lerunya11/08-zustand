// app/notes/filter/[...slug]/page.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { fetchNotes, type FetchNotesParams } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

const PER_PAGE = 12;


type RouteParams = {
  slug?: string[];
};

type Props = {
  params: Promise<RouteParams>;
};

export default async function NotesFilterPage({ params }: Props) {
 
  const { slug } = await params;

  const slugSegment = slug ?? [];

  const tagFromUrl = slugSegment[0];

  
  const tag: NoteTag | undefined =
    tagFromUrl && tagFromUrl !== 'all' ? (tagFromUrl as NoteTag) : undefined;

  const initialParams: FetchNotesParams = {
    page: 1,
    perPage: PER_PAGE,
    search: '',
    tag, 
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialParams],
    queryFn: () => fetchNotes(initialParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialParams={initialParams} />
    </HydrationBoundary>
  );
}
