import { fireEvent, render, screen } from '@test-utils';
import SearchContainer from './SearchContainer';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(() => [{ get: vi.fn(), set: vi.fn() }, vi.fn()]),
}));

test('renders SearchContainer', () => {
  const { asFragment } = render(<SearchContainer onSearch={() => {}} />);
  const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
  attributesToRemove.forEach((element) => {
    element.removeAttribute('id');
    element.removeAttribute('aria-describedby');
  });
  expect(asFragment()).toMatchSnapshot();
});

test('do not call onSearch when typing', () => {
  const onSearch = vi.fn();
  render(<SearchContainer onSearch={onSearch} />);

  const input = screen.getByPlaceholderText('Search for books');
  fireEvent.input(input, { target: { value: 'new value' } });

  // onSearch should not be called
  expect(onSearch).not.toHaveBeenCalled();
});

test('calls onSearch on Enter key press', () => {
  const onSearch = vi.fn();
  render(<SearchContainer onSearch={onSearch} />);

  const input = screen.getByPlaceholderText('Search for books');
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(onSearch).toHaveBeenCalled();
});
