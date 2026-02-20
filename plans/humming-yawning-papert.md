# CI Fixes & Future Features Implementation Plan

## Context

**Current Issues:**

1. **CI ESLint Failure**: GitHub Actions workflow fails with "Cannot find module 'eslint-config-expo/flat'" - this appears to be coming from Expo CLI's template scanning, not the actual project config
2. **No Testing Infrastructure**: The monorepo has no tests or test framework configured
3. **Non-functional Theme Controls**: Settings page shows theme but provides no controls to change it
4. **Non-functional Buttons**: Component showcase buttons don't perform any actions

**Requested Future Features:**

1. Tests for each package
2. Custom theme configuration with manual controls
3. Functional settings and buttons
4. Custom OAuth integration

---

## Phase 1: Immediate CI Fixes

### 1.1 Fix ESLint CI Error

**Problem Analysis:**
The error originates from Expo CLI's template scanner (`D:/temp/bun/@expo/cli@55.0.8@@@1/static/template/eslint.config.js`), not the actual project configuration. The project has a valid custom ESLint config at `eslint.config.ts` that doesn't use `eslint-config-expo`.

**Solution:** Add explicit ESLint configuration to the app package to prevent Expo CLI from scanning templates.

#### Files to Modify:

**Create:** `packages/app/eslint.config.js`

```js
module.exports = require("../../eslint.config.ts");
```

This prevents Expo CLI from searching for template configs.

### 1.2 Update GitHub Workflows

**File:** `.github/workflows/security.yml`

Changes:

- Ensure lint runs from root with explicit config path
- Add cache for bun installations

---

## Phase 2: Testing Infrastructure

### 2.1 Framework Choice: Vitest

**Rationale:**

- Native TypeScript support (no extra config needed)
- Fast execution with Bun compatibility
- Similar API to Jest (easy migration)
- Built-in coverage with `c8`

### 2.2 Installation & Configuration

#### Root package.json Additions:

```json
{
  "devDependencies": {
    "vitest": "^2.1.0",
    "@vitest/ui": "^2.1.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/react-native": "^12.5.0",
    "@testing-library/jest-dom": "^6.5.0",
    "jsdom": "^25.0.0",
    "happy-dom": "^15.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

#### Create: `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.expo/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.{js,ts,jsx,tsx}"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./packages/app/src"),
    },
  },
});
```

#### Create: `vitest.setup.ts`

```typescript
import { Text } from "react-native";
import "@testing-library/jest-dom";

// Mock React Native components
jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "web",
  select: jest.fn(obj => obj.web),
}));

// Mock safe area context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
```

### 2.3 Test Structure

```
packages/
  ├── cli/
  │   └── src/
  │       └── prompts.test.ts
  ├── config/
  │   └── src/
  │       ├── eslint.test.ts
  │       └── typescript.test.ts
  ├── theming/
  │   └── src/
  │       └── theme.test.ts
  └── app/
      └── src/
          ├── components/
          │   └── ui/
          │       ├── Button.test.tsx
          │       ├── ThemedText.test.tsx
          │       └── Card.test.tsx
          └── app/
              └── (tabs)/
                  └── index.test.tsx
