/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-bg': '#FAF8F5',
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F47738', // Warm orange accent #F47738
          600: '#e05e1f',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        charcoal: {
          DEFAULT: '#181D23',
          700: '#333A44',
          800: '#232932',
          900: '#181D23',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 8px 16px -2px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(24, 29, 35, 0.05), 0 2px 6px -1px rgba(24, 29, 35, 0.03)',
        'float': '0 12px 30px -4px rgba(244, 119, 56, 0.28), 0 4px 10px -2px rgba(0, 0, 0, 0.1)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
