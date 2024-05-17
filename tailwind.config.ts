import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              foreground: "#fff",
              DEFAULT: "#fff",
            },
            secondary: {
              foreground: "#fff ",
              DEFAULT: "#FFD893",
            },
            success : {
              foreground: "#fff",
              DEFAULT: "#99E550",
            },
            danger : {
              foreground: "#fff",
              DEFAULT: "#FF543E",
            },
            warning : {
              foreground: "#fff",
              DEFAULT: "#FEAE21",
            }
          },
        },
        light: {
          colors: {
            primary: {
              foreground: "#fff",
              DEFAULT: "#fff",
            },
            secondary: {
              foreground: "#fff ",
              DEFAULT: "#FFD893",
            },
            success : {
              foreground: "#fff",
              DEFAULT: "#99E550",
            },
            danger : {
              foreground: "#fff",
              DEFAULT: "#FF543E",
            },
            warning : {
              foreground: "#fff",
              DEFAULT: "#FEAE21",
            }
          },
        },
      },
    }),
  ],
};

export default config;
