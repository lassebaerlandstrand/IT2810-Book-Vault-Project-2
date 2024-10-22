import { useQuery } from '@apollo/client';
import { SortBy, SortInput, SortOrder } from '@/generated/graphql';
import { GET_BOOKS } from '@/graphql/queries/books';

type UseBooksArgs = {
  limit: number;
  page: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
  search?: string;
  beforeDate?: Date;
  afterDate?: Date;
  authors?: string[];
  genres?: string[];
  publishers?: string[];
};

export const useBooks = ({
  limit,
  page,
  search,
  sortBy,
  sortOrder,
  beforeDate,
  afterDate,
  authors,
  genres,
  publishers,
}: UseBooksArgs) => {
  const sortInput: SortInput = {
    sortBy: sortBy,
    sortOrder: sortOrder,
  };

  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { limit, offset: page - 1, sortInput, authors },
  });

  return {
    books: data?.books.books,
    totalBooks: data?.books.summary.totalBooks,
    loading,
    error,
  };
};
