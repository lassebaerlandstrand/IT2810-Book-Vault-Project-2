import { useEffect, useRef } from 'react';
import { IconAdjustments, IconSearch } from '@tabler/icons-react';
import { ActionIcon, Flex, Group, TextInput } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { getData, initialData } from '@/pages/Search.page';

const DEBOUNCE_DELAY = 500;

interface SearchProps {
  open: () => void;
}

function SearchContainer({ open }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceTimeout = useRef<number | null>();

  // Get the current search value from the URL
  const searchValue = searchParams.get('search') || '';

  // Debounced search function for handling user input changes
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear previous timeout if a new input happens
    }

    debounceTimeout.current = window.setTimeout(() => {
      // When debounced time passes, fetch the new data
      getData(searchValue);
    }, DEBOUNCE_DELAY);

    // Clean up timeout on unmount or when value changes
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchValue]);

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
