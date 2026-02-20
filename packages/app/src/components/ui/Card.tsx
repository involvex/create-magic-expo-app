import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <View
      className={`bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm ${className}`}
      {...props}
    />
  );
}
