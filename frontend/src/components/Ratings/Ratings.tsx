import { Group } from '@mantine/core';
import { Book } from '@/generated/graphql';

type RatingsProps = {
  book: Book;
};

const Ratings = ({ book }: RatingsProps) => {
  return <Group justify="center" gap="lg"></Group>;
};

export default Ratings;
