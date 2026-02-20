import ejs from "ejs";

export interface TemplateOptions {
  projectName: string;
  navigation?: "tabs" | "stack" | "drawer" | "none";
  theming?: boolean;
  uiComponents?: boolean;
  author?: string;
  description?: string;
  template?: TemplateName;
  buildProvider?: BuildProvider;
}

export interface TemplateFile {
  path: string;
  content: string;
}

export const Templates = {
  MINIMUM: "minimum",
  DEFAULT: "default",
  SHOWCASE: "showcase",
} as const;

export type TemplateName = (typeof Templates)[keyof typeof Templates];
export type BuildProvider = "local" | "eas";

export interface ResolvedTemplateOptions {
  projectName: string;
  navigation: "tabs" | "stack" | "drawer" | "none";
  theming: boolean;
  uiComponents: boolean;
  author?: string;
  description: string;
  template: TemplateName;
  buildProvider: BuildProvider;
}

const DEFAULT_DESCRIPTION =
  "A modern Expo app created with create-magic-expo-app";
const EXPO_VERSIONS = {
  expo: "55.0.0-preview.11",
  expoRouter: "55.0.0-preview.8",
  expoStatusBar: "~55.0.0",
  expoSystemUi: "~55.0.0",
  react: "19.2.0",
  reactNative: "0.83.2",
  reactDom: "19.2.0",
  reactNativeWeb: "^0.21.0",
  gestureHandler: "~2.30.0",
  reanimated: "~4.2.1",
  safeAreaContext: "~5.6.2",
  screens: "~4.23.0",
} as const;

export function resolveTemplateOptions(
  options: TemplateOptions,
): ResolvedTemplateOptions {
  const template = options.template ?? Templates.DEFAULT;
  const resolved: ResolvedTemplateOptions = {
    projectName: options.projectName,
    navigation: options.navigation ?? "tabs",
    theming: options.theming ?? true,
    uiComponents: options.uiComponents ?? true,
    author: options.author,
    description: options.description?.trim() || DEFAULT_DESCRIPTION,
    template,
    buildProvider: options.buildProvider ?? "local",
  };

  if (template === Templates.MINIMUM) {
    resolved.navigation = "none";
    resolved.theming = false;
    resolved.uiComponents = false;
    resolved.buildProvider = "local";
  }

  if (template === Templates.SHOWCASE) {
    resolved.theming = true;
    resolved.uiComponents = true;
    if (resolved.navigation === "none") {
      resolved.navigation = "tabs";
    }
  }

  return resolved;
}

function createPackageJson(options: ResolvedTemplateOptions): string {
  const dependencies: Record<string, string> = {
    expo: EXPO_VERSIONS.expo,
    "expo-router": EXPO_VERSIONS.expoRouter,
    "expo-status-bar": EXPO_VERSIONS.expoStatusBar,
    react: EXPO_VERSIONS.react,
    "react-dom": EXPO_VERSIONS.reactDom,
    "react-native": EXPO_VERSIONS.reactNative,
    "react-native-gesture-handler": EXPO_VERSIONS.gestureHandler,
    "react-native-reanimated": EXPO_VERSIONS.reanimated,
    "react-native-safe-area-context": EXPO_VERSIONS.safeAreaContext,
    "react-native-screens": EXPO_VERSIONS.screens,
    "react-native-web": EXPO_VERSIONS.reactNativeWeb,
  };

  if (options.theming) {
    dependencies["expo-system-ui"] = EXPO_VERSIONS.expoSystemUi;
  }

  const scripts: Record<string, string> = {
    start: "expo start",
    android: "expo run:android",
    ios: "expo run:ios",
    web: "expo start --web",
    build: "expo export",
    "build:local": "expo run:android",
  };

  if (options.buildProvider === "eas") {
    scripts["build:eas"] = "eas build -p android --profile preview";
  }

  return `${JSON.stringify(
    {
      name: options.projectName,
      version: "1.0.0",
      private: true,
      main: "expo-router/entry",
      scripts,
      dependencies,
      devDependencies: {
        "@types/react": "~19.1.0",
        typescript: "~5.8.0",
      },
    },
    null,
    2,
  )}\n`;
}

function createAppJson(options: ResolvedTemplateOptions): string {
  return `${JSON.stringify(
    {
      expo: {
        name: options.projectName,
        slug: options.projectName,
        version: "1.0.0",
        orientation: "portrait",
        userInterfaceStyle: options.theming ? "automatic" : "light",
        plugins: ["expo-router"],
      },
    },
    null,
    2,
  )}\n`;
}

