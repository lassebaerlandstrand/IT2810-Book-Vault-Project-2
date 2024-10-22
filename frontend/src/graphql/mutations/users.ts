import { gql } from '@/generated';

export const CREATE_USER = gql(`
  mutation CreateUser {
    createUser {
      UUID
      name
      at
      wantToRead
      haveRead
    }
  }
`);
