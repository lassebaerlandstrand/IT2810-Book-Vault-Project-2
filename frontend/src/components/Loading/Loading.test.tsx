import { render } from '@test-utils';
import { describe, expect, it } from 'vitest';
import Loading from './Loading';

describe('Loading', () => {
  it('renders a centered loader with the correct props', () => {
    const container = render(<Loading />);

    const loaderElement = container.baseElement.getElementsByClassName('mantine-Loader-root')[0];
    expect(loaderElement).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Loading />);
    const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
