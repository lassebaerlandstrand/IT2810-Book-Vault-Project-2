import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { HeaderSimple } from '../HeaderSimple/HeaderSimple';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <AppShell padding="md" header={{ height: 50 }}>
      <AppShell.Header>
        <HeaderSimple />
      </AppShell.Header>
      <AppShell.Main className={styles.wrapper}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
