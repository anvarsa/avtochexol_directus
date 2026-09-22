import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f5f1e8",
        "paper-dim": "#ece6d8",
        ink: "#1a1613",
        "ink-soft": "#55504a",
        rust: "#b5602a",
        "rust-deep": "#8f4a20",
        steel: "#37474f",
        "steel-soft": "#5c6e77",
        bay: "#15181c",
        "bay-line": "#2a2e33",
        ok: "#4f7a5b",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
