import { IconBookOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Grid, Group, Text } from '@mantine/core';
import { Review } from '@/generated/graphql';
import ReviewCard from '../ReviewCard/ReviewCard';
import styles from './ReviewStack.module.css';

type ReviewProps = {
  reviews?: Review[];
  type: 'pfp' | 'book' | 'you';
};

const ReviewStack = ({ reviews, type }: ReviewProps) => {
  if (!reviews || reviews.length === 0) {
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
      <Grid my="xs" gutter="md">
        {reviews.map((review, index) => (
          <Grid.Col key={index} span={{ base: 12 }}>
            {type == 'book' ? (
              <Link to={`/book/${review.book?.id}`} className={styles.link}>
                <ReviewCard review={review} type={type} />
              </Link>
            ) : (
              <Link to={`/user/${review.user?.UUID}`} className={styles.link}>
                <ReviewCard review={review} type={type} />
              </Link>
            )}
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default ReviewStack;
