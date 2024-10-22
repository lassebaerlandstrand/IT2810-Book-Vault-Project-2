import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '@/graphql/queries/books';

type UseBooksArgs = {
  limit: number;
  page: number;
};

export const useBooks = ({ limit, page }: UseBooksArgs) => {
  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { limit, offset: page - 1 },
  });

  return {
    books: data?.books.books,
    totalBooks: data?.books.summary.totalBooks,
    loading,
    error,
  };
};
