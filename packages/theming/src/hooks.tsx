import { useColorScheme as useRNColorScheme, Appearance } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import type { ColorScheme, Theme } from "./types";
import ThemeContext from "./ThemeContext";
import { createTheme } from "./types";

/**
 * Theme provider props.
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Initial theme to use. If not provided, uses system preference.
   */
  initialTheme?: Theme;
  /**
   * Custom colors to override the default theme colors.
   */
  customColors?: Partial<Theme["colors"]>;
  /**
   * Whether to follow system color scheme changes.
   * @default true
   */
  followSystem?: boolean;
}

/**
 * Provide theme to the application.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@magic-expo/theme';
 *
 * export default function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({
  children,
  initialTheme,
  customColors,
  followSystem = true,
}: ThemeProviderProps) {
  const systemColorScheme = useRNColorScheme();
  const colorScheme: ColorScheme = followSystem
    ? (systemColorScheme as ColorScheme)
    : null;

  const [theme, setThemeState] = useState<Theme>(() => {
    if (initialTheme) {
      return initialTheme;
    }

    const scheme = colorScheme || "light";
    return createTheme(scheme, customColors);
  });

  const setTheme = useCallback(
    (newColorScheme: ColorScheme) => {
      setThemeState(createTheme(newColorScheme || "light", customColors));
    },
    [customColors],
  );

  useEffect(() => {
    if (followSystem) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setThemeState(
          createTheme((colorScheme as ColorScheme) || "light", customColors),
        );
      });

      return () => subscription.remove();
    }
  }, [followSystem, customColors]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Use the current theme from context.
 *
 * @example
 * ```tsx
 * import { useTheme } from '@magic-expo/theme';
 *
 * function MyComponent() {
 *   const { theme, setTheme } = useTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background }}>
 *       <Button onPress={() => setTheme('dark')} title="Switch to Dark" />
 *     </View>
 *   );
 * }
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Get the current color scheme (light/dark).
 * This is a convenience hook that wraps React Native's useColorScheme.
 *
 * @example
 * ```tsx
 * import { useColorScheme } from '@magic-expo/theme';
 *
 * function MyComponent() {
 *   const colorScheme = useColorScheme();
 *   const isDark = colorScheme === 'dark';
 *
 *   return <Text className={isDark ? 'text-white' : 'text-black'}>Hello</Text>;
 * }
 * ```
 */
export function useColorScheme(): ColorScheme {
  return useRNColorScheme() as ColorScheme;
}

/**
 * Hook to programmatically toggle between light and dark themes.
 *
 * @example
 * ```tsx
 * import { useThemeToggle } from '@magic-expo/theme';
 *
 * function ThemeToggleButton() {
 *   const { colorScheme, toggleTheme } = useThemeToggle();
 *
 *   return (
 *     <Button onPress={toggleTheme} title={`Switch to ${colorScheme === 'light' ? 'Dark' : 'Light'}`} />
 *   );
 * }
 * ```
 */
export function useThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const newScheme: ColorScheme =
      theme.colorScheme === "light" ? "dark" : "light";
    setTheme(newScheme);
  }, [theme.colorScheme, setTheme]);

  return {
    colorScheme: theme.colorScheme,
    toggleTheme,
    isDark: theme.colorScheme === "dark",
    isLight: theme.colorScheme === "light",
  };
}
