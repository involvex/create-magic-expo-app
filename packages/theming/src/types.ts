/**
 * Available color schemes in the theme system.
 */
export type ColorScheme = "light" | "dark" | null;

/**
 * Theme color palette.
 * Extend this interface to add custom colors.
 */
export interface ThemeColors {
  // Primary colors
  primary: string;
  secondary: string;
  accent: string;

  // Semantic colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;

  // Border colors
  border: string;
  inputBorder: string;

  // Text colors
  text: string;
  textSecondary: string;
  textInverse: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Overlay colors
  overlay: string;
  modalOverlay: string;
}

/**
 * Theme typography settings.
 */
export interface ThemeTypography {
  // Font sizes
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontSizeXl: string;
  fontSize2Xl: string;
  fontSize3Xl: string;
  fontSize4Xl: string;

  // Font weights
  fontWeightNormal: string;
  fontWeightMedium: string;
  fontWeightSemibold: string;
  fontWeightBold: string;

  // Line heights
  lineHeightTight: string;
  lineHeightNormal: string;
  lineHeightRelaxed: string;
}

/**
 * Theme spacing values.
 */
export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
}

/**
 * Theme border radius values.
 */
export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

/**
 * Complete theme configuration.
 */
export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  colorScheme: ColorScheme;
}

/**
 * Default light theme colors.
 */
export const lightColors: ThemeColors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  accent: "#FF9500",

  background: "#FFFFFF",
  foreground: "#000000",
  card: "#F2F2F7",
  cardForeground: "#000000",

  border: "#C6C6C8",
  inputBorder: "#C6C6C8",

  text: "#000000",
  textSecondary: "#8E8E93",
  textInverse: "#FFFFFF",

  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  info: "#5AC8FA",

  overlay: "rgba(0, 0, 0, 0.5)",
  modalOverlay: "rgba(0, 0, 0, 0.7)",
};

/**
 * Default dark theme colors.
 */
export const darkColors: ThemeColors = {
  primary: "#0A84FF",
  secondary: "#5E5CE6",
  accent: "#FF9F0A",

  background: "#000000",
  foreground: "#FFFFFF",
  card: "#1C1C1E",
  cardForeground: "#FFFFFF",

  border: "#38383A",
  inputBorder: "#38383A",

  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  textInverse: "#000000",

  success: "#32D74B",
  warning: "#FF9F0A",
  error: "#FF453A",
  info: "#64D2FF",

  overlay: "rgba(0, 0, 0, 0.7)",
  modalOverlay: "rgba(0, 0, 0, 0.85)",
};

/**
 * Default typography settings.
 */
export const defaultTypography: ThemeTypography = {
  fontSizeXs: "0.75rem", // 12px
  fontSizeSm: "0.875rem", // 14px
  fontSizeMd: "1rem", // 16px
  fontSizeLg: "1.125rem", // 18px
  fontSizeXl: "1.25rem", // 20px
  fontSize2Xl: "1.5rem", // 24px
  fontSize3Xl: "1.875rem", // 30px
  fontSize4Xl: "2.25rem", // 36px

  fontWeightNormal: "400",
  fontWeightMedium: "500",
  fontWeightSemibold: "600",
  fontWeightBold: "700",

  lineHeightTight: "1.25",
  lineHeightNormal: "1.5",
  lineHeightRelaxed: "1.75",
};

/**
 * Default spacing values.
 */
export const defaultSpacing: ThemeSpacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
};

/**
 * Default border radius values.
 */
export const defaultBorderRadius: ThemeBorderRadius = {
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  full: "9999px",
};

/**
 * Create a theme object with the given color scheme.
 */
export function createTheme(
  colorScheme: ColorScheme,
  customColors?: Partial<ThemeColors>,
): Theme {
  const colors = colorScheme === "dark" ? darkColors : lightColors;
  const mergedColors = { ...colors, ...customColors };

  return {
    id: colorScheme === "dark" ? "dark" : "light",
    name: colorScheme === "dark" ? "Dark Theme" : "Light Theme",
    colors: mergedColors,
    typography: defaultTypography,
    spacing: defaultSpacing,
    borderRadius: defaultBorderRadius,
    colorScheme,
  };
}

/**
 * Default light theme.
 */
export const lightTheme = createTheme("light");

/**
 * Default dark theme.
 */
export const darkTheme = createTheme("dark");
