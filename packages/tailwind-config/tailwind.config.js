// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'Pretendard-Medium': ['Pretendard-Medium'],
        'Pretendard-Bold': ['Pretendard-Bold'],
        'Pretendard-Light': ['Pretendard-Light'],
      },
      colors: {
        'SPOT-red': '#FF1919',
        'SPOT-black': '#0F0F0F',
        'SPOT-white': '#FFFFFF',
        'Button-red': '#751010',
        'Button-gray': '#4C4C4C',
        'Permission-green': '#00FF75',
      },
      fontSize: {
        title1: ['22px', '30px'],
        mainTitle: ['26px', '30px'],
        body1: ['16px', '24px'],
        body2: ['14px', '18px'],
        body3: ['12px', '16px'],
      },
    },
  },
  plugins: [],
};
