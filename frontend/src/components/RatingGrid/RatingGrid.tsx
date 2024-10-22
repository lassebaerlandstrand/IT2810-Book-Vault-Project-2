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

type User = {
  name: string;
  id: string;
};

type RatingCardProps = {
  book?: Book;
  user?: User;
  review: Review;
};

type ReviewProps = {
  reviews: RatingCardProps[];
};

const RatingGrid = ({ reviews }: ReviewProps) => {
  if (reviews.length === 0) {
    return (
      <Group justify="center" align="center" className={styles.noResultWrapper}>
        <IconBookOff />
        <Text size="xl" fw={700} my="xl">
          No reviews found
        </Text>
      </Group>
    );
  }

  return (
    <>
      <Grid my="xl" gutter="md">
        {reviews.map((review, index) => (
          <Grid.Col key={index} span={{ base: 12 }}>
            {review.book ? (
              <Link to={`/book/${review.book.id}`} className={styles.link}>
                <RatingCard book={review.book} review={review.review} />
              </Link>
            ) : (
              <Link to={`/user/${review.user?.id}`} className={styles.link}>
                <RatingCard user={review.user} review={review.review} />
              </Link>
            )}
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default RatingGrid;
