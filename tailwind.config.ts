import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["mistral-mn", "sans-serif"], // Or ['CustomFont', 'sans-serif'] for local fonts
      },
      screens: {
        xxs: "274px",
        xs: "465px",
        "3xl": "1800px",
      },
      boxShadow: {
        "inner-sym": "inset 0px 0px 5px 0px #FF6B10",
      },
      dropShadow: {
        text: "2px 2px 2px #FF6B10",
      },
      backgroundImage: {
        "hero-pattern": "url('/banner.jpg')",
      },
      colors: {
        bgColor: "#000000",
        textColor: "#fff",
        primary: "#2F34EA",
        secondary: "#5CBCEF",
        bgNavButton: "#fff",
        textNavButton: "#000",
        hoverNavButton: "#000",
      },
      flex: {
        flexMain: "1 0 auto",
      },
    },
  },
  plugins: [],
};
export default config;
