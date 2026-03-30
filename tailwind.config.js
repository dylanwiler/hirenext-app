/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cabinet)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          400: '#1D9E75',
          600: '#0F6E56',
          700: '#085041',
        }
      }
    }
  },
  plugins: [],
}