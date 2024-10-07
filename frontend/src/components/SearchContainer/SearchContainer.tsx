import { IconAdjustments, IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Flex, Group, TextInput } from '@mantine/core';

interface SearchProps {
  open: () => void;
}

function SearchContainer({ open }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current search value from the URL
  const searchValue = searchParams.get('search') || '';

  // Handle input change and update URL search params
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    const params = new URLSearchParams(searchParams);

    if (newValue) {
      params.set('search', newValue); // Update the 'search' param in the URL
    } else {
      params.delete('search'); // Remove 'search' param if input is empty
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
        inputContainer={(children) => (
          <Group align="flex-start">
            {children}
            <ActionIcon onClick={open} size="input-sm" color="gray">
              <IconAdjustments />
            </ActionIcon>
          </Group>
        )}
      />
    </Flex>
  );
}

export default SearchContainer;