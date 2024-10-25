// This file defines all queries related to reviews

import { gql } from '@/generated';

export const GET_BOOKS_REVIEWS = gql(`
  query GetBooksReviews($bookID: String!, $limit: Int!, $offset: Int!, $userUUID: String!) {
    bookReviews(bookID: $bookID, limit: $limit, offset: $offset, userUUID: $userUUID) {
      reviews {
        UUID
        description
        rating
        at
        user {
          name
        }
      }
      pagination 
      {
        totalPages
        currentPage
        isLastPage
      }
      summary 
      {
        total
      }
    }
  }
`);

export const GET_YOUR_BOOK_REVIEW = gql(`
  query GetYourBookReview($bookID: String!, $userUUID: String!) {
    getYourBookReview(bookID: $bookID, userUUID: $userUUID) {
      UUID
      description
      rating
      at
      user {
        UUID
        name
        at
        wantToRead
        haveRead
      }
      book {
        id
        title
        series
        numberInSeries
        language
        isbn
        coverImg
        rating
        numRatings
        characters
        bookFormat
        pages
        publishDate
        awards
        setting
        publisher {
          name
        }
        genres {
          name
        }
        authors {
          name
        }
        description
      }
    }
  }

`);
