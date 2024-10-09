import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Group } from '@mantine/core';
import { fetchBook } from '@/api/dummyApi';
import BookInfo from '@/components/BookInfo/BookInfo';
import { Book as BookType } from '@/generated/graphql';

function Book() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookType | null>();
  useEffect(() => {
    if (bookId) {
      const fetchedBook = fetchBook(bookId);
      setBook(fetchedBook);
    }
  }, [bookId]);

  return book ? (
    <Group justify="center">
      <Container>
        <BookInfo book={book} />
      </Container>
    </Group>
  ) : (
    <div>
      <p>Error</p>
    </div>
  );
}

export default Book;
