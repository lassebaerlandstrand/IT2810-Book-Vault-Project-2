//UPDATE_REVIEW

import { useMutation } from '@apollo/client';
import { UPDATE_REVIEW } from '@/graphql/mutations/reviews';

type UpdateReviewArgs = {
  reviewUUID: string;
  description: string;
  rating: number;
};

export const updateReview = () => {
  const [update, { data, loading, error }] = useMutation(UPDATE_REVIEW);

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
    success: data?.updateReview.success || null,
    loading,
    error,
  };
};
