import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchBooks, fetchTotalBooksWithFilters } from '@/api/dummyApi';
import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import PaginationController from '@/components/PaginationController/PaginationController';
import { Book } from '@/generated/graphql';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState<number>(25);
  const totalBooks = fetchTotalBooksWithFilters();
  const [books, setBooks] = useState<Book[]>([]);

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setBooks(fetchBooks(page, limit));
  }, [page, limit]);

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <BookCardGrid books={books} />
      <PaginationController totalBooks={totalBooks} limit={limit} />
    </>
  );
}
