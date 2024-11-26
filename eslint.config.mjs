import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["node_modules", "dist"], // Add ignored directories here
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused vars globally
      "@typescript-eslint/no-explicit-any": "off", // Allow "any" globally
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // Properly specify this option
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
