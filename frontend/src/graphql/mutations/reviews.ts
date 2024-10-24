import { gql } from '@/generated';

export const CREATE_REVIEW = gql(`
  mutation CreateReview($userUUID: String!, $bookID: String!, $description: String!, $rating: Float!) {
    createReview(userUUID: $userUUID, bookID: $bookID, description: $description, rating: $rating) {
      UUID
      description
      rating
      at
      userUUID
      bookID
    }
  }
`);

export const UPDATE_REVIEW = gql(`
  mutation UpdateReview($reviewUUID: String!, $description: String!, $rating: Float!) {
    updateReview(reviewUUID: $reviewUUID, description: $description, rating: $rating) {
      success
    }
  }
`);
