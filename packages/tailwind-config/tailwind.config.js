// tailwind.config.js

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
    },
  },
  plugins: [],
};
