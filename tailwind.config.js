/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  // The design lives in globals.css (which has its own reset), so Tailwind's
  // preflight is disabled to avoid conflicts. Utilities are still available.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        bg: "#08070c",
        ink: "#131019",
        volt: "#d6ff3f",
        violet: "#7c5cff",
        text: "#f5f3ff",
        muted: "#b6afce",
        faint: "#7d769a",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
