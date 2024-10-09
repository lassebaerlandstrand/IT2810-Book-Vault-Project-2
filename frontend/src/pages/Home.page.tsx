import { useEffect, useState } from 'react';
import { Flex } from '@mantine/core';
import { fetchBooks, fetchTotalBooksWithFilters } from '@/api/dummyApi';
import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import EntriesController from '@/components/EntriesController/EntriesController';
import PaginationController from '@/components/PaginationController/PaginationController';
import { Book } from '@/generated/graphql';
import { usePaginationParams } from '@/hooks/usePaginationParams';

export function HomePage() {
  const totalBooks = fetchTotalBooksWithFilters();
  const [books, setBooks] = useState<Book[]>([]);
  const { page, limit } = usePaginationParams();

  useEffect(() => {
    setBooks(fetchBooks(page, limit));
  }, [page, limit]);

  return (
    <>
      <Flex justify="flex-end">
        <EntriesController />
      </Flex>

      <BookCardGrid books={books} />
      <PaginationController totalBooks={totalBooks} />
    </>
  );
}
