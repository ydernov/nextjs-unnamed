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
            opacity: "0.2",
          },

          "100%": {
            transform: "scale(1)",
            opacity: "0.05",
          },
        },
        rippleFill: {
          "0%": {
            // animationFillMode: "forwards",
            // transform: "scale(0)",
            opacity: "0.1",
          },
          "100%": {
            // transform: "scale(1)",
            opacity: "0.3",
          },
        },
      },
      animation: {
        ripple: "ripple 0.6s ease-in-out ",
        rippleFill: "rippleFill 0.6s ease-in-out ",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
