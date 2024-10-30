import {
  IconCompass,
  IconCrystalBall,
  IconGlobe,
  IconHourglassEmpty,
  IconMasksTheater,
  IconPencil,
} from '@tabler/icons-react';
import { Stack } from '@mantine/core';
import BookCategories from '@/components/BookCategories/BookCategories';
import { HeroHeader } from '@/components/HeroHeader/HeroHeader';
import { StatsGroup } from '@/components/StatsGroup/StatsGroup';

const iconThickness = 1;

// TODO: Update links after we have added main categories
const popularCategories = [
  { name: 'Drama', icon: <IconMasksTheater stroke={iconThickness} />, link: '/books?' },
  { name: 'Historical', icon: <IconHourglassEmpty stroke={iconThickness} />, link: '/books?' },
  { name: 'Geography', icon: <IconGlobe stroke={iconThickness} />, link: '/books?' },
  { name: 'Fantasy/Fiction', icon: <IconCrystalBall stroke={iconThickness} />, link: '/books?' },
  { name: 'Action/Adventure', icon: <IconCompass stroke={iconThickness} />, link: '/books?' },
  { name: 'Literature', icon: <IconPencil stroke={iconThickness} />, link: '/books?' },
];

export function HomePage() {
  return (
    <>
      <Stack gap="xl">
        <HeroHeader />
        <StatsGroup />
        <BookCategories categories={popularCategories} />
      </Stack>
    </>
  );
}
