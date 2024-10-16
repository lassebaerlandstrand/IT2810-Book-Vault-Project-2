import { Outlet } from 'react-router-dom';
import { AppShell, RemoveScroll } from '@mantine/core';
import { HeaderSimple } from '../HeaderSimple/HeaderSimple';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <AppShell padding="md" header={{ height: 56 }} className={RemoveScroll.classNames.zeroRight}>
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
