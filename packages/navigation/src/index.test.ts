import { describe, expect, it, vi } from "vitest";

vi.mock("expo-router", () => ({
  Tabs: ({ children }: { children?: unknown }) => children ?? null,
  Stack: ({ children }: { children?: unknown }) => children ?? null,
  useRouter: vi.fn(),
  useSegments: vi.fn(() => []),
  useLocalSearchParams: vi.fn(() => ({})),
}));

vi.mock("expo-router/drawer", () => ({
  Drawer: ({ children }: { children?: unknown }) => children ?? null,
}));

describe("@magic-expo/navigation exports", () => {
  it("exposes navigator components and option helpers", async () => {
    const mod = await import("./index");

    expect(typeof mod.TabNavigator).toBe("function");
    expect(typeof mod.StackNavigator).toBe("function");
    expect(typeof mod.DrawerNavigator).toBe("function");

    expect(mod.getTabScreenOptions("Home", "house")).toEqual({
      title: "Home",
      tabBarIcon: { symbolName: "house" },
    });
    expect(mod.getStackScreenOptions({ title: "Screen" }).title).toBe("Screen");
    expect(mod.getDrawerScreenOptions({ title: "Menu" }).title).toBe("Menu");
  });
});
