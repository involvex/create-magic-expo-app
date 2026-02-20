import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
} from "react-native";

interface Variant {
  primary: string;
  secondary: string;
  danger: string;
  ghost: string;
}

const variantClasses: Variant = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  danger: "bg-red-500",
  ghost: "bg-transparent border border-gray-300 dark:border-gray-600",
};

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
  children: string;
}

export function Button({
  variant = "primary",
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={`${variantClasses[variant]} rounded-lg p-4 items-center justify-center ${disabled ? "opacity-50" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-white font-semibold">{children}</Text>
      )}
    </Pressable>
  );
}
