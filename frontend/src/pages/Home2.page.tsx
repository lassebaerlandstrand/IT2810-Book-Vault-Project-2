import { Button, Container, Group, Text, Title } from '@mantine/core';
import { StatsGroup } from '@/components/StatsGroup/StatsGroup';
import styles from './HomePage2.module.css';

export function HomePage2() {
  return (
    <>
      <Container className={styles.container}>
        <Title mb="lg" className={styles.title}>
          Welcome to Book Vault
        </Title>
        <Text mb="xl" className={styles.text}>
          Explore books, manage your profile, and read reviews
        </Text>

        <Group gap="lg" mb="xl" className={styles.group}>
          <Button size="lg" variant="outline" component="a" href="/books" className={styles.button}>
            Books
          </Button>
          <Button
            size="lg"
            variant="outline"
            component="a"
            href="/profile"
            className={styles.button}
          >
            Profile
          </Button>
          <Button
            size="lg"
            variant="outline"
            component="a"
            href="/reviews"
            className={styles.button}
          >
            Reviews
          </Button>
        </Group>
      </Container>

      <Container my="xl" className={styles.statsContainer}>
        <StatsGroup />
      </Container>
    </>
  );
}
