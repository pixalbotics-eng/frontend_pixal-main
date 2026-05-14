'use client';

import React from 'react';
import type { PaginationMeta } from '@/lib/pagination';

type ListPaginationProps = {
  meta: PaginationMeta | null;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
};

export default function ListPagination({
  meta,
  onPageChange,
  isLoading = false,
  className = '',
}: ListPaginationProps) {
  if (!meta || meta.totalPages <= 1) return null;

  const { page, totalPages, total, limit } = meta;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, Math.max(0, total));

  return (
    <nav
      className={`mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row ${className}`}
      aria-label="Pagination"
    >
      <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-900">
          Page {page} of {totalPages}
        </span>
        {total > 0 ? (
          <span className="ml-2">
            ({start}–{end} of {total})
          </span>
        ) : null}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={isLoading || page <= 1}
          className="min-w-[5rem] rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={isLoading || page >= totalPages}
          className="min-w-[5rem] rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
