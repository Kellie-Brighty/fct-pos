/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006D35", // Deep Abuja Emerald
          light: "#00A651",
          dark: "#004B23",
          high: "#00FF7F",
        },
        secondary: {
          DEFAULT: "#0B1120", // Deep Space Navy
          light: "#1A2235",
          dark: "#05080F",
        },
        accent: {
          gold: "#F0B323", // Sovereign Gold
          "gold-light": "#FFCC00",
          blue: "#77B5FE",
          red: "#FF5A5A",
        },
        gray: {
          light: "#F7F9FC",
          dark: "#0B1120",
          DEFAULT: "#333333",
        },
      },
      fontFamily: {
        sans: ["Inter", "Open Sans", "sans-serif"],
        heading: ["Livvic", "sans-serif"],
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
        "prime-gradient": "linear-gradient(135deg, #006D35 0%, #004B23 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
