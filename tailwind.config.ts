import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.rose[500],
          ...colors.rose,
        },
        'primary-foreground': colors.rose[50],
        foreground: {
          DEFAULT: colors.gray[500],
          ...colors.gray,
        },
      },
      fontFamily: {
        mushaf: 'Mushaf, sans-serif',
      },
    },
  },
  plugins: [],
}

export default config
