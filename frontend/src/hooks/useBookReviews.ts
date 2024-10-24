import { useQuery } from '@apollo/client';
import { GET_BOOKS_REVIEWS } from '@/graphql/queries/reviews';

type UseBooksReviewsArgs = {
  bookID: string;
  limit: number;
  offset: number;
  userUUID: string;
};

export const useBookReviews = ({ bookID, limit, offset, userUUID }: UseBooksReviewsArgs) => {
  const { data, loading, error, refetch } = useQuery(GET_BOOKS_REVIEWS, {
    variables: { bookID: bookID, limit: limit, offset: offset, userUUID: userUUID },
  });

  return {
    reviews: data?.bookReviews.reviews,
    pagination: data?.bookReviews.pagination,
    total: data?.bookReviews.summary.total,
    loading,
    error,
    refetch,
  };
};
