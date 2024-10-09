import { useSearchParams } from 'react-router-dom';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;

export const usePaginationParams = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || DEFAULT_PAGE);
  const limit = Number(searchParams.get('limit') || DEFAULT_LIMIT);

  return { page, limit, DEFAULT_PAGE, DEFAULT_LIMIT };
};
