import { Card, Image, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import styles from './BookCard.module.css';

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <>
      <Card p="xl" radius="lg" className={styles.card}>
        <Card.Section>
          <Image
            src={book.coverImg}
            alt={`Cover image for ${book.title}`}
            fit="contain"
            fallbackSrc="https://placehold.co/200x300?text=Cover%20image%20for%20book"
            radius="lg"
          />
        </Card.Section>
        <Card.Section mt="xs">
          <Text fw={600} component="h4">
            {book.title}
          </Text>
          <Text size="xs" c="dimmed">
            {book.authors[0]} {book.authors.length > 1 ? 'et al.' : ''}
          </Text>
        </Card.Section>
      </Card>
    </>
  );
};

export default BookCard;
