import { useEffect, useState } from 'react';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { Center, InputLabel, MultiSelect, SegmentedControl } from '@mantine/core';
import { Author, Genre, Publisher } from '@/generated/graphql';
import { getFilterParams, SortBy, SortOrder } from '@/utils/filters';
import { updateQueryParams } from '@/utils/queryParams';
import styles from './SearchConfiguration.module.css';

interface SearchConfigurationProps {
  genres: Genre[];
  publishers: Publisher[];
  authors: Author[];
  applyFiltersImmediately?: boolean;
  onSearch?: (
    resetPage: boolean,
    newSearchValue?: string,
    newGenres?: string[],
    newPublishers?: string[],
    newAuthors?: string[],
    newSortBy?: SortBy,
    newSortOrder?: SortOrder,
    applyFiltersImmediately?: boolean
  ) => void;
}

const SearchConfiguration = ({
  genres,
  publishers,
  authors,
  applyFiltersImmediately,
  onSearch,
}: SearchConfigurationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Book);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Ascending);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    const { sortBy, sortOrder, genres, publishers, authors } = getFilterParams(searchParams);

    setSortBy(sortBy);
    setSortOrder(sortOrder);
    setSelectedAuthors(authors);
    setSelectedPublishers(publishers);
    setSelectedGenres(genres);
  }, [searchParams]);

  const handleParamChange = (key: string, value: string | string[]) => {
    if (applyFiltersImmediately && onSearch) {
      const newSortBy = key === 'sortBy' ? (value as SortBy) : sortBy;
      const newSortOrder = key === 'sortOrder' ? (value as SortOrder) : sortOrder;
      const newGenres = key === 'genres' ? (value as string[]) : selectedGenres;
      const newPublishers = key === 'publishers' ? (value as string[]) : selectedPublishers;
      const newAuthors = key === 'authors' ? (value as string[]) : selectedAuthors;

      onSearch(
        true,
        undefined,
        newGenres,
        newPublishers,
        newAuthors,
        newSortBy,
        newSortOrder,
        true
      );
    } else {
      updateQueryParams(setSearchParams, key, value);
    }
  };

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
        data={genres.map((genre) => genre.name)}
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
        data={publishers.map((publisher) => publisher.name)}
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
        data={authors.map((author) => author.name)}
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
