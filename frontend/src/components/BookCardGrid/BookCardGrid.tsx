import { IconBookOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Grid, Group, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import BookCard from '../BookCard/BookCard';
import styles from './BookCardGrid.module.css';

type BookRating = {
  id: string;
  rating: number;
};
type BookCardGridProps = {
  books: Book[];
  ratings?: BookRating[];
};

const BookCardGrid = (props: BookCardGridProps) => {
  if (props.books.length === 0) {
    return (
      <Group justify="center" align="center" className={styles.noResultWrapper}>
        <IconBookOff />
        <Text size="xl" fw={700} my="xl">
          No books found
        </Text>
      </Group>
    );
  }

  return (
    <>
      <Grid my="xl" gutter="md">
        {props.books.map((book, index) => (
          <Grid.Col key={book.id} span={{ base: 12, xxs: 6, xs: 4, sm: 3, md: 3 }}>
            <Link to={`/book/${book.id}`} className={styles.link}>
              {props.ratings ? (
                <BookCard book={book} rating={props.ratings[index].rating} />
              ) : (
                <BookCard book={book} />
              )}
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default BookCardGrid;
