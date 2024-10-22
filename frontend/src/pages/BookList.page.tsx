import { useEffect, useState } from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Container, Drawer, Flex, Group, Text, useMantineTheme } from '@mantine/core';
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
import { getFilterParams, SortBy, SortOrder } from '@/utils/filters';
import { getPaginationParams } from '@/utils/pagination';
import { updateQueryParams } from '@/utils/queryParams';
import { getSearchParams } from '@/utils/search';
import { isValidUrlParams } from '@/utils/validateUrlParams';
import styles from './BookList.module.css';

const formatNumberWithSpaces = (number: string) => number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export function BookList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const [opened, { open, close }] = useDisclosure(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchTime, setSearchTime] = useState(0);

  const { sortBy, sortOrder, genres, authors, publishers } = getFilterParams(searchParams);
  const { page, limit, DEFAULT_PAGE } = getPaginationParams(searchParams);
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
    loading: booksLoading,
    error: booksError,
  } = useBooks({
    limit,
    page,
  });

  const formattedTotalBooks = formatNumberWithSpaces(totalBooks.toString());

  useEffect(() => {
    onSearch(false);
  }, []);

  useEffect(() => {
    close();
  }, [isDesktop]);

  const onSearch = (
    // TODO: handle search by calling Apollo
    // for now we just do all the work locally
    resetPage: boolean,
    newSearchValue: string = searchValue,
    newGenres: string[] = genres,
    newPublishers: string[] = publishers,
    newAuthors: string[] = authors,
    newSortBy: SortBy = sortBy,
    newSortOrder: SortOrder = sortOrder,
    applyFiltersImmediately: boolean = false // Used when immediate update of search params if the filters are changed within the same render as this function call
  ) => {
    const startTime = performance.now();

    updateQueryParams(setSearchParams, 'search', newSearchValue);
    if (resetPage && page !== DEFAULT_PAGE) {
      updateQueryParams(setSearchParams, 'page', DEFAULT_PAGE.toString());
    }

    if (applyFiltersImmediately) {
      updateQueryParams(setSearchParams, 'genres', newGenres);
      updateQueryParams(setSearchParams, 'publishers', newPublishers);
      updateQueryParams(setSearchParams, 'authors', newAuthors);
      updateQueryParams(setSearchParams, 'sortBy', newSortBy);
      updateQueryParams(setSearchParams, 'sortOrder', newSortOrder);
    }

    // const books = fetchBooks(
    //   page,
    //   limit,
    //   newSortBy,
    //   newSortOrder,
    //   newGenres,
    //   newPublishers,
    //   newAuthors,
    //   newSearchValue
    // );
    // const totalBooks = fetchTotalBooksWithFilters(
    //   newSortBy,
    //   newSortOrder,
    //   newGenres,
    //   newPublishers,
    //   newAuthors,
    //   newSearchValue
    // );
    // setBooks(books);
    setTotalBooks(totalBooks);

    setSearchTime(performance.now() - startTime);
  };

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
        <Drawer
          opened={opened}
          onClose={() => {
            onSearch(true);
            close();
          }}
          title="Configure your search"
        >
          <SearchConfiguration
            genres={allGenres}
            authors={allAuthors}
            publishers={allPublishers}
            applyFiltersImmediately={false}
          />
        </Drawer>
      )}

      <Group justify="center" gap="sm" wrap="nowrap">
        <SearchContainer onSearch={(searchQuery) => onSearch(true, searchQuery)} />
        {!isDesktop && (
          <ActionIcon onClick={open} size="lg">
            <IconAdjustments size="75%" />
          </ActionIcon>
        )}
      </Group>

      <Flex justify="space-between" align="flex-end" gap="md">
        <Text>
          {formattedTotalBooks} results in {(searchTime / 1000).toFixed(4)} seconds
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
              applyFiltersImmediately
              onSearch={onSearch}
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
