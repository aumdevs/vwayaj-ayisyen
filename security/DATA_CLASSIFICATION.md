# Clasificación de datos

## C0 — Público

Contenido publicado, fuentes, precios públicos, cursos públicos, configuración de marca. Puede cachearse con versión.

## C1 — Interno

Borradores, backlog, métricas agregadas, configuración no secreta. Personal autorizado; no indexar.

## C2 — Confidencial

Cuenta, email, citas, pedidos, mensajes, CRM, notas, IP/seguridad. Cifrado/transporte, acceso mínimo, logs redactados.

## C3 — Altamente sensible

Pasaporte/identidad, documentos migratorios, datos de hijos, situación legal detallada, credenciales, claves, notas profesionales sensibles.

Requisitos C3:

- necesidad y consentimiento/base;
- bucket privado;
- scanner;
- rutas opacas;
- MFA aal2;
- acceso/descarga auditado;
- no email/WhatsApp/analytics/IA;
- retención corta definida;
- backup cifrado y restore probado;
- exportación excepcional;
- incidente prioritario.

## Secretos

Contraseñas, OTP, service role, Stripe/OpenAI/API keys, claves de cifrado y tokens son una categoría operativa especial: nunca en DB normal, Git, logs, soporte o analytics.

## Etiquetado

Cada tabla/campo/evento/archivo debe indicar clase, propietario, retención y consumidores. La clase más alta domina un objeto compuesto.
