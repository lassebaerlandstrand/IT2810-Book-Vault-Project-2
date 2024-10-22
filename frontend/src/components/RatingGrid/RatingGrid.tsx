import { IconBookOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Grid, Group, Text } from '@mantine/core';
import { Rating } from '@/generated/graphql';
import RatingCard from '../RatingCard/RatingCard';
import styles from './RatingGrid.module.css';

type ReviewProps = {
  reviews?: Rating[];
  type: 'pfp' | 'book';
};

const RatingGrid = ({ reviews, type }: ReviewProps) => {
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
      <Grid my="xl" gutter="md">
        {reviews.map((review, index) => (
          <Grid.Col key={index} span={{ base: 12 }}>
            {type == 'book' ? (
              <Link to={`/book/${review.book.id}`} className={styles.link}>
                <RatingCard review={review} type={type} />
              </Link>
            ) : (
              <Link to={`/user/${review.user?.UUID}`} className={styles.link}>
                <RatingCard review={review} type={type} />
              </Link>
            )}
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default RatingGrid;
