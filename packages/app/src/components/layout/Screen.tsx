import {
  View,
  ScrollView,
  type ViewProps,
  type ScrollViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  scrollable?: boolean;
  scrollViewProps?: ScrollViewProps;
}

export function Screen({
  scrollable = false,
  scrollViewProps,
  children,
  className = "",
  ...props
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      className={`flex-1 bg-white dark:bg-black ${className}`}
      {...props}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        {...scrollViewProps}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}
