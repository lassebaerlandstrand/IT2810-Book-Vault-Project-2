// This file defines all queries related to users

import { gql } from '@/generated';

/** Query to fetch user details including reading lists by UUID */
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
