import { Link } from 'react-router-dom';
import { Box, Button, Flex, Image, Paper, Stack, Text, Title } from '@mantine/core';
import ReadingBook from '../../assets/ReadingBook.png';
import { LogoTextImage } from '../Logo/Logo';
import styles from './HeroHeader.module.css';

export const HeroHeader = () => {
  return (
    <Paper className={styles.paperMain}>
      <Flex className={styles.wrapper}>
        <Image src={ReadingBook} className={styles.logo} />

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

          <Link to="/books">
            <Button className={styles.button}>Try your luck with a random book</Button>
          </Link>
        </Stack>
      </Flex>
    </Paper>
  );
};
