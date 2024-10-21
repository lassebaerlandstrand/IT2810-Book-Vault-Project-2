import { Card, Flex, Grid, Image, Rating, Stack, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import styles from './RatingCard.module.css';

type RatingProps = {
  book: Book;
  rating: number;
  review: string;
  at: Date;
};

const RatingCard = ({ book, rating, review, at }: RatingProps) => {
  return (
    <>
      <Card p={30} radius="lg" className={styles.card} m="auto">
        <Grid>
          <Grid.Col span="content" h={200} className={styles.img}>
            <Image
              src={book.coverImg}
              alt={`Cover image for ${book.title}`}
              fallbackSrc="https://placehold.co/200x300?text=Cover%20image%20for%20book"
              radius="lg"
              fit="contain"
              w="fit-content"
              maw="100%"
              mah="100%"
              m="auto"
            />
          </Grid.Col>
          <Grid.Col span="auto">
            <Grid justify="flex-start">
              <Grid.Col span="auto">
                <Stack gap={0}>
                  <Text fw={600} component="h4" lineClamp={2} className={styles.bookTitle}>
                    Review of {book.title}
                  </Text>
                  <Text fw={500} size="sm" fs="italic" lineClamp={2}>
                    {at.toDateString()}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span="auto">
                <Flex justify="center" align="center" gap={7} mt="xs">
                  <Rating value={rating} fractions={2} readOnly />
                  <Text fw={500}>{rating.toFixed(1)}</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text lineClamp={5}>{review}</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};

export default RatingCard;
