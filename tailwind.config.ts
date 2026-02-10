import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f0f0f',
          card: '#1a1a1a',
          hover: '#252525',
        },
        light: {
          bg: '#ffffff',
          card: '#f5f5f5',
          hover: '#e5e5e5',
        }
      },
    },
  },
  plugins: [],
};
export default config;
