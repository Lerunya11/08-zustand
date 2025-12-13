// app/@modal/(.)notes/[id]/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

type NotePreviewPageProps = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: NotePreviewPageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

 
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);


  return (
  <HydrationBoundary state={dehydratedState}>
    <NotePreviewClient noteId={id} />   {}
  </HydrationBoundary>
);

};

export default NotePreviewPage;
