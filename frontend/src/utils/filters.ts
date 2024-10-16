import { useEffect, useState } from 'react';
import { fetchAuthors, fetchGenres, fetchPublishers } from '@/api/dummyApi';

export enum SortBy {
  Book = 'book',
  Author = 'author',
  Publisher = 'publisher',
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

const DEFAULT_SORT_BY = SortBy.Book;
const DEFAULT_SORT_ORDER = SortOrder.Ascending;

export const getInitialOptions = () => {
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [allAuthors, setAllAuthors] = useState<string[]>([]);
  const [allPublishers, setAllPublishers] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setAllGenres(fetchGenres());
    setAllAuthors(fetchAuthors());
    setAllPublishers(fetchPublishers());
    setIsLoading(false);
  }, []);

  return { allGenres, allAuthors, allPublishers, isLoading };
};

export const getFilterParams = (searchParams: URLSearchParams) => {
  const sortBy = (searchParams.get('sortBy') as SortBy) ?? DEFAULT_SORT_BY;
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? DEFAULT_SORT_ORDER;
  const authors = searchParams.getAll('authors');
  const publishers = searchParams.getAll('publishers');
  const genres = searchParams.getAll('genres');

  return {
    sortBy,
    sortOrder,
    authors,
    publishers,
    genres,
    DEFAULT_SORT_BY,
    DEFAULT_SORT_ORDER,
  };
};
