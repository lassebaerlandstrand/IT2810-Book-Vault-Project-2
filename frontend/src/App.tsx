import '@mantine/core/styles.css';

import { MockedProvider } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import { mocks } from './graphql/mocks';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MockedProvider mocks={mocks} addTypename>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </MockedProvider>
  );
}
