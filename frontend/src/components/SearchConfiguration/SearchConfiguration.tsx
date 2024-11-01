import { useEffect, useState } from 'react';
import {
  IconBookOff,
  IconSortAscending,
  IconSortDescending,
  IconStar,
  IconStarFilled,
} from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Center,
  Checkbox,
  ComboboxItem,
  Drawer,
  Group,
  InputLabel,
  LoadingOverlay,
  MultiSelect,
  MultiSelectProps,
  Radio,
  RangeSlider,
  SegmentedControl,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { Author, Genre, Publisher, SortBy, SortOrder } from '@/generated/graphql';
import { useDateSpan } from '@/hooks/useDateSpan';
import { useFilterCount } from '@/hooks/useFilterCount';
import { usePageSpan } from '@/hooks/usePageSpan';
import { getFilterParams, getFormattedFilterCount } from '@/utils/filters';
import { DEFAULT_PAGE } from '@/utils/pagination';
import { updateQueryParams } from '@/utils/queryParams';
import { getSearchParams } from '@/utils/search';
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

type renderMultiSelectOptionProps = {
  option: ComboboxItem;
  count: number | undefined;
};

const renderMultiSelectOption = ({ option, count }: renderMultiSelectOptionProps) => {
  return (
    <Group justify="space-between" className={styles.fullWidth}>
      <Text size="sm">{option.value}</Text>
      <Text size="xs" ta="right" opacity={0.5}>
        {getFormattedFilterCount(count)}
      </Text>
    </Group>
  );
};

