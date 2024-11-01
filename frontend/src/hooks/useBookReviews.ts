import { useQuery } from '@apollo/client';
import { GET_BOOKS_REVIEWS } from '@/graphql/queries/reviews';

type UseBooksReviewsArgs = {
  bookID: string;
  limit: number;
  page: number;
  userUUID: string;
};

export const useBookReviews = ({ bookID, limit, page, userUUID }: UseBooksReviewsArgs) => {
  const { data, loading, error, refetch } = useQuery(GET_BOOKS_REVIEWS, {
    variables: { bookID, limit, offset: page - 1, userUUID },
  });

  return {
    reviews: data?.bookReviews.reviews,
    pagination: data?.bookReviews.pagination,
    loading,
    error,
    refetch,
  };
};
