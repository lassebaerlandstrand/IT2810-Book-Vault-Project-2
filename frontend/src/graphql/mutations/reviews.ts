import { gql } from '@/generated';

export const CREATE_REVIEW = gql(`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      book {
        id
        rating
        numRatings
      }
      success
      message
    }
  }
`);

export const UPDATE_REVIEW = gql(`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      book {
        id
        rating
        numRatings
      }
      success
      message
    }
  }
`);
