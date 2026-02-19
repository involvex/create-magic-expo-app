import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import globals from "globals";
import js from "@eslint/js";

/**
 * Default ESLint flat configuration for Magic Expo projects.
 * Export this directly or extend it for your project needs.
 */
export function getEslintConfig(customConfig = {}) {
  return defineConfig([
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      plugins: { js },
      extends: ["js/recommended"],
      languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
      files: ["**/*.css"],
      plugins: { css },
      language: "css/css",
      extends: ["css/recommended"],
    },
    ...(Array.isArray(customConfig) ? customConfig : [customConfig]),
  ]);
}

export default getEslintConfig();
