// components/PaginationControls.tsx
'use client';

import Link from 'next/link';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function PaginationControls({ currentPage, totalPages, basePath }: PaginationControlsProps) {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {hasPrevPage ? (
        <Link href={`${basePath}/${currentPage - 1}`} className="px-4 py-2 border rounded">
          &larr; Previous
        </Link>
      ) : (
        <div className="px-4 py-2 border rounded text-gray-400 cursor-not-allowed">&larr; Previous</div>
      )}

      <span>
        Page {currentPage} of {totalPages}
      </span>

      {hasNextPage ? (
        <Link href={`${basePath}/${currentPage + 1}`} className="px-4 py-2 border rounded">
          Next &rarr;
        </Link>
      ) : (
        <div className="px-4 py-2 border rounded text-gray-400 cursor-not-allowed">Next &rarr;</div>
      )}
    </div>
  );
}
