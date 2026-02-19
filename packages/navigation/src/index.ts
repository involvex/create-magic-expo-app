/**
 * Magic Expo Navigation
 *
 * Pre-configured navigation presets for Expo Router with theme support.
 */

// Navigators
export {
  TabNavigator,
  getTabScreenOptions,
  default as TabNavigatorDefault,
} from "./tabs";
export type { TabNavigatorProps } from "./tabs";

export {
  StackNavigator,
  getStackScreenOptions,
  default as StackNavigatorDefault,
} from "./stack";
export type { StackNavigatorProps } from "./stack";

export {
  DrawerNavigator,
  getDrawerScreenOptions,
  default as DrawerNavigatorDefault,
} from "./drawer";
export type { DrawerNavigatorProps } from "./drawer";

// Hooks
export {
  useProtectedRoute,
  useTypedParams,
  useTypedRouter,
  useNavigationWithLoading,
} from "./hooks";

// Re-export Expo Router utilities for convenience
export { useRouter, useSegments, useLocalSearchParams } from "expo-router";
export type { Router } from "expo-router";
