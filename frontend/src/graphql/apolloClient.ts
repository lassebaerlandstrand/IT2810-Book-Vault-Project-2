import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // You can keep this URI for future use
  cache: new InMemoryCache(),
});

export { client, MockedProvider };
