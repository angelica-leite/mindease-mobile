/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(180 20% 99%)",
        foreground: "hsl(200 25% 20%)",
        primary: {
          DEFAULT: "hsl(168 50% 42%)",
          foreground: "#FFFFFF",
        },
        card: "hsl(180 15% 98%)",
        accent: "hsl(25 70% 92%)",
        muted: {
          DEFAULT: "hsl(200 15% 94%)",
          foreground: "hsl(200 15% 45%)",
        },
        border: "hsl(200 20% 88%)",
      },
      fontFamily: {
        display: ["Outfit"],
        sans: ["Inter"],
      },
    },
  },
  plugins: [],
};