function createLayout(options: ResolvedTemplateOptions): string {
  if (options.navigation === "tabs") {
    return `import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
${options.template === Templates.SHOWCASE ? '      <Tabs.Screen name="features" options={{ title: "Features" }} />\n' : ""}${options.template === Templates.SHOWCASE && options.uiComponents ? '      <Tabs.Screen name="components" options={{ title: "Components" }} />\n' : ""}    </Tabs>
  );
}
`;
  }

  if (options.navigation === "drawer") {
    return `import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer screenOptions={{ headerTitleAlign: "center" }}>
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
${options.template === Templates.SHOWCASE ? '      <Drawer.Screen name="features" options={{ title: "Features" }} />\n' : ""}${options.template === Templates.SHOWCASE && options.uiComponents ? '      <Drawer.Screen name="components" options={{ title: "Components" }} />\n' : ""}    </Drawer>
  );
}
`;
  }

  if (options.navigation === "stack") {
    return `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="details" options={{ title: "Details" }} />
${options.template === Templates.SHOWCASE ? '      <Stack.Screen name="features" options={{ title: "Features" }} />\n' : ""}${options.template === Templates.SHOWCASE && options.uiComponents ? '      <Stack.Screen name="components" options={{ title: "Components" }} />\n' : ""}    </Stack>
  );
}
`;
  }

  return `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;
}

function createHomeScreen(options: ResolvedTemplateOptions): string {
  const themingImport = options.theming
    ? 'import { useAppTheme } from "../lib/theme";\n'
    : "";
  const componentImports = options.uiComponents
    ? 'import { Button } from "../components/ui/Button";\nimport { Card } from "../components/ui/Card";\n'
    : "";
  const stylesTheme = options.theming ? "  const theme = useAppTheme();\n" : "";
  const cardOpen = options.uiComponents
    ? "      <Card>"
    : "      <View style={styles.card}>";
  const cardClose = options.uiComponents ? "      </Card>" : "      </View>";
  const cta = options.uiComponents
    ? '        <Button title="Start building" onPress={() => console.log("Ready to build")} />'
    : "        <Pressable style={styles.button}><Text style={styles.buttonText}>Start building</Text></Pressable>";
  const background = options.theming ? "theme.background" : '"#F8FAFC"';
  const text = options.theming ? "theme.text" : '"#0F172A"';
  const subtle = options.theming ? "theme.subtle" : '"#475569"';

  return `import { Pressable, StyleSheet, Text, View } from "react-native";
${themingImport}${componentImports}
export default function HomeScreen() {
${stylesTheme}  return (
    <View style={[styles.container, { backgroundColor: ${background} }]}>
${cardOpen}
        <Text style={[styles.title, { color: ${text} }]}>${options.projectName}</Text>
        <Text style={[styles.description, { color: ${subtle} }]}>${options.description}</Text>
${cta}
${cardClose}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
`;
}

function createSettingsScreen(options: ResolvedTemplateOptions): string {
  const themingImport = options.theming
    ? 'import { useAppTheme } from "../lib/theme";\n'
    : "";
  const theme = options.theming ? "theme.text" : '"#0F172A"';
  const subtitle = options.theming ? "theme.subtle" : '"#475569"';

  return `import { StyleSheet, Text, View } from "react-native";
${themingImport}
export default function SettingsScreen() {
${options.theming ? "  const theme = useAppTheme();\n" : ""}  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: ${theme} }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: ${subtitle} }]}>
        Local-first build is enabled with \`expo run:android\`.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
});
`;
}

function createDetailsScreen(options: ResolvedTemplateOptions): string {
  const textColor = options.theming ? "theme.text" : '"#0F172A"';
  return `import { StyleSheet, Text, View } from "react-native";
${options.theming ? 'import { useAppTheme } from "../lib/theme";\n' : ""}export default function DetailsScreen() {
${options.theming ? "  const theme = useAppTheme();\n" : ""}  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: ${textColor} }]}>Details</Text>
      <Text style={styles.body}>Use this screen to extend your app flow.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  body: { fontSize: 16, color: "#475569" },
});
`;
}

function createFeatureScreen(options: ResolvedTemplateOptions): string {
  const items = [
    "Expo Router navigation",
    "Local Android build workflow",
    options.theming ? "Adaptive light/dark theme" : "Static light theme",
    options.uiComponents ? "Reusable UI components" : "Core React Native UI",
  ];

  return `import { StyleSheet, Text, View } from "react-native";

const features = ${JSON.stringify(items, null, 2)};

export default function FeaturesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Template Features</Text>
      {features.map(feature => (
        <Text key={feature} style={styles.item}>• {feature}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 10 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  item: { fontSize: 16, color: "#334155" },
});
`;
}

function createComponentShowcaseScreen(): string {
  return `import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function ComponentsScreen() {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.heading}>UI Components</Text>
        <Text style={styles.body}>
          These starter components are generated from the template package.
        </Text>
        <Button title="Primary action" onPress={() => console.log("Pressed")} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  body: { fontSize: 15, lineHeight: 22, marginBottom: 12, color: "#334155" },
});
`;
}

