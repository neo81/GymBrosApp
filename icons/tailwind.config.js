/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        bg: "#0F0F1A",
        "bg-soft": "#16162A",
        "bg-card": "#1E1E35",
        accent: "#6C63FF",
        "accent-light": "#8B84FF",
        danger: "#FF5C7A",
        success: "#4DFFA0",
        "text-muted": "#7B7AA0",
      },
      animation: {
        bob: "bob 2s ease-in-out infinite",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
}
