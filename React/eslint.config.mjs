// eslint.config.mjs

import { defineConfig } from "eslint-define-config";
import globals from "globals";
import jsConfig from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";
import eslintPluginImport from "eslint-plugin-import";
import pluginCypress from "eslint-plugin-cypress";

// Base ESLint Configuration
export default defineConfig([
  jsConfig.configs.recommended,
  prettierConfig,
  {
    ignores: ["node_modules/", "dist/", "build/"],
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.cypress },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      import: eslintPluginImport,
      cypress: eslintPluginCypress,
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".mjs", ".jsx", ".ts", ".tsx"] },
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-console": ["warn", { allow: ["warn", "error", "debug", "log"] }],
      eqeqeq: ["error", "always"],
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },

  // Jest-Specific Configuration
  {
    files: ["**/*.test.{js,jsx}", "**/__tests__/**/*.{js,jsx}", "**/__mocks__/**/*.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
      parser: babelParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      jest: pluginJest,
      import: eslintPluginImport,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"] },
      },
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },

  // Cypress-Specific Configuration
  {
    files: [
      "cypress/**/*.cy.{js,jsx}",
      "cypress/support/**/*.{js,jsx}",
      "cypress/e2e/**/*.cy.{js,jsx}",
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.cypress },
      parser: babelParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      cypress: pluginCypress,
      import: eslintPluginImport,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    extends: ["plugin: cypress/recommended"],
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"] },
      },
    },
    rules: {
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },
]);
