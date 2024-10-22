import { useState } from 'react';
import { Button, Flex, Grid, Group, Rating, Stack, Text, Textarea } from '@mantine/core';
import { Book, Rating as RatingType } from '@/generated/graphql';
import { useBookRatings } from '@/hooks/useBookRatings';
import RatingGrid from '../RatingGrid/RatingGrid';
import styles from './Ratings.module.css';

type RatingsProps = {
  book: Book;
};

const Ratings = ({ book }: RatingsProps) => {
  const [visible, setVisible] = useState(false);
  const { ratings, loading, error } = useBookRatings({ id: book.id });

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

        <RatingGrid reviews={ratings as RatingType[]} type={'pfp'} />
      </Stack>
    </Group>
  );
};

export default Ratings;
