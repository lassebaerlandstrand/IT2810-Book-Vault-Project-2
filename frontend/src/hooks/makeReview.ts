import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '@/graphql/mutations/reviews';

type MakeReviewArgs = {
  userUUID: string;
  bookID: string;
  description: string;
  rating: number;
};

export const makeReview = () => {
  // Return the mutation and its states (data, loading, error)
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);

  const submitReview = async ({ userUUID, bookID, description, rating }: MakeReviewArgs) => {
    try {
      await createReview({
        variables: { userUUID, bookID, description, rating },
      });
    } catch (e) {
      console.error('Error during review creation:', e);
    }
  };

  return {
    submitReview, // Function to trigger the mutation later
    review: data?.createReview || null,
    loading,
    error,
  };
};
