/**
 * Card component with theme support and Uniwind styling.
 */

import { View, StyleSheet, Pressable } from "react-native";
import type { ViewStyle } from "react-native";

export interface CardProps {
  /**
   * Card content.
   */
  children: React.ReactNode;
  /**
   * Whether the card is pressable.
   */
  pressable?: boolean;
  /**
   * Callback when card is pressed.
   */
  onPress?: () => void;
  /**
   * Card padding.
   */
  padding?: number;
  /**
   * Card elevation (shadow).
   */
  elevation?: number;
  /**
   * Card border radius.
   */
  borderRadius?: number;
  /**
   * Card background color.
   */
  backgroundColor?: string;
  /**
   * Additional card styles.
   */
  style?: ViewStyle;
  /**
   * Whether the card has a border.
   */
  bordered?: boolean;
  /**
   * Border color.
   */
  borderColor?: string;
}

/**
 * Themed card component with Uniwind styling.
 *
 * @example
 * ```tsx
 * import { Card, Text } from '@magic-expo/ui-components';
 *
 * <Card padding={16} bordered>
 *   <Text>Card content</Text>
 * </Card>
 *
 * <Card onPress={() => console.log('Pressed')} pressable>
 *   <Text>Clickable card</Text>
 * </Card>
 * ```
 */
export function Card({
  children,
  pressable = false,
  onPress,
  padding = 16,
  elevation = 2,
  borderRadius = 12,
  backgroundColor = "#F2F2F7",
  style,
  bordered = false,
  borderColor = "#C6C6C8",
}: CardProps) {
  const cardStyle = [
    styles.card,
    {
      padding,
      borderRadius,
      backgroundColor,
      shadowOpacity: elevation * 0.05,
      shadowRadius: elevation * 2,
      shadowOffset: { width: 0, height: elevation },
      elevation: elevation * 2,
    },
    bordered && { borderWidth: 1, borderColor },
    style,
  ];

  if (pressable && onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={cardStyle}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Card;
