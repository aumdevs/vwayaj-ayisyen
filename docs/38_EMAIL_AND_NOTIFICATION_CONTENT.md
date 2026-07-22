# Email y notificaciones

## Principio

Las notificaciones llaman al usuario al portal. No contienen detalles migratorios, documentos, URLs de reunión, información financiera completa ni notas.

## Email operativo mínimo

- verificar email;
- recuperación;
- invitación de personal;
- cita creada/cambiada;
- nueva tarea/mensaje;
- pago confirmado/reembolso;
- alerta de seguridad;
- solicitud de privacidad;
- cambio material de términos.

## Plantillas

Versionadas por locale, con:

- subject;
- preheader;
- cuerpo texto y HTML accesible;
- CTA;
- fallback URL;
- categoría;
- variables allowlist;
- sensibilidad;
- remitente;
- fecha de revisión.

Variables se escapan. No aceptar HTML en variables.

## Ejemplos seguros

- “Gen yon nouvo mizajou nan dosye ou. Antre nan kont ou pou wè li.”
- No: “Nou bezwen kopi paspò ou pou dosye azil ou…”

## Seguridad

- SMTP/proveedor con SPF, DKIM, DMARC.
- Links HTTPS al dominio exacto.
- Tokens de un solo uso, hash en DB, expiración.
- No open redirects.
- No tracking pixels en seguridad/privacidad.
- Rate limits.
- Rebotes y supresión.
- No revelar existencia de cuenta.
- Plantillas de auth revisadas.
- Enlace de reunión sólo al portal.

## Preferencias

Operativas esenciales separadas de marketing. Marketing opt-in, fácil baja, registro de consentimiento.

## In-app

- Variables seguras.
- No renderizar HTML.
- Rutas internas allowlist.
- Expiración.
- Marcar leído por RPC propia.
- No usar push web al lanzamiento hasta revisar privacidad en lock screen.

## Entrega

Outbox transaccional:

1. negocio escribe estado + evento;
2. worker reclama;
3. renderiza locale;
4. envía;
5. guarda provider ID/estado seguro;
6. reintenta con backoff;
7. dead-letter/alerta.

Idempotency key por evento/canal.
