//GET_YOUR_BOOK_REVIEWS

import { useQuery } from '@apollo/client';
import { GET_YOUR_BOOK_REVIEWS } from '@/graphql/queries/reviews';

type UseYourBookReviewsArgs = {
  limit: number;
  page: number;
  userUUID: string;
  onCompleted?: () => void;
};

export const useYourBookReviews = ({ limit, page, userUUID }: UseYourBookReviewsArgs) => {
  const { data, loading, error } = useQuery(GET_YOUR_BOOK_REVIEWS, {
    variables: { limit, offset: page - 1, userUUID: userUUID },
  });

  return {
    reviews: data?.bookReviews.reviews,
    totalReviews: data?.bookReviews.summary.total,
    loading,
    error,
  };
};
