import { SetURLSearchParams } from 'react-router-dom';

export const updateQueryParams = (
  setSearchParams: SetURLSearchParams,
  key: string,
  value: string | string[] | undefined
) => {
  setSearchParams((params) => {
    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach((v) => params.append(key, v));
    } else if (value === undefined || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    return params;
  });
};
