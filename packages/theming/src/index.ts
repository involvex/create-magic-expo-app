/**
 * Magic Expo Theme System
 *
 * A complete theming solution for Expo apps with:
 * - Light/dark mode support
 * - Theme context and hooks
 * - Expo Symbols integration
 * - Uniwind (Tailwind) integration
 */

// Types
export type {
  ColorScheme,
  Theme,
  ThemeBorderRadius,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
} from "./types";

export {
  createTheme,
  darkColors,
  darkTheme,
  defaultBorderRadius,
  defaultSpacing,
  defaultTypography,
  lightColors,
  lightTheme,
} from "./types";

// Theme provider and hooks
export {
  ThemeProvider,
  useColorScheme,
  useTheme,
  useThemeToggle,
} from "./hooks";
export type { ThemeProviderProps } from "./hooks";

// Expo Symbols integration
export { getSymbolProps, getSymbolWeight, IconSizes, Symbols } from "./symbols";
export type {
  SymbolName,
  SymbolVariantType,
  SymbolWeightType,
} from "./symbols";

// Global CSS import path
export const globalCssPath = "./global.css";

// Theme context (advanced usage)
export { default as ThemeContext } from "./ThemeContext";
export type { ThemeContextValue } from "./ThemeContext";
