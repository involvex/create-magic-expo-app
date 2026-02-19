/**
 * Default Prettier configuration for Magic Expo projects.
 */
export const prettierConfig = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleAttributePerLine: true,
  singleQuote: false,
  trailingComma: "all" as const,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid" as const,
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-sort-imports",
  ],
};

export default prettierConfig;
