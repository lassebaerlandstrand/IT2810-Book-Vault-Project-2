import {
  Container,
  createTheme,
  DEFAULT_THEME,
  Loader,
  MantineColorsTuple,
  rem,
} from '@mantine/core';
import { BookLoader } from './components/Loading/Loading';

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

// https://colorkit.co/color-palette-generator/6a5f4a-d4bd94-dac5a1-e2d1b5-e9ddc8-eee4d3-f2eade-f6f0e7-f9f5ef-fcfaf7/
const beige: MantineColorsTuple = [
  '#fcfaf7',
  '#f9f5ef',
  '#f6f0e7',
  '#f2eade',
  '#eee4d3',
  '#e9ddc8',
  '#e2d1b5',
  '#dac5a1',
  '#d4bd94',
  '#6a5f4a',
];

export const theme = createTheme({
  fontFamily: `Poppins, ${DEFAULT_THEME.fontFamily}`,
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
    beige,
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
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, book: BookLoader },
      },
      vars: (_, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--loader-size': rem(90),
            },
          };
        }
        return { root: {} };
      },
    }),
  },
});
