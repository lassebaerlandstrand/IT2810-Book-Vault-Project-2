import { render } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]');
    attributesToRemove.forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
