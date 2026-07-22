# Plan de implementación operativo

## Cadencia de Codex

Para cada épica:

1. leer documentos de referencia;
2. identificar decisiones/bloqueos;
3. crear issue/branch;
4. implementar tras tests;
5. actualizar esquema/docs;
6. ejecutar seguridad/accesibilidad;
7. abrir PR;
8. validar preview;
9. fusionar sólo con CI verde;
10. registrar evidencia.

## Dependencias

- Fundación → todo.
- CMS/contenido → páginas, comparador, IA.
- Auth/RLS → portales, comunidad, IA persistente.
- CRM cifrado → intake.
- Stripe → servicio pagado/casos automáticos.
- Scanner → documentos.
- Moderación → comunidad.
- Contenido aprobado + evaluación → IA.
- Legal/proveedores → producción real.

## Paralelismo seguro

Se puede trabajar en paralelo en:

- diseño/i18n;
- contenido estructural;
- Auth/RLS;
- CI/observabilidad;
- investigación editorial fuera del código.

No paralelizar migraciones conflictivas sin coordinación. No activar producción mientras se construyen controles.

## Entrega por fase

Cada fase produce:

- commit/PR;
- lista de rutas;
- migraciones;
- tests;
- capturas accesibles;
- variables faltantes;
- flags;
- riesgos;
- rollback;
- bloqueos humanos.
