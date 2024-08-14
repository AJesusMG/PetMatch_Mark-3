import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/*/.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff4e5",
          100: "#ffeacc",
          200: "#ffd699",
          300: "#ffc266",
          400: "#ffad33",
          500: "#FEAE21",
          600: "#e68d00",
          700: "#b36900",
          800: "#804500",
          900: "#4d2700",
          
        },
        secondary: {
          50: "#fff8e6",
          100: "#fff0cc",
          200: "#ffe099",
          300: "#ffd066",
          400: "#ffc033",
          500: "#FFD893",
          600: "#cca366",
          700: "#996e40",
          800: "#664a26",
          900: "#332513",
        },
        success: {
          50: "#f0fbea",
          100: "#daf5c5",
          200: "#b6ea8c",
          300: "#99e550",
          400: "#7bdc00",
          500: "#66c300",
          600: "#509900",
          700: "#3b6f00",
          800: "#264600",
          900: "#142400",
        },
        warning: {
          50: "#ffece8",
          100: "#ffcec3",
          200: "#ffb099",
          300: "#ff9370",
          400: "#ff7750",
          500: "#FF543E",
          600: "#e63333",
          700: "#b32629",
          800: "#801b1f",
          900: "#4d1114",
        },
      },
      light:{
        500: "#FEAE21", // Tu color personalizado
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              50: "#fff4e5",
              100: "#ffeacc",
              200: "#ffd699",
              300: "#ffc266",
              400: "#ffad33",
              500: "#FEAE21",
              600: "#e68d00",
              700: "#b36900",
              800: "#804500",
              900: "#4d2700",
              DEFAULT: "#FEAE21",
              foreground: "#F8F8F8",
            },
            secondary: {
              50: "#fff8e6",
              100: "#fff0cc",
              200: "#ffe099",
              300: "#ffd066",
              400: "#ffc033",
              500: "#FFD893",
              600: "#cca366",
              700: "#996e40",
              800: "#664a26",
              900: "#332513",
              DEFAULT: "#FFD893",
              foreground: "#F8F8F8",
            },
            success: {
              50: "#f0fbea",
              100: "#daf5c5",
              200: "#b6ea8c",
              300: "#99e550",
              400: "#7bdc00",
              500: "#66c300",
              600: "#509900",
              700: "#3b6f00",
              800: "#264600",
              900: "#142400",
              DEFAULT: "#99E550",
              foreground: "#F8F8F8",
            },
            warning: {
              50: "#ffece8",
              100: "#ffcec3",
              200: "#ffb099",
              300: "#ff9370",
              400: "#ff7750",
              500: "#FF543E",
              600: "#e63333",
              700: "#b32629",
              800: "#801b1f",
              900: "#4d1114",
              DEFAULT: "#FF543E",
              foreground: "#112D4E",
            },
          },
        },
        light: {
          colors: {
            primary: {
              50: "#fff4e5",
              100: "#ffeacc",
              200: "#ffd699",
              300: "#ffc266",
              400: "#ffad33",
              500: "#FEAE21",
              600: "#e68d00",
              700: "#b36900",
              800: "#804500",
              900: "#4d2700",
              DEFAULT: "#FEAE21",
              foreground: "#112D4E",
            },
            secondary: {
              50: "#fff8e6",
              100: "#fff0cc",
              200: "#ffe099",
              300: "#ffd066",
              400: "#ffc033",
              500: "#FFD893",
              600: "#cca366",
              700: "#996e40",
              800: "#664a26",
              900: "#332513",
              DEFAULT: "#FFD893",
              foreground: "#112D4E",
            },
            success: {
              50: "#f0fbea",
              100: "#daf5c5",
              200: "#b6ea8c",
              300: "#99e550",
              400: "#7bdc00",
              500: "#66c300",
              600: "#509900",
              700: "#3b6f00",
              800: "#264600",
              900: "#142400",
              DEFAULT: "#99E550",
              foreground: "#112D4E",
            },
            warning: {
              50: "#ffece8",
              100: "#ffcec3",
              200: "#ffb099",
              300: "#ff9370",
              400: "#ff7750",
              500: "#FF543E",
              600: "#e63333",
              700: "#b32629",
              800: "#801b1f",
              900: "#4d1114",
              DEFAULT: "#FF543E",
              foreground: "#112D4E",
            },
          },
        },
      },
    }),
    require('@tailwindcss/typography')
  ],
  presets: [
    require("@relume_io/relume-tailwind")
  ]
};

export default config;


