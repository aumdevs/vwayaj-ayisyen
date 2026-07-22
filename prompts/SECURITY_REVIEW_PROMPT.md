# Prompt de revisión de seguridad para Codex

Revisa el diff y el contexto de arquitectura como ingeniero AppSec. No cambies controles para hacer pasar tests.

Comprueba:

- autenticación/autorización/RLS;
- IDOR;
- secretos;
- validación server-side;
- XSS/Markdown/URLs;
- CSRF/CORS/origin;
- SSRF;
- SQL/inyección;
- archivos;
- webhooks/idempotencia;
- pagos;
- sesiones/cookies/cache;
- CSP/cabeceras;
- rate limiting/abuso;
- logs/PII;
- cifrado;
- supply chain;
- IA/prompt injection;
- accesibilidad cuando controles bloquean uso;
- migraciones/rollback;
- tests negativos.

Devuelve:

- severidad;
- archivo/línea;
- escenario de ataque;
- impacto;
- evidencia;
- corrección mínima segura;
- prueba que falta;
- bloqueo de merge sí/no.

No incluyas payloads destructivos ni secretos. Si una cuestión no puede verificarse, márcala como pendiente en lugar de declarar seguridad.
