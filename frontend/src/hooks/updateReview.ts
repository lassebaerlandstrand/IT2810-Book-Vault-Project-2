//UPDATE_REVIEW

import { useMutation } from '@apollo/client';
import { UpdateReviewInput } from '@/generated/graphql';
import { UPDATE_REVIEW } from '@/graphql/mutations/reviews';

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

  const submitUpdate = async (input: UpdateReviewInput) => {
    try {
      await update({
        variables: { input },
      });
    } catch (e) {
      console.error('Error during update:', e);
    }
  };

  return {
    submitUpdate,
    success: data?.updateReview.success,
    message: data?.updateReview.message,
    loading,
    error,
  };
};
