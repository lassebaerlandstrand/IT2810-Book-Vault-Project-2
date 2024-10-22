import { useState } from 'react';
import { Button, Flex, Grid, Group, Rating, Stack, Text, Textarea } from '@mantine/core';
import { Book } from '@/generated/graphql';
import RatingGrid from '../RatingGrid/RatingGrid';
import styles from './Ratings.module.css';

type RatingsProps = {
  book: Book;
};

const reviews = [
  {
    user: {
      name: 'Strong Monkey',
      id: 'UUIDfdsfdsfds',
    },
    review: {
      description: 'Lorem ipsum dolor sit amet',
      rating: 5,
      at: new Date(),
    },
  },
  {
    user: {
      name: 'Weak Monkey',
      id: 'UUIDfdsfdsfds',
    },
    review: {
      description: 'Lorem ipsum dolor sit amet',
      rating: 3,
      at: new Date(),
    },
  },
  {
    user: {
      name: 'Bonkers Monkey',
      id: 'UUIDfdsfdsfds',
    },
    review: {
      description: 'Lorem ipsum dolor sit amet',
      rating: 2,
      at: new Date(),
    },
  },
];

const Ratings = ({ book }: RatingsProps) => {
  const [visible, setVisible] = useState(false);

  const toggleTextbox = () => {
    setVisible((prev) => !prev);
  };

  const submit = () => {
    setVisible(false);
  };

  return (
    <Group justify="left" gap="lg">
      <Stack className={styles.gridWidth}>
        <Text size="xl" fw={700}>
          Reviews
        </Text>
        {!visible ? (
          <Grid justify="Space-between">
            <Grid.Col span="auto">
              <Button variant="filled" color="red" onClick={toggleTextbox}>
                Give Review
              </Button>
            </Grid.Col>
            <Grid.Col span="auto">
              <Flex justify="right" align="center" gap={7} mt="xs">
                <Rating value={Math.round(book.rating * 2) / 2} fractions={2} readOnly />
                <Text fw={500}>{book.rating.toFixed(1)}</Text>
              </Flex>
            </Grid.Col>
          </Grid>
        ) : (
          <></>
        )}

        {visible ? (
          <>
            <Rating size="xl" />

            <Textarea />

            <Flex justify="Right" gap="lg">
              <Button variant="filled" color="gray" onClick={toggleTextbox}>
                Cancel
              </Button>
              <Button variant="filled" color="red" onClick={submit}>
                Submit review
              </Button>
            </Flex>
          </>
        ) : (
          <></>
        )}

        <RatingGrid reviews={reviews} />
      </Stack>
    </Group>
  );
};

export default Ratings;
