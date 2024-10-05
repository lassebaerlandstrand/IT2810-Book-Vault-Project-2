import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { Center, Drawer, InputLabel, MultiSelect, SegmentedControl } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchContainer from '@/components/SearchContainer/SearchContainer';

// TODO: Dummy data
export const initialData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

// TODO: Use a real function and not a dummy
export const getData = (seachInput: string) => {
  return initialData;
};

// TODO: Use a real function and not a dummy
export const getGenres = () => {
  return [
    { value: 'action', label: 'Action' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'drama', label: 'Drama' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'horror', label: 'Horror' },
    { value: 'romance', label: 'Romance' },
    { value: 'sci-fi', label: 'Sci-Fi' },
  ];
};

// TODO: Use a real function and not a dummy
export const getPublishers = () => {
  return [
    { value: 'penguin', label: 'Penguin' },
    { value: 'random-house', label: 'Random House' },
    { value: 'simon-schuster', label: 'Simon & Schuster' },
    { value: 'harper-collins', label: 'Harper Collins' },
    { value: 'hachette', label: 'Hachette' },
  ];
};

// TODO: Use a real function and not a dummy
export const getAuthors = () => {
  return [
    { value: 'stephen-king', label: 'Stephen King' },
    { value: 'j-k-rowling', label: 'J.K. Rowling' },
    { value: 'j-r-r-tolkien', label: 'J.R.R. Tolkien' },
    { value: 'george-r-r-martin', label: 'George R.R. Martin' },
    { value: 'agatha-christie', label: 'Agatha Christie' },
  ];
};

enum SortBy {
  Book = 'book',
  Author = 'author',
  Publisher = 'publisher',
}

enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, { open, close }] = useDisclosure(false);

  // Update the URL search parameters when filters change
  const handleParamChange = (key: string, value: string | string[]) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (Array.isArray(value)) {
      updatedParams.delete(key); // Remove existing values for this key
      value.forEach((v) => updatedParams.append(key, v)); // Add all values
    } else {
      updatedParams.set(key, value); // Set a single value
    }
    setSearchParams(updatedParams);
    return value;
  };

  // Get parameters from the URL
  const sortBy = searchParams.get('sortBy') || (handleParamChange('sortBy', SortBy.Book) as string);
  const sortOrder =
    searchParams.get('sortOrder') ||
    (handleParamChange('sortOrder', SortOrder.Ascending) as string);
  const selectedAuthors = searchParams.getAll('authors');
  const selectedPublishers = searchParams.getAll('publishers');
  const selectedGenres = searchParams.getAll('genres');

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Configure your search">
        <InputLabel>Sort by:</InputLabel>
        <SegmentedControl
          data={[
            { label: 'Book name', value: SortBy.Book },
            { label: 'Author name', value: SortBy.Author },
            { label: 'Publisher name', value: SortBy.Publisher },
          ]}
          value={sortBy}
          onChange={(value) => handleParamChange('sortBy', value)}
          fullWidth
        />
        <SegmentedControl
          data={[
            {
              value: SortOrder.Ascending,
              label: (
                <Center>
                  <IconSortAscending /> Ascending
                </Center>
              ),
            },
            {
              value: SortOrder.Descending,
              label: (
                <Center>
                  <IconSortDescending /> Descending
                </Center>
              ),
            },
          ]}
          value={sortOrder}
          onChange={(value) => handleParamChange('sortOrder', value)}
          fullWidth
        />
        <MultiSelect
          label="Genres"
          placeholder="Pick value"
          data={getGenres()}
          hidePickedOptions
          value={selectedGenres}
          onChange={(value) => handleParamChange('genres', value)}
          searchable
        />
        <MultiSelect
          label="Publisher"
          placeholder="Pick value"
          data={getPublishers()}
          hidePickedOptions
          value={selectedPublishers}
          onChange={(value) => handleParamChange('publishers', value)}
          searchable
        />
        <MultiSelect
          label="Authors"
          placeholder="Pick value"
          data={getAuthors()}
          hidePickedOptions
          value={selectedAuthors}
          onChange={(value) => handleParamChange('authors', value)}
          searchable
        />
      </Drawer>

      <SearchContainer open={open} />
    </>
  );
}

export default SearchPage;
