import { gql } from '@/generated';

/** Mutation to create a new user */
export const CREATE_USER = gql(`
  mutation CreateUser {
    createUser {
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
