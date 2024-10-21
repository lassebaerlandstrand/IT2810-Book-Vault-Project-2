import { Container, createTheme, MantineColorsTuple, rem } from '@mantine/core';

const CONTAINER_SIZES: Record<string, string> = {
  xxs: '24em',
  xs: '30em',
  sm: '48em',
  md: '64em',
  lg: '75em',
  xl: '90em',
};

// https://colorkit.co/color-palette-generator/061017-0b202e-132937-2f434f-495a65-63717b-7d8991-97a0a6-cbcfd2-fefefe/
const logoTheme: MantineColorsTuple = [
  '#fefefe',
  '#cbcfd2',
  '#97a0a6',
  '#7d8991',
  '#63717b',
  '#495a65',
  '#2f434f',
  '#132937', // This is the main logo color
  '#0b202e',
  '#061017',
];

export const theme = createTheme({
  fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  breakpoints: {
    xxs: '24em', // 384px
    xs: '30em', // 480px
    sm: '48em', // 768px
    md: '64em', // 1024px
    lg: '75em', // 1200px
    xl: '90em', // 1440px
  },
  colors: {
    'logo-theme': logoTheme,
  },
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? CONTAINER_SIZES[size]
              : rem(size),
        },
      }),
    }),
  },
});
