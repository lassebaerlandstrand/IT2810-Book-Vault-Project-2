import { IconMoon, IconSunFilled, IconUserCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import {
  ActionIcon,
  Burger,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Transition,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LogoFull } from '../Logo/Logo';
import styles from './Header.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/books', label: 'Books' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleClick = () => {
    if (opened) {
      toggle();
    }
  };

  const items = links.map((link) => (
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
      <Link to="/" className={`${styles.logo} ${styles.item}`}>
        <LogoFull />
      </Link>

      {/* Centered */}
      <Group gap="sm" className={`${styles.item} ${styles.showOnDesktop}`}>
        {items}
      </Group>

      {/* Right */}
      <Group justify="right" className={`${styles.item} ${styles.showOnDesktop}`}>
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

      <Transition mounted={opened} transition="scale-y" duration={200} timingFunction="ease">
        {(transition) => (
          <Paper className={styles.mobileMenu} style={transition}>
            <Stack gap="lg">
              {items}
              <Button onClick={toggleColorScheme}>Change color theme</Button>
            </Stack>
          </Paper>
        )}
      </Transition>
    </Container>
  );
}
