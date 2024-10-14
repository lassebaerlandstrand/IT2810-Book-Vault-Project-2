const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;
const LIMIT_OPTIONS = ['10', '25', '50', '100'];

export const getPaginationParams = (searchParams: URLSearchParams) => {
  const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT;

  return { page, limit, DEFAULT_PAGE, DEFAULT_LIMIT, LIMIT_OPTIONS };
};
