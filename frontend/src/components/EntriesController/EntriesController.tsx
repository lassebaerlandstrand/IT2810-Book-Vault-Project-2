import { useSearchParams } from 'react-router-dom';
import { Select } from '@mantine/core';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import styles from './EntriesController.module.css';

const EntriesController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { limit, DEFAULT_LIMIT, LIMIT_OPTIONS } = usePaginationParams();

  const handleEntiresLimitChange = (newLimit: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('limit', newLimit ?? DEFAULT_LIMIT.toString());
    setSearchParams(newParams);
  };

  return (
    <Select
      description="Entries"
      data={LIMIT_OPTIONS}
      allowDeselect={false}
      value={limit.toString()}
      onChange={handleEntiresLimitChange}
      aria-label="Number of entries"
      className={styles.select}
      data-testid="entries-select"
    />
  );
};

export default EntriesController;
