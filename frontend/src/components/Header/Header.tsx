import { useEffect } from 'react';
import { IconMoon, IconSunFilled, IconUserCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import {
  ActionIcon,
  Burger,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Transition,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { LogoFull } from '../Logo/Logo';
import styles from './Header.module.css';

const mainLinks = [
  { link: '/', label: 'Home' },
  { link: '/books', label: 'Books' },
];

// Links that should show on the mobile drop down, but has an alternate display style on desktop
const mobileLinks = [{ link: '/', label: 'Profile' }];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleClick = () => {
    if (opened) {
      toggle();
    }
  };

  useEffect(() => {
    close();
  }, [isDesktop]);

  const items = mainLinks.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={`${styles.link} ${styles.removeLinkStyling}`}
      onClick={handleClick}
    >
      {link.label}
    </Link>
  ));

  const mobileItems = mobileLinks.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={`${styles.link} ${styles.removeLinkStyling}`}
      onClick={handleClick}
    >
      {link.label}
    </Link>
  ));

  return (
    <Container className={styles.wrapper}>
      {/* Left */}
      <Link to="/" className={`${styles.item} ${styles.logo}`}>
        <LogoFull />
      </Link>

      {/* Centered */}
      <Group gap="sm" className={`${styles.item} ${styles.showOnlyOnDesktop}`}>
        {items}
      </Group>

      {/* Right */}
      <Group justify="right" className={`${styles.item} ${styles.showOnlyOnDesktop}`}>
        <ActionIcon
          onClick={toggleColorScheme}
          variant="subtle"
          color="light"
          aria-label="Change color theme"
          size="lg"
        >
          {computedColorScheme === 'dark' ? <IconSunFilled /> : <IconMoon />}
        </ActionIcon>
        <Link to={''} className={styles.removeLinkStyling}>
          <ActionIcon variant="subtle" size="lg" aria-label="Go to profile page" color="light">
            <IconUserCircle />
          </ActionIcon>
        </Link>
      </Group>

      {/* Mobile */}
      <Burger opened={opened} onClick={toggle} className={styles.burgerIcon} />

      <Transition mounted={opened} transition="scale-y" duration={300} timingFunction="ease">
        {(transition) => (
          <Paper className={styles.mobileMenu} style={transition}>
            <Stack gap="lg">
              {items}
              {mobileItems}
              <Divider />
              <Button onClick={toggleColorScheme}>
                Change to {computedColorScheme === 'dark' ? 'light' : 'dark'} mode
              </Button>
            </Stack>
          </Paper>
        )}
      </Transition>
    </Container>
  );
}
