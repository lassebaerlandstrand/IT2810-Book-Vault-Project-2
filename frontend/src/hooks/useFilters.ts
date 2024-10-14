import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

// Expected to only be called in max one component per page, else refactor to use context. This is to avoid conflicting states.
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Book);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Ascending);
  const [genres, setGenres] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    setGenres(fetchGenres());
    setPublishers(fetchPublishers());
    setAuthors(fetchAuthors());
  }, []);

  const applyFilters = (
    selectedGenres: string[],
    selectedPublishers: string[],
    selectedAuthors: string[]
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    selectedGenres.length
      ? newSearchParams.set('genres', selectedGenres.join(','))
      : newSearchParams.delete('genres');
    selectedPublishers.length
      ? newSearchParams.set('publishers', selectedPublishers.join(','))
      : newSearchParams.delete('publishers');
    selectedAuthors.length
      ? newSearchParams.set('authors', selectedAuthors.join(','))
      : newSearchParams.delete('authors');

    setSearchParams(newSearchParams);
  };

  return { genres, publishers, authors, applyFilters };
}
