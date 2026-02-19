# Implementation Plan: create-magic-expo-app CLI Tool

## Context

This project transforms the current Expo app into a full CLI tool for scaffolding professional Expo applications. The user needs:

1. A CLI tool similar to `create-next-app` but for Expo with advanced features
2. Fix for duplicate dependency issues in the monorepo
3. Professional preset components (navigation, theming)
4. Local build workflow (expo prebuild + Gradle)
5. Support for both individual developers and teams
6. Interactive CLI with simple/advanced modes

## Architecture

### Monorepo Structure

```
create-magic-expo-app/
├── packages/
│   ├── cli/              # CLI entry point, prompts, orchestration
│   ├── ui-components/    # Reusable UI components (Button, Card, etc.)
│   ├── config/           # ESLint, TypeScript, Prettier configurations
│   ├── templates/        # Project templates for scaffolding
│   ├── navigation/       # Navigation presets (tabs, stack, drawer)
│   ├── theming/          # Theme system with Uniwind, expo-symbols
│   └── app/              # The example/demo Expo app
├── package.json          # Root workspace config (hoist shared deps)
└── bun.lockb            # Regenerated after restructure
```

### Package Responsibilities

**packages/cli/**

- Entry point: `bin/create-magic-expo-app`
- Dependencies: `prompts`, `fs-extra`, `chalk`
- Functions: `createProject()`, `promptUser()`, `scaffoldProject()`, `configureBuild()`

**packages/ui-components/**

- Base components: Button, Card, Input, Modal, Screen
- Styled with Uniwind
- Theme-aware
- Export as `@magic-expo/ui-components`

**packages/config/**

- ESLint flat config (TypeScript, React, CSS)
- TypeScript config (bundler mode, strict, noEmit)
- Prettier config with import organization
- Metro config with Uniwind transformer
- Export as `@magic-expo/config`

**packages/navigation/**

- Presets: TabNavigator, StackNavigator, DrawerNavigator
- Each preset includes layout + example screens
- Export as `@magic-expo/navigation`

**packages/theming/**

- Theme provider component with context
- Light/dark mode toggle
- Custom color scheme support
- expo-symbols integration
- Uniwind global.css integration
- Export as `@magic-expo/theme`

**packages/templates/**

- Base template
- Preset templates with navigation/theme options
- EJS for variable substitution

**packages/app/**

- Demo app showcasing all packages
- Example usage of components

## Progress

- Documentation & tooling: README, README, GH Pages docs, Security.md, Dependabot, and workflows now reflect the current automation/security guidance.
- Claude/Copilot hooks and Agents guides now enforce format/lint/typecheck/build and reference the new docs and plan.
- Remaining work: complete the workspace restructure (cli, ui, navigation, theming, config, templates), regenerate `bun.lockb`, and wire the demo app to showcase the new packages.

## Critical Files to Modify

1. **Root package.json** - Reconfigure workspaces, hoist dependencies
2. **packages/app/package.json** - Rename to `@magic-expo/app`, remove duplicate deps
3. **NEW: packages/cli/** - Entire new package for CLI
4. **NEW: packages/ui-components/** - Entire new package
5. **NEW: packages/config/** - Entire new package
6. **NEW: packages/navigation/** - Entire new package
7. **NEW: packages/theming/** - Entire new package
8. **NEW: packages/templates/** - Entire new package
9. **bun.lockb** - Regenerate after changes

## Existing Code to Reuse

From exploration:

- `packages/app/src/global.css` - Uniwind integration pattern
- `packages/app/metro.config.js` - Uniwind transformer config
- `tsconfig.json` - TypeScript configuration (move to config package)
- `eslint.config.ts` - ESLint flat config (move to config package)
- `.prettierrc` - Prettier config (move to config package)
- `packages/app/src/app/_layout.tsx` - Expo Router layout pattern

## Implementation Steps

### Phase 1: Monorepo Restructure (Fix Dependencies)

1. Create new package directories (cli, ui-components, config, navigation, theming, templates)
2. Update root package.json with all workspaces and hoisted dependencies
3. Create package.json for each workspace with minimal deps
4. Run `bun install` to regenerate bun.lockb
5. Verify no duplicate dependencies

### Phase 2: Config Package

1. Move tsconfig.json to packages/config/
2. Move eslint.config.ts to packages/config/
3. Move .prettierrc to packages/config/
4. Move metro.config.js pattern to packages/config/
5. Create index.ts exporting all configs
6. Update root to consume from config package

### Phase 3: Theming Package

1. Create theme context with provider
2. Create color scheme types and defaults
3. Create theme hook (useTheme)
4. Create useColorScheme hook for light/dark mode
5. Integrate expo-symbols
6. Create global.css with Uniwind integration
7. Export theme provider and hooks

### Phase 4: Navigation Package

1. Create TabNavigator preset
2. Create StackNavigator preset
3. Create DrawerNavigator preset
4. Each preset includes: layout file, example screens
5. Create navigation hook utilities
6. Export all presets

### Phase 5: UI Components Package

1. Create Button component (Uniwind styled, theme-aware)
2. Create Card component
3. Create Input component
4. Create Modal component
5. Create Screen component (wrapper for pages)
6. Export all components

### Phase 6: Templates Package

1. Create base template with minimal Expo setup
2. Create template with navigation preset
3. Create template with theming preset
4. Create template with both navigation and theming
5. Use EJS for variable substitution
6. Create template selection logic

### Phase 7: CLI Package

1. Create bin entry point
2. Create CLI argument parser
3. Create interactive prompts (simple/advanced modes)
4. Create project scaffolding logic
5. Create build configuration logic
6. Create post-install scripts

### Phase 8: Demo App Update

1. Update packages/app to showcase all packages
2. Include navigation examples
3. Include theming examples
4. Include UI component examples
5. Add CLI usage documentation

## Verification

After implementation:

1. **Dependency check**:

   ```bash
   bun install
   npx expo doctor
   ```

   Verify: No duplicate dependencies, all checks pass

2. **Build check**:

   ```bash
   bun run format
   bun run lint
   bun run typecheck
   bun run build
   ```

   Verify: All commands succeed without errors

3. **CLI test**:

   ```bash
   bun run -F cli build
   node packages/cli/bin/create-magic-expo-app test-app
   ```

   Verify: Project created successfully, no duplicate deps in generated app

4. **Generated app test**:

   ```bash
   cd test-app
   bun run install
   bun run typecheck
   npx expo doctor
   ```

   Verify: Generated app works, builds locally

5. **Manual checks**:
   - Generated app has proper workspace structure
   - Navigation preset works in generated app
   - Theme switching works (light/dark mode)
   - Local build configuration present (eas.json with local preset)

## Key Design Decisions

1. **Bun workspaces** - Chosen for speed and modern package management
2. **Uniwind** - Tailwind for React Native, universal across native/web
3. **Expo Router** - File-based routing, modern standard for Expo
4. **Expo Canary** - Latest features, staying current with ecosystem
5. **Local build focus** - No EAS dependency, use expo prebuild + Gradle
6. **Shared packages hoisted** - Prevents duplicate dependencies
7. **CLI with prompts library** - Simple, no heavy framework
