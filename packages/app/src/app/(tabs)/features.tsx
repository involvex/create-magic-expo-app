import { ThemedText } from "@/components/ui/ThemedText";
import { View, ScrollView } from "react-native";
import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Expo Router",
    description: "File-based routing with typed navigation",
    icon: "🧭",
  },
  {
    title: "Uniwind",
    description: "Tailwind CSS for React Native",
    icon: "🎨",
  },
  {
    title: "TypeScript",
    description: "Full type safety across the stack",
    icon: "📘",
  },
  {
    title: "Theme System",
    description: "Automatic light/dark mode switching",
    icon: "🌓",
  },
  {
    title: "Safe Area",
    description: "Proper notch/home indicator handling",
    icon: "📱",
  },
  {
    title: "Component Library",
    description: "Pre-built accessible components",
    icon: "🧩",
  },
];

export default function FeaturesScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="p-6 pt-16">
        <ThemedText
          variant="h1"
          className="mb-6"
        >
          Features
        </ThemedText>
        <View className="gap-4">
          {features.map(feature => (
            <Card key={feature.title}>
              <View className="flex-row items-start gap-4">
                <ThemedText variant="h2">{feature.icon}</ThemedText>
                <View className="flex-1">
                  <ThemedText
                    variant="h3"
                    className="mb-1"
                  >
                    {feature.title}
                  </ThemedText>
                  <ThemedText variant="caption">
                    {feature.description}
                  </ThemedText>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