const SearchConfiguration = ({ genres, useDrawer, opened, close }: SearchConfigurationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { earliestDate, latestDate, loading: dateSpanLoading } = useDateSpan();
  const { leastPages, mostPages, loading: pageSpanLoading } = usePageSpan();

  const {
    sortBy: initialSortBy,
    sortOrder: initialSortOrder,
    genres: initialGenres,
    publishers: initialPublishers,
    authors: initialAuthors,
    beforeDate: initialBeforeDate,
    afterDate: initialAfterDate,
    minPages: initialMinPages,
    maxPages: initialMaxPages,
    minRating: initialMinRating,
  } = getFilterParams(searchParams);

  const { searchValue } = getSearchParams(searchParams);

  const [sortBy, setSortBy] = useState<SortBy>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenres);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(initialPublishers);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(initialAuthors);
  const [selectedBeforeDate, setSelectedBeforeDate] = useState<Date>(initialBeforeDate);
  const [selectedAfterDate, setSelectedAfterDate] = useState<Date>(initialAfterDate);
  const [selectedMinPages, setSelectedMinPages] = useState<number | undefined>(initialMinPages);
  const [selectedMaxPages, setSelectedMaxPages] = useState<number | undefined>(initialMaxPages);
  const [selectedMinRating, setSelectedMinRating] = useState<number | undefined>(initialMinRating);
  const [updates, setUpdates] = useState<Updates>({});
  const [shouldUpdateParams, setShouldUpdateParams] = useState(false);

  const {
    filterCount: filterCount,
    loading: filterCountLoading,
    error: errorFilterCount,
  } = useFilterCount({
    search: searchValue,
    beforeDate: selectedBeforeDate,
    afterDate: selectedAfterDate,
    authors: selectedAuthors,
    genres: selectedGenres,
    publishers: selectedPublishers,
    minPages: selectedMinPages,
    maxPages: selectedMaxPages,
    minRating: selectedMinRating,
  });

  const [authorLimit, setAuthorLimit] = useState(30);
  const [publisherLimit, setPublisherLimit] = useState(30);

  useEffect(() => {
    setAuthorLimit(30);
    setPublisherLimit(30);
  }, []);

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

  const authorsData = filterCount?.authors.reduce<Record<string, number>>((acc, author) => {
    acc[author.name] = author.count;
    return acc;
  }, {});

  const publishersData = filterCount?.publishers.reduce<Record<string, number>>(
    (acc, publisher) => {
      acc[publisher.name] = publisher.count;
      return acc;
    },
    {}
  );

  const genresData = filterCount?.genres.reduce<Record<string, number>>((acc, genre) => {
    acc[genre.name] = genre.count;
    return acc;
  }, {});

  const renderAuthorOption: MultiSelectProps['renderOption'] = ({ option }) =>
    renderMultiSelectOption({
      option,
      count: authorsData?.[option.value],
    });

  const renderPublisherOption: MultiSelectProps['renderOption'] = ({ option }) =>
    renderMultiSelectOption({
      option,
      count: publishersData?.[option.value],
    });

  let content;

  if (errorFilterCount) {
    content = (
      <Group justify="center" align="center" className={styles.noResultWrapper}>
        <IconBookOff />
        <Text size="xl" fw={700} my="xl">
          Error fetching filters
        </Text>
        <Text size="sm">{errorFilterCount?.message}</Text>
      </Group>
    );
  } else {
    content = (
      <Box pos="relative">
        <LoadingOverlay
          visible={filterCountLoading}
          zIndex={90}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
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
          data={filterCount?.publishers.map((publisher) => publisher.name)}
          renderOption={renderPublisherOption}
          hidePickedOptions
          limit={publisherLimit}
          value={selectedPublishers}
          onChange={(value) => {
            setSelectedPublishers(value);
            handleParamsChange('publishers', value);
          }}
          scrollAreaProps={{
            onBottomReached: () => setPublisherLimit((prevLimit) => prevLimit + 20),
          }}
          searchable
          clearable
          nothingFoundMessage="No publisher matches your search"
        />
        <MultiSelect
          classNames={{ root: styles.multiSelect }}
          label="Authors"
          placeholder="Pick value"
          data={filterCount?.authors.map((author) => author.name)}
          renderOption={renderAuthorOption}
          hidePickedOptions
          limit={authorLimit}
          value={selectedAuthors}
          onChange={(value) => {
            setSelectedAuthors(value);
            handleParamsChange('authors', value);
          }}
          scrollAreaProps={{
            onBottomReached: () => setAuthorLimit((prevLimit) => prevLimit + 20),
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
              description={genresData?.[genre.name] != null ? `${genresData[genre.name]}` : '0'}
              onChange={(event) => handleGenreChange(genre.name, event.target.checked)}
              disabled={(genresData?.[genre.name] ?? 0) === 0}
            />
          ))}
        </SimpleGrid>
        <Radio.Group
          mt={10}
          name="Minimum rating"
          label="Minimum rating"
          value={selectedMinRating?.toString()}
          onChange={(rating) => {
            setSelectedMinRating(parseInt(rating, 10));
            handleParamsChange('minRating', rating.toString());
          }}
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <Radio
              radius="md"
              value={rating.toString()}
              disabled={(filterCount?.ratings.find((r) => r.rating === rating)?.count ?? 0) === 0}
              label={
                <Group justify="space-between" className={styles.fullWidth}>
                  <Group>
                    {Array.from({ length: rating }, (_, i) => (
                      <IconStarFilled key={i} color='gold' />
                    ))}
                    {Array.from({ length: 5 - rating }, (_, i) => (
                      <IconStar key={i} color='gold' />
                    ))}
                  </Group>
                  <Text className={styles.description}>
                    {getFormattedFilterCount(
                      filterCount?.ratings.find((r) => r.rating === rating)?.count ?? 0
                    )}
                  </Text>
                </Group>
              }
            />
          ))}
        </Radio.Group>
        <Box pos="relative">
          <LoadingOverlay
            visible={dateSpanLoading && !filterCountLoading}
            zIndex={90}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <InputLabel mt={10}>Year published</InputLabel>
          <RangeSlider
            classNames={{ trackContainer: styles.trackContainer }}
            min={earliestDate}
            max={latestDate}
            step={1}
            marks={[
              { value: earliestDate, label: `${earliestDate}` },
              { value: Math.floor(earliestDate + (latestDate - earliestDate) / 3), label: `${Math.floor(earliestDate + (latestDate - earliestDate) / 3)}` },
              { value: Math.floor(earliestDate + 2 * (latestDate - earliestDate) / 3), label: `${Math.floor(earliestDate + 2 * (latestDate - earliestDate) / 3)}` },
              { value: latestDate, label: `${latestDate}` },
            ]}
            defaultValue={[earliestDate, latestDate]}
            onChangeEnd={(value) => {
              setSelectedBeforeDate(new Date(value[1], 11, 31));
              setSelectedAfterDate(new Date(value[0], 0, 1));
              handleParamsChange('beforeDate', new Date(value[1], 11, 31).toISOString());
              handleParamsChange('afterDate', new Date(value[0], 0, 1).toISOString());
            }}
          />
        </Box>
        <Box pos="relative">
          <LoadingOverlay
            visible={pageSpanLoading && !filterCountLoading}
            zIndex={90}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <InputLabel mt={30}>Number of pages</InputLabel>
          <RangeSlider
            classNames={{ trackContainer: styles.trackContainer }}
            min={leastPages}
            max={mostPages}
            step={1}
            marks={[
              { value: leastPages, label: `${leastPages}` },
              { value: Math.floor(mostPages/3), label: `${Math.floor(mostPages/3)}` },
              { value: Math.floor(mostPages*2/3), label: `${Math.floor(mostPages*2/3)}` },
              { value: mostPages, label: `${mostPages}` },
            ]}
            defaultValue={[leastPages, mostPages]}
            onChangeEnd={(value) => {
              setSelectedMinPages(value[0]);
              setSelectedMaxPages(value[1]);
              handleParamsChange('minPages', value[0].toString());
              handleParamsChange('maxPages', value[1].toString());
            }}
          />
        </Box>
      </Box>
    );
  }

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
