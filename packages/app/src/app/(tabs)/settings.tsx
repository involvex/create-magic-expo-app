import { View, ScrollView, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { Card } from "@/components/ui/Card";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="p-6 pt-16 gap-6">
        <ThemedText variant="h1">Settings</ThemedText>

        <Card>
          <ThemedText variant="h3" className="mb-4">Appearance</ThemedText>
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <ThemedText variant="body">Current Theme</ThemedText>
              <ThemedText variant="caption" className="uppercase">
                {colorScheme ?? "system"}
              </ThemedText>
            </View>
            <ThemedText variant="caption">
              Theme switches automatically with system settings.
            </ThemedText>
          </View>
        </Card>

        <Card>
          <ThemedText variant="h3" className="mb-4">About</ThemedText>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <ThemedText variant="caption">Version</ThemedText>
              <ThemedText variant="caption">1.0.0</ThemedText>
            </View>
            <View className="flex-row justify-between">
              <ThemedText variant="caption">Expo SDK</ThemedText>
              <ThemedText variant="caption">55</ThemedText>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
