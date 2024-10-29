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
  console.log('Got here! 1', limit, page, userUUID);
  const { data, loading, error } = useQuery(GET_YOUR_BOOK_REVIEWS, {
    variables: { limit, offset: page - 1, userUUID: userUUID },
  });
  console.log('Got here! 2');

  return {
    reviews: data?.getYourBookReviews.reviews,
    totalReviews: data?.getYourBookReviews.summary.total,
    loading,
    error,
  };
};
