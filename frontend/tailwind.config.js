/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      width: {
        '1216': '1216px',
      },
      colors: {
        navy: {
          700: '#1B2A4A',
          800: '#162038',
          900: '#111827',
        },
        khaki: {
          100: '#F5F5DC',
          200: '#E6E6C6',
          300: '#D7D7B0',
          600: '#B8B88A',
          700: '#A9A97D',
        },
      },
    },
  },
  plugins: [],
}



