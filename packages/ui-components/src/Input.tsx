/**
 * Input component with theme support and Uniwind styling.
 */

import { TextInput, View, Text, StyleSheet } from "react-native";
import type { TextInputProps, ViewStyle } from "react-native";
import { useState } from "react";

export interface InputProps extends Omit<TextInputProps, "style"> {
  /**
   * Input label.
   */
  label?: string;
  /**
   * Error message to display.
   */
  error?: string;
  /**
   * Helper text to display below the input.
   */
  helperText?: string;
  /**
   * Whether the input is required.
   */
  required?: boolean;
  /**
   * Input container style.
   */
  containerStyle?: ViewStyle;
  /**
   * Input border radius.
   */
  borderRadius?: number;
  /**
   * Input background color.
   */
  backgroundColor?: string;
  /**
   * Border color (normal state).
   */
  borderColor?: string;
  /**
   * Focus border color.
   */
  focusColor?: string;
  /**
   * Error border color.
   */
  errorColor?: string;
  /**
   * Text color.
   */
  textColor?: string;
  /**
   * Placeholder text color.
   */
  placeholderColor?: string;
}

/**
 * Themed input component with Uniwind styling.
 *
 * @example
 * ```tsx
 * import { Input } from '@magic-expo/ui-components';
 *
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   keyboardType="email-address"
 *   error={hasError ? 'Invalid email' : undefined}
 * />
 * ```
 */
export function Input({
  label,
  error,
  helperText,
  required = false,
  containerStyle,
  borderRadius = 8,
  backgroundColor = "#FFFFFF",
  borderColor = "#C6C6C8",
  focusColor = "#007AFF",
  errorColor = "#FF3B30",
  textColor = "#000000",
  placeholderColor = "#8E8E93",
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputBorderColor = error
    ? errorColor
    : isFocused
      ? focusColor
      : borderColor;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TextInput
        {...textInputProps}
        onFocus={e => {
          setIsFocused(true);
          textInputProps.onFocus?.(e);
        }}
        onBlur={e => {
          setIsFocused(false);
          textInputProps.onBlur?.(e);
        }}
        style={[
          styles.input,
          {
            borderRadius,
            backgroundColor,
            borderColor: inputBorderColor,
            color: textColor,
          },
        ]}
        placeholderTextColor={placeholderColor}
      />

      {error && (
        <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
      )}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#000000",
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    color: "#8E8E93",
  },
});

export default Input;
