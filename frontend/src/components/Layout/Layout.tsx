import { Outlet } from 'react-router-dom';
import useScrollbarSize from 'react-scrollbar-size';
import { AppShell, MantineStyleProp } from '@mantine/core';
import { HeaderSimple } from '../HeaderSimple/HeaderSimple';
import styles from './Layout.module.css';

const Layout = () => {
  const { width } = useScrollbarSize();

  // Reserve space for the scrollbar
  const reserveScrollbarByReducingWidth: MantineStyleProp = {
    width: `calc(100vw - ${width}px)`,
  };

  // Cannot use this on AppShell, as we will get a horizontal scrollbar. We use this on the header else we would get an odd looking gap.
  const reserveScrollbarWithPadding: MantineStyleProp = {
    width: `100vw`,
    paddingRight: width,
  };

  return (
    <AppShell padding="xl" header={{ height: 56 }} style={reserveScrollbarByReducingWidth}>
      <AppShell.Header className={styles.header} style={reserveScrollbarWithPadding}>
        <HeaderSimple />
      </AppShell.Header>
      <AppShell.Main className={styles.wrapper}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
