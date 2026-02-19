/**
 * Expo Symbols integration for Magic Expo theming.
 *
 * This module provides utilities for working with expo-symbols,
 * which allows you to use SF Symbols on iOS and equivalent icons on other platforms.
 */

/**
 * Available symbol weights.
 */
export type SymbolWeightType =
  | "regular"
  | "light"
  | "thin"
  | "bold"
  | "semibold"
  | "medium"
  | "heavy";

/**
 * Available symbol variants.
 */
export type SymbolVariantType = "regular" | "filled" | "outline" | "hieroglyph";

/**
 * Icon sizes that align with our typography scale.
 */
export const IconSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
} as const;

/**
 * Get a symbol weight based on the theme.
 *
 * @param isBold - Whether to use a bold weight
 * @returns The appropriate symbol weight
 *
 * @example
 * ```tsx
 * import { SymbolView } from 'expo-symbols';
 * import { getSymbolWeight } from '@magic-expo/theme';
 *
 * <SymbolView name="house.fill" weight={getSymbolWeight(false)} size={24} />
 * ```
 */
export function getSymbolWeight(isBold = false): SymbolWeightType {
  return isBold ? ("bold" as const) : ("regular" as const);
}

/**
 * Get symbol styling props based on theme color scheme.
 *
 * @param colorScheme - The current color scheme
 * @returns Object with variant prop for SymbolView
 *
 * @example
 * ```tsx
 * import { SymbolView } from 'expo-symbols';
 * import { useTheme, getSymbolProps } from '@magic-expo/theme';
 *
 * function MyIcon() {
 *   const { theme } = useTheme();
 *   const props = getSymbolProps(theme.colorScheme);
 *
 *   return <SymbolView name="house.fill" {...props} size={24} />;
 * }
 * ```
 */
export function getSymbolProps(colorScheme: "light" | "dark" | null) {
  const variant: SymbolVariantType =
    colorScheme === "dark" ? "filled" : "regular";
  return { variant };
}

/**
 * Common SF Symbols that work well with our theme system.
 */
export const Symbols = {
  // Navigation
  home: "house.fill",
  settings: "gearshape.fill",
  profile: "person.fill",
  search: "magnifyingglass",
  notifications: "bell.fill",
  bookmark: "bookmark.fill",

  // Actions
  add: "plus.circle.fill",
  remove: "minus.circle.fill",
  checkmark: "checkmark.circle.fill",
  close: "xmark.circle.fill",
  delete: "trash.fill",
  edit: "pencil",

  // Media
  play: "play.fill",
  pause: "pause.fill",
  stop: "stop.fill",
  forward: "forward.fill",
  backward: "backward.fill",

  // Communication
  mail: "envelope.fill",
  phone: "phone.fill",
  message: "message.fill",
  video: "video.fill",

  // Files & Data
  document: "doc.fill",
  folder: "folder.fill",
  cloud: "icloud.fill",
  download: "arrow.down.circle.fill",
  upload: "arrow.up.circle.fill",

  // Misc
  star: "star.fill",
  heart: "heart.fill",
  share: "square.and.arrow.up",
  print: "printer",
} as const;

export type SymbolName = (typeof Symbols)[keyof typeof Symbols];
