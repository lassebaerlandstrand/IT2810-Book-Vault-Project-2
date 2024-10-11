import { Card, Image, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import styles from './BookCard.module.css';

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <>
      <Card p={30} radius="lg" className={styles.card} m="auto">
        <Card.Section h={200}>
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
        </Card.Section>
        <Card.Section mt="xs" h={50} className={styles.textSection}>
          <Text fw={600} component="h4" lineClamp={2} title={book.title}>
            {book.title}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={2} title={book.authors.join(', ')}>
            {book.authors[0]} {book.authors.length > 1 ? 'et al.' : ''}
          </Text>
        </Card.Section>
      </Card>
    </>
  );
};

export default BookCard;
