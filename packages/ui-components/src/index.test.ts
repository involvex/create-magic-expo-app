import { describe, expect, it, vi } from "vitest";

vi.mock("react-native", () => ({
  Pressable: ({ children }: { children?: unknown }) => children ?? null,
  Text: ({ children }: { children?: unknown }) => children ?? null,
  TextInput: ({ children }: { children?: unknown }) => children ?? null,
  View: ({ children }: { children?: unknown }) => children ?? null,
  ScrollView: ({ children }: { children?: unknown }) => children ?? null,
  Modal: ({ children }: { children?: unknown }) => children ?? null,
  StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => styles,
  },
  Dimensions: { get: () => ({ width: 390, height: 844 }) },
}));

vi.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe("@magic-expo/ui-components exports", () => {
  it("exposes core UI components", async () => {
    const mod = await import("./index");

    expect(typeof mod.Button).toBe("function");
    expect(typeof mod.Card).toBe("function");
    expect(typeof mod.Input).toBe("function");
    expect(typeof mod.Modal).toBe("function");
    expect(typeof mod.Screen).toBe("function");
  });
});
