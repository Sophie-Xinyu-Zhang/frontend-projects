module.exports = {
  purge: ["./public/index.html", "./src/components.{vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        li: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
