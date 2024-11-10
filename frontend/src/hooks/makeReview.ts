import { useMutation } from '@apollo/client';
import { CreateReviewInput } from '@/generated/graphql';
import { CREATE_REVIEW } from '@/graphql/mutations/reviews';

/**
 * Custom hook that handles review creation functionality.
 * @returns Object containing:
 * - submitReview: Function to create a new review
 * - loading: Boolean indicating if the mutation is in progress
 * - error: Any error that occurred during the mutation
 */
export const makeReview = () => {
  // Return the mutation and its states (data, loading, error)
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW, {
    update(cache) {
      // On update remove the bookReviews "focusUserUUID" queries from cache as
      // they are now stale
      const allKeys = cache.extract().ROOT_QUERY;

      Object.keys(allKeys).forEach((key) => {
        if (key.startsWith('bookReviews({"focusUserUUID"')) {
          cache.evict({
            id: cache.identify({
              __typename: 'Query',
              key,
            }),
          });
        }
      });

      // Clean up
      cache.gc();
    },
  });

  const submitReview = async (input: CreateReviewInput) => {
    try {
      await createReview({
        variables: { input },
      });
    } catch (e) {
      console.error('Error during review creation:', e);
    }
  };

  return {
    submitReview, // Function to trigger the mutation later
    success: data?.createReview.success ?? !error,
    message: data?.createReview.message ?? (error && 'Error making review. Try again later.'),
    loading,
    error,
  };
};
