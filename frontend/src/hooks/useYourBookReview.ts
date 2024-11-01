import { useQuery } from '@apollo/client';
import { GET_YOUR_BOOK_REVIEW } from '@/graphql/queries/reviews';

type UseBooksReviewsArgs = {
  bookID: string;
  userUUID: string;
};

export const useYourBookReview = ({ bookID, userUUID }: UseBooksReviewsArgs) => {
  const { data, loading, error, refetch } = useQuery(GET_YOUR_BOOK_REVIEW, {
    variables: { bookID, userUUID },
  });

  return {
    review: data?.bookReview || undefined,
    loading,
    error,
    refetch,
  };
};
