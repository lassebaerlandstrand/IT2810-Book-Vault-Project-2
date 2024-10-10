import { useSearchParams } from 'react-router-dom';
import { Center, Pagination } from '@mantine/core';
import { usePaginationParams } from '@/hooks/usePaginationParams';

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
        <Pagination
          total={Math.ceil(totalBooks / limit)}
          value={page}
          onChange={handlePageChange}
          my="md"
        />
      </Center>
    </>
  );
};

export default PaginationController;
