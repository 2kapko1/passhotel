/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Reuse Google Fonts already loaded in index.html
        heading: ['"Exo 2"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Alegreya Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          DEFAULT: '#a87d32',
          dark: '#8f6a2b'
        },
        secondary: '#333333',
        light: '#f8f9fa',
        dark: '#212529'
      }
    }
  },
  corePlugins: {
    preflight: true
  }
};
