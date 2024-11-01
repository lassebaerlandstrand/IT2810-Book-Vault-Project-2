import { useQuery } from '@apollo/client';
import { GET_BOOK_RATING } from '@/graphql/queries/books';

type UseBookArgs = {
  bookId?: string;
};

export const useBookRating = ({ bookId }: UseBookArgs) => {
  if (!bookId) {
    return { updateRating: undefined, rating: undefined, loading: false, error: undefined };
  }

  const { data, loading, error, refetch } = useQuery(GET_BOOK_RATING, {
    variables: { bookId },
  });

  return {
    updateRating: refetch,
    rating: data?.book.rating,
    loading,
    error,
  };
};
