import { useRef } from 'react';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { Flex, Grid, Group, Rating, Stack, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import BookReviews from '../BookReviews/BookReviews';
import YourReviewHandler from '../YourReviewHandler/YourReviewHandler';
import styles from './Reviews.module.css';

type ReviewProps = {
  book: Book;
  updateAvgRating: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
};

const Reviews = ({ book, updateAvgRating }: ReviewProps) => {
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
            <Flex justify="right" align="center" gap={7} mt="xs">
              <Rating value={Math.round(book.rating * 2) / 2} fractions={2} readOnly />
              <Text fw={500}>{book.rating.toFixed(1)}</Text>
            </Flex>
          </Grid.Col>
        </Grid>

        <YourReviewHandler book={book} updateAvgRating={updateAvgRating} />

        <BookReviews bookId={book.id} top={topOfReviews} />
      </Stack>
    </Group>
  );
};

export default Reviews;
