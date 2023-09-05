/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "scale(0)",
          },

          "90%": {
            transform: "scale(1)",
            opacity: "0.02",
          },
          "100%": {
            opacity: "0",
          },
        },
        rippleFill: {
          "100%": {
            opacity: "0.2",
          },
        },
      },
      animation: {
        ripple: "0.6s ease-in-out forwards ripple",
        rippleFill: "0.6s ease-in-out forwards rippleFill",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
