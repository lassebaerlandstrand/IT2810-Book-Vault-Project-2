import { Flex, Rating, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';

interface RatingsProps {
  book: Book;
}

export const Ratings = ({ book }: RatingsProps) => {
  return (
    <Flex justify="right" align="center" gap={7} mt="xs">
      <Rating value={Math.round(book.rating * 2) / 2} fractions={2} readOnly />
      <Text fw={500}>{book.rating.toFixed(1)}</Text>
      <Text c="dimmed" size="s">
        ({book.numRatings} ratings)
      </Text>
    </Flex>
  );
};
