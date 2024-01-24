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
        bkg: {
          main: "var(--main-bg)",
          input: "rgba(var(--input-bg) / <alpha-value>)",
          navbar: "var(--navbar)",
          subnav: "var(--coins-converter)",
        },
        content: {
          main: "rgb(var(--main-text) / <alpha-value>)",
          sub: "var(--sub-text)",
          date: "var(--date-text)",
          timeperiod: "var(--time-period-text)",
        },
        active: {
          btn: "rgb(var(--active-btn) / <alpha-value>)",
        },
        inactive: {
          btn: "var(--inactive-btn)",
        },
        tokenrow: "var(--token-row)",
        chart: {
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
