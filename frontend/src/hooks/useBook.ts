import { useQuery } from '@apollo/client';
import { GET_BOOK } from '@/graphql/queries/books';

type UseBookArgs = {
  bookId: string;
};

export const useBook = ({ bookId }: UseBookArgs) => {
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { bookId },
  });

  return {
    books: data?.book,
    loading,
    error,
  };
};
