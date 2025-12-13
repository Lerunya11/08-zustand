'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesParams, FetchNotesResponse } from '@/lib/api';


import css from './NotesPage.module.css';

const PER_PAGE = 12;

interface NotesClientProps {
  initialParams: FetchNotesParams;
}

const NotesClient = ({ initialParams }: NotesClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [params, setParams] = useState<FetchNotesParams>({
    page: initialParams.page ?? 1,
    perPage: initialParams.perPage ?? PER_PAGE,
    search: initialParams.search,
  });

  const [searchInput, setSearchInput] = useState(initialParams.search ?? '');

  const debouncedUpdateSearch = useDebouncedCallback((value: string) => {
    setParams(prev => ({
      ...prev,
      page: 1,
      search: value.trim() || undefined,
    }));
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    debouncedUpdateSearch(value);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', params],
    queryFn: () => fetchNotes(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  const shouldShowPagination = totalPages > 1;

  const handlePageChange = (nextPage: number) => {
    setParams(prev => ({ ...prev, page: nextPage }));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />

        {shouldShowPagination && (
          <Pagination
            page={params.page ?? 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={handleOpenModal}
        >
          Create note +
        </button>
      </header>

            <main className={css.main}>
        {isLoading && <p>Loading, please wait...</p>}

        {isError && <p>Something went wrong.</p>}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
      </main>


      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
