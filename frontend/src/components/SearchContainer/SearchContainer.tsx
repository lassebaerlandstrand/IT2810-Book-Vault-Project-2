import { useState } from 'react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Flex, TextInput } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { DEFAULT_PAGE } from '@/utils/pagination';
import { updateQueryParams } from '@/utils/queryParams';
import { getSearchParams } from '@/utils/search';

const SearchContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchValue: initialSearchValue } = getSearchParams(searchParams);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const performSearch = (searchValue: string) => {
    updateQueryParams(setSearchParams, 'page', DEFAULT_PAGE.toString());
    updateQueryParams(setSearchParams, 'search', searchValue);
  };

  return (
    <Flex justify="center" my={10}>
      <TextInput
        placeholder="Search for books"
        leftSection={<IconSearch aria-label="Search icon" />}
        value={searchValue}
        onInput={(event) => {
          setSearchValue((event.target as HTMLInputElement).value);
        }}
        onKeyDown={getHotkeyHandler([['Enter', () => performSearch(searchValue)]])}
        rightSection={
          <ActionIcon
            aria-label="Perform search"
            onClick={() => performSearch(searchValue)}
            variant="filled"
          >
            <IconArrowRight size="80%" aria-label="Arrow pointing right" />
          </ActionIcon>
        }
      />
    </Flex>
  );
};

export default SearchContainer;
