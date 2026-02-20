import { Text, type TextProps } from "react-native";

type Variant = "h1" | "h2" | "h3" | "body" | "caption";
type Color = "primary" | "secondary" | "accent" | "default";

interface ThemedTextProps extends TextProps {
  variant?: Variant;
  color?: Color;
  className?: string;
}

const variantClasses = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  body: "text-base",
  caption: "text-sm text-gray-500 dark:text-gray-400",
};

const colorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  default: "text-gray-900 dark:text-white",
};

export function ThemedText({ variant = "body", color = "default", className = "", ...props }: ThemedTextProps) {
  return (
    <Text className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`} {...props} />
  );
}
