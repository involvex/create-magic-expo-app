# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Pre-build validation (always run before committing)

```bash
bun run format      # Prettier formatting with import organization
bun run lint        # ESLint checks
bun run lint:fix    # Auto-fix ESLint issues
bun run typecheck   # TypeScript compiler checks (noEmit)
```

### Building

```bash
bun run build       # Full build: format + lint:fix + typecheck + build:shared + build:app
bun run build:app   # Build Expo workspace (packages/create-magic-expo-app)
bun run build:shared # Build shared workspace
```

### Running the app

```bash
bun run -F create-magic-expo-app start   # Expo dev server
bun run -F create-magic-expo-app web     # Web platform
bun run -F create-magic-expo-app android # Android platform
bun run -F create-magic-expo-app ios     # iOS platform
```

### Maintenance

```bash
bun run clean       # Remove node_modules and dist folders
bun run changelog   # Update CHANGELOG.md with conventional commits
```

## Architecture

This is a **Bun workspace monorepo** for creating a "Create-Expo-App" CLI tool. The project uses Expo SDK 56 (canary) with React Native 0.84 and modern tooling.

### Monorepo structure

- Root: Orchestrates formatting, linting, type checking, and build orchestration
- `packages/app/`: Main Expo Router workspace with Uniwind styling
- `packages/shared/`: Placeholder for shared CLI logic or reusable UI (currently empty)

### Tech stack

- **Runtime**: Bun (package management and execution)
- **Framework**: Expo SDK 56 (canary) with Expo Router for file-based routing
- **UI**: React 19.2.3 + React Native 0.84
- **Styling**: Uniwind (Tailwind CSS v4 for React Native)
- **Build tool**: Metro bundler with Uniwind transformer

### Key architectural patterns

**Uniwind integration**: Styling is centralized in `packages/app/src/global.css` which imports `tailwindcss` and `uniwind`. The Metro config (`packages/app/metro.config.js`) applies the Uniwind transformer, enabling the same Tailwind utility classes to work across native and web platforms.

**Expo Router routing**: File-based routing in `packages/app/src/app/`. The `_layout.tsx` is the root layout that renders `<Slot />` for child routes. New screens are created as files in this directory.

**TypeScript configuration**: Bundler mode with `moduleResolution: "bundler"`, `module: "Preserve"`, strict checks enabled, and `noEmit` for Bun compatibility.

## Key conventions

1. **Always use Bun**: Run root scripts with `bun run ...` and target workspace scripts with `bun run -F <workspace> <script>`. Do not use npm/yarn directly.

2. **Pre-build enforcement**: The `prebuild` hook runs `format`, `lint:fix`, and `typecheck` before any build succeeds. Fix all issues before retrying.

3. **Import organization**: Prettier automatically organizes imports via `prettier-plugin-organize-imports` and `prettier-plugin-sort-imports`.

4. **ESLint flat config**: The project uses the new ESLint flat config format with TypeScript, React, and CSS support.

5. **Dark mode**: Use `dark:` prefix in Tailwind classes for dark mode support (example: `bg-white dark:bg-black`).

6. **Expo conventions**: The app uses `expo-router/entry` as the main entry point for file-based routing.
