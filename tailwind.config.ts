import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bkg: "var(--main-bg)",
        content: "var(--main-text)",
        active: {
          btn: "var(--active-btn)",
        },
        inactive: {
          btn: "var(--inactive-btn)",
        },
        input: {
          text: "var(input-text)",
          bg: "var(--input-bg)",
        },
        tokenrow: "var(--token-row)",
        charts: {
          price: "var(--price-chart)",
          volume: "var(--volume-chart)",
        },
        header: "var(--header)",
      },
    },
  },
  plugins: [],
};
export default config;
