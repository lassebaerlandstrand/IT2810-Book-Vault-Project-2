import { useEffect, useState } from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Container, Flex, Group, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import EntriesController from '@/components/EntriesController/EntriesController';
import { Error404 } from '@/components/ErrorPage/ErrorPage';
import LoadingCircle from '@/components/Loading/Loading';
import PaginationController from '@/components/PaginationController/PaginationController';
import SearchConfiguration from '@/components/SearchConfiguration/SearchConfiguration';
import SearchContainer from '@/components/SearchContainer/SearchContainer';
import { useAuthors } from '@/hooks/useAuthors';
import { useBooks } from '@/hooks/useBooks';
import { useGenres } from '@/hooks/useGenres';
import { usePublishers } from '@/hooks/usePublishers';
import { getFilterParams } from '@/utils/filters';
import { getPaginationParams } from '@/utils/pagination';
import { getSearchParams } from '@/utils/search';
import { isValidUrlParams } from '@/utils/validateUrlParams';
import styles from './BookList.module.css';

const formatNumberWithSpaces = (number: string) => number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export function BookList() {
  const [searchParams] = useSearchParams();
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTime, setSearchTime] = useState<['Loading' | 'Finished', number]>(['Loading', 0]); // Need to define a tuple, because we can only benchmark the search with the onCompleted function

  const { sortBy, sortOrder, genres, authors, publishers } = getFilterParams(searchParams);
  const { page, limit } = getPaginationParams(searchParams);
  const { searchValue } = getSearchParams(searchParams);

  const { genres: allGenres, loading: loadingGenres, error: errorGenres } = useGenres();
  const { authors: allAuthors, loading: loadingAuthors, error: errorAuthors } = useAuthors();
  const {
    publishers: allPublishers,
    loading: loadingPublishers,
    error: errorPublishers,
  } = usePublishers();

  const {
    books: books,
    totalBooks,
    loading: booksLoading,
    error: booksError,
  } = useBooks({
    limit,
    page,
    search: searchValue,
    sortBy,
    sortOrder,
    authors,
    genres,
    publishers,
    onCompleted: () => {
      setSearchTime((startSearchTime) => ['Finished', Date.now() - startSearchTime[1]]);
    },
  });

  const formattedTotalBooks =
    totalBooks != null ? formatNumberWithSpaces(totalBooks.toString()) : '';

  useEffect(() => {
    setSearchTime(['Loading', Date.now()]);
  }, [
    page, // We call the useBooks hook if any of these changes, so we can define this as the start time. Apollo doesn't have any methods for when a query starts, but it does for when it ends
    limit,
    searchValue,
    sortBy,
    sortOrder,
    JSON.stringify(authors),
    JSON.stringify(genres),
    JSON.stringify(publishers),
  ]);

  useEffect(() => {
    close();
  }, [isDesktop]);

  if (!isValidUrlParams(searchParams)) {
    return (
      <Error404
        title="Invalid search parameters"
        description="It looks like the search parameters in the URL are incorrect. Please check and try again."
        link="/books"
      />
    );
  }

  if (isDesktop == null || loadingGenres || loadingAuthors || loadingPublishers) {
    return <LoadingCircle />;
  }

  if (
    errorGenres ||
    errorAuthors ||
    errorPublishers ||
    allGenres == null ||
    allAuthors == null ||
    allPublishers == null
  ) {
    return (
      <Error404
        title="Failed to load data"
        description="We were unable to load the necessary data to display the page."
        link="/"
      />
    );
  }

  return (
    <>
      {!isDesktop && (
        <SearchConfiguration
          genres={allGenres}
          authors={allAuthors}
          publishers={allPublishers}
          useDrawer
          opened={opened}
          close={close}
        />
      )}

      <Group justify="center" gap="sm" wrap="nowrap">
        <SearchContainer />
        {!isDesktop && (
          <ActionIcon onClick={open} size="lg">
            <IconAdjustments size="75%" />
          </ActionIcon>
        )}
      </Group>

      <Flex justify="space-between" align="flex-end" gap="md">
        <Text>
          {searchTime[0] == 'Loading' || booksLoading
            ? 'Loading...'
            : `${formattedTotalBooks} results in ${(searchTime[1] / 1000).toFixed(4)} seconds`}
        </Text>
        <EntriesController />
      </Flex>

      <Flex gap="lg" my="lg">
        {isDesktop && (
          <Container flex={0} px={0} className={styles.filterContainer}>
            <Text component="h2" mt="xl" mb="md">
              Configure your search
            </Text>
            <SearchConfiguration
              genres={allGenres}
              authors={allAuthors}
              publishers={allPublishers}
              useDrawer={false}
            />
          </Container>
        )}
        <Container flex={1} px={0}>
          <BookCardGrid books={books} loading={booksLoading} error={booksError} />
        </Container>
      </Flex>

      <PaginationController totalBooks={totalBooks} />
    </>
  );
}
