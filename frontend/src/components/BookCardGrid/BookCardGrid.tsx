import { Link } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { Books } from '@/pages/Home.page';
import BookCard from '../BookCard/BookCard';
import styles from './BookCardGrid.module.css';

type BookCardGridProps = {
  books: Books;
};

const BookCardGrid = ({ books }: BookCardGridProps) => {
  return (
    <>
      <Grid p="xl">
        {Object.keys(books).map((key) => (
          <Grid.Col key={key} span={{ base: 6, xs: 4, sm: 3, md: 2 }}>
            <Link to={`/book/${key}`} className={styles.link}>
              <BookCard book={books[key]} />
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default BookCardGrid;
