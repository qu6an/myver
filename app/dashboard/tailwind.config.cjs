/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0066FF',
          light: '#4D94FF',
          dark: '#0052D6',
          muted: '#E6F0FF'
        },
        accent: '#00C9A7',
        glass: 'rgba(255,255,255,0.75)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'hero': ['2.5rem', { lineHeight: '1.05' }], // used for pixel-precise hero
      },
      borderRadius: {
        xl: '1rem'
      },
      boxShadow: {
        soft: '0 6px 24px rgba(2,6,23,0.08)'
      }
    },
  },
  plugins: [],
}
