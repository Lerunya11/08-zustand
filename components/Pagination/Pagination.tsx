// components/Pagination/Pagination.tsx
'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.arrow}
      nextClassName={css.arrow}
      disabledClassName={css.disabled}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={selected => onPageChange(selected.selected + 1)}
    />
  );
};

export default Pagination;
