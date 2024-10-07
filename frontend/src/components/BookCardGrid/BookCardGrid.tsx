import { Link } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { Book } from '@/generated/graphql';
import BookCard from '../BookCard/BookCard';
import styles from './BookCardGrid.module.css';

type BookCardGridProps = {
  books: Book[];
};

const BookCardGrid = ({ books }: BookCardGridProps) => {
  return (
    <>
      <Grid p="xl">
        {books.map((book) => (
          <Grid.Col key={book.id} span={{ base: 12, xxs: 6, xs: 4, sm: 3, md: 2 }}>
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
