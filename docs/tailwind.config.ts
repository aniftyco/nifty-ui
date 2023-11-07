import colors from 'tailwindcss/colors';

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./resources/views/**/*.edge', '../node_modules/nifty-ui/ui/components/**/*.edge'],
  safelist: ['doc-heading'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('tailwind-htmx')],
  theme: {
    extend: {
      colors: {
        primary: colors.fuchsia,
      },
    },
  },
};

export default config;
