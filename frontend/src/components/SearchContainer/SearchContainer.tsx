import { useEffect, useState } from 'react';
import { IconAdjustments, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Flex, TextInput } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { getSearchParams } from '@/utils/search';

interface SearchProps {
  open: () => void;
  onSearch: (searchValue: string) => void;
}

const SearchContainer = ({ open, onSearch }: SearchProps) => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const { searchValue } = getSearchParams(searchParams);
    setSearchValue(searchValue);
  }, []);

  return (
    <Flex justify="center" my={10}>
      <TextInput
        placeholder="Search for books"
        leftSection={<IconSearch />}
        value={searchValue}
        onInput={(event) => {
          setSearchValue((event.target as HTMLInputElement).value);
        }}
        onKeyDown={getHotkeyHandler([['Enter', () => onSearch(searchValue)]])}
        rightSection={
          <ActionIcon onClick={() => onSearch(searchValue)} variant="filled" color="gray">
            <IconArrowRight />
          </ActionIcon>
        }
      />
      <ActionIcon onClick={open} ml={10} size="input-sm" color="gray">
        <IconAdjustments />
      </ActionIcon>
    </Flex>
  );
};

export default SearchContainer;
