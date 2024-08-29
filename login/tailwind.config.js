/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'gradient-start': '#4a90e2', // Color de inicio del gradiente
        'gradient-end': '#50e3c2',   // Color final del gradiente
      },
    },
  },
  plugins: [],
}

