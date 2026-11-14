import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [".next/**", "dist/**", "node_modules/**", "out/**"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^(?:_|[A-Z]|on[A-Z])",
          varsIgnorePattern: "^(?:[A-Z]|motion$)",
        },
      ],
    },
  },
];
