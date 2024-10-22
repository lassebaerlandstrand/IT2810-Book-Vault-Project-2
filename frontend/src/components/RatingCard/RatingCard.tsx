import { Avatar, Card, Flex, Grid, Image, Rating, Stack, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import styles from './RatingCard.module.css';

type Review = {
  description: string;
  rating: number;
  at: Date;
};

type User = {
  name: string;
  id: string;
};

// This component has 2 looks, 1 for when book is defined, one for when user is defined
type RatingProps = {
  book?: Book;
  user?: User;
  review: Review;
};

const RatingCard = ({ book, user, review }: RatingProps) => {
  return (
    <>
      <Card p={30} radius="lg" className={styles.card} m="auto">
        <Grid>
          {book ? (
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
          ) : (
            <></>
          )}
          <Grid.Col span="auto">
            <Grid justify="flex-start">
              {user ? (
                <Grid.Col span="content">
                  <Avatar color="blue">
                    {user.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </Avatar>
                </Grid.Col>
              ) : (
                <></>
              )}
              <Grid.Col span="content">
                <Stack gap={0}>
                  <Text fw={600} component="h4" lineClamp={2} className={styles.bookTitle}>
                    {
                      book ? 'Review of' + book.title : user?.name //Either book or user is set
                    }
                  </Text>
                  <Text fw={500} size="sm" fs="italic" lineClamp={2}>
                    {review.at.toDateString()}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span="content">
                <Flex justify="center" align="center" gap={7} mt="xs">
                  <Rating value={review.rating} fractions={2} readOnly />
                  <Text fw={500}>{review.rating.toFixed(1)}</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text lineClamp={book && 5}>{review.description}</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};

export default RatingCard;
