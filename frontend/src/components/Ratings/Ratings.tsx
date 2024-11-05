import { Property } from 'csstype';
import { Flex, MantineSize, Rating, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import { formatNumberWithSpaces } from '@/utils/formatting';

interface RatingsProps {
  book: Pick<Book, 'rating' | 'numRatings'>;
  size?: MantineSize;
  verbose?: boolean;
  justify?: Property.JustifyContent;
}

export const Ratings = ({ book, verbose = true, size = 'md', justify = 'left' }: RatingsProps) => {
  return (
    <Flex justify={justify} gap={5} mt="xs" wrap="wrap" align="center">
      <Rating value={Math.round(book.rating * 2) / 2} fractions={2} readOnly size={size} />
      <Text fw={500} size={size}>
        {book.rating.toFixed(1)}
      </Text>
      <Text c="dimmed" size={size}>
        ({formatNumberWithSpaces(book.numRatings)}
        {verbose ? (book.numRatings === 1 ? ' rating' : ' ratings') : ''})
      </Text>
    </Flex>
  );
};
