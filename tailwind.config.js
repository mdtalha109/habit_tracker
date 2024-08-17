export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1976d2',
          DEFAULT: '#111827',
          dark: '#16161d',
        },
        primary_muted: {

          DEFAULT: '#373A40',
          dark: '#B7B7B7'
        },

        error: {
          DEFAULT: "#f44336"
        }

      }
    },
  },
  plugins: [],
}
