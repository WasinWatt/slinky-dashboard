/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          lighter: '#E0F1FB',
          light: '#C2EAFF',
          main: '#89D1F6',
          dark: '#5ABAEC',
          darker: '#2B8BBD',
          background: '#335068',
        },
        gray: {
          100: '#F8FAFC',
          400: '#B7C1CD',
          500: '#8A99AE',
          600: '#707E94',
          700: '#334155',
          800: '#1E2535',
          900: '#0A101E',
        },
        background: {
          main: '#020617',
          overlay: 'rgba(2, 6, 23, 0.7)',
        },
      },
    },
  },
  plugins: [],
}
