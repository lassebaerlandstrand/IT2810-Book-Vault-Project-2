import { useRef } from 'react';
import { Grid, Group, Stack, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import BookReviews from '../BookReviews/BookReviews';
import { Ratings } from '../Ratings/Ratings';
import YourReviewHandler from '../YourReviewHandler/YourReviewHandler';
import styles from './Reviews.module.css';

type ReviewProps = {
  book: Book;
};

const Reviews = ({ book }: ReviewProps) => {
  // For scrolling to top when reaching bottom
  const topOfReviews = useRef<HTMLDivElement>(null);

  return (
    <Group justify="left" gap="lg" ref={topOfReviews}>
      <Stack gap="sm" className={styles.gridWidth}>
        <Grid justify="Space-between">
          <Grid.Col span="auto">
            <Text size="xl" fw={700}>
              Reviews
            </Text>
          </Grid.Col>
          <Grid.Col span="auto">
            <Ratings book={book} justify="right" />
          </Grid.Col>
        </Grid>

        <YourReviewHandler book={book} />

        <BookReviews bookId={book.id} top={topOfReviews} />
      </Stack>
    </Group>
  );
};

export default Reviews;
