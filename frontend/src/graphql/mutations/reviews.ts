import { gql } from '@/generated';

export const CREATE_REVIEW = gql(`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      rating
    }
  }
`);

export const UPDATE_REVIEW = gql(`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      rating
    }
  }
`);
