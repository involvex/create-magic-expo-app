# Security guidance

## Automated guardrails

- `bun audit --audit-level=moderate` (run locally or rely on the `security` workflow) keeps dependency vulnerabilities visible.
- `.github/dependabot.yml` tracks Bun dependencies and GitHub Actions updates every week; expect Dependabot PRs to land before issues reach production.
- The GitHub Actions security workflow (`.github/workflows/security.yml`) runs `bun audit`, `bun run lint`, `bun run typecheck`, and `bun run build:app` on every push to `main`.

## Manual verification

- Before submitting or closing work, run the Claude hooks described in `.claude/settings.local.json`: `bun run format`, `bun run lint`, `bun run typecheck`, and `bun run build:app`.
- Re-run `bun audit` after adding or removing dependencies, and re-check the changelog or docs that describe new surface area.

## Reporting vulnerabilities

- File a GitHub issue with the `security` label, stub out reproduction steps, and mark the severity you observed.
- For sensitive incidents, encrypt details with the project maintainers’ public key (ask via GitHub discussions or by emailing the maintainer listed in `package.json`).
- Expect a response within 48 hours, triage within five business days, and a coordinated disclosure once a fix is available.

## Responsible disclosure

- Keep verification instructions minimal, avoid including exploits in public comments, and defer to the maintainer before posting anything externally.
- When you discover a regression, backport fixes through the workspace’s shared builds (`bun run build:shared` and `bun run build:app`) to avoid drifting states between packages.
