import { useQuery } from '@apollo/client';
import { GET_YOUR_BOOK_REVIEW } from '@/graphql/queries/reviews';

type UseBooksReviewsArgs = {
  bookID: string;
  userUUID: string;
};

export const useYourBookReview = ({ bookID, userUUID }: UseBooksReviewsArgs) => {
  const { data, loading, error, refetch } = useQuery(GET_YOUR_BOOK_REVIEW, {
    variables: { bookID: bookID, userUUID: userUUID },
  });

  return {
    review: data?.getYourBookReview,
    loading,
    error,
    refetch,
  };
};
