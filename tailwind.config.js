/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      mono: ['jetBrains Mono', ...defaultTheme.fontFamily.mono]
    },
    extend: {
      colors: {
        primary: '#070F2B',
        second: '#1B1A55',
        third: '#535C91',
        forth: '#9290C3'
      },
      animation: {
        'pulse-fast': 'pulse 1s linear infinite'
      }
    }
  },
  plugins: []
}
