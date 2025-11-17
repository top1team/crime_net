/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'warm': {
          50: '#fafaf9',
          100: '#f5f4f2',
          200: '#e7e5e4',
          300: '#d6d3d1',
        }
      }
    },
  },
  plugins: [],
}