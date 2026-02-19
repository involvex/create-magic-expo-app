/**
 * Screen component with theme support and Uniwind styling.
 * Use this as a wrapper for your app screens.
 */

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView } from "react-native";
import type { ScrollViewProps } from "react-native";
import type { ViewStyle } from "react-native";
import type { ReactNode } from "react";

export interface ScreenProps {
  /**
   * Screen content.
   */
  children: ReactNode;
  /**
   * Whether to use scroll view.
   */
  scrollable?: boolean;
  /**
   * Scroll view props (when scrollable is true).
   */
  scrollViewProps?: ScrollViewProps;
  /**
   * Background color.
   */
  backgroundColor?: string;
  /**
   * Additional screen styles.
   */
  style?: ViewStyle;
  /**
   * Whether to use safe area insets.
   */
  useSafeArea?: boolean;
  /**
   * Padding around the content.
   */
  padding?: number;
  /**
   * Whether to disable padding on top.
   */
  noTopPadding?: boolean;
  /**
   * Whether to disable padding on bottom.
   */
  noBottomPadding?: boolean;
}

/**
 * Screen wrapper component with Uniwind styling.
 *
 * @example
 * ```tsx
 * import { Screen, Text } from '@magic-expo/ui-components';
 *
 * export default function MyScreen() {
 *   return (
 *     <Screen scrollable>
 *       <Text>My screen content</Text>
 *     </Screen>
 *   );
 * }
 * ```
 */
export function Screen({
  children,
  scrollable = false,
  scrollViewProps,
  backgroundColor = "#FFFFFF",
  style,
  useSafeArea = true,
  padding = 16,
  noTopPadding = false,
  noBottomPadding = false,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const contentStyle = [
    styles.content,
    {
      padding,
      paddingTop: noTopPadding ? 0 : padding,
      paddingBottom: noBottomPadding ? 0 : padding,
    },
  ];

  const containerStyle = [
    styles.container,
    { backgroundColor },
    useSafeArea && {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    style,
  ];

  const content = <View style={contentStyle}>{children}</View>;

  return (
    <View style={containerStyle}>
      {scrollable ? (
        <ScrollView
          {...scrollViewProps}
          style={[scrollViewProps?.style, styles.flex]}
          contentContainerStyle={scrollViewProps?.contentContainerStyle}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Screen;
