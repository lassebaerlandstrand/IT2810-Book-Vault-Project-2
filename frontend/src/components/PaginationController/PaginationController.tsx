import { useSearchParams } from 'react-router-dom';
import { Center, Group, Pagination } from '@mantine/core';
import { usePaginationParams } from '@/hooks/usePagination';

type PaginationControllerProps = {
  totalBooks: number;
};

const PaginationController = ({ totalBooks }: PaginationControllerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit } = usePaginationParams();

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  return (
    <>
      <Center>
        <Pagination.Root
          total={Math.ceil(totalBooks / limit)}
          value={page}
          onChange={handlePageChange}
          my="md"
        >
          <Group gap="xs">
            <Pagination.Previous aria-label="Previous Page" />
            <Pagination.Items />
            <Pagination.Next aria-label="Next Page" />
          </Group>
        </Pagination.Root>
      </Center>
    </>
  );
};

export default PaginationController;
