import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Container, Drawer, Flex, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  fetchAuthors,
  fetchBooks,
  fetchGenres,
  fetchPublishers,
  fetchTotalBooksWithFilters,
} from '@/api/dummyApi';
import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import EntriesController from '@/components/EntriesController/EntriesController';
import PaginationController from '@/components/PaginationController/PaginationController';
import SearchConfiguration from '@/components/SearchConfiguration/SearchConfiguration';
import SearchContainer from '@/components/SearchContainer/SearchContainer';
import { Book } from '@/generated/graphql';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationParams } from '@/hooks/usePagination';

export function BookList() {
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const { page, limit, DEFAULT_PAGE } = usePaginationParams();

  const [opened, { open, close }] = useDisclosure(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalBooks, setTotalBooks] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTime, setSearchTime] = useState(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const formattedTotalBooks = totalBooks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  useEffect(() => {
    setBooks(fetchBooks(page, limit, searchParams));
  }, [page, limit]);

  useEffect(() => {
    onSearch();
    setGenres(fetchGenres());
    setPublishers(fetchPublishers());
    setAuthors(fetchAuthors());
  }, []);

  const searchAndCloseDrawer = () => {
    console.log(useFilters());
    onSearch();
    close();
  };

  const onSearch = () => {
    // TODO: handle search by calling Apollo
    // for now we just do all the work locally
    const startTime = performance.now();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', DEFAULT_PAGE.toString());
    searchValue ? newSearchParams.set('search', searchValue) : newSearchParams.delete('search');
    setSearchParams(newSearchParams);
    setBooks(fetchBooks(page, limit, newSearchParams));
    setTotalBooks(fetchTotalBooksWithFilters(newSearchParams));
    setSearchTime(performance.now() - startTime);
  };

  return (
    <>
      {!isDesktop && (
        <Drawer opened={opened} onClose={searchAndCloseDrawer} title="Configure your search">
          <SearchConfiguration genres={genres} publishers={publishers} authors={authors} />
        </Drawer>
      )}

      <SearchContainer
        open={open}
        onSearch={onSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Flex justify="space-between" align="flex-end" gap="md">
        <Text>
          {formattedTotalBooks} results in {(searchTime / 1000).toFixed(4)} seconds
        </Text>
        <EntriesController />
      </Flex>

      <Flex wrap="nowrap">
        {isDesktop && (
          <Container py="xl" pr="md" pl={0}>
            <SearchConfiguration genres={genres} publishers={publishers} authors={authors} />
            <Button>Apply filters</Button>
          </Container>
        )}
        <BookCardGrid books={books} />
      </Flex>

      <PaginationController totalBooks={totalBooks} />
    </>
  );
}
