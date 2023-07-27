import { Config as TailwindConfig } from 'tailwindcss';
import defaultTheme, { Theme } from './theme';
import { transformThemeToColors } from './utils';

export type Config = {
  content: string[];
  theme?: Theme;
  plugins?: TailwindConfig['plugins'];
};

export type Tailwind = (config: Config) => TailwindConfig;

export const defineConfig: Tailwind = (config: Config = {} as Config) => {
  const twConfig: TailwindConfig = {
    darkMode: ['class'],
    content: [...config.content, require('path').resolve(__dirname, 'components/**/*.js')],
    plugins: [...(config.plugins ?? []), require('tailwindcss-animate')],
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: transformThemeToColors(config.theme ?? defaultTheme),
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
  };

  return twConfig;
};
