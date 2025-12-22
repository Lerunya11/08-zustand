'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import { fetchNotes } from '@/lib/api';
import type { FetchNotesParams, FetchNotesResponse } from '@/lib/api';

import css from './NotesPage.module.css';

const PER_PAGE = 12;

interface NotesClientProps {
  initialParams: FetchNotesParams;
}

export default function NotesClient({ initialParams }: NotesClientProps) {
  const [search, setSearch] = useState(initialParams.search ?? '');
  const [page, setPage] = useState(initialParams.page ?? 1);

  // tag приходит из initialParams (SSR)
  const tag = initialParams.tag;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 400);

  const params: FetchNotesParams = {
    page,
    perPage: PER_PAGE,
    search,
    tag,
  };

  const { data, isPending, isError, error, isFetching } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ['notes', params],
    queryFn: () => fetchNotes(params),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.headerRow}>
          <SearchBox value={search} onChange={handleSearchChange} />


        
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </div>

        {isPending && <p className={css.status}>Loading...</p>}

        {isError && (
          <p className={css.status}>
            Error: {error?.message ?? 'Something went wrong'}
          </p>
        )}

        {!isPending && !isError && <NoteList notes={notes} />}

        <Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>


      
        {isFetching && !isPending && <p className={css.status}>Updating…</p>}
      </div>
    </main>
  );
}
