import { IconBookOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Grid, Group, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import BookCard from '../BookCard/BookCard';
import styles from './BookCardGrid.module.css';

type BookCardGridProps = {
  books: Book[];
};

const BookCardGrid = ({ books }: BookCardGridProps) => {
  if (books.length === 0) {
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
        {books.map((book) => (
          <Grid.Col key={book.id} span={{ base: 12, xxs: 6, xs: 4, sm: 3, md: 3 }}>
            <Link to={`/book/${book.id}`} className={styles.link}>
              <BookCard book={book} />
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default BookCardGrid;
