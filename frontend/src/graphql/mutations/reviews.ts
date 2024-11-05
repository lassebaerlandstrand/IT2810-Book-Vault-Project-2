import { gql } from '@/generated';

export const CREATE_REVIEW = gql(`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      rating
      numRatings
    }
  }
`);

export const UPDATE_REVIEW = gql(`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      id
      rating
      numRatings
    }
  }
`);
