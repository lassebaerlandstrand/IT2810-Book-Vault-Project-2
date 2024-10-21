import { IconMoon, IconSunFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import {
  ActionIcon,
  Burger,
  Container,
  Group,
  Image,
  Paper,
  Title,
  Transition,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import BookVaultLogo from '../../assets/BookVaultLogo.png';
import styles from './HeaderSimple.module.css';

const links = [
  { link: '/', label: 'HOME' },
  { link: '/books', label: 'BOOKS' },
];

export function HeaderSimple() {
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
    <Link key={link.label} to={link.link} className={`${styles.link}`} onClick={handleClick}>
      {link.label}
    </Link>
  ));

  return (
    <Container className={styles.wrapper}>
      <Link to="/" className={styles.logo}>
        <Image src={BookVaultLogo} />
        <Title order={3} className={styles.title}>
          Book Vault
        </Title>
      </Link>
      <Group className={styles.linksDesktop} gap="sm">
        {items}
        <ActionIcon
          color="white"
          onClick={toggleColorScheme}
          variant="default"
          aria-label="Change color theme"
          size="lg"
        >
          {computedColorScheme === 'dark' ? <IconSunFilled /> : <IconMoon />}
        </ActionIcon>
      </Group>

      <Burger opened={opened} onClick={toggle} className={styles.burgerIcon} />

      <Transition mounted={opened} transition="scale-y" duration={200} timingFunction="ease">
        {(transition) => (
          <Paper className={styles.mobileMenu} style={transition}>
            {items}
          </Paper>
        )}
      </Transition>
    </Container>
  );
}
