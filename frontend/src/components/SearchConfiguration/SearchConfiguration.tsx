import { useEffect, useState } from 'react';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import {
  Center,
  Checkbox,
  Drawer,
  InputLabel,
  MultiSelect,
  SegmentedControl,
  SimpleGrid,
} from '@mantine/core';
import { Author, Genre, Publisher, SortBy, SortOrder } from '@/generated/graphql';
import { getFilterParams } from '@/utils/filters';
import { DEFAULT_PAGE } from '@/utils/pagination';
import { updateQueryParams } from '@/utils/queryParams';
import styles from './SearchConfiguration.module.css';

type Updates = {
  [key: string]: string | string[];
};

type SearchConfigurationProps = {
  genres: Genre[];
  publishers: Publisher[];
  authors: Author[];
  useDrawer: boolean;
  opened?: boolean;
  close?: () => void;
};

const SearchConfiguration = ({
  genres,
  publishers,
  authors,
  useDrawer,
  opened,
  close,
}: SearchConfigurationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    sortBy: initialSortBy,
    sortOrder: initialSortOrder,
    genres: initialGenres,
    publishers: initialPublishers,
    authors: initialAuthors,
  } = getFilterParams(searchParams);

  const [sortBy, setSortBy] = useState<SortBy>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenres);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(initialPublishers);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(initialAuthors);
  const [updates, setUpdates] = useState<Updates>({});
  const [shouldUpdateParams, setShouldUpdateParams] = useState(false);

  // Update search params. If useDrawer is true, we wait to apply the changes until the drawer is closed
  useEffect(() => {
    if (shouldUpdateParams && !useDrawer) {
      updateParameters();
      setShouldUpdateParams(false);
    }
  }, [shouldUpdateParams, useDrawer]);

  if (useDrawer && (close == null || opened == null)) {
    throw new Error('open and close functions must be provided when useDrawer is true');
  }

  const handleParamsChange = (key: string, value: string | string[]) => {
    setUpdates((current) => ({ ...current, [key]: value }));
    setShouldUpdateParams(true);
  };

  const updateParameters = () => {
    updateQueryParams(setSearchParams, 'page', DEFAULT_PAGE.toString());
    Object.entries(updates).forEach(([key, value]) => {
      updateQueryParams(setSearchParams, key, value);
    });
    setUpdates({});
  };

  const handleGenreChange = (genre: string, isChecked: boolean) => {
    const newSelection = isChecked
      ? [...selectedGenres, genre]
      : selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(newSelection);
    handleParamsChange('genres', newSelection);
  };

  const content = (
    <>
      <InputLabel>Sort by:</InputLabel>
      <SegmentedControl
        classNames={{ innerLabel: styles.innerLabel }}
        data={[
          { label: 'Book name', value: SortBy.BookName },
          { label: 'Author name', value: SortBy.AuthorName },
          { label: 'Publisher name', value: SortBy.PublisherName },
        ]}
        value={sortBy}
        onChange={(value) => {
          setSortBy(value as SortBy);
          handleParamsChange('sortBy', value);
        }}
        fullWidth
      />
      <SegmentedControl
        classNames={{ innerLabel: styles.innerLabel }}
        data={[
          {
            value: SortOrder.Asc,
            label: (
              <Center>
                <IconSortAscending /> Ascending
              </Center>
            ),
          },
          {
            value: SortOrder.Desc,
            label: (
              <Center>
                <IconSortDescending /> Descending
              </Center>
            ),
          },
        ]}
        value={sortOrder}
        onChange={(value) => {
          setSortOrder(value as SortOrder);
          handleParamsChange('sortOrder', value);
        }}
        fullWidth
      />
      <MultiSelect
        classNames={{ root: styles.multiSelect }}
        label="Publisher"
        placeholder="Pick value"
        data={publishers.map((publisher) => publisher.name)}
        hidePickedOptions
        limit={30}
        value={selectedPublishers}
        onChange={(value) => {
          setSelectedPublishers(value);
          handleParamsChange('publishers', value);
        }}
        searchable
        clearable
        nothingFoundMessage="No publisher matches your search"
      />
      <MultiSelect
        classNames={{ root: styles.multiSelect }}
        label="Authors"
        placeholder="Pick value"
        data={authors.map((author) => author.name)}
        hidePickedOptions
        limit={30}
        value={selectedAuthors}
        onChange={(value) => {
          setSelectedAuthors(value);
          handleParamsChange('authors', value);
        }}
        searchable
        clearable
        nothingFoundMessage="No author matches your search"
      />
      <InputLabel mt={10}>Genres</InputLabel>
      <SimpleGrid cols={2} mt="xs">
        {genres.map((genre) => (
          <Checkbox
            value={genre.name}
            label={genre.name}
            checked={selectedGenres.includes(genre.name)}
            onChange={(event) => handleGenreChange(genre.name, event.target.checked)}
          />
        ))}
      </SimpleGrid>
    </>
  );

  if (useDrawer && opened != null && close != null) {
    return (
      <Drawer
        opened={opened}
        onClose={() => {
          updateParameters();
          close();
        }}
        title="Configure your search"
      >
        {content}
      </Drawer>
    );
  }

  return content;
};

export default SearchConfiguration;
