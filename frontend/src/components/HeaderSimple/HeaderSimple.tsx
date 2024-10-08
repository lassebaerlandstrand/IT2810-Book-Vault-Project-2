import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Burger, Container, Group, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/HomePage2', label: 'Page 2' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const handleClick = (link: string) => {
    setActive(link);
    if (opened) {
      toggle();
    }
  };

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => handleClick(link.link)}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Container>

      <Transition mounted={opened} transition="scale" duration={200} timingFunction="ease">
        {(styles) => (
          <Paper className={classes.mobileMenu} style={styles}>
            <Burger className={classes.burgerIcon} opened={opened} onClick={toggle} size="sm" />
            {items}
          </Paper>
        )}
      </Transition>
    </header>
  );
}
