const { defineConfig } = require("vite");
const minifyHTML = require("rollup-plugin-minify-html-literals");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      plugins: [minifyHTML.default()],
    },
  },
});
