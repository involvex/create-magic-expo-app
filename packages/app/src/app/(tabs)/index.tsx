import { View, ScrollView, Pressable } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { Card } from "@/components/ui/Card";

const features = [
  {
    emoji: "🎨",
    title: "Theme System",
    description: "Light/dark mode with automatic switching",
  },
  {
    emoji: "🧭",
    title: "Navigation",
    description: "Expo Router file-based routing",
  },
  {
    emoji: "🧩",
    title: "UI Components",
    description: "Reusable themed components",
  },
  {
    emoji: "⚙️",
    title: "Config Package",
    description: "Shared ESLint, TypeScript, Prettier",
  },
];

function FeatureCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <View className="items-start gap-3">
        <ThemedText variant="h2">{emoji}</ThemedText>
        <ThemedText
          variant="h3"
          className="mb-1"
        >
          {title}
        </ThemedText>
        <ThemedText variant="caption">{description}</ThemedText>
      </View>
    </Card>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="p-6 pt-16">
        {/* Header */}
        <View className="mb-8 items-center">
          <ThemedText
            variant="h1"
            className="mb-3"
          >
            🚀 Magic Expo
          </ThemedText>
          <ThemedText
            variant="body"
            className="text-center text-gray-500 dark:text-gray-400"
          >
            Create professional Expo apps with{" "}
            <ThemedText color="primary">style and speed</ThemedText>
          </ThemedText>
        </View>

        {/* Features */}
        <View className="gap-4 mb-8">
          {features.map(feature => (
            <FeatureCard
              key={feature.title}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </View>

        {/* CTA */}
        <Pressable className="bg-primary rounded-xl p-5 items-center">
          <ThemedText
            variant="caption"
            className="text-white mb-2"
          >
            Try the CLI:
          </ThemedText>
          <ThemedText
            variant="h3"
            className="text-white font-mono"
          >
            bunx create-magic-expo-app my-app
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}
