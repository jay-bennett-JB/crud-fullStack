//Imports, Remeber to put (eslintignore in root Dir)
import * as globals from "globals";
import jsConfig from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base configuration, combining ESLint's recommended settings and Prettier for formatting :- For this project: Basic JS settings + Prettier for code style
  jsConfig.configs.recommended,
  prettierConfig,
  {
    //Files, global variables and other scripting settings. For this Project:- EMCAScript for Parsing, ES6 Modules for the source code and JSX Parsing enabled
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    // Plugins. For this Project:- React, Prettier, React Hooks, JSX a11y (accessibility), and Import
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    // Rules (code style configuration)
    rules: {
      // Prettier

      // React-specific linting rules
      "react/jsx-uses-react": "error", // Ensure React is not flagged as unused in JSX files
      "react/jsx-uses-vars": "error", // Ensure JSX variables are not flagged as unused
      "react/react-in-jsx-scope": "off", // React 17+ doesn't require React in scope for JSX

      // PropTypes validation (if you're not using TypeScript)
      "react/prop-types": "off", // Warn about missing PropTypes in components

      // Console usage
      "no-console": ["warn", { allow: ["warn", "error", "debug", "log"] }], // Allow `console.warn` and `console.error`, but warn about other `console` usage

      // Disable debugger in production code
      "no-debugger": "warn", // Warn when debugger is used

      // Enforce strict equality in comparisons
      eqeqeq: ["error", "always"], // Always use `===` and not `==` to avoid unexpected type coercion
    },
  },

  // Configuration for test files
  {
    //Files, global variables and other scripting settings. For this Project:- Jest
    files: [
      "**/*.test.{js,jsx}", // Test files matching the `.test.js` or `.test.jsx` pattern
      "**/__tests__/**/*.{js,jsx}", // Test files within `__tests__` directories
    ],
    languageOptions: {
      globals: {
        // Add Jest globals to avoid "undefined" errors for testing functions
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        it: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        afterAll: "readonly",
        afterEach: "readonly",
        window: "readonly", // Allow `window` usage in Jest tests
      },
    },
    plugins: { jest: pluginJest }, // Include the Jest plugin for linting test-related code
    rules: {
      // Jest-specific linting rules
      "jest/no-disabled-tests": "warn", // Warn about disabled tests (i.e., `it.skip`)
      "jest/no-focused-tests": "error", // Prevent focused tests (i.e., `it.only`, `describe.only`)
      "jest/no-identical-title": "error", // Prevent tests with the same name
      "jest/prefer-to-have-length": "warn", // Encourage `.toHaveLength` instead of `.toBe()`
      "jest/valid-expect": "error", // Ensure `expect` statements are valid in tests
    },
  },
];
