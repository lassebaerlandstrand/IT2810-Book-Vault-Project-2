import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <AppShell padding="md" header={{ height: 50 }} /* Number is automatically converted to rem */>
      <AppShell.Header>TODO: Header component here</AppShell.Header>
      <AppShell.Main className={styles.wrapper}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
