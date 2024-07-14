// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pm: ['Pretendard-Medium'],
        pb: ['Pretendard-Bold'],
        pl: ['Pretendard-Light'],
      },
    },
  },
  plugins: [],
};
