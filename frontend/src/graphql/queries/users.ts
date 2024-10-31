import { gql } from '@/generated';

// This file defines all queries related to users
export const GET_USER = gql(`
  query GetUser($UUID: String!) {
    user(UUID: $UUID) {
      UUID
      name
      at
      wantToRead {
        id
      }
      haveRead {
        id
      }
    }
  }
`);
