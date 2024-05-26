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
        primary: '#003D7E',
        secondary: '#7B9EA8',
        dark: '#2D2D2D',
      },
      fontFamily: {
        'rock-salt': '"Rock Salt", cursive',
        headings: '"Roboto", sans-serif',
        bodytext: '"Poppins", sans-serif',
      },
      aspectRatio: {
        'slide': '16 / 7',
      },
      maxHeight: {
        'screen-nav': 'calc(100vh - 4rem)',
      }
    },
  },
  plugins: [typography],
};
export default config;
