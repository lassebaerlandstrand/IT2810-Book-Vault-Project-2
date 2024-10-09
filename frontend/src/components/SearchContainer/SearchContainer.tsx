import { IconAdjustments, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Flex, TextInput } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';

interface SearchProps {
  open: () => void;
  onSearch: () => void;
}

const SearchContainer = ({ open, onSearch }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('search') || '';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    const params = new URLSearchParams(searchParams);

    if (newValue) {
      params.set('search', newValue);
    } else {
      params.delete('search');
    }

    setSearchParams(params);
  };

  return (
    <Flex justify={'center'} mt={10}>
      <TextInput
        placeholder="Search for books"
        leftSection={<IconSearch />}
        value={searchValue}
        onChange={handleInputChange}
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
