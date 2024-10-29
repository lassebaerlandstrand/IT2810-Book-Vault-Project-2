import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Paper, ScrollArea, Text, Title } from '@mantine/core';
import styles from './BookCategories.module.css';

type BookCategoryProps = {
  name: string;
  icon: ReactElement;
  link: string;
};

type BookCategoriesProps = { categories: BookCategoryProps[] };

const BookCategory = ({ name, icon, link }: BookCategoryProps) => {
  return (
    <Link to={link} className={styles.link}>
      <Paper className={styles.categoryCard}>
        {icon}
        <Text>{name}</Text>
      </Paper>
    </Link>
  );
};

const BookCategories = ({ categories }: BookCategoriesProps) => {
  return (
    <Box my="xl">
      <Title order={3} fw={600} mb="sm">
        Popular Categories
      </Title>
      <ScrollArea w="100%" type="auto" offsetScrollbars="x" scrollbarSize={6}>
        <Flex justify="space-between" gap="xl" py="xs">
          {categories.map((category) => (
            <BookCategory key={category.name} {...category} />
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
};

export default BookCategories;
