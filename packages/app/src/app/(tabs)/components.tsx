import { ThemedText } from "@/components/ui/ThemedText";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/Button";
import { View, ScrollView } from "react-native";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";

export default function ComponentsScreen() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { showToast } = useToast();

  const handleButtonPress = (variant: string) => {
    showToast(`${variant} button pressed!`, "success");
  };

  const handleLoadingToggle = () => {
    setLoading(!loading);
    showToast(loading ? "Loading stopped" : "Loading started...", "info");
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="p-6 pt-16 gap-6">
        <ThemedText variant="h1">Components</ThemedText>

        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Buttons
          </ThemedText>
          <View className="gap-3">
            <Button onPress={() => handleButtonPress("Primary")}>
              Primary
            </Button>
            <Button
              variant="secondary"
              onPress={() => handleButtonPress("Secondary")}
            >
              Secondary
            </Button>
            <Button
              variant="danger"
              onPress={() => handleButtonPress("Danger")}
            >
              Danger
            </Button>
            <Button
              variant="ghost"
              onPress={() => handleButtonPress("Ghost")}
            >
              Ghost
            </Button>
            <Button
              loading={loading}
              onPress={handleLoadingToggle}
            >
              {loading ? "Loading..." : "Toggle Loading"}
            </Button>
            <Button
              disabled
              onPress={() => showToast("Cannot press disabled button", "error")}
            >
              Disabled
            </Button>
          </View>
        </Card>

        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Input Demo
          </ThemedText>
          <View className="gap-3">
            <Input
              label="Enter text"
              placeholder="Type something..."
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Button
              onPress={() => showToast(`You typed: ${inputValue}`, "info")}
            >
              Show Toast
            </Button>
          </View>
        </Card>

        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Typography
          </ThemedText>
          <View className="gap-2">
            <ThemedText variant="h1">Heading 1</ThemedText>
            <ThemedText variant="h2">Heading 2</ThemedText>
            <ThemedText variant="h3">Heading 3</ThemedText>
            <ThemedText variant="body">Body text</ThemedText>
            <ThemedText variant="caption">Caption text</ThemedText>
            <ThemedText color="primary">Primary color</ThemedText>
            <ThemedText color="secondary">Secondary color</ThemedText>
            <ThemedText color="accent">Accent color</ThemedText>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
