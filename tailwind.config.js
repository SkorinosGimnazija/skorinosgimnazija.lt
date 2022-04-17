const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
        serif: ['Vollkorn SC', ...defaultTheme.fontFamily.serif],
      },
    },
    container: {
      center: true,
    },
  },
  safelist: [
    'text-center',
    'text-left',
    'text-right',
    'flex',
    'flex-wrap',
    'gap-1',
    'justify-center',
  ],
  plugins: [],
};
