import * as globals from "globals";
import jsConfig from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  jsConfig.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      console: "readonly",
      window: "readonly",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { react: pluginReact, prettier: pluginPrettier },
    rules: {
      "prettier/prettier": [
        "error",
        {
          printWidth: 80, // Match Prettier configuration
          proseWrap: "preserve", // Match Prettier configuration
          bracketSameLine: true, // Match Prettier configuration
          endOfLine: "lf",
          trailingComma: "es5",
        },
      ],
      "comma-dangle": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-unknown-property": "error",
      "react/no-unused-state": "warn",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "object-property-newline": "off", // Disable to allow properties on the same line
      "object-curly-newline": "off", // Disable to allow properties on the same line
    },
  },
  {
    files: [
      "**/*.test.{js,jsx}",
      "**/__tests__/**/*.{js,jsx}",
      "**/*.{js,mjs,cjs,jsx}",
    ],
    languageOptions: {
      globals: {
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
    },
    plugins: { jest: pluginJest },
    rules: {
      // Jest rules
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];
