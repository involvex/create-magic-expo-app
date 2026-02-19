# Copilot instructions

## Scripts you can run

- `bun run format` / `bun run lint` / `bun run lint:fix` / `bun run typecheck` (TS compiler only, no emit). These cover the prebuild checks that guard the repo.
- `bun run build` runs the prebuild hook (format → lint:fix → typecheck) before invoking `bun run build:shared && bun run build:app`.
- `bun run build:app` runs the Expo workspace (packages/create-magic-expo-app) build helper, while `bun run clean` wipes node_modules and dist folders.
- Use `bun run -F create-magic-expo-app start` to boot the Expo Router dev server, and swap `start` for `web`, `android`, or `ios` (each script just proxies to the workspace package’s Expo scripts).
- There is no `test` script today; run `bun run typecheck` for a single verification pass or add targeted tests to `packages/app/src` before wiring them up here.

## High-level architecture

This is a Bun workspace monorepo whose root package orchestrates formatting, linting, type checking, and two build targets (`build:shared` and `build:app`). The workspace homes are under `packages/`; the only populated workspace is `packages/app`, which is a minimal Expo Router + Uniwind app that lives in `packages/app/src`. It provides a bare-bones `_layout.tsx` that just renders `<Slot />` and an `index.tsx` that renders a welcome screen using React Native components with Tailwind/Uniwind classes. `packages/shared` exists as an empty workspace placeholder for shared CLI logic or reusable UI in future iterations. The Expo runtime is wired through `packages/app/metro.config.js`, where `withUniwindConfig` points at `src/global.css`, which simply imports `tailwindcss` and `uniwind`.

## Key conventions

- The repo relies on Bun for package management; always run root commands with `bun run ...` and target workspace scripts with `bun run -F <workspace> <script>` rather than invoking `npm`/`yarn` directly.
- `prebuild` tightly enforces formatting, linting (with ESLint + the latest config), and type checking before any `build` succeeds—fix issues locally before retrying the build.
- Styling is centralized via `packages/app/src/global.css`; it imports `tailwindcss` and `uniwind`, and the Metro config adds the UniWind transformer so RN/Web share the same utility classes.
- TypeScript is configured for bundler mode (`moduleResolution: "bundler"`, `module: "Preserve"`, `noEmit`, strict checks, and module detection forced) so the workspace can run in Bun’s environment without extra transpilation steps.
- Expo Router is the navigation layer, so new screens are just files in `packages/app/src/app`, and `_layout.tsx` is the shared layout entry point.

## MCP servers

- Use the `webapp-testing` MCP server to exercise Expo Web flows and ensure Playwright-style checks cover the current UI surface; it can validate rendering in a browser-like environment.
- If you need backend-like validation (e.g., mocked API calls), consider the `cloudflare` MCP server for edge logic, but keep the focus on Expo-native behavior.

## Claude hooks

- On task completion, Claude agents should run `bun run format`, `bun run lint`, and `bun run typecheck` to ensure formatting, lint rules, and TypeScript checks pass with zero warnings or errors.
- In addition to those steps, run `bun run build:app` (or the full `bun run build` flow when appropriate) so Claude can confirm shared builds and workspace outputs compile cleanly.
- Review the change list to verify the implementation matches the request, is clean, and stays within the existing conventions (e.g., workspace scripts, Expo Router structure, and Uniwind styling) before reporting success.
