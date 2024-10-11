import { Link } from 'react-router-dom';
import { Button, Group, Image, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import BookVaultLogo from '@/assets/BookVaultLogo.png';
import { StatsGroup } from '@/components/StatsGroup/StatsGroup';
import styles from './home.module.css';

export function HomePage() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Paper className={styles.paperMain}>
        <Image src={BookVaultLogo} alt="Book Vault Logo" className={styles.logo} />

        <Title order={1} className={styles.title}>
          Welcome to Book Vault
        </Title>

        <Text className={styles.subtitle}>
          Explore books, manage your profile, and read reviews
        </Text>

        <Group className={styles.buttonGroup}>
          <Link to="/books">
            <Button size="lg" variant="outline" className={styles.button} disabled>
              Books
            </Button>
          </Link>
          <Link to="/profile">
            <Button size="lg" variant="outline" className={styles.button} disabled>
              Profile
            </Button>
          </Link>
          <Link to="/reviews">
            <Button size="lg" variant="outline" className={styles.button} disabled>
              Reviews
            </Button>
          </Link>
        </Group>

        <Button className={styles.switchButton} onClick={toggleColorScheme}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Button>
      </Paper>

      <StatsGroup />
    </>
  );
}
