import type { Config as TailwindConfig } from 'tailwindcss';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';
import colors from 'tailwindcss/colors';

export type Config = {
  theme: keyof DefaultColors;
  destructive: keyof DefaultColors;
  accent: keyof DefaultColors;
  success: keyof DefaultColors;
  warning: keyof DefaultColors;
}

export const defineConfig = ({ accent, destructive, theme, success, warning}: Config): TailwindConfig => {
  return {
    content: ['./resources/views/**/*'],
    plugins: [],
    theme: {
      extend: {
        colors: {
          primary: colors[theme],
          destructive: colors[destructive],
          accent: colors[accent],
          success: colors[success],
          warning: colors[warning]
        },
      },
    },
  };
};
