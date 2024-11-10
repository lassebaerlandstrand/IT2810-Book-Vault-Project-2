import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { Book } from '@/generated/graphql';

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        keyFields: ['id'],
      },
      User: {
        keyFields: ['UUID'],
        fields: {
          wantToRead: {
            merge(existing = [], incoming: Book[]) {
              return [...existing, ...incoming];
            },
          },
          haveRead: {
            merge(existing = [], incoming: Book[]) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export { client, MockedProvider };
