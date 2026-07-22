# Estrategia de pruebas y calidad

## Pirámide

### Unitarias

- validadores Zod;
- normalización y cifrado;
- motor determinista de recomendación;
- estados/transiciones;
- autorizaciones puras;
- generador WhatsApp;
- localización/formato;
- redacción de logs;
- sanitización de contenido.

### Integración

- DAL + Postgres local;
- RLS con usuarios de cada rol;
- Auth SSR;
- Storage policies;
- Stripe webhook e idempotencia;
- creación de citas concurrente;
- indexado/retiro RAG;
- outbox/notificaciones;
- retención.

### E2E Playwright

- navegación pública en cinco idiomas;
- registro/verificación/recuperación;
- acceso por rol;
- MFA personal;
- cuestionario/comparador;
- compra en Stripe test;
- caso/tarea/mensaje;
- carga segura mock del escáner;
- cita;
- curso;
- comunidad/moderación;
- admin editorial;
- privacidad;
- PWA;
- teclado y móvil.

## Matriz negativa de autorización

Para cada recurso, probar:

- anónimo;
- usuario A;
- usuario B;
- asesor asignado/no asignado;
- profesional con grant activo/expirado;
- editor;
- moderador;
- admin con `aal1`;
- admin con `aal2`;
- service role sólo en servidor.

Cada lectura, inserción, modificación, eliminación y descarga debe tener caso positivo y negativo.

## Seguridad

- SAST CodeQL.
- Secret scan.
- Dependency audit.
- lint SQL/Supabase.
- pruebas de cabeceras/CSP.
- fuzzing básico de formularios.
- XSS en Markdown/URLs.
- CSRF/origin.
- SSRF en importadores/webhooks.
- archivos con MIME falso, polyglot, tamaño excesivo y extensión doble.
- IDs secuenciales/IDOR.
- rate limits.
- webhook replay.
- privilege escalation.
- prompt injection/PII.
- open redirect.
- cache de datos privados.

Un pentest independiente es requisito antes de habilitar documentos sensibles a usuarios reales.

## Accesibilidad

Automática:

- axe en rutas principales;
- eslint jsx-a11y;
- contraste/tamaños cuando sea posible.

Manual:

- teclado completo;
- lector de pantalla;
- zoom 200/400%;
- reflow 320 CSS px;
- foco;
- errores;
- formularios largos;
- idioma de página y cambios;
- subtítulos/transcripciones;
- objetivos táctiles;
- movimiento reducido;
- comprensión con usuarios haitianos, incluidos adultos mayores.

## Rendimiento

- Lighthouse CI como señal, no única métrica.
- budgets por JS, imágenes y fuentes.
- p75 RUM sin PII.
- carga de tablas grandes.
- pruebas de concurrencia moderada en formularios, citas y webhooks.
- consulta lenta e índices.

## Datos de prueba

- Sintéticos.
- Nunca copiar producción a local/preview.
- Fixtures por rol.
- Archivos benignos y EICAR sólo en entorno aislado del escáner, nunca subir a servicios no preparados.
- Limpiar tras suite.

## Gates

Un PR no puede fusionarse si falla:

- formato/lint;
- typecheck;
- unit/integration;
- build;
- migración/lint DB;
- secret scan;
- tests críticos RLS;
- E2E smoke cuando aplica.

Producción exige checklist, migración revisada, rollback y aprobación.
