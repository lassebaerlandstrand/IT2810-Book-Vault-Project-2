export const getSearchParams = (searchParams: URLSearchParams) => {
  const searchValue = searchParams.get('search') || '';
  return { searchValue };
};
