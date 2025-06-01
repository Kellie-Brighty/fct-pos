/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A651", // Emerald green from Abuja logo
          light: "#2AB770",
          dark: "#008E45",
        },
        secondary: {
          DEFAULT: "#2E3192", // Navy blue/purple from Abuja logo
          light: "#4145A8",
          dark: "#1C1F72",
        },
        accent: {
          gold: "#FFCC00", // Bright yellow from Abuja logo
          blue: "#77B5FE", // Light blue from Abuja logo
          red: "#FF5A5A", // Keep this for error states
        },
        gray: {
          light: "#F7F9FC",
          DEFAULT: "#333333", // Charcoal gray
        },
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        heading: ["Livvic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
