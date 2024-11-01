import { gql } from '@/generated';

export const GET_STATS = gql(`
  query Query {
    stats {
      totalBooks
      totalAuthors
      totalRatings
    }
  }
`);
