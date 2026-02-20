import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ScrollView, Pressable, Switch } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "@/components/ui/Card";

type ThemeMode = "light" | "dark" | "system";
type SettingsKey =
  | "notificationsEnabled"
  | "marketingNotifications"
  | "productUpdates";
type AppSettings = Record<SettingsKey, boolean>;

const SETTINGS_STORAGE_KEY = "@app_settings";
const DEFAULT_SETTINGS: AppSettings = {
  notificationsEnabled: true,
  marketingNotifications: false,
  productUpdates: true,
};

const settingItems: {
  key: SettingsKey;
  label: string;
  description: string;
}[] = [
  {
    key: "notificationsEnabled",
    label: "Push notifications",
    description: "Enable push notifications for important activity.",
  },
  {
    key: "marketingNotifications",
    label: "Marketing notifications",
    description: "Receive occasional product tips and launch updates.",
  },
  {
    key: "productUpdates",
    label: "Product updates",
    description: "Get notified when new features are released.",
  },
];

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
  const { showToast } = useToast();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (!stored) return;
        const parsed = JSON.parse(stored) as Partial<AppSettings>;
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setSettingsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const persistSettings = async (nextSettings: AppSettings) => {
    setSettings(nextSettings);
    try {
      await AsyncStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(nextSettings),
      );
    } catch (error) {
      console.error("Failed to save settings:", error);
      showToast("Failed to save settings", "error");
    }
  };

  const updateSetting = async (key: SettingsKey, value: boolean) => {
    const nextSettings = { ...settings, [key]: value };
    await persistSettings(nextSettings);
    showToast(
      `${value ? "Enabled" : "Disabled"} ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`,
      "info",
    );
  };

  const resetDefaults = async () => {
    await persistSettings(DEFAULT_SETTINGS);
    showToast("Restored default settings", "success");
  };

  const clearAppCaches = async () => {
    try {
      await AsyncStorage.multiRemove([
        SETTINGS_STORAGE_KEY,
        "@app_theme_mode",
        "@app_user",
      ]);
      await signOut();
      setThemeMode("system");
      setSettings(DEFAULT_SETTINGS);
      showToast("Cleared app cache and reset defaults", "success");
    } catch (error) {
      console.error("Failed to clear caches:", error);
      showToast("Failed to clear caches", "error");
    }
  };

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
                  <ThemedText variant="caption">
                    Provider: {user.provider}
                  </ThemedText>
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
                onPress={() => signIn("github")}
                disabled={isLoading}
              >
                Sign in with GitHub
              </Button>
              <Button
                variant="secondary"
                onPress={() => signIn("discord")}
                disabled={isLoading}
              >
                Sign in with Discord
              </Button>
              <ThemedText variant="caption">
                OAuth sample flow is mocked for local development.
              </ThemedText>
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

        {/* Notifications Card */}
        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Notifications
          </ThemedText>
          <View className="gap-4">
            {settingItems.map(item => (
              <View
                key={item.key}
                className="flex-row items-start justify-between gap-4"
              >
                <View className="flex-1">
                  <ThemedText variant="body">{item.label}</ThemedText>
                  <ThemedText variant="caption">{item.description}</ThemedText>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={value => updateSetting(item.key, value)}
                  disabled={settingsLoading || isLoading}
                />
              </View>
            ))}
          </View>
        </Card>

        {/* Maintenance Card */}
        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Maintenance
          </ThemedText>
          <View className="gap-3">
            <Button
              variant="ghost"
              onPress={resetDefaults}
              disabled={settingsLoading}
            >
              Reset to defaults
            </Button>
            <Button
              variant="danger"
              onPress={clearAppCaches}
              disabled={isLoading}
            >
              Clear caches and session
            </Button>
          </View>
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
            <View className="flex-row justify-between">
              <ThemedText variant="caption">Navigation</ThemedText>
              <ThemedText variant="caption">Tabs</ThemedText>
            </View>
            <View className="flex-row justify-between">
              <ThemedText variant="caption">Theme mode</ThemedText>
              <ThemedText variant="caption">{themeMode}</ThemedText>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
