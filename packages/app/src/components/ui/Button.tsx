import { Pressable, Text, ActivityIndicator, type PressableProps } from "react-native";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  loading?: boolean;
  children: string;
}

const variantClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  danger: "bg-red-500",
  ghost: "bg-transparent border border-gray-300 dark:border-gray-600",
};

export function Button({ variant = "primary", loading = false, children, disabled, className = "", ...props }: ButtonProps) {
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
