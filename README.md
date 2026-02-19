# create-magic-expo-app

Monorepo for creating perfect Expo App.

## Tech

- Bun, Expo, uniwind, react, react-native, @shopify/react-native-skia, moti, react-navigation, react-native-gesture-handle, react-native-screens, react-native-web, expo-symbols, expo-status-bar, @expo/vector-icons, shadcn

-> Will be a "Create-Expo-App" Cli Command to generate an awesome preset for an Expo App with no cloud build dependencies (build local, paid services / no need for pay as you go or similiar)

# Claude validation hooks

## On task completion

- Run `bun run format`, `bun run lint`, and `bun run typecheck` in the repo root to ensure formatting, linting, and TypeScript checks succeed without warnings or errors.
- Execute `bun run build:app` (or the full `bun run build` flow when verifying build-related work) so Claude agents can confirm shared/output bundles compile cleanly.
- Compare the implementation to the task description and the repository’s conventions (Bun workspace tooling, Expo Router structure, and Uniwind styling) before marking work done; include any manual checks you performed in your report.
