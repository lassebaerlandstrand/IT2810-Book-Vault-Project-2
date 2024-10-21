import { render } from '@test-utils';
import { LogoFull, LogoIcon, LogoText } from './Logo';

describe('Logo', () => {
  it('LogoFull matches snapshot', () => {
    const { asFragment } = render(<LogoFull />);
    const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('LogoIcon matches snapshot', () => {
    const { asFragment } = render(<LogoIcon />);
    const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('LogoText matches snapshot', () => {
    const { asFragment } = render(<LogoText />);
    const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
