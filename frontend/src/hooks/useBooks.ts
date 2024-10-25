import { useQuery } from '@apollo/client';
import { SortBy, SortInput, SortOrder } from '@/generated/graphql';
import { GET_BOOKS } from '@/graphql/queries/books';

type UseBooksArgs = {
  limit: number;
  page: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
  search?: string;
  _beforeDate?: Date;
  _afterDate?: Date;
  authors?: string[];
  genres?: string[];
  publishers?: string[];
  onCompleted?: () => void;
};

export const useBooks = ({
  limit,
  page,
  search,
  sortBy,
  sortOrder,
  _beforeDate, // TODO: Underlined because unused, to satisfy eslint
  _afterDate,
  authors,
  genres,
  publishers,
  onCompleted,
}: UseBooksArgs) => {
  const sortInput: SortInput = { sortBy, sortOrder };
  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { limit, offset: page - 1, search, sortInput, authors, genres, publishers },
    onCompleted,
  });

  return {
    books: data?.books.books,
    totalBooks: data?.books.summary.totalBooks,
    loading,
    error,
  };
};
