import { View, ScrollView, Pressable } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "@/components/ui/Card";

type ThemeMode = "light" | "dark" | "system";

const themeOptions: {
  value: ThemeMode;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: "light", label: "Light", icon: "sunny" as const },
  { value: "dark", label: "Dark", icon: "moon" as const },
  { value: "system", label: "System", icon: "desktop" as const },
];

export default function SettingsScreen() {
  const { themeMode, setThemeMode, colorScheme } = useTheme();
  const { user, signIn, signOut, isLoading } = useAuth();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="p-6 pt-16 gap-6">
        <ThemedText variant="h1">Settings</ThemedText>

        {/* Auth Card */}
        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Account
          </ThemedText>
          {user ? (
            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                  <ThemedText
                    variant="h3"
                    className="text-white"
                  >
                    {user.name.charAt(0)}
                  </ThemedText>
                </View>
                <View>
                  <ThemedText variant="body">{user.name}</ThemedText>
                  <ThemedText variant="caption">{user.email}</ThemedText>
                </View>
              </View>
              <Button
                variant="ghost"
                onPress={signOut}
                disabled={isLoading}
              >
                Sign Out
              </Button>
            </View>
          ) : (
            <View className="gap-2">
              <Button
                onPress={() => signIn("google")}
                disabled={isLoading}
              >
                Sign in with Google
              </Button>
              <Button
                variant="secondary"
                onPress={() => signIn("github")}
                disabled={isLoading}
              >
                Sign in with GitHub
              </Button>
            </View>
          )}
        </Card>

        {/* Appearance Card */}
        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Appearance
          </ThemedText>
          <View className="gap-2">
            {themeOptions.map(option => (
              <Pressable
                key={option.value}
                onPress={() => setThemeMode(option.value)}
                className={`flex-row justify-between items-center p-3 rounded-lg ${
                  themeMode === option.value
                    ? "bg-primary/10"
                    : "bg-transparent"
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Ionicons
                    name={option.icon}
                    size={20}
                    color={themeMode === option.value ? "#007aff" : "#8e8e93"}
                  />
                  <ThemedText variant="body">{option.label}</ThemedText>
                </View>
                {themeMode === option.value && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color="#007aff"
                  />
                )}
              </Pressable>
            ))}
          </View>
          <ThemedText
            variant="caption"
            className="mt-3"
          >
            Currently using: {colorScheme} mode
          </ThemedText>
        </Card>

        {/* About Card */}
        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            About
          </ThemedText>
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
