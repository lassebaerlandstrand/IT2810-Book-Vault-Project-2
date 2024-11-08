import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        keyFields: ['id'],
      },
    },
  }),
});

export { client, MockedProvider };
