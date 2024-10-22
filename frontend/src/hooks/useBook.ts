import { useQuery } from '@apollo/client';
import { GET_BOOK } from '@/graphql/queries/books';

type UseBookArgs = {
  bookId?: string;
};

export const useBook = ({ bookId }: UseBookArgs) => {
  if (!bookId) {
    return { book: undefined, loading: false, error: undefined };
  }

  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { bookId },
  });

  return {
    book: data?.book,
    loading,
    error,
  };
};
