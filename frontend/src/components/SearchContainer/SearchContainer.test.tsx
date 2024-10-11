import { fireEvent, render, screen } from '@test-utils';
import SearchContainer from './SearchContainer';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(() => [{ get: vi.fn(), set: vi.fn() }, vi.fn()]),
}));

test('renders SearchContainer', () => {
  const { asFragment } = render(
    <SearchContainer open={() => {}} onSearch={() => {}} setSearchValue={() => {}} searchValue="" />
  );
  const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
  attributesToRemove.forEach((element) => {
    element.removeAttribute('id');
    element.removeAttribute('aria-describedby');
  });
  expect(asFragment()).toMatchSnapshot();
});

test('calls setSearchValue on input change', () => {
  const setSearchValue = vi.fn();
  render(
    <SearchContainer
      open={() => {}}
      onSearch={() => {}}
      setSearchValue={setSearchValue}
      searchValue=""
    />
  );

  const input = screen.getByPlaceholderText('Search for books');
  fireEvent.input(input, { target: { value: 'new value' } });

  expect(setSearchValue).toHaveBeenCalledWith('new value');
});

test('calls onSearch on Enter key press', () => {
  const onSearch = vi.fn();
  render(
    <SearchContainer open={() => {}} onSearch={onSearch} setSearchValue={() => {}} searchValue="" />
  );

  const input = screen.getByPlaceholderText('Search for books');
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(onSearch).toHaveBeenCalled();
});
