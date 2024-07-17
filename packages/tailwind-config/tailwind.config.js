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
      },
      fontSize: {
        body1: ['16px', '24px'],
        title1: ['22px', '30px'],
        mainTitle: ['26px', '30px'],
        body2: ['14px', '18px'],
      },
    },
  },
  plugins: [],
};
