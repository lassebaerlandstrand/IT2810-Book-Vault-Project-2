import { useSearchParams } from 'react-router-dom';
import { Center, Pagination } from '@mantine/core';

type PaginationControllerProps = {
  totalBooks: number;
  limit: number;
};

const PaginationController = ({ totalBooks, limit }: PaginationControllerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
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
