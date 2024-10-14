import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { usePaginationParams } from './usePaginationParams';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;

vi.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }: { children: ReactNode }) => children,
  useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
}));

describe('usePaginationParams', () => {
  const mockUseSearchParams = (params: Record<string, string>) => {
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams(params), vi.fn()]);
  };

  const memoryRouterWrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  test('should return default page and limit when no params are provided', () => {
    mockUseSearchParams({});
    const { result } = renderHook(() => usePaginationParams(), { wrapper: memoryRouterWrapper });

    expect(result.current.page).toBe(DEFAULT_PAGE);
    expect(result.current.limit).toBe(DEFAULT_LIMIT);
  });

  test('should parse page and limit from query parameters', () => {
    mockUseSearchParams({ page: '2', limit: '10' });
    const { result } = renderHook(() => usePaginationParams());

    expect(result.current.page).toBe(2);
    expect(result.current.limit).toBe(10);
  });

  test('should use default values if page or limit is invalid', () => {
    mockUseSearchParams({ page: 'invalid', limit: 'NaN' });
    const { result } = renderHook(() => usePaginationParams());

    expect(result.current.page).toBe(DEFAULT_PAGE);
    expect(result.current.limit).toBe(DEFAULT_LIMIT);
  });

  test('should return default page when negative page is provided', () => {
    mockUseSearchParams({ page: '-5', limit: '50' });
    const { result } = renderHook(() => usePaginationParams());

    expect(result.current.page).toBe(DEFAULT_PAGE);
    expect(result.current.limit).toBe(50);
  });
});
