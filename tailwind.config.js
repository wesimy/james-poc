/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["App.{js,jsx,tsx,ts}","./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {      
      colors: {
        light: "#F2F1EF",
        dark: "#322E2B"
      }
      }
    },
    plugins: [],
  }
