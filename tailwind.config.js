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
      screens: {
        // temp ?
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1500px',
      },
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
    'overflow-hidden',
    'shadow-md',
    'rounded-lg',
  ],
  plugins: [],
};
