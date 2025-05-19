import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rougebrique: '#A12312',
        orangebrule: '#D65A31',
        vertolive: '#708238',
        beigesable: '#D9B08C',
        rougebriquee: '#B33F3F',
        
      },
    },
  },
  plugins: [],
}
export default config
