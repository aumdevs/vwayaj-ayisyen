# Hoja de ruta de implementación

La visión completa es amplia. Codex debe construir arquitectura integral, pero lanzar por puertas de calidad. No activar una función sensible sólo para marcarla “terminada”.

## Fase 0 — Fundación

- confirmar decisiones pendientes;
- crear repo/Supabase/Vercel;
- scaffold Next.js;
- CI/CD;
- variables y feature flags;
- design system;
- i18n;
- Auth SSR;
- modelo/RLS;
- auditoría;
- observabilidad;
- páginas legales en borrador.

**Salida:** build reproducible, preview aislada, ninguna función sensible pública.

## Fase 1 — Plataforma pública

- inicio;
- cuatro países con contenido en preparación;
- guías/FAQ/glosario;
- comparador;
- cuestionario determinista;
- paquetes sin cobro o en test;
- WhatsApp dinámico;
- buscador;
- accesibilidad;
- PWA pública;
- CMS/editorial.

**Gate:** contenido kreyòl revisado, fuentes reales, QA accesible, no promesas.

## Fase 2 — Identidad y portal

- registro/verificación/recuperación;
- perfiles/preferencias;
- consentimientos;
- portal;
- notificaciones;
- evaluación;
- invitations;
- roles/MFA;
- admin inicial.

**Gate:** matriz RLS completa y revisión de Auth.

## Fase 3 — Ventas, agenda y CRM

- Stripe test/live preparado;
- órdenes/webhooks/reconciliación;
- CRM cifrado;
- citas/holds;
- proveedor de reuniones;
- emails.

**Gate:** pruebas idempotencia, reembolsos, privacidad y cuenta comercial.

## Fase 4 — Expedientes y documentos

- casos/tareas/mensajes;
- grants profesionales;
- uploads cuarentena;
- escáner;
- acceso/descargas;
- retención;
- privacidad.

**Gate crítico:** pentest, scanner privado, restauración Storage, DPA, revisión legal. Hasta entonces `FEATURE_DOCUMENT_UPLOADS=false`.

## Fase 5 — Aprendizaje y comunidad

- cursos;
- progreso;
- comunidad texto;
- reportes/moderación;
- apelación.

**Gate:** normas, cobertura de moderación, antiestafa y privacidad.

## Fase 6 — IA

- pipeline editorial a chunks;
- proveedor;
- RAG con citas;
- guardrails;
- evaluación multilingüe;
- cuotas/kill switch;
- reportes.

**Gate:** exactitud/abstención, privacidad, presupuesto, revisión humana. Hasta entonces `FEATURE_AI_ASSISTANT=false`.

## Fase 7 — Hardening y lanzamiento

- revisión ASVS;
- pentest;
- backups/restore;
- load/performance;
- accesibilidad con usuarios;
- contenido legal;
- incident drill;
- dominio/email;
- Stripe live;
- activar flags gradualmente.

## Orden recomendado de PRs

1. repo/tooling;
2. design/i18n;
3. DB core;
4. auth/RLS;
5. public CMS;
6. countries/search;
7. compare/assessment;
8. packages/WhatsApp;
9. admin/editorial;
10. portal/consents;
11. CRM;
12. Stripe;
13. appointments;
14. cases;
15. upload scanner;
16. courses;
17. community;
18. AI;
19. PWA/perf/SEO;
20. launch hardening.

## Definición de “construido”

Código presente no equivale a función lanzada. Cada fase debe tener:

- implementación;
- RLS/autorización;
- validación;
- observabilidad;
- pruebas;
- documentación;
- accesibilidad;
- privacidad;
- rollback;
- flag;
- responsable operativo.
