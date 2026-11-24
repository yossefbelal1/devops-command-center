/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        canvas: '#F6F7F4',
        surface: '#FFFFFF',
        navy: {
          900: '#0B192C',
          800: '#102A43',
          700: '#1D4ED8',
        }
      }
    },
  },
  plugins: [],
}
