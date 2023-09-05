import type { Config } from 'tailwindcss';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';
import colors from 'tailwindcss/colors';

type Theme = keyof DefaultColors;

export const defineConfig = ({ theme }: { theme: Theme } = { theme: 'emerald' }): Config => {
  return {
    content: ['./resources/views/**/*'],
    plugins: [],
    theme: {
      extend: {
        colors: {
          primary: colors[theme],
        },
      },
    },
  };
};
