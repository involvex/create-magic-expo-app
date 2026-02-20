# Fix Icon Error and Improve App Starter

## Context

**Problem:** The app has a missing asset error for `icon.png` - Metro bundler cannot find the app icon. The error occurs because `app.json` references `../../assets/icon.png` (lowercase) but the actual file is `icon.PNG` (uppercase extension).

**Additional Request:** Improve the app starter with:

- Splash screen implementation
- Reusable UI component library
- Working pages with tab navigation
- Modern UI using Uniwind styling

**Current State:**

- Assets exist at `D:/app-dev/assets/` with `icon.PNG` and `favicon.PNG`
- Only two routes: `_layout.tsx` and `index.tsx`
- No reusable UI components
- Inconsistent styling (mix of StyleSheet and Uniwind)
- Expo SDK 55 preview (already downgraded)

---

## Changes Required

### Phase 1: Fix Asset Issues (Immediate)

#### 1.1 Fix Icon Reference in app.json

**File:** `packages/app/app.json`

Change icon references from lowercase `.png` to uppercase `.PNG`:

```json
{
  "expo": {
    "icon": "../../assets/icon.PNG",
    "web": {
      "favicon": "../../assets/favicon.PNG"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "../../assets/icon.PNG",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

#### 1.2 Add Splash Screen Configuration

**File:** `packages/app/app.json`

Add splash configuration:

```json
{
  "expo": {
    "splash": {
      "image": "../../assets/logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

#### 1.3 Add Dependencies

**File:** `packages/app/package.json`

Add missing dependencies:

```json
{
  "dependencies": {
    "expo-splash-screen": "~55.0.0",
    "@expo/vector-icons": "^14.0.0"
  }
}
```

---

### Phase 2: Create UI Component Library

#### 2.1 Create Component Directory Structure

```
packages/app/src/components/
├── ui/              # Reusable UI components
├── layout/          # Layout components
└── navigation/      # Navigation-specific components
```

#### 2.2 Create Core UI Components

**File:** `packages/app/src/components/ui/ThemedView.tsx`

```tsx
import { View, type ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
  className?: string;
}

export function ThemedView({ className = "", ...props }: ThemedViewProps) {
  return (
    <View
      className={`bg-background dark:bg-black ${className}`}
      {...props}
    />
  );
}
```

**File:** `packages/app/src/components/ui/ThemedText.tsx`

```tsx
import { Text, type TextProps } from "react-native";

type Variant = "h1" | "h2" | "h3" | "body" | "caption";
type Color = "primary" | "secondary" | "accent" | "default";

interface ThemedTextProps extends TextProps {
  variant?: Variant;
  color?: Color;
  className?: string;
}

const variantClasses = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  body: "text-base",
  caption: "text-sm text-gray-500",
};

const colorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  default: "text-gray-900 dark:text-white",
};

export function ThemedText({
  variant = "body",
  color = "default",
  className = "",
  ...props
}: ThemedTextProps) {
  return (
    <Text
      className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}
      {...props}
    />
  );
}
```

**File:** `packages/app/src/components/ui/Button.tsx`

```tsx
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from "react-native";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  loading?: boolean;
  children: string;
}

const variantClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  danger: "bg-red-500",
  ghost: "bg-transparent border border-gray-300 dark:border-gray-600",
};

export function Button({
  variant = "primary",
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={`${variantClasses[variant]} rounded-lg p-4 items-center justify-center ${disabled ? "opacity-50" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-white font-semibold">{children}</Text>
      )}
    </Pressable>
  );
}
```

**File:** `packages/app/src/components/ui/Card.tsx`

```tsx
import { View, type ViewProps } from "react-native";

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <View
      className={`bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm ${className}`}
      {...props}
    />
  );
}
```

**File:** `packages/app/src/components/ui/Input.tsx`

```tsx
import { TextInput, type TextInputProps, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <View className="mb-4">
      {label && (
        <ThemedText
          variant="caption"
          className="mb-2"
        >
          {label}
        </ThemedText>
      )}
      <TextInput
        className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${error ? "border-red-500" : ""} ${className}`}
        placeholderTextColor="#8e8e93"
        {...props}
      />
      {error && (
        <ThemedText
          variant="caption"
          className="text-red-500 mt-1"
        >
          {error}
        </ThemedText>
      )}
    </View>
  );
}
```

**File:** `packages/app/src/components/layout/Screen.tsx`

```tsx
import {
  View,
  ScrollView,
  type ViewProps,
  type ScrollViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  scrollable?: boolean;
  scrollViewProps?: ScrollViewProps;
}

export function Screen({
  scrollable = false,
  scrollViewProps,
  children,
  className = "",
  ...props
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      className={`flex-1 bg-white dark:bg-black ${className}`}
      {...props}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        {...scrollViewProps}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}
```

**File:** `packages/app/src/components/ui/index.ts`

```tsx
export { ThemedView } from "./ThemedView";
export { ThemedText } from "./ThemedText";
export { Button } from "./Button";
export { Card } from "./Card";
export { Input } from "./Input";
export { Screen } from "../layout/Screen";
```

---

### Phase 3: Implement Tab Navigation

#### 3.1 Create Tab Layout

**File:** `packages/app/src/app/(tabs)/_layout.tsx`

Move current `index.tsx` to `(tabs)/index.tsx` and create new tab layout:

```tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007aff",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="features"
        options={{
          title: "Features",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="list"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: "Components",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="cube"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="settings"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
```

#### 3.2 Update Root Layout

**File:** `packages/app/src/app/_layout.tsx`

Update to redirect to tabs:

```tsx
import { Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return <Slot />;
}
```

#### 3.3 Create New Pages

**File:** `packages/app/src/app/(tabs)/features.tsx`

```tsx
import { ThemedText, Card } from "../../components/ui";
import { View, ScrollView } from "react-native";

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
```

**File:** `packages/app/src/app/(tabs)/components.tsx`

```tsx
import { ThemedText, Button, Input, Card } from "../../components/ui";
import { View, ScrollView, useState } from "react-native";

export default function ComponentsScreen() {
  const [loading, setLoading] = useState(false);

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
            <Button onPress={() => setLoading(!loading)}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </View>
        </Card>

        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            Inputs
          </ThemedText>
          <View className="gap-3">
            <Input
              label="Name"
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              error="Invalid email"
            />
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
            />
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
```

**File:** `packages/app/src/app/(tabs)/settings.tsx`

```tsx
import { View, ScrollView, useColorScheme } from "react-native";
import { ThemedText, Card, Button } from "../../components/ui";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();

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
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <ThemedText variant="body">Current Theme</ThemedText>
              <ThemedText
                variant="caption"
                className="uppercase"
              >
                {colorScheme ?? "system"}
              </ThemedText>
            </View>
            <ThemedText variant="caption">
              Theme switches automatically with system settings.
            </ThemedText>
          </View>
        </Card>

        <Card>
          <ThemedText
            variant="h3"
            className="mb-4"
          >
            About
          </ThemedText>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <ThemedText variant="caption">Version</ThemedText>
              <ThemedText variant="caption">1.0.0</ThemedText>
            </View>
            <View className="flex-row justify-between">
              <ThemedText variant="caption">Expo SDK</ThemedText>
              <ThemedText variant="caption">55</ThemedText>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
```

---

## Files to Modify

### Modify (6 files)

1. `packages/app/app.json` - Fix icon extension, add splash config
2. `packages/app/package.json` - Add dependencies
3. `packages/app/src/app/_layout.tsx` - Simplify to Slot only
4. `packages/app/src/app/index.tsx` - Move to (tabs)/ and refactor to Uniwind

### Create (10 files)

1. `packages/app/src/app/(tabs)/_layout.tsx` - Tab navigation
2. `packages/app/src/app/(tabs)/features.tsx` - Features page
3. `packages/app/src/app/(tabs)/components.tsx` - Component demos
4. `packages/app/src/app/(tabs)/settings.tsx` - Settings page
5. `packages/app/src/components/ui/ThemedView.tsx`
6. `packages/app/src/components/ui/ThemedText.tsx`
7. `packages/app/src/components/ui/Button.tsx`
8. `packages/app/src/components/ui/Card.tsx`
9. `packages/app/src/components/ui/Input.tsx`
10. `packages/app/src/components/layout/Screen.tsx`
11. `packages/app/src/components/ui/index.ts`

---

## Verification

1. **Start dev server**: `bun run -F @magic-expo/app start` - Should load without icon errors
2. **Test all tabs**: Home, Features, Components, Settings - All should navigate correctly
3. **Test components**: Buttons, inputs, cards should render with proper styling
4. **Test themes**: Toggle light/dark mode - all colors should switch correctly
5. **Type check**: `bun run typecheck` - Should pass without errors
6. **Lint**: `bun run lint` - Should pass without errors
