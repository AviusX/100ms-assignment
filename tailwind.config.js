module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#78CD9C',
        'secondary': '#1D3027',
        'tertiary': '#23392F',
        'spoiler-red': '#D68F8F',
        'bg': '#17261F'
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      textColor: ['even']
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
