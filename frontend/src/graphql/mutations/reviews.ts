import { gql } from '@/generated';

/** Mutation to create a new review for a book */
export const CREATE_REVIEW = gql(`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      rating
      numRatings
      ratingsByStars
    }
  }
`);

/** Mutation to update an existing review */
export const UPDATE_REVIEW = gql(`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      id
      rating
      numRatings
      ratingsByStars
    }
  }
`);
