//GET_BOOKS_RATINGS

import { useQuery } from '@apollo/client';
import { GET_BOOKS_RATINGS } from '@/graphql/queries/reviews';

type UseBooksRatingsArgs = {
  id?: string;
};

export const useBookRatings = ({ id }: UseBooksRatingsArgs) => {
  if (!id) {
    return { ratings: undefined, loading: false, error: undefined };
  }

  const { data, loading, error } = useQuery(GET_BOOKS_RATINGS, {
    variables: { bookId: id },
  });

  console.log(data?.bookRatings);

  return {
    ratings: data?.bookRatings,
    loading,
    error,
  };
};
