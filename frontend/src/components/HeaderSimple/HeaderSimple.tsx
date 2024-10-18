import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Burger, Container, Group, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/', label: 'HOME' },
  { link: '/books', label: 'BOOKS' },
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
      className={`${classes.link} ${active === link.link ? classes.active : ''}`}
      onClick={() => handleClick(link.link)}
    >
      {link.label}
    </Link>
  ));

  return (
    <Container size="md" className={classes.wrapper}>
      <Group className={classes.linksDesktop}>{items}</Group>

      <Burger opened={opened} onClick={toggle} className={classes.burgerIcon} />

      <Transition mounted={opened} transition="scale-y" duration={200} timingFunction="ease">
        {(styles) => (
          <Paper className={classes.mobileMenu} style={styles}>
            {items}
          </Paper>
        )}
      </Transition>
    </Container>
  );
}