function createThemeFile(): string {
  return `import { useColorScheme } from "react-native";

const light = {
  background: "#F8FAFC",
  text: "#0F172A",
  subtle: "#475569",
};

const dark = {
  background: "#020617",
  text: "#E2E8F0",
  subtle: "#94A3B8",
};

export function useAppTheme() {
  const scheme = useColorScheme();
  return scheme === "dark" ? dark : light;
}
`;
}

function createButtonComponent(): string {
  return `import { Pressable, StyleSheet, Text } from "react-native";
import type { PressableProps } from "react-native";

export interface ButtonProps extends PressableProps {
  title: string;
}

export function Button({ title, ...props }: ButtonProps) {
  return (
    <Pressable {...props} style={[styles.button, props.style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
`;
}

function createCardComponent(): string {
  return `import { StyleSheet, View } from "react-native";
import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: 20,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 10,
  },
});
`;
}

function createReadme(options: ResolvedTemplateOptions): string {
  return `# ${options.projectName}

Generated with \`create-magic-expo-app\` using the **${options.template}** template.

## Scripts

- \`bun run start\` - Start Expo dev server
- \`bun run android\` - Local Android build/run
- \`bun run ios\` - Local iOS build/run
- \`bun run web\` - Web preview
- \`bun run build:local\` - Local-first production build path
${options.buildProvider === "eas" ? "- `bun run build:eas` - Optional EAS build\n" : ""}
## Notes

- This template is optimized for local-first workflows.
- You can progressively customize navigation, theme, and UI building blocks.
`;
}

function getBaseFiles(options: ResolvedTemplateOptions): TemplateFile[] {
  const files: TemplateFile[] = [
    {
      path: ".gitignore",
      content: "node_modules\n.expo\n.expo-shared\ndist\n",
    },
    { path: "package.json", content: createPackageJson(options) },
    { path: "app.json", content: createAppJson(options) },
    {
      path: "tsconfig.json",
      content: `${JSON.stringify(
        {
          extends: "expo/tsconfig.base",
          compilerOptions: {
            strict: true,
          },
        },
        null,
        2,
      )}\n`,
    },
    {
      path: "babel.config.js",
      content: `module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["expo-router/babel", "react-native-reanimated/plugin"],
  };
};
`,
    },
    { path: "README.md", content: createReadme(options) },
    { path: "src/app/_layout.tsx", content: createLayout(options) },
    { path: "src/app/index.tsx", content: createHomeScreen(options) },
  ];

  if (options.theming) {
    files.push({ path: "src/lib/theme.ts", content: createThemeFile() });
  }

  if (options.uiComponents) {
    files.push(
      {
        path: "src/components/ui/Button.tsx",
        content: createButtonComponent(),
      },
      { path: "src/components/ui/Card.tsx", content: createCardComponent() },
    );
  }

  if (options.buildProvider === "eas") {
    files.push({
      path: "eas.json",
      content: `${JSON.stringify(
        {
          build: {
            preview: {
              developmentClient: true,
              distribution: "internal",
            },
          },
        },
        null,
        2,
      )}\n`,
    });
  }

  return files;
}

function getNavigationFiles(options: ResolvedTemplateOptions): TemplateFile[] {
  const files: TemplateFile[] = [];

  if (options.navigation === "tabs" || options.navigation === "drawer") {
    files.push({
      path: "src/app/settings.tsx",
      content: createSettingsScreen(options),
    });
  }

  if (options.navigation === "stack") {
    files.push({
      path: "src/app/details.tsx",
      content: createDetailsScreen(options),
    });
  }

  if (options.template === Templates.SHOWCASE) {
    files.push({
      path: "src/app/features.tsx",
      content: createFeatureScreen(options),
    });
    if (options.uiComponents) {
      files.push({
        path: "src/app/components.tsx",
        content: createComponentShowcaseScreen(),
      });
    }
  }

  return files;
}

export function renderTemplate(
  files: TemplateFile[],
  options: TemplateOptions,
): TemplateFile[] {
  return files.map(file => ({
    ...file,
    content: ejs.render(file.content, options, {
      strict: true,
      filename: file.path,
    }),
  }));
}

export function getBaseTemplate(options: TemplateOptions): TemplateFile[] {
  return getBaseFiles(resolveTemplateOptions(options));
}

export function getNavigationTemplate(
  navigation: TemplateOptions["navigation"],
  template: TemplateName = Templates.DEFAULT,
): TemplateFile[] {
  return getNavigationFiles(
    resolveTemplateOptions({
      projectName: "my-expo-app",
      navigation,
      template,
    }),
  );
}

export function getTemplate(options: TemplateOptions): TemplateFile[] {
  const resolved = resolveTemplateOptions(options);
  const baseFiles = getBaseFiles(resolved);
  const navFiles = getNavigationFiles(resolved);
  const deduped = new Map<string, TemplateFile>();

  for (const file of [...baseFiles, ...navFiles]) {
    deduped.set(file.path, file);
  }

  return Array.from(deduped.values());
}
