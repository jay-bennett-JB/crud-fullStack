const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Change this if your frontend runs on a different port
    supportFile: false,
    setupNodeEvents(on, config) {
      // Add event listeners here if needed
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
