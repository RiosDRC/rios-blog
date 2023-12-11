/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        tabs: 'rgba(0, 0, 0, 0.65)',
        lightBlue: '#b9e7e7',
        teal: 'teal'
      },
      screens: {
        xxs: {'max': '350px'},
        xs: {'max': '480px'},
        ss: {'max': '620px'},
        sm: {'max': '768px'},
        md: {'max': '1060px'},
        lg: {'max': '1200px'},
        xl: '1700px',
      },
      boxShadow: {
        imageBox: '-30px 30px lightBlue'
      }
    },
  },
  plugins: [],
}
