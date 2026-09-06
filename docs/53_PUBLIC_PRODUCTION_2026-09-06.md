# Public production release — 2026-09-06

## Scope

Publish the reviewed local Chile/Brazil experience, Haitian Creole onboarding,
news, residence-based guides and profile availability notices. All informational
content is readable without an account. Personal features remain unavailable.

## Account launch gate

`ACCOUNTS_ENABLED` is a server-only opt-in flag, disabled unless exactly `true`.
Even complete provider credentials cannot activate accounts without this flag.
Production must leave it unset or set it to `false`. Future activation requires
the account integration, isolation, storage and session checks documented in
`52_FIREBASE_GOOGLE_ACCOUNTS_2026-09-04.md`.

No database migration, provider activation, rule deployment, user creation or
data deletion is included in this public release. Local obsolete Supabase
prototypes are not part of the release commit. Existing CI continues to reject
Supabase directories in the published repository.

## Verification

- Formatting, lint, TypeScript and 54 unit tests passed; branch coverage is 81.35%.
- Production build and local secret-pattern check passed.
- Production dependency audit: no known vulnerabilities.
- Browser checks against a production build: 23 passed, 3 device-specific skips.
- Account access fails closed and all public navigation remains available.
- Guest reading checked across all 10 articles and 14 residence/destination guides.
- Service-worker cache version advances to v10 for installed applications.

## Deployment and rollback

The existing production deployment is associated with Vercel team
`aum-prodz-group`, project `vwayaj-ayisyen`, and domain `vwayajayisyen.com`.
Use the existing GitHub integration and the reviewed release PR. Do not create
a duplicate project or move the domain to another team.

Rollback: restore the previous Vercel deployment and revert the release commit.
There is no database rollback because this release does not apply migrations.

## Production runtime follow-up

The first production smoke check found HTTP 500 responses on routes importing
the account server SDK; the independent sign-in notice returned HTTP 200.
The public release now loads that SDK only after the server account flag and
configuration checks succeed. Regression tests simulate an unavailable SDK and
verify that public-only deployments never import it. This isolates public
reading from future account infrastructure without relaxing authorization.
The exact provider packaging failure requires deployment runtime logs before
account activation; the current CLI identity cannot access the owning team's
logs. No provider configuration or data is changed by this follow-up.

## Pending features

Google accounts, saved articles, editable profiles, notifications and private
support messages are future features. Public interfaces display availability
messages without infrastructure or credential details.
