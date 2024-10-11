import { render } from '@test-utils';
import Layout from './Layout';

describe('Layout', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Layout />);
    expect(asFragment()).toMatchSnapshot();
  });
});
