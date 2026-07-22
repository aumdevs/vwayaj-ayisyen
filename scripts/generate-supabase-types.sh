#!/usr/bin/env bash
set -euo pipefail

mkdir -p src/types

if [[ "${1:-}" == "--local" ]]; then
  supabase gen types typescript --local --schema public > src/types/database.generated.ts
else
  : "${SUPABASE_PROJECT_ID:?Set SUPABASE_PROJECT_ID for remote generation, or pass --local}"
  supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > src/types/database.generated.ts
fi

echo "Generated src/types/database.generated.ts"
