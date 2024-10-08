import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchConfiguration from '@/components/SearchConfiguration/SearchConfiguration';
import SearchContainer from '@/components/SearchContainer/SearchContainer';

const SearchPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Configure your search">
        <SearchConfiguration />
      </Drawer>
      <SearchContainer open={open} />
    </>
  );
};

export default SearchPage;
