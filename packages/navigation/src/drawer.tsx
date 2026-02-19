/**
 * Drawer Navigator preset for Expo Router.
 *
 * Provides a pre-configured drawer navigator with theming support.
 */

import { Drawer } from "expo-router/drawer";
import type { ReactNode } from "react";

export interface DrawerNavigatorProps {
  children: ReactNode;
  /**
   * Drawer position.
   */
  drawerPosition?: "left" | "right";
  /**
   * Drawer type (affects swipe behavior).
   */
  drawerType?: "front" | "back" | "slide";
  /**
   * Drawer width.
   */
  drawerWidth?: number;
  /**
   * Optional theme colors. If not provided, uses default Expo Router colors.
   */
  theme?: {
    primary?: string;
    background?: string;
    card?: string;
    text?: string;
    textSecondary?: string;
  };
}

/**
 * Drawer navigator with theme-aware styling.
 *
 * @example
 * ```tsx
 * import { DrawerNavigator } from '@magic-expo/navigation';
 *
 * export default function Layout() {
 *   return (
 *     <DrawerNavigator drawerWidth={280}>
 *       <Slot />
 *     </DrawerNavigator>
 *   );
 * }
 * ```
 */
export function DrawerNavigator({
  children,
  drawerPosition = "left",
  drawerType = "front",
  drawerWidth = 280,
  theme,
}: DrawerNavigatorProps) {
  const primary = theme?.primary || "#007AFF";
  const card = theme?.card || "#F2F2F7";
  const text = theme?.text || "#000000";
  const textSecondary = theme?.textSecondary || "#8E8E93";

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: card,
          width: drawerWidth,
        },
        headerStyle: {
          backgroundColor: card,
        },
        headerTintColor: text,
        drawerActiveTintColor: primary,
        drawerInactiveTintColor: textSecondary,
        drawerPosition,
        drawerType,
      }}
    >
      {children}
    </Drawer>
  );
}

/**
 * Get drawer screen options for a specific screen.
 */
export function getDrawerScreenOptions(options: {
  title?: string;
  headerShown?: boolean;
  theme?: {
    primary?: string;
    textSecondary?: string;
  };
}) {
  const primary = options.theme?.primary || "#007AFF";
  const textSecondary = options.theme?.textSecondary || "#8E8E93";

  return {
    title: options.title,
    headerShown: options.headerShown ?? true,
    drawerActiveTintColor: primary,
    drawerInactiveTintColor: textSecondary,
  };
}

export default DrawerNavigator;