```

### 2.4 Initial Test Examples

**File:** `packages/app/src/components/ui/Button.test.tsx`

```tsx
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress when clicked", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Click</Button>);
    fireEvent.press(getByText("Click"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("shows loading indicator when loading", () => {
    const { getByTestId } = render(<Button loading>Loading</Button>);
    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("is disabled when disabled prop is true", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button
        onPress={onPress}
        disabled
      >
        Disabled
      </Button>,
    );
    fireEvent.press(getByText("Disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

---

## Phase 3: Custom Theme Configuration

### 3.1 Theme Context Provider

**Create:** `packages/app/src/contexts/ThemeContext.tsx`

```tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";
type ColorScheme = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const colorScheme: ColorScheme =
    themeMode === "system" ? (systemColorScheme ?? "light") : themeMode;

  useEffect(() => {
    // Apply dark class to root element for web
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (colorScheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ themeMode, colorScheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

### 3.2 Update Root Layout

**File:** `packages/app/src/app/_layout.tsx`

```tsx
import { ThemeProvider } from "../contexts/ThemeContext";
import { Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
```

### 3.3 Update Settings Page with Controls

**File:** `packages/app/src/app/(tabs)/settings.tsx`

```tsx
import { ThemedText, Card } from "@/components/ui/ThemedText";
import { View, ScrollView, Pressable } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "@/components/ui/Card";

type ThemeMode = "light" | "dark" | "system";

const themeOptions: { value: ThemeMode; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "sunny" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "desktop" },
];

export default function SettingsScreen() {
  const { themeMode, setThemeMode, colorScheme } = useTheme();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="p-6 pt-16 gap-6">
        <ThemedText variant="h1">Settings</ThemedText>

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
                    name={option.icon as any}
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

        {/* About card unchanged */}
      </View>
    </ScrollView>
  );
}
```

### 3.4 Persistent Theme Storage

**Update:** `packages/app/src/contexts/ThemeContext.tsx`

Add AsyncStorage to persist theme preference:

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_STORAGE_KEY = "@app_theme_mode";

// In ThemeProvider:
const loadThemeMode = async () => {
  try {
    const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (
      saved &&
      (saved === "light" || saved === "dark" || saved === "system")
    ) {
      setThemeMode(saved as ThemeMode);
    }
  } catch (error) {
    console.error("Failed to load theme mode:", error);
  }
};

const saveThemeMode = async (mode: ThemeMode) => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (error) {
    console.error("Failed to save theme mode:", error);
  }
};

useEffect(() => {
  loadThemeMode();
}, []);

useEffect(() => {
  saveThemeMode(themeMode);
}, [themeMode]);
```

Add dependency: `@react-native-async-storage/async-storage` to package.json.

---

## Phase 4: Functional Buttons & State Management

### 4.1 Toast Notification System

**Create:** `packages/app/src/components/ui/Toast.tsx`

```tsx
import { View, Text, Animated } from "react-native";
import { ThemedText } from "./ThemedText";
import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onHide: () => void;
};

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onHide,
}: ToastProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onHide());
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <Animated.View
      className={`${bgColors[type]} rounded-xl p-4 m-4 shadow-lg`}
      style={{ opacity }}
    >
      <ThemedText
        variant="body"
        className="text-white"
      >
        {message}
      </ThemedText>
    </Animated.View>
  );
}
```

**Create:** `packages/app/src/contexts/ToastContext.tsx`

```tsx
import React, { createContext, useContext, useState } from "react";
import { Toast } from "../components/ui/Toast";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onHide={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
```

### 4.2 Update Components Showcase

**File:** `packages/app/src/app/(tabs)/components.tsx`

```tsx
import { ThemedText, Button, Input, Card } from "@/components/ui";
import { useToast } from "@/contexts/ToastContext";
import { View, ScrollView } from "react-native";
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
          <Input
            label="Enter text"
            placeholder="Type something..."
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Button onPress={() => showToast(`You typed: ${inputValue}`, "info")}>
            Show Toast
          </Button>
        </Card>

        {/* Typography card unchanged */}
      </View>
    </ScrollView>
  );
}
```

### 4.3 Update Root Layout with ToastProvider

**File:** `packages/app/src/app/_layout.tsx`

```tsx
import { ToastProvider } from "../contexts/ToastContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Slot />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

---

## Phase 5: OAuth Integration

### 5.1 Auth Context Setup

**Create:** `packages/app/src/contexts/AuthContext.tsx`

```tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (provider: "google" | "github" | "apple") => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "@app_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (user: User | null) => {
    try {
      if (user) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const signIn = async (provider: "google" | "github" | "apple") => {
    setIsLoading(true);
    try {
      // TODO: Implement actual OAuth flow
      // For now, mock the response
      const mockUser: User = {
        id: "123",
        email: `user@${provider}.com`,
        name: `${provider} User`,
      };
      setUser(mockUser);
      await saveUser(mockUser);
    } catch (error) {
      console.error(`Sign in with ${provider} failed:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      await saveUser(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### 5.2 OAuth Configuration

**File:** `packages/app/app.json`

Add OAuth configuration for each provider:

```json
{
  "expo": {
    "scheme": "acme",
    "web": {
      "output": "static",
      "favicon": "../../assets/favicon.PNG"
    },
    "name": "create-magic-expo-app",
    "slug": "create-magic-expo-app",
    "icon": "../../assets/icon.PNG",
    "splash": {
      "image": "../../assets/logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": ["expo-router"],
    "android": {
      "package": "com.involvex.createmagicexpoapp",
      "adaptiveIcon": {
        "foregroundImage": "../../assets/icon.PNG",
        "backgroundColor": "#ffffff"
      }
    },
    "extra": {
      "googleClientId": "YOUR_GOOGLE_CLIENT_ID",
      "githubClientId": "YOUR_GITHUB_CLIENT_ID"
    }
  }
}
```

### 5.3 Add OAuth Dependencies

**File:** `packages/app/package.json`

```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.23.0",
    "@react-native-google-signin/google-signin": "^12.0.0",
    "@invertase/react-native-apple-authentication": "^2.3.0",
    "expo-auth-session": "~5.5.0",
    "expo-crypto": "~12.8.0",
    "expo-web-browser": "~13.0.0"
  }
}
```

### 5.4 Update Settings Page with Auth

**File:** `packages/app/src/app/(tabs)/settings.tsx`

Add authentication section:

```tsx
import { ThemedText, Button, Card } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsScreen() {
  const { user, signIn, signOut, isLoading } = useAuth();

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
                onPress={() => signIn("google")}
                disabled={isLoading}
              >
                Sign in with Google
              </Button>
              <Button
                variant="secondary"
                onPress={() => signIn("github")}
                disabled={isLoading}
              >
                Sign in with GitHub
              </Button>
            </View>
          )}
        </Card>

        {/* Appearance Card */}
        {/* ... existing theme controls ... */}

        {/* About Card */}
        {/* ... unchanged ... */}
      </View>
    </ScrollView>
  );
}
```

### 5.5 Update Root Layout with AuthProvider

**File:** `packages/app/src/app/_layout.tsx`

```tsx
import { ToastProvider } from "../contexts/ToastContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
```

---

## Verification Steps

### Phase 1 (CI Fixes)

1. Run `bun run lint` - should pass without eslint-config-expo errors
2. Push to main branch - CI should pass

### Phase 2 (Testing)

1. Run `bun test` - should execute all tests
2. Run `bun test:coverage` - should generate coverage report
3. Run `bun test:ui` - should open Vitest UI

### Phase 3 (Theme)

1. Open app, navigate to Settings
2. Tap "Light" - app should switch to light mode
3. Tap "Dark" - app should switch to dark mode
4. Tap "System" - app should follow system theme
5. Restart app - theme preference should persist

### Phase 4 (Functional Buttons)

1. Navigate to Components tab
2. Tap any button - toast notification should appear
3. Toggle loading button - should show loading spinner
4. Type in input - value should be displayed in toast

### Phase 5 (OAuth)

1. Navigate to Settings
2. Tap "Sign in with Google" - should initiate OAuth flow (mock for now)
3. After sign in, user info should display
4. Tap "Sign Out" - should clear user session

---

## Summary of Files to Create/Modify

### Create (13 files):

1. `packages/app/eslint.config.js`
2. `vitest.config.ts`
3. `vitest.setup.ts`
4. `packages/app/src/components/ui/Toast.tsx`
5. `packages/app/src/contexts/ThemeContext.tsx`
6. `packages/app/src/contexts/ToastContext.tsx`
7. `packages/app/src/contexts/AuthContext.tsx`
8. `packages/cli/src/prompts.test.ts`
9. `packages/config/src/eslint.test.ts`
10. `packages/app/src/components/ui/Button.test.tsx`
11. `packages/app/src/components/ui/ThemedText.test.tsx`
12. `packages/app/src/components/ui/Card.test.tsx`
13. `packages/app/src/app/(tabs)/index.test.tsx`

### Modify (7 files):

1. `.github/workflows/security.yml` - Fix CI lint command
2. `package.json` - Add test scripts and dependencies
3. `packages/app/package.json` - Add OAuth and AsyncStorage dependencies
4. `packages/app/app.json` - Add OAuth config
5. `packages/app/src/app/_layout.tsx` - Add all providers
6. `packages/app/src/app/(tabs)/settings.tsx` - Add functional controls
7. `packages/app/src/app/(tabs)/components.tsx` - Add button handlers
