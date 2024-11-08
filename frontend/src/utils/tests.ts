export const removeMantineRandomAttributes = () => {
  const attributesToRemove = [
    ...document.body.querySelectorAll('div [id^="mantine"]'),
    ...document.body.querySelectorAll('div [for^="mantine"]'),
  ]; // Because Mantine uses random ids which causes snapshots to fail
  attributesToRemove.forEach((element) => {
    element.removeAttribute('for');
    element.removeAttribute('id');
    element.removeAttribute('class');
    element.removeAttribute('aria-describedby');
  });
};
