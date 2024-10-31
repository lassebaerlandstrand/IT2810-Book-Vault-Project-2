//UPDATE_REVIEW

import { useMutation } from '@apollo/client';
import { UPDATE_REVIEW } from '@/graphql/mutations/reviews';

type UpdateReviewArgs = {
  reviewUUID: string;
  description: string;
  rating: number;
};

export const updateReview = () => {
  const [update, { data, loading, error }] = useMutation(UPDATE_REVIEW, {
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

  const submitUpdate = async ({ reviewUUID, description, rating }: UpdateReviewArgs) => {
    try {
      await update({
        variables: { reviewUUID, description, rating },
      });
    } catch (e) {
      console.error('Error during update:', e);
    }
  };

  return {
    submitUpdate,
    updatedRating: data?.updateReview?.rating || -1,
    loading,
    error,
  };
};
