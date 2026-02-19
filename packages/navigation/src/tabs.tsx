/**
 * Tab Navigator preset for Expo Router.
 *
 * Provides a pre-configured tab navigator with theming support.
 */

import type { ReactNode } from "react";
import { Tabs } from "expo-router";

export interface TabNavigatorProps {
  children: ReactNode;
  /**
   * Screen names and their display configuration.
   */
  screens: {
    name: string;
    title: string;
    icon?: string;
  }[];
  /**
   * Optional theme colors. If not provided, uses default Expo Router colors.
   */
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
    card?: string;
    text?: string;
    textSecondary?: string;
    border?: string;
  };
}

/**
 * Tab navigator with theme-aware styling.
 *
 * @example
 * ```tsx
 * import { TabNavigator } from '@magic-expo/navigation';
 *
 * export default function Layout() {
 *   return (
 *     <TabNavigator
 *       screens={[
 *         { name: 'index', title: 'Home', icon: 'house' },
 *         { name: 'settings', title: 'Settings', icon: 'gear' },
 *       ]}
 *     >
 *       <Slot />
 *     </TabNavigator>
 *   );
 * }
 * ```
 */
export function TabNavigator({ children, theme }: TabNavigatorProps) {
  const primary = theme?.primary || "#007AFF";
  const secondary = theme?.secondary || "#8E8E93";
  const card = theme?.card || "#F2F2F7";
  const text = theme?.text || "#000000";
  const border = theme?.border || "#C6C6C8";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: secondary,
        tabBarStyle: {
          backgroundColor: card,
          borderTopColor: border,
        },
        headerStyle: {
          backgroundColor: card,
        },
        headerTintColor: text,
      }}
    >
      {children}
    </Tabs>
  );
}

/**
 * Get tab screen options for a specific screen.
 */
export function getTabScreenOptions(title: string, icon?: string) {
  return {
    title,
    tabBarIcon: icon ? { symbolName: icon } : undefined,
  };
}

export default TabNavigator;
