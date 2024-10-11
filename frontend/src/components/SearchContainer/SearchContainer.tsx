import { IconAdjustments, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, Flex, TextInput } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';

interface SearchProps {
  open: () => void;
  onSearch: () => void;
  setSearchValue: (value: string) => void;
  searchValue: string;
}

const SearchContainer = ({ open, onSearch, searchValue, setSearchValue }: SearchProps) => {
  return (
    <Flex justify="center" my={10}>
      <TextInput
        placeholder="Search for books"
        leftSection={<IconSearch />}
        value={searchValue}
        onInput={(event) => {
          setSearchValue((event.target as HTMLInputElement).value);
        }}
        onKeyDown={getHotkeyHandler([['Enter', onSearch]])}
        rightSection={
          <ActionIcon onClick={onSearch} variant="filled" color="gray">
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
