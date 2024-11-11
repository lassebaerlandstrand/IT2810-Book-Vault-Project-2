// AnimatedText.test.tsx
import { render, screen } from '@test-utils';
import { vi } from 'vitest';
import { useElementSize, useMediaQuery } from '@mantine/hooks';
import { removeMantineRandomAttributes } from '@/utils/tests';
import { FindYourNextBookAnimatedText } from './AnimatedText';

vi.mock('@mantine/hooks');

describe('AnimatedText component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // (useMediaQuery as jest.Mock).mockReturnValue(true);
    (useElementSize as jest.Mock).mockReturnValue({
      ref: { current: null },
      width: 1000,
      height: 100,
    });
    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('has correct aria-label', () => {
    render(<FindYourNextBookAnimatedText />);
    expect(screen.getByLabelText('Find your next favorite book')).toBeInTheDocument();
  });

  it('renders with desktop styles when screen is large', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    const { container } = render(<FindYourNextBookAnimatedText />);
    expect(container.querySelector('h1')).toHaveStyle({ textAlign: 'center' });
  });

  it('renders with mobile styles when screen is small', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    const { container } = render(<FindYourNextBookAnimatedText />);
    expect(container.querySelector('h1')).toHaveStyle({ textAlign: 'left' });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<FindYourNextBookAnimatedText />);
    removeMantineRandomAttributes();
    expect(asFragment()).toMatchSnapshot();
  });
});