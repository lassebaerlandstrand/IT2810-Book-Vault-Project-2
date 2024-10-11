import { render } from '@test-utils';
import SearchContainer from './SearchContainer';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(() => [{ get: vi.fn(), set: vi.fn() }, vi.fn()]),
}));

test('renders SearchContainer', () => {
  const { asFragment } = render(
    <SearchContainer
      open={() => {}}
      onSearch={() => {}}
      setSearchValue={() => {}}
      searchValue={''}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
