import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT, // You can keep this URI for future use
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        keyFields: ['id'],
      },
      User: {
        keyFields: ['UUID'],
      },
    },
  }),
});

export { client, MockedProvider };
