# packages/app Agents

## Purpose

- This workspace holds the Expo Router + Uniwind starter app. `packages/app` is the only populated workspace; all UI lives under `src/app`, and navigation is provided by Expo Router with a single `_layout.tsx` that renders `<Slot />`.
- Styling is provided through `src/global.css`, which imports Tailwind and Uniwind, and `metro.config.js` wires Uniwind into the Metro bundler.

## Common commands

- `bun run -F create-magic-expo-app start` — open the Expo Router dev server (use `web`, `android`, or `ios` variations for each platform).
- `bun run -F create-magic-expo-app build` — run the Expo workspace’s build script from within the Bun workspace.
- The workspace honors the root prebuild hooks, so expect `bun run format`, `bun run lint`, and `bun run typecheck` to run (or to be required manually) before a clean build.

## Validation notes

- Use the root `CLAUDE.md` and `.claude/settings.local.json` hooks as a reminder to verify formatting, linting, type safety, and clean builds before closing tasks.
- Check `src/app/index.tsx` and `_layout.tsx` (plus `global.css`) when verifying visual or architectural changes; new screens are simply new files inside `src/app`.
