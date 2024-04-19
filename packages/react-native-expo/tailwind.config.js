/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F172A",
        light: "#FFFFFF",
        background: {
          DEFAULT: "#FAFAFA",
        },
        foreground: {
          DEFAULT: "#0F172A",
          light: "#0F172A",
          dark: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#00ACEE",
          strong: "#0072AB",
          weak: "#75DBFF",
          bg: {
            strong: "#DEF3FF",
            weak: "#EFFAFF",
          },
        },
        success: {
          DEFAULT: "#50C793",
          strong: "#3F9A7A",
          weak: "#C5FBE3",
          bg: {
            strong: "#E7FDF1",
            weak: "#F3FEF8",
          },
        },
        info: {
          DEFAULT: "#0CE7FA",
          strong: "#00B8D4",
          weak: "#A3FCFF",
          bg: {
            strong: "#E7FEFF",
            weak: "#E7FEFF",
          },
        },
        warning: {
          DEFAULT: "#FA916B",
          strong: "#DF8260",
          weak: "#FEE4DA",
          bg: {
            strong: "#FFF4F1",
            weak: "#FFFAF8",
          },
        },
        danger: {
          DEFAULT: "#F1595C",
          strong: "#D75052",
          weak: "#FCD6D7",
          bg: {
            strong: "#FEEFEF",
            weak: "#FFF7F7",
          },
        },
        body: {
          DEFAULT: "#334155",
        },
        grey: {
          DEFAULT: "#979DA4",
        },
        border: {
          DEFAULT: "#E2E8F0",
        },
      },
    },
  },
  plugins: [],
};
