import { IconBookOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Grid, Group, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import RatingCard from '../RatingCard/RatingCard';
import styles from './RatingGrid.module.css';

type Review = {
  description: string;
  rating: number;
  at: Date;
};

type ReviewAndBook = {
  book: Book;
  review: Review;
};

type ReviewProps = {
  reviews: ReviewAndBook[];
};

const RatingGrid = ({ reviews }: ReviewProps) => {
  if (reviews.length === 0) {
    return (
      <Group justify="center" align="center" className={styles.noResultWrapper}>
        <IconBookOff />
        <Text size="xl" fw={700} my="xl">
          No books found
        </Text>
      </Group>
    );
  }

  return (
    <>
      <Grid my="xl" gutter="md">
        {reviews.map((review) => (
          <Grid.Col key={review.book.id} span={{ base: 12 }}>
            <Link to={`/book/${review.book.id}`} className={styles.link}>
              <RatingCard book={review.book} review={review.review} />
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default RatingGrid;
