import '@mantine/core/styles.css';

import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { UserProvider } from './contexts/UserContext';
import { client } from './graphql/apolloClient';
import { Router } from './Router';
import { resolver, theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <ApolloProvider client={client}>
        <UserProvider>
          <Router />
        </UserProvider>
      </ApolloProvider>
    </MantineProvider>
  );
}
