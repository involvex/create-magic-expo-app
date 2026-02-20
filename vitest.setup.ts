import { vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

// Mock React Native components globally
beforeEach(() => {
  vi.mock("react-native", () => ({
    View: ({ children }: { children: React.ReactNode }) => ({
      type: "View",
      props: { children },
    }),
    Text: ({ children }: { children: React.ReactNode }) => ({
      type: "Text",
      props: { children },
    }),
    Pressable: ({
      children,
      onPress,
    }: {
      children: React.ReactNode;
      onPress?: () => void;
    }) => ({
      type: "Pressable",
      props: { children, onClick: onPress },
    }),
    ScrollView: ({ children }: { children: React.ReactNode }) => ({
      type: "ScrollView",
      props: { children },
    }),
    ActivityIndicator: () => ({
      type: "ActivityIndicator",
      props: { "data-testid": "activity-indicator" },
    }),
    TextInput: ({
      onChange,
      value,
    }: {
      onChange?: (text: string) => void;
      value?: string;
    }) => ({ type: "TextInput", props: { onChange, value } }),
    useColorScheme: () => "light",
    Platform: {
      OS: "web",
      select: (obj: Record<string, unknown>) => obj.web,
    },
  }));

  vi.mock("react-native-safe-area-context", () => ({
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  }));

  vi.mock("expo-router", () => ({
    useSegments: () => [],
    usePathname: () => "/",
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
    }),
    useLocalSearchParams: () => ({}),
    Slot: ({ children }: { children: React.ReactNode }) => children,
  }));

  vi.mock("expo-constants", () => ({
    expoConfig: {
      name: "test-app",
      slug: "test-app",
      version: "1.0.0",
    },
  }));

  vi.mock("@react-native-async-storage/async-storage", () => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }));

  vi.mock("@expo/vector-icons", () => ({
    Ionicons: ({
      name,
      size,
      color,
    }: {
      name?: string;
      size?: number;
      color?: string;
    }) => ({
      type: "Ionicons",
      props: { name, size, color },
    }),
    MaterialIcons: ({
      name,
      size,
      color,
    }: {
      name?: string;
      size?: number;
      color?: string;
    }) => ({
      type: "MaterialIcons",
      props: { name, size, color },
    }),
  }));
});
