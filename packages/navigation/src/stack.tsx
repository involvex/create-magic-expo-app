/**
 * Stack Navigator preset for Expo Router.
 *
 * Provides a pre-configured stack navigator with theming support.
 */

import type { ReactNode } from "react";
import { Stack } from "expo-router";

export interface StackNavigatorProps {
  children: ReactNode;
  /**
   * Initial route name.
   */
  initialRouteName?: string;
  /**
   * Whether to show the header by default.
   */
  headerShown?: boolean;
  /**
   * Optional theme colors. If not provided, uses default Expo Router colors.
   */
  theme?: {
    background?: string;
    card?: string;
    text?: string;
  };
}

/**
 * Stack navigator with theme-aware styling.
 *
 * @example
 * ```tsx
 * import { StackNavigator } from '@magic-expo/navigation';
 *
 * export default function Layout() {
 *   return (
 *     <StackNavigator initialRouteName="index">
 *       <Slot />
 *     </StackNavigator>
 *   );
 * }
 * ```
 */
export function StackNavigator({
  children,
  initialRouteName,
  headerShown = true,
  theme,
}: StackNavigatorProps) {
  const background = theme?.background || "#FFFFFF";
  const card = theme?.card || "#F2F2F7";
  const text = theme?.text || "#000000";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: card,
        },
        headerTintColor: text,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: background,
        },
        headerShown,
      }}
      initialRouteName={initialRouteName}
    >
      {children}
    </Stack>
  );
}

/**
 * Get stack screen options for a specific screen.
 */
export function getStackScreenOptions(options: {
  title?: string;
  headerShown?: boolean;
  presentation?: "card" | "modal";
  theme?: {
    card?: string;
    text?: string;
  };
}) {
  const card = options.theme?.card || "#F2F2F7";
  const text = options.theme?.text || "#000000";

  return {
    title: options.title,
    headerShown: options.headerShown ?? true,
    presentation: options.presentation ?? "card",
    headerStyle: {
      backgroundColor: card,
    },
    headerTintColor: text,
  };
}

export default StackNavigator;
