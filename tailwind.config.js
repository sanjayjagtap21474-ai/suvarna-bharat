/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF5EF',
          200: '#F3E8DF',
          300: '#E7D5C7',
          400: '#D7BEAA',
        },
        rosegold: {
          50: '#FBF5F2',
          100: '#F7E7E2',
          200: '#ECC9BF',
          300: '#E0AA9B',
          400: '#D28674',
          500: '#BF6652',
          600: '#A9513D',
          700: '#8A3F2F',
        },
        rosewood: {
          500: '#64424E',
          600: '#4D313C',
          700: '#3D252E',
          800: '#2C1921',
          900: '#1F1116',
          950: '#140A0E',
        },
        gold: {
          bullion: '#C69214',
          shimmer: '#E5C158',
          champagne: '#F4E9D8',
          bronze: '#8C5E1E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(77, 49, 60, 0.08), 0 4px 6px -2px rgba(77, 49, 60, 0.03)',
        'luxury-hover': '0 20px 40px -15px rgba(197, 102, 82, 0.18), 0 8px 12px -4px rgba(77, 49, 60, 0.06)',
        'glow-rose': '0 0 25px rgba(224, 170, 155, 0.35)',
      }
    },
  },
  plugins: [],
}
