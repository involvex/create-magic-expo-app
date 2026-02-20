# create-magic-expo-app

Monorepo foundation for a CLI that scaffolds professional Expo apps with Bun, Expo Router, and Uniwind styling.

## What you get here

- A Bun workspace that centralizes formatting (`bun run format`), linting (`bun run lint` / `bun run lint:fix`), type checking (`bun run typecheck`), and the dual build targets (`bun run build:shared` + `bun run build:app`).
- A `packages/app` starter that shows Expo Router + Uniwind in action (see `packages/app/src/app` for the navigation layout and welcome screen).
- Companion docs (`docs/index.html`, the GH Pages site, this README, and `Plan.md`) that explain the architecture, automation, and how to scale the CLI over time.

## App showcase highlights

- **Tabbed navigation out of the box:** the demo app ships with a working tabs layout and feature screens.
- **Theme switching that persists:** settings supports light, dark, and system mode with saved preference.
- **Default settings profile:** notification preferences load with sensible defaults and persist across sessions.
- **Maintenance actions:** users can reset defaults and clear cached app/session state from the settings screen.
- **Sample OAuth experience:** GitHub and Discord sign-in buttons demonstrate a local sample OAuth flow.

## CLI usage patterns

- Interactive starter:
  - `npx create-magic-expo-app myapp`
- Fast minimum template (skip prompts):
  - `npx create-magic-expo-app myapp -y`
- Showcase template with explicit options:
  - `npx create-magic-expo-app myapp --template showcase --navigation tabs --build-provider local`
- Start generated app locally:
  - `cd myapp && bun run start`
- Local-first Android build path:
  - `bun run android` or `bun run build:local`

## Technology spotlight

- **Runtime & tooling:** Bun, TypeScript, Expo SDK 56 canary, Expo Router, React 19.2.3, React Native 0.84.
- **Styling:** Tailwind CSS v4 + Uniwind for shared RN/web classes, wired through `packages/app/src/global.css` and `metro.config.js`.
- **Dev workflow:** `bun run -F create-magic-expo-app start` (swap `web`, `android`, or `ios`), `bun run clean`, `bun run changelog`, plus the root prebuild/lint/typecheck scripts mentioned above.

## Documentation & GH Pages

- View the live docs at `https://involvex.github.io/create-magic-expo-app/`. The modern material-style site pulls the latest changelog, links to the implementation plan, and highlights the security & funding essential information.
- Read through `Plan.md` for the current roadmap and architecture breakdown, then revisit the docs site to see those ideas rendered with sticky nav, responsive layouts, and changelog summaries.
- The docs theme toggle now mirrors app behavior with **system / light / dark** modes so docs and app usage stay aligned.

## Testing

- Run smoke tests across active workspaces with `bun run test:packages`.
- Run all Vitest suites with `bun run test:run`.
- Run local Maestro app smoke flow with:
  - start app: `bun run -F @magic-expo/app start`
  - run flow: `bun run test:maestro`

## Security & automation

- Security checks run on every push to `main` via `.github/workflows/security.yml`, which audits dependencies (`bun audit`), lints, type checks, and builds the Expo workspace.
- `dependabot.yml` keeps Bun dependencies and GitHub Actions tooling up to date with weekly security updates.
- `Security.md` outlines the audit commands, reporting cadence, and responsible disclosure expectations for contributors.

## Funding & support

- Support the project through the channels listed in `.github/FUNDING.yml` (GitHub Sponsors, Buy Me a Coffee, PayPal, and other campaign links). Every contribution keeps the CLI boilerplate fresh and the docs site polished.
- Mention your support in issues or discussions so we can thank you and highlight backers in future changelog entries.

## Plan & contributions

- The implementation plan lives in `Plan.md`—refer to it when adding new workspaces, CLI flows, or documentation content.
- Submit PRs that pass the Claude hook suite (`bun run format`, `bun run lint`, `bun run typecheck`, `bun run build:app`) before requesting review, and mention the GH Pages docs when relevant updates land.
