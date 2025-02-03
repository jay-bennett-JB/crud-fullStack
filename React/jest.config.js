module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest", // Use babel-jest to transform JS/JSX/MJS files
  },
  moduleFileExtensions: ["js", "jsx", "mjs"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es|@mui/x-date-pickers|@babel/runtime)/)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS and SCSS files
    "^axios$": "<rootDir>/__mocks__/axios.js", // Mock Axios for testing
  },

  setupFilesAfterEnv: ["<rootDir>/setupTest.js"], // Your setup file
  testPathIgnorePatterns: ["/node_modules/"],
};
