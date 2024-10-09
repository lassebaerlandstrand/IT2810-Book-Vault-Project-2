import { useSearchParams } from 'react-router-dom';
import { Select } from '@mantine/core';
import { usePaginationParams } from '@/hooks/usePaginationParams';

const options = ['10', '25', '50', '100'];

const EntriesController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { limit, DEFAULT_LIMIT } = usePaginationParams();

  const handleEntiresLimitChange = (newLimit: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('limit', newLimit ?? DEFAULT_LIMIT.toString());
    setSearchParams(newParams);
  };

  return (
    <Select
      description="Number of entries"
      data={options}
      allowDeselect={false}
      value={limit.toString()}
      onChange={handleEntiresLimitChange}
      aria-label="Number of entries"
    />
  );
};

export default EntriesController;
