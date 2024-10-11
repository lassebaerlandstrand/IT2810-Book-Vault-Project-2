import { Link } from 'react-router-dom';
import { Button, Container, Group, Image, Text, Title, useMantineColorScheme } from '@mantine/core';
import BookVaultLogo from '@/assets/BookVaultLogo.png';
import { StatsGroup } from '@/components/StatsGroup/StatsGroup';
import styles from './Home.module.css';

export function HomePage() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.centerContent}>
          <Image src={BookVaultLogo} alt="Book Vault Logo" className={styles.logo} />

          <Title className={styles.title}>Welcome to Book Vault</Title>

          <Text className={styles.text}>Explore books, manage your profile, and read reviews</Text>
        </div>

        <Group className={styles.group}>
          <Link to="/books" className={styles.link}>
            <Button size="lg" variant="outline" className={styles.button} disabled>
              Books
            </Button>
          </Link>

          <Link to="/profile" className={styles.link}>
            <Button size="lg" variant="outline" className={styles.button} disabled>
              Profile
            </Button>
          </Link>

          <Link to="/reviews" className={styles.link}>
            <Button size="lg" variant="outline" className={styles.button} disabled>
              Reviews
            </Button>
          </Link>
        </Group>

        <div className={styles.centerContent}>
          <Button onClick={toggleColorScheme}>Switch to {isDark ? 'Light' : 'Dark'} Mode</Button>
        </div>
      </Container>

      <Container my="xl" className={styles.statsContainer}>
        <StatsGroup />
      </Container>
    </>
  );
}
