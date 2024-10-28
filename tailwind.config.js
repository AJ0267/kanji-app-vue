/** @type {import('tailwindcss').Config} */
export default {
  content:  ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Outfit", "sans-serif"],
      },
      colors: {
        darkGray: '#454545',
        brightOrange: '#FF6000',
        softOrange: '#FFA559',
        lightPeach: '#FFE6C7',
      },
    },
  },
  plugins: [require('daisyui'),],
}

