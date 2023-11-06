import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./resources/views/**/*.edge', '../node_modules/nifty-ui/ui/components/**/*.edge'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('tailwind-htmx')],
  theme: {},
};

export default config;
