import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { UserProvider } from './contexts/UserContext';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <UserProvider>
        <Router />
      </UserProvider>
    </MantineProvider>
  );
}
