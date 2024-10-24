//GET_BOOKS_RATINGS

import { useQuery } from '@apollo/client';
import { GET_BOOKS_RATINGS } from '@/graphql/queries/reviews';

type UseBooksRatingsArgs = {
  bookID: string;
  limit: number;
  offset: number;
  userUUID: string;
};

export const useBookRatings = ({ bookID, limit, offset, userUUID }: UseBooksRatingsArgs) => {
  /*
  if (!bookID || !limit || !offset || !userUUID) {
    return { ratings: undefined, loading: false, error: undefined, refetch: () => {} };
  }
  */

  const { data, loading, error, refetch } = useQuery(GET_BOOKS_RATINGS, {
    variables: { bookID: bookID, limit: limit, offset: offset, userUUID: userUUID },
  });

  return {
    ratings: data?.bookRatings.ratings,
    pagination: data?.bookRatings.pagination,
    total: data?.bookRatings.summary.total,
    loading,
    error,
    refetch,
  };
};
