/**
 * Button component with theme support and Uniwind styling.
 */

import { Pressable, Text, View, StyleSheet } from "react-native";
import type { PressableProps, ViewStyle } from "react-native";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  /**
   * Button title/text.
   */
  title: string;
  /**
   * Button variant.
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /**
   * Button size.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether the button is full width.
   */
  fullWidth?: boolean;
  /**
   * Custom button color (overrides variant).
   */
  color?: string;
  /**
   * Custom text color.
   */
  textColor?: string;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Additional button styles.
   */
  buttonStyle?: ViewStyle;
  /**
   * Loading state.
   */
  loading?: boolean;
}

const sizeStyles = {
  sm: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
  md: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 44 },
  lg: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 52 },
};

const textSizeStyles = {
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
};

/**
 * Themed button component with Uniwind styling.
 *
 * @example
 * ```tsx
 * import { Button } from '@magic-expo/ui-components';
 *
 * <Button
 *   title="Press me"
 *   onPress={() => console.log('Pressed')}
 *   variant="primary"
 *   size="md"
 * />
 * ```
 */
export function Button({
  title,
  variant = "primary",
  size = "md",
  fullWidth = false,
  color,
  textColor,
  disabled = false,
  buttonStyle,
  loading = false,
  ...pressableProps
}: ButtonProps) {
  const getVariantStyle = () => {
    if (color) {
      return {
        backgroundColor: color,
        borderWidth: 0,
      };
    }

    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#007AFF",
          borderWidth: 0,
        };
      case "secondary":
        return {
          backgroundColor: "#5856D6",
          borderWidth: 0,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#007AFF",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: "#007AFF",
          borderWidth: 0,
        };
    }
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    if (variant === "outline" || variant === "ghost") return "#007AFF";
    return "#FFFFFF";
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        sizeStyles[size],
        getVariantStyle(),
        fullWidth && styles.fullWidth,
        buttonStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <Text
            style={[
              styles.text,
              textSizeStyles[size],
              { color: getTextColor() },
            ]}
          >
            ...
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              textSizeStyles[size],
              { color: getTextColor() },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontWeight: "600",
  },
  fullWidth: {
    width: "100%",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
