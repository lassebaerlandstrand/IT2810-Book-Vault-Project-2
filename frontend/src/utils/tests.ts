/**
 * Removes random attributes generated by Mantine from DOM elements.
 * This is necessary to ensure consistent snapshots in tests, as Mantine uses random IDs.
 */
export const removeMantineRandomAttributes = () => {
  const attributesToRemove = [
    ...document.body.querySelectorAll('div [id^="mantine"]'),
    ...document.body.querySelectorAll('div [for^="mantine"]'),
  ];
  attributesToRemove.forEach((element) => {
    element.removeAttribute('for');
    element.removeAttribute('id');
    element.removeAttribute('class');
    element.removeAttribute('aria-describedby');
    element.removeAttribute('name');
  });
};
