//GET_BOOKS_RATINGS

import { useQuery } from '@apollo/client';
import { GET_YOUR_BOOK_RATING } from '@/graphql/queries/reviews';

type UseBooksRatingsArgs = {
  bookID: string;
  userUUID: string;
};

export const useYourBookRating = ({ bookID, userUUID }: UseBooksRatingsArgs) => {
  const { data, loading, error, refetch } = useQuery(GET_YOUR_BOOK_RATING, {
    variables: { bookID: bookID, userUUID: userUUID },
  });

  return {
    rating: data?.getYourBookRating,
    loading,
    error,
    refetch,
  };
};
