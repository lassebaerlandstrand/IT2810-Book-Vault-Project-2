import { useEffect, useState } from 'react';
import { Center, Pagination } from '@mantine/core';
import { fetchBooks, fetchTotalBooksWithFilters } from '@/api/dummyApi';
import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import { Book } from '@/generated/graphql';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const totalBooks = fetchTotalBooksWithFilters();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(fetchBooks(page, limit));
  }, [page, limit]);

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <BookCardGrid books={books} />
      <Center>
        <Pagination total={Math.ceil(totalBooks / limit)} value={page} onChange={setPage} my="md" />
      </Center>
    </>
  );
}
