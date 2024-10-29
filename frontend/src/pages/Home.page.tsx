import {
  IconCompass,
  IconCrystalBall,
  IconGlobe,
  IconHourglassEmpty,
  IconMasksTheater,
  IconPencil,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Button, Group, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import BookCategories from '@/components/BookCategories/BookCategories';
import { LogoIcon } from '@/components/Logo/Logo';
import { StatsGroup } from '@/components/StatsGroup/StatsGroup';
import styles from './Home.module.css';

const iconThickness = 1;

// TODO: Update links
const popularCategories = [
  { name: 'Drama', icon: <IconMasksTheater stroke={iconThickness} />, link: '/books?' },
  { name: 'Historical', icon: <IconHourglassEmpty stroke={iconThickness} />, link: '/books?' },
  { name: 'Geography', icon: <IconGlobe stroke={iconThickness} />, link: '/books?' },
  { name: 'Fantasy/Fiction', icon: <IconCrystalBall stroke={iconThickness} />, link: '/books?' },
  { name: 'Action/Adventure', icon: <IconCompass stroke={iconThickness} />, link: '/books?' },
  { name: 'Literature', icon: <IconPencil stroke={iconThickness} />, link: '/books?' },
];

export function HomePage() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Paper className={styles.paperMain}>
        <LogoIcon className={styles.logo} />

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

      <BookCategories categories={popularCategories} />
    </>
  );
}
