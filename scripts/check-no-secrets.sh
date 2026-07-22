#!/usr/bin/env bash
set -euo pipefail

# Fast local guard. Gitleaks and GitHub secret scanning remain authoritative.
# Require realistic token lengths so ordinary documentation such as the word
# "service_role" does not fail CI.
PATTERN="(sk_(live|test)_[A-Za-z0-9]{16,}|rk_(live|test)_[A-Za-z0-9]{16,}|whsec_[A-Za-z0-9]{16,}|sk-proj-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|-----BEGIN ([A-Z ]+ )?PRIVATE KEY-----|SUPABASE_SERVICE_ROLE_KEY[[:space:]]*[:=][[:space:]]*[\"']?(eyJ[A-Za-z0-9_-]{20,}|sb_secret_[A-Za-z0-9_-]{20,})|BOOTSTRAP_ADMIN_PASSWORD[[:space:]]*[:=][[:space:]]*[\"']?[^[:space:]\"']{20,}|OPENAI_API_KEY[[:space:]]*[:=][[:space:]]*[\"']?sk-[A-Za-z0-9_-]{20,}|eyJ[A-Za-z0-9_-]{20,}\\.[A-Za-z0-9_-]{20,}\\.[A-Za-z0-9_-]{20,})"

set +e
MATCHES="$(git grep -IEn "$PATTERN" -- ':!scripts/check-no-secrets.sh' ':!.env.example' 2>&1)"
STATUS=$?
set -e

case "$STATUS" in
  0)
    printf '%s\n' "$MATCHES"
    echo "Potential committed secret pattern found." >&2
    exit 1
    ;;
  1)
    echo "No obvious committed secret patterns found."
    ;;
  *)
    printf '%s\n' "$MATCHES" >&2
    echo "Secret check could not inspect the repository." >&2
    exit "$STATUS"
    ;;
esac
