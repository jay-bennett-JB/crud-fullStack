// eslint.config.js

import { defineConfig } from "eslint-define-config";
import globals, { jest } from "globals";
import jsConfig from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";
import eslintPluginImport from "eslint-plugin-import";

export default defineConfig([
  // Base Configuration
  jsConfig.configs.recommended,
  prettierConfig,
  {
    ignores: ["node_modules/", "dist/", "build/"],
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    // Plugins
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      import: eslintPluginImport,
    },
    settings: {
      "import/resolver": { node: { extensions: [".js", ".mjs", ".jsx", ".ts", ".tsx"] } },
    },

    rules: {
      // Prettier Integration

      // React-specific rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Console usage
      "no-console": ["warn", { allow: ["warn", "error", "debug", "log"] }],

      // Enforce strict equality
      eqeqeq: ["error", "always"],

      // Import rules
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

  // Jest Configuration for Test Files
  {
    files: ["**/*.test.{js,jsx}", "**/__tests__/**/*.{js,jsx}", "**/__mocks__/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        it: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        afterAll: "readonly",
        afterEach: "readonly",
        window: "readonly",
      },
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
        node: {
          extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"],
        },
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
]);
