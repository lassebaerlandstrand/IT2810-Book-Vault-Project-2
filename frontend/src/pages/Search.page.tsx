import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { fetchBooks } from '@/api/dummyApi';
import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import SearchConfiguration, {
  SortBy,
  SortOrder,
} from '@/components/SearchConfiguration/SearchConfiguration';
import SearchContainer from '@/components/SearchContainer/SearchContainer';
import { Book } from '@/generated/graphql';

const SearchPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([] as Book[]);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    onSearch();
  }, []);

  const searchAndClose = () => {
    onSearch();
    close();
  };

  const onSearch = () => {
    // TODO: handle search by calling Apollo
    // for now we just do all the work locally

    const startTime = performance.now();
    const allBooks = fetchBooks().slice(0, 100);
    let newBooks = [] as Book[];

    allBooks.forEach((book) => {
      if (!book.title.toLowerCase().includes(searchParams.get('search')?.toLowerCase() || ''))
        return;
      if (
        searchParams.has('authors') &&
        !searchParams.getAll('authors').some((author) => book.authors.includes(author))
      )
        return;
      if (
        searchParams.has('genres') &&
        !searchParams.getAll('genres').some((genre) => book.genres.includes(genre))
      )
        return;
      if (
        searchParams.has('publishers') &&
        !searchParams.getAll('publishers').some((publisher) => book.publisher === publisher)
      )
        return;

      newBooks.push(book);
    });

    const sortBy = searchParams.get('sortBy') || SortBy.Book;
    const sortOrder = searchParams.get('sortOrder') || SortOrder.Ascending;

    newBooks = newBooks.sort((a, b) => {
      if (sortOrder === SortOrder.Descending) [a, b] = [b, a];
      if (sortBy === 'book') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.authors[0].localeCompare(b.authors[0]);
      if (sortBy === 'publisher') return a.publisher.localeCompare(b.publisher);
      return 0;
    });

    setBooks(newBooks);
    setSearchTime(performance.now() - startTime);
  };

  return (
    <>
      <Drawer opened={opened} onClose={searchAndClose} title="Configure your search">
        <SearchConfiguration />
      </Drawer>
      <SearchContainer open={open} onSearch={onSearch} />
      <Text size="xs" mt={10} ta="center">
        {books.length} results in {(searchTime / 1000).toFixed(4)} seconds
      </Text>
      <BookCardGrid books={books} />
    </>
  );
};

export default SearchPage;
