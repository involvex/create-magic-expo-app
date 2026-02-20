import { useState } from "react";
import { View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function ComponentsScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="p-6 pt-16 gap-6">
        <ThemedText variant="h1">Components</ThemedText>

        <Card>
          <ThemedText variant="h3" className="mb-4">Buttons</ThemedText>
          <View className="gap-3">
            <Button onPress={() => setLoading(!loading)}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </View>
        </Card>

        <Card>
          <ThemedText variant="h3" className="mb-4">Inputs</ThemedText>
          <View className="gap-3">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" placeholder="Enter your email" error="Invalid email" />
            <Input label="Password" placeholder="Enter password" secureTextEntry />
          </View>
        </Card>

        <Card>
          <ThemedText variant="h3" className="mb-4">Typography</ThemedText>
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
