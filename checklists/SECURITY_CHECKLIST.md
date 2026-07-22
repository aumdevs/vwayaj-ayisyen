# Checklist de seguridad

## Arquitectura

- [ ] Diagrama y fronteras de confianza.
- [ ] Inventario de activos/datos.
- [ ] Clasificación y retención.
- [ ] ASVS L2 mapeado.
- [ ] Threat model actualizado.
- [ ] Feature flags fail-closed.
- [ ] Preview aislada.
- [ ] No datos reales en dev/test.

## Auth

- [ ] Email verificado.
- [ ] Recuperación sin enumeración.
- [ ] Contraseñas fuertes.
- [ ] Contraseñas filtradas cuando disponible.
- [ ] CAPTCHA/BotID/rate limit.
- [ ] Cookies seguras.
- [ ] Rotación/revocación.
- [ ] MFA TOTP personal.
- [ ] `aal2` en acciones críticas.
- [ ] Reauth.
- [ ] No roles en user_metadata.
- [ ] Invitaciones personal expirables.
- [ ] Admin bootstrap eliminado.

## Autorización

- [ ] RLS cada tabla.
- [ ] Storage RLS.
- [ ] DAL server-only.
- [ ] DTO mínimos.
- [ ] No IDs como autorización.
- [ ] Grants con expiración.
- [ ] Matriz negativa.
- [ ] Security-definer seguro.
- [ ] Service role sólo server.
- [ ] Auditoría roles/accesos.

## Entrada/salida

- [ ] Zod servidor.
- [ ] límites de tamaño.
- [ ] Markdown saneado.
- [ ] URLs allowlist.
- [ ] no HTML libre.
- [ ] prevención SQLi/XSS.
- [ ] no SSRF.
- [ ] redirects seguros.
- [ ] CSV injection en exports.
- [ ] cabeceras de descarga.

## Web

- [ ] CSP sin unsafe-eval.
- [ ] nonces/hashes apropiados.
- [ ] HSTS.
- [ ] frame-ancestors none.
- [ ] object-src none.
- [ ] base-uri/form-action.
- [ ] Referrer/Permissions Policy.
- [ ] HTTPS/cookies.
- [ ] CSRF/origin.
- [ ] CORS mínimo.
- [ ] cache privado.
- [ ] no source maps públicos sensibles.

## Archivos

- [ ] privado.
- [ ] rutas UUID.
- [ ] tamaño/tipo.
- [ ] magic bytes.
- [ ] cuarentena.
- [ ] scanner privado.
- [ ] no acceso antes de clean.
- [ ] URLs cortas.
- [ ] force download.
- [ ] access logs.
- [ ] retención.
- [ ] backup.
- [ ] uploads off sin scanner.
- [ ] pentest.

## Pagos/webhooks

- [ ] precio server.
- [ ] firma body crudo.
- [ ] replay/idempotencia.
- [ ] eventos dedupe.
- [ ] estados válidos.
- [ ] test/live separados.
- [ ] refund MFA/audit.
- [ ] reconciliación.
- [ ] no card data/logs.

## CRM/PII

- [ ] cifrado AES-GCM.
- [ ] HMAC blind index.
- [ ] claves separadas/versionadas.
- [ ] minimización.
- [ ] DNC.
- [ ] export restringido.
- [ ] logs redacted.
- [ ] retention/deletion.
- [ ] privacy request.

## Comunidad/IA

- [ ] no DMs/adjuntos.
- [ ] reportes/moderación.
- [ ] anti-scam.
- [ ] IA RAG allowlist.
- [ ] no casos/docs.
- [ ] injection tests.
- [ ] citations/abstain.
- [ ] quotas/kill switch.
- [ ] PII redaction.

## Supply chain/CI

- [ ] lockfile.
- [ ] pnpm version.
- [ ] Dependabot.
- [ ] CodeQL.
- [ ] secret scan.
- [ ] actions permissions.
- [ ] actions pinned.
- [ ] dependency review.
- [ ] SBOM/release.
- [ ] no postinstall no confiable sin revisión.

## Operación

- [ ] logs/metrics/alerts.
- [ ] incident plan.
- [ ] backup restore.
- [ ] key rotation.
- [ ] account reviews.
- [ ] vendor reviews.
- [ ] penetration test.
- [ ] vulnerability disclosure.
- [ ] patch cadence.
