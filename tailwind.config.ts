import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070B12",
        surface: "#0D1527",
        border: "#1E293B",
        accent: {
          DEFAULT: "#00F2FE",
          cyan: "#00F2FE",
          cobalt: "#2563EB",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "SF Pro Display", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Fira Code", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 242, 254, 0.35), 0 0 60px rgba(0, 242, 254, 0.12)",
        "glow-cyan-lg": "0 0 40px rgba(0, 242, 254, 0.45), 0 0 100px rgba(0, 242, 254, 0.15)",
        "glow-cobalt": "0 0 30px rgba(37, 99, 235, 0.3)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.08), transparent 60%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(0, 242, 254, 0.6)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 0 6px rgba(0, 242, 254, 0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

export default config;
