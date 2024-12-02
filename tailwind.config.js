module.exports = {
  content: [
    "./public/*.html",        // Includes all HTML files in the `public` directory
    "./public/js/**/*.js",    // Includes all JS files recursively in `public/js`
    "./public/css/*.css",     // Includes all CSS files in `public/css`
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Added Google Font Roboto
        lato: ['Lato', 'sans-serif'], // Added Google Font Lato
        parkinsans: ['Parkinsans', 'sans-serif'], // Added Google Font Parkinsans
        raleway: ['Raleway', 'sans-serif'], // Added Google Font Raleway
      },
      colors: {
        champagne: '#FAD6A5',
        champagneDark: '#EBC89F',
        charcoal: '#36454F',
        buff: '#E19F64',
        green: '#383E30',
        yellow: '#F2D9A8',
        van: '#382B25',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp'),
  ],
};