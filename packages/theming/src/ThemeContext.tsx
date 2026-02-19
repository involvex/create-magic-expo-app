import { createContext } from "react";
import type { Theme } from "./types";

/**
 * Theme context value.
 */
export interface ThemeContextValue {
  theme: Theme;
  setTheme: (colorScheme: import("./types").ColorScheme) => void;
}

/**
 * Theme context.
 * Internal use only - use the ThemeProvider and useTheme hook instead.
 */
const ThemeContext = createContext<ThemeContextValue | null>(null);

export default ThemeContext;
