import { ReactElement } from 'react';
import {
  IconCompass,
  IconCrystalBall,
  IconGlobe,
  IconHourglassEmpty,
  IconMasksTheater,
  IconPencil,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Box, Flex, Paper, ScrollArea, Text, Title } from '@mantine/core';
import styles from './PopularGenres.module.css';

type BookCategoryProps = {
  name: string;
  icon: ReactElement;
  link: string;
};

type BookCategoriesProps = { categories: BookCategoryProps[]; typeOfCategory: string };

const BookCategory = ({ name, icon, link }: BookCategoryProps) => {
  return (
    <Link to={link} className={styles.link} aria-label={`Go to ${name}`}>
      <Paper className={styles.categoryCard}>
        {icon}
        <Text>{name}</Text>
      </Paper>
    </Link>
  );
};

const BookCategories = ({ categories, typeOfCategory }: BookCategoriesProps) => {
  return (
    <Box my="xl">
      <Title order={2} fw={600} mb="sm" size="h3">
        Popular {typeOfCategory}
      </Title>
      <ScrollArea w="100%" type="auto" offsetScrollbars="x" scrollbarSize={6}>
        <Flex justify="space-between" gap="md" py="xs">
          {categories.map((category) => (
            <BookCategory key={category.name} {...category} />
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
};

const iconThickness = 1;

// TODO: Update links after we have added main categories
const popularCategories = [
  {
    name: 'Drama',
    icon: <IconMasksTheater stroke={iconThickness} aria-label="Drama" />,
    link: '/books?',
  },
  {
    name: 'Historical',
    icon: <IconHourglassEmpty stroke={iconThickness} aria-label="Historical" />,
    link: '/books?',
  },
  {
    name: 'Geography',
    icon: <IconGlobe stroke={iconThickness} aria-label="Geography" />,
    link: '/books?',
  },
  {
    name: 'Fantasy/Fiction',
    icon: <IconCrystalBall stroke={iconThickness} aria-label="Fantasy/Fiction" />,
    link: '/books?',
  },
  {
    name: 'Action/Adventure',
    icon: <IconCompass stroke={iconThickness} aria-label="Action/Adventure" />,
    link: '/books?',
  },
  {
    name: 'Literature',
    icon: <IconPencil stroke={iconThickness} aria-label="Literature" />,
    link: '/books?',
  },
];

const PopularGenres = () => {
  return <BookCategories categories={popularCategories} typeOfCategory="Genres" />;
};

export default PopularGenres;
