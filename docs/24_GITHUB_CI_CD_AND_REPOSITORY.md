# GitHub, repositorio y CI/CD

## Repositorio

- Propietario: `aumdevs`
- Nombre: `haitian-legal-travel-platform`
- Visibilidad: privada
- Rama principal: `main`
- Licencia: privada/propietaria hasta decisión explícita
- No importar historial ni artefactos de otros proyectos.

## Reglas de rama

Configurar cuando el plan de GitHub lo permita:

- PR obligatorio;
- al menos una revisión;
- resolver conversaciones;
- checks requeridos;
- rama actualizada;
- commits firmados cuando sea viable;
- bloqueo de force-push y eliminación;
- bloqueo de borrado;
- Code Owners para rutas sensibles;
- merge queue opcional;
- desplegar producción sólo desde `main`.

Para un equipo de una sola persona, Codex puede usar PRs auto-revisados sólo durante bootstrap, pero debe mantener checks y documentar la excepción; eliminar bypass después de incorporar equipo.

## Archivos de gobernanza

- `AGENTS.md`
- `CODEOWNERS`
- plantilla de PR
- issue templates
- `SECURITY.md`
- `CONTRIBUTING.md`
- Dependabot
- CodeQL
- CI
- política de commits/branches

## CI

Jobs sugeridos:

1. install/cache;
2. lint/format;
3. typecheck;
4. unit tests;
5. DB lint + tests RLS;
6. build;
7. Playwright smoke;
8. secret scan;
9. dependency review en PR;
10. CodeQL separado.

Fijar actions por SHA en producción cuando sea práctico. Limitar permisos con `permissions: contents: read` y conceder sólo lo necesario por job. No usar secretos en workflows de PRs de forks.

## Supabase

- Migraciones en Git son la fuente de verdad.
- PR muestra diff de esquema.
- Nunca ejecutar `db reset` contra remoto.
- Usar `supabase db push` en despliegue controlado o pipeline separado con aprobación.
- Realizar migraciones backward-compatible: expandir, desplegar, migrar, contraer.
- Backups antes de cambios destructivos.
- Tipos generados deben coincidir con esquema.

## Vercel

- Preview por PR.
- Preview usa Supabase de staging o un entorno aislado; nunca producción con capacidad de escritura.
- Production desde `main`.
- Variables separadas.
- No exponer valores en logs/build output.
- Verificación de dominio y redirects después de despliegue.
- Rollback probado.

## Secretos

Nunca en:

- repositorio;
- historial Git;
- `.env.example`;
- issues/PR;
- capturas;
- logs;
- artefactos;
- comentarios de código.

Usar GitHub Secrets sólo para CI que los necesite; Vercel Environment Variables para runtime; gestor adicional para secretos operativos si se incorpora.

## Convenciones

- Conventional Commits recomendados.
- PR pequeña y enfocada.
- Migraciones inmutables una vez aplicadas.
- ADR para decisiones importantes.
- Changelog de seguridad sin detalles explotables.
