/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 🔥 THIS IS THE MAGIC LINE YOU NEED!
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}