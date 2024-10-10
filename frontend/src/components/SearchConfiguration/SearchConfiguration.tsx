import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { Center, InputLabel, MultiSelect, SegmentedControl } from '@mantine/core';
import styles from './SearchConfiguration.module.css';

export enum SortBy {
  Book = 'book',
  Author = 'author',
  Publisher = 'publisher',
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

interface SearchConfigurationProps {
  genres: string[];
  publishers: string[];
  authors: string[];
}

const SearchConfiguration = ({ genres, publishers, authors }: SearchConfigurationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParamChange = (key: string, value: string | string[]) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (Array.isArray(value)) {
      updatedParams.delete(key);
      value.forEach((v) => updatedParams.append(key, v));
    } else {
      updatedParams.set(key, value);
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
      <InputLabel>Sort by:</InputLabel>
      <SegmentedControl
        classNames={{ innerLabel: styles.innerLabel }}
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
        classNames={{ innerLabel: styles.innerLabel }}
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
        classNames={{ root: styles.multiSelect }}
        label="Genres"
        placeholder="Pick value"
        data={genres}
        hidePickedOptions
        limit={10}
        value={selectedGenres}
        onChange={(value) => handleParamChange('genres', value)}
        searchable
      />
      <MultiSelect
        classNames={{ root: styles.multiSelect }}
        label="Publisher"
        placeholder="Pick value"
        data={publishers}
        hidePickedOptions
        limit={10}
        value={selectedPublishers}
        onChange={(value) => handleParamChange('publishers', value)}
        searchable
      />
      <MultiSelect
        classNames={{ root: styles.multiSelect }}
        label="Authors"
        placeholder="Pick value"
        data={authors}
        hidePickedOptions
        limit={10}
        value={selectedAuthors}
        onChange={(value) => handleParamChange('authors', value)}
        searchable
      />
    </>
  );
};

export default SearchConfiguration;
