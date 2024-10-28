// This file defines all queries related to books

import { gql } from '@/generated';

export const GET_BOOKS = gql(`
  query GetBooks($limit: Int, $offset: Int, $input: FilterInput) {
    books(limit: $limit, offset: $offset, input: $input) {
      books {
        id
        title
        coverImg
        rating
        authors {
          name
        }
      }
      summary {
        totalBooks
      }
    }
  }
`);

export const GET_BOOK = gql(`
  query GetBook($bookId: String!) {
    book(id: $bookId) {
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
`);

// TODO: Update with only authors on books satisfying the filters
export const GET_AUTHORS = gql(`
  query GetAuthors {
    authors {
      name
    }
  }
`);

// TODO: Update with only genres on books satisfying the filters
export const GET_GENRES = gql(`
  query GetGenres {
    genres {
      name
    }
  }
`);

// TODO: Update with only genres on books satisfying the filters
export const GET_PUBLISHERS = gql(`
  query GetPublishers {
    publishers {
      name
    }
  }
`);

export const GET_FILTERS = gql(`
  query GetFilterCount($input: FilterInput) {
    filterCount(input: $input) {
      authors {
        name
        count
      }
      genres {
        name
        count
      }
      publishers {
        name
        count
      }
      publishDates {
        year
        count
      }
      pages {
        pages
        count
      }
      ratings {
        rating
        count
      }
    }
  }
`);
