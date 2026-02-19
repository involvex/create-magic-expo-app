import "../global.css";

import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Slot />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
