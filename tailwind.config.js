/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#932017",
        playground: "#052255",
        black: "#333333",
        "black-200": "#545454",
        "black-300": "#545454",
        "black-400": "#333333",
        "red-100": "#F4BCBC",
        "red-200": "#EF9B9B",
        "red-300": "#EB5757",
        "red-400": "#E35151",
        "red-500": "#DC2626",
        "red-700": "#9C1B1B",
        lightGray: "#B0B0B0",
        lightBlueBg: "#F2F5F7",
        "white-600": "#E8E8E8",
      },
      fontFamily: {
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
