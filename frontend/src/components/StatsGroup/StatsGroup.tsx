import { Container, Text } from '@mantine/core';
import classes from './StatsGroup.module.css';

const data = [
  {
    title: 'Book reviews',
    stats: '48133',
    description: 'A growing collection of insights and thoughts, 24% more reviews added this year',
  },
];

export function StatsGroup() {
  const stats = data.map((stat) => (
    <Container key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </Container>
  ));

  return <div className={classes.root}>{stats}</div>;
}
