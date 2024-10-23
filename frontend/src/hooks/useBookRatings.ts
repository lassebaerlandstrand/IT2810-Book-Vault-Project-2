//GET_BOOKS_RATINGS

import { useQuery } from '@apollo/client';
import { GET_BOOKS_RATINGS } from '@/graphql/queries/reviews';

type UseBooksRatingsArgs = {
  id?: string;
};

export const useBookRatings = ({ id }: UseBooksRatingsArgs) => {
  if (!id) {
    return { ratings: undefined, loading: false, error: undefined, refetch: () => {} };
  }

  const { data, loading, error, refetch } = useQuery(GET_BOOKS_RATINGS, {
    variables: { bookId: id },
  });

  return {
    ratings: data?.bookRatings,
    loading,
    error,
    refetch,
  };
};
