import { gql } from '@/generated';

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

export const UPDATE_USER = gql(`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      UUID
      name
    }
  }
`);
