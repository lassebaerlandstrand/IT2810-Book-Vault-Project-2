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

      //Clean up
      cache.gc();
    },
  });

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
    updatedRating: data?.createReview.rating || -1,
    loading,
    error,
  };
};
