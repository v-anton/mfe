module.exports = {
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Muli"],
      },
      colors: {
        "hs-yellow": "#F9CD45",
        "hs-blue": "#0000FF",
        "hs-darkblue": "#282934",
        "hs-lightgray": "#F5F5F5",
        "hs-darkgray": "#BCBCBC",
        "hs-red": "#FD5555",
        "hs-green": "#23964F",
        "hs-black": "#282934",
      },
      fontSize: {
        "hs-22px": "1.375rem",
        "hs-28px": "1.75rem",
      },
      spacing: {
        "hs-280px": "17.5rem",
        "hs-28": "7.1875rem",
      },
      maxHeight: {
        "hs-300px": "300px",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "checked"],
    boxShadow: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
      "checked",
    ],
  },
  plugins: [],
};
