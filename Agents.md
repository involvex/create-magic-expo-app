# Agents guide

## Root workspace

- This Bun workspace orchestrates formatting (`bun run format`), linting (`bun run lint` / `bun run lint:fix`), type checking (`bun run typecheck`), and the shared/app builds (`bun run build:shared` and `bun run build:app`).
- Always run workspace scripts with `bun run -F <workspace> <script>` (e.g., `bun run -F create-magic-expo-app start` for Expo commands) instead of invoking `npm` or `yarn` directly.
- Refer to `.github/copilot-instructions.md` for high-level architecture and the per-task requirements defined in `CLAUDE.md`.
- Claude hooks (see `.claude/settings.local.json`) automatically run the format → lint → typecheck → build:app sequence on task completion, so keep edits clean, typesafe, and aligned with existing workspace conventions.

## Packages

- `packages/app`: Expo Router + Uniwind app (see `packages/app/Agents.md`).
- `packages/shared`: Placeholder shared workspace for future reusable utilities (see `packages/shared/Agents.md`).
