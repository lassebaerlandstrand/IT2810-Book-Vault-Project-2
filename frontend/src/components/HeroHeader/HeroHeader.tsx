import { Link } from 'react-router-dom';
import { Box, Button, Flex, Image, Paper, Stack, Text, Title } from '@mantine/core';
import { useRandomBook } from '@/hooks/useRandomBook';
import ReadingBookPNG from '../../assets/ReadingBook.png';
import ReadingBookWebP from '../../assets/ReadingBook.webp';
import { LogoTextImage } from '../Logo/Logo';
import styles from './HeroHeader.module.css';

export const HeroHeader = () => {
  const { id, loading, error } = useRandomBook();

  return (
    <Paper className={styles.paperMain}>
      <Flex className={styles.wrapper}>
        <Image
          src={ReadingBookWebP}
          fallbackSrc={ReadingBookPNG}
          className={styles.vectorImage}
          alt="Person reading a book"
        />

        <Stack className={styles.textContainer}>
          <Box className={styles.titleContainer}>
            <Title order={1} className={styles.title}>
              Welcome to
            </Title>
            <LogoTextImage />
          </Box>

          <Text className={styles.subTitle}>
            Browse, review, and discover your next favorite book in our expansive catalog!
          </Text>

          {!error && (
            <Button
              component={Link}
              to={id ? `/book/${id}` : '/'}
              className={styles.button}
              loading={loading}
              aria-label="Go to a random book"
              data-testid="random-book-button"
            >
              Try your luck with a random book
            </Button>
          )}
        </Stack>
      </Flex>
    </Paper>
  );
};
