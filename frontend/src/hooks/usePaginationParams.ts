import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;
const LIMIT_OPTIONS = ['10', '25', '50', '100'];

export const usePaginationParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let page = Number(searchParams.get('page') || DEFAULT_PAGE);
  let limit = Number(searchParams.get('limit') || DEFAULT_LIMIT);

  if (isNaN(page) || page <= 0) {
    page = DEFAULT_PAGE;
  }

  if (isNaN(limit) || !LIMIT_OPTIONS.includes(limit.toString())) {
    limit = DEFAULT_LIMIT;
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (Number(searchParams.get('page')) !== page) {
      newParams.set('page', page.toString());
      shouldUpdate = true;
    }

    if (Number(searchParams.get('limit')) !== limit) {
      newParams.set('limit', limit.toString());
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      setSearchParams(newParams, { replace: true });
    }
  }, [page, limit, searchParams, setSearchParams]);

  return { page, limit, DEFAULT_PAGE, DEFAULT_LIMIT, LIMIT_OPTIONS };
};
