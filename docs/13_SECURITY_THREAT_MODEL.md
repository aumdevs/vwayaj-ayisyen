# Modelo de amenazas y requisitos de seguridad

## Objetivo

Objetivo mínimo OWASP ASVS nivel 2, con controles reforzados para documentos, administración, pagos y personal.

## Activos

- Cuentas y sesiones.
- Roles.
- PII.
- Documentos de identidad.
- Expedientes.
- Mensajes.
- Contenido jurídico.
- Estados de pago.
- Claves y webhooks.
- Logs.
- Reputación de la empresa.

## Actores de amenaza

- Bots.
- Estafadores.
- Usuario abusivo.
- Atacante oportunista.
- Cuenta comprometida.
- Personal malicioso.
- Profesional externo.
- Dependencia comprometida.
- Prompt injection.
- Error operativo.

## Fronteras de confianza

1. Navegador ↔ Vercel.
2. Next.js ↔ Supabase.
3. Browser ↔ Supabase public API.
4. App ↔ Stripe.
5. App ↔ IA.
6. App ↔ malware scanner.
7. Staff ↔ documentos.
8. Contenido comunitario ↔ usuarios.

## Amenazas y controles

### Broken Access Control / IDOR

- RLS.
- DAL.
- Verificar propiedad/participación.
- IDs UUID no sustituyen autorización.
- Tests negativos.
- Grants temporales.

### Account takeover

- Email verificado.
- MFA.
- Leaked-password protection.
- CAPTCHA.
- Rate limits.
- Alertas.
- Reautenticación.
- Revocación.

### Privilege escalation

- Roles server-side.
- No update directo.
- AAL2.
- Auditoría.
- No permitir quitar último super admin.
- Invitaciones con token hash y expiración.

### XSS

- Markdown sanitizado.
- Sin HTML libre.
- CSP.
- Escapar JSON-LD.
- No SVG de usuario.
- Validar URLs.
- `dangerouslySetInnerHTML` prohibido salvo JSON-LD seguro y revisado.

### SQL injection

- Query builder y parámetros.
- Sin concatenación.
- RPCs tipadas.
- `search_path` fijo.

### CSRF

- SameSite.
- Origin/Host.
- Server Actions con auth interno.
- Route Handlers sensibles con token/CSRF cuando proceda.
- No mutaciones GET.

### SSRF

- Allowlist de hosts para fuentes, media y webhooks salientes.
- Resolver DNS y bloquear IP privada cuando se descargue contenido.
- Timeouts y tamaño máximo.
- IA no puede elegir URLs arbitrarias.

### File upload

- Allowlist.
- Magic bytes.
- Límite.
- Nombre aleatorio.
- Cuarentena.
- Análisis privado.
- Descarga forzada.
- Logs.
- Retención.

### Stripe webhook spoofing

- Raw body.
- Signature.
- Timestamp tolerance.
- Unique event ID.
- Idempotencia.
- No confiar en metadata no verificada.
- Reconciliación.

### Secret leakage

- `.gitignore`.
- Vercel/Supabase secrets.
- Secret scanning.
- Redacción de logs.
- Rotación.
- No screenshots.

### Abuse / spam

- BotID/CAPTCHA.
- Rate limits.
- Cuotas.
- Email verification.
- Reportes.
- Moderación.
- Bloqueos.

### Scraping

- No ocultar contenido público legítimo por completo.
- Rate limits.
- Cache.
- Bot controls.
- No exponer APIs de bulk export.
- `robots.txt` según contenido.

### Insider threat

- Mínimo privilegio.
- Acceso asignado.
- AAL2.
- Audit.
- Alertas de descarga.
- Expiración.
- Offboarding.
- Revisión periódica.

### Prompt injection / AI

- RAG de contenido aprobado.
- Contenido recuperado delimitado como datos.
- No herramientas de escritura.
- No secretos en prompt.
- No documentos.
- Moderación.
- Citaciones.
- Human handoff.

### Content tampering

- Workflow.
- Dos personas para alto riesgo.
- Historial.
- Diff.
- Audit.
- Revalidación.

## Headers

Mínimo:

```text
Content-Security-Policy: ...
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(self)
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
X-Frame-Options: DENY
```

Ajustar `camera`/`microphone` sólo si existe videollamada embebida aprobada.

## Rate limits iniciales

Ajustar con métricas:

- Login: 5/15 min por IP+email hash.
- Recuperación: 3/hora.
- Signup: 3/hora por IP.
- Intake: 5/día.
- Checkout: 10/hora por usuario.
- IA: 20 mensajes/hora gratis; presupuesto adicional por rol.
- Community posts: 5/hora.
- Comments: 20/hora.
- Reports: 10/día.
- Signed download: 30/hora por usuario, alerta por patrón.

## Severidad

- P0: exposición de documentos, service key, bypass admin, pago incorrecto.
- P1: IDOR, takeover staff, malware disponible, XSS persistente.
- P2: abuso significativo, fuga limitada, contenido legal manipulado.
- P3: problema menor sin exposición.

P0/P1 bloquean producción.

## Revisiones

- Threat model por release mayor.
- Revisión de roles trimestral.
- Prueba de restauración trimestral.
- Pentest externo antes de escalar documentos reales.
