/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#A65D43",
        "background-light": "#FDFBF7",
        "background-dark": "#1A1A1A",
        "earthy-green": "#4A5D4E",
        "warm-gray": "#E5E1DA"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        xl: "1.5rem",
        "2xl": "2.5rem",
        "3xl": "3rem"
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite reverse",
        "organic-float": "organic 15s ease-in-out infinite alternate"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
        organic: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0, 0) scale(1)" }
        }
      }
    }
  },
  corePlugins: {
    preflight: true
  }
};
