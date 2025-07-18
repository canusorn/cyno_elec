/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9FA8DA',
          light: '#C5CAE9',
          dark: '#7986CB',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
