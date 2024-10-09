import { useSearchParams } from 'react-router-dom';
import { Select } from '@mantine/core';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import styles from './EntriesController.module.css';

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
      description="Entries"
      data={options}
      allowDeselect={false}
      value={limit.toString()}
      onChange={handleEntiresLimitChange}
      aria-label="Number of entries"
      className={styles.select}
    />
  );
};

export default EntriesController;
