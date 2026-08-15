import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        cyanGlow: "#00e5ff",
        camelWarm: "#c49258",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        script: ["var(--font-script)", "cursive", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "card-soft": "0 10px 30px -10px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 20px 40px -15px rgba(2, 132, 199, 0.12), 0 10px 15px -3px rgba(0, 0, 0, 0.04)",
        "blue-button": "0 4px 14px 0 rgba(2, 132, 199, 0.39)",
        "hud-glow": "0 0 25px -5px rgba(0, 229, 255, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
