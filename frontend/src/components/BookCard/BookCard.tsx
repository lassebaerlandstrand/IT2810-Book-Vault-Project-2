import { Card, Flex, Image, Rating, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import styles from './BookCard.module.css';

type BookCardProps = {
  book: Book;
  rating?: number;
};

const BookCard = (props: BookCardProps) => {
  return (
    <>
      <Card p={30} radius="lg" className={styles.card} m="auto">
        <Card.Section h={200}>
          <Image
            src={props.book.coverImg}
            alt={`Cover image for ${props.book.title}`}
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
          <Text
            fw={600}
            component="h4"
            lineClamp={2}
            title={props.book.title}
            className={styles.bookTitle}
          >
            {props.book.title}
          </Text>
          {props.rating ? (
            <Flex justify="center" align="center" gap={7} mt="xs">
              <Rating value={Math.round(props.rating * 2) / 2} fractions={2} readOnly />
              <Text fw={500}>{props.rating.toFixed(1)}</Text>
            </Flex>
          ) : (
            <Text
              size="xs"
              lineClamp={2}
              title={props.book.authors.join(', ')}
              className={styles.bookAuthor}
            >
              {props.book.authors[0]} {props.book.authors.length > 1 ? 'et al.' : ''}
            </Text>
          )}
        </Card.Section>
      </Card>
    </>
  );
};

export default BookCard;
