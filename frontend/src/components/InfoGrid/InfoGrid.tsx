import { Grid, Paper, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import styles from './InfoGrid.module.css';

type InfoGridProps = {
  book: Book;
};

const InfoGrid = ({ book }: InfoGridProps) => {
  const tableInfos = [
    { header: 'Title', description: book.title },
    { header: 'Author', description: book.authors.join(', ') },
    { header: 'Publisher', description: book.publisher },
    { header: 'Genres', description: book.genres.join(', ') },
    { header: 'Rating', description: book.rating },
    { header: 'Pages', description: book.pages },
    { header: 'Format', description: book.bookFormat },
    {
      header: 'Characters',
      description:
        JSON.parse(book.characters.replace(/'/g, '"')).join(', ') || 'No characters registered',
    }, // TODO: Change this when characters has array type. Temporary when parse with JSON.
    { header: 'ISBN', description: book.isbn },
    { header: 'Language', description: book.language },
  ];

  console.log(book.characters);

  if (book.series) {
    tableInfos.push({ header: 'Series', description: book.series });
  }

  return (
    <Paper shadow="sm" radius="md" className={styles.paperBackground} p="xl" my="xl">
      <Grid grow>
        {tableInfos.map((info, index) => (
          <Grid.Col key={index} span={6}>
            <Text fw={700}>{info.header}</Text>
            <Text>{info.description}</Text>
          </Grid.Col>
        ))}
      </Grid>
    </Paper>
  );
};

export default InfoGrid;
