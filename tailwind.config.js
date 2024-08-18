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
          DEFAULT: '#c91bcf',
          dark: '#16161d',
        },
        primary_muted: {

          DEFAULT: '#373A40',
          dark: '#B7B7B7'
        },

        error: {
          DEFAULT: "#f44336"
        }

      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(100deg, #c91bcf, #7b0e7f)',
      },
      border: {
        'primary-gradient': 'linear-gradient(100deg, #c91bcf, #7b0e7f)',
      }
    },
  },
  plugins: [],
}
