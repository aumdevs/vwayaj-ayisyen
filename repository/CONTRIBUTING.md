# Contributing

This is a private production system handling sensitive user workflows.

## Before work

- Read `AGENTS.md`, master prompt, threat model and Definition of Done.
- Use an issue/PR.
- Never use real customer data.
- Never paste secrets into AI tools, issues or logs.
- Keep high-risk functions off unless their gate passes.

## Setup

1. Node/pnpm versions from `package.json`.
2. Supabase local.
3. Copy `.env.example` to ignored `.env.local`.
4. Generate local-only secrets.
5. Apply migrations/seed.
6. Generate types.
7. Run CI commands.

## Branches/commits

- Short-lived branch.
- Conventional Commit.
- No force-push to `main`.
- Migration files immutable after remote apply.
- Update docs/tests with behavior.

## Pull requests

- Small and reviewable.
- Threat/data impact.
- Tests, screenshots without PII.
- RLS negative cases.
- Rollback.
- Accessibility/i18n.
- No disabled security checks.

## Content

Do not publish legal or community claims from code. Use editorial workflow, sources and review.

## Dependencies

Explain new dependency, license, maintenance and security. Prefer platform/native features. Lock versions through lockfile.

## Database

- Local first.
- Backward compatible.
- RLS.
- Index/FK.
- No destructive remote command.
- No service-role workaround for ordinary user access.

## Security failures

Treat secret detection, authorization failure, missing scanner and invalid webhook tests as merge blockers.
