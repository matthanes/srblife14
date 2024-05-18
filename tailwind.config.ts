import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003D7E', //dark blue
        secondary: '#7B9EA8', //charcoal
        dark: '#2D2D2D',
      },
    },
  },
  plugins: [typography],
};
export default config;
