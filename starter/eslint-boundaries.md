# Reglas ESLint/imports que Codex debe configurar

- `no-restricted-imports`: client components no importan `server-only`, `src/server`, service clients o crypto.
- Dominios no realizan deep imports.
- `features/ai` no importa cases/documents/crm.
- `features/community` no importa cases/crm.
- Prohibir `dangerouslySetInnerHTML` salvo renderer único auditado.
- Prohibir `console` salvo logger central/scripts.
- Promises manejadas.
- Exhaustive deps.
- jsx-a11y.
- No floating promises.
- No explicit any salvo excepción comentada.
- No non-null assertions en fronteras de datos.
