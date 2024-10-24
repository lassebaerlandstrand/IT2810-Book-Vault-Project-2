import '@mantine/core/styles.css';

import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { client } from './graphql/apolloClient';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </MantineProvider>
  );
}
