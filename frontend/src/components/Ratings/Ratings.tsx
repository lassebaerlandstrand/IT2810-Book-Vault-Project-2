import { useState } from 'react';
import { Button, Flex, Grid, Group, Rating, Skeleton, Stack, Text, Textarea } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { Book, Rating as RatingType } from '@/generated/graphql';
import { makeReview } from '@/hooks/makeReview';
import { useBookRatings } from '@/hooks/useBookRatings';
import RatingGrid from '../RatingGrid/RatingGrid';
import styles from './Ratings.module.css';

type RatingsProps = {
  book: Book;
};

const Ratings = ({ book }: RatingsProps) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');

  const { ratings, loading, error, refetch } = useBookRatings({ id: book.id });

  const {
    submitReview,
    review: newReview,
    loading: reviewLoading,
    error: reviewError,
  } = makeReview();

  const toggleTextbox = () => {
    setVisible((prev) => !prev);
  };

  const UUID = useUser().info.UUID;

  const submit = () => {
    setVisible(false);
    submitReview({
      userUUID: UUID,
      bookID: book.id,
      description: text,
      rating: rating,
    });
    refetch();
    setRating(1);
    setText('');
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
            <Rating size="xl" onChange={setRating} />

            <Textarea
              value={text}
              onChange={(event) => setText(event.currentTarget.value)}
              label="Your review"
            />

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

        {reviewLoading ? <Skeleton height={100} mt={6} radius="xl" /> : <></>}
        {loading ? (
          <>
            <Skeleton height={100} mt={6} radius="xl" />
            <Skeleton height={100} mt={6} radius="xl" />
            <Skeleton height={100} mt={6} radius="xl" />
          </>
        ) : (
          <></>
        )}

        <RatingGrid reviews={ratings as RatingType[]} type={'pfp'} />

        <Flex justify="center" align="center">
          <Button variant="filled" color="red">
            Load more
          </Button>
        </Flex>
      </Stack>
    </Group>
  );
};

export default Ratings;
