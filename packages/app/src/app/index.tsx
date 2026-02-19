import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🚀 Magic Expo</Text>
        <Text style={styles.subtitle}>
          Create professional Expo apps with{" "}
          <Text style={styles.highlight}>style and speed</Text>
        </Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <FeatureCard
          emoji="🎨"
          title="Theme System"
          description="Light/dark mode with expo-symbols support"
        />
        <FeatureCard
          emoji="🧭"
          title="Navigation"
          description="Tabs, stack, and drawer presets"
        />
        <FeatureCard
          emoji="🧩"
          title="UI Components"
          description="Button, Card, Input, Modal, Screen"
        />
        <FeatureCard
          emoji="⚙️"
          title="Config Package"
          description="Shared ESLint, TypeScript, Prettier"
        />
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaText}>Try the CLI:</Text>
        <Text style={styles.code}>bunx create-magic-expo-app my-app</Text>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

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
    <View style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#8E8E93",
    textAlign: "center",
  },
  highlight: {
    color: "#007AFF",
    fontWeight: "600",
  },
  features: {
    gap: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#8E8E93",
  },
  cta: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  code: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "monospace",
  },
});
