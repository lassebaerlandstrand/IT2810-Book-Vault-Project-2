import { IconAdjustments, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Flex, TextInput } from '@mantine/core';

interface SearchProps {
  open: () => void;
}

const SearchContainer = ({ open }: SearchProps) => {
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

  const handleSubmit = () => {
  };

  return (
    <Flex justify={'center'} mt={10}>
      <TextInput
        placeholder="Search for books"
        leftSection={<IconSearch />}
        value={searchValue}
        onChange={handleInputChange}
        rightSection={
          <ActionIcon onClick={handleSubmit} variant="filled" color="gray">
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
