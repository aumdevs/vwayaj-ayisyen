# Decisiones implementadas

Fecha de corte: 2026-07-21. Este documento registra decisiones técnicas; no sustituye aprobaciones legales, editoriales o comerciales.

## Plataforma

- Next.js `16.2.11`, React `19.2.4`, TypeScript `5.9.3`, Node `24.18.0` y pnpm `11.15.0` fijados.
- App Router, Server Components por defecto, `proxy.ts`, CSP con nonce y Supabase SSR actual.
- PostgreSQL 17 local con migraciones inmutables, RLS forzada y grants explícitos.
- Tipos de Supabase generados desde la base local y consumidos por todos los clientes.
- El frontend consulta `published_country_content`; no consulta drafts ni renderiza HTML almacenado.
- Los cuerpos editoriales aceptan sólo bloques de texto validados. Las URL de fuentes se limitan a HTTP/HTTPS.

## Producto y contenido

- Identidad pública provisional porque nombre, logo y dominio no están aprobados.
- Kreyòl es el locale predeterminado; los cinco diccionarios conservan la misma estructura.
- No se sembraron afirmaciones migratorias, costos, salarios, testimonios ni puntuaciones.
- Comparador y recomendador muestran su estructura, pero quedan bloqueados hasta revisión especializada.
- Servicios y cursos no muestran precio ni oferta hasta contar con contenido y condiciones aprobadas.

## Seguridad

- Funciones de alto riesgo requieren kill switch de entorno, configuración completa y gate independiente en base de datos.
- Pagos, uploads, IA, comunidad, citas, intake, WhatsApp, cursos y portal profesional permanecen apagados.
- Personal requiere rol en base de datos y sesión `aal2`; nunca se confía en `user_metadata` para autorización.
- Caché offline excluye Auth, APIs y todas las superficies privadas.
- Actions de GitHub están fijadas a SHA. `sharp` y `postcss` usan overrides corregidos por avisos de seguridad vigentes.

## Infraestructura y bloqueos

- Repositorio privado creado en `aumdevs/haitian-legal-travel-platform`.
- Proyecto Vercel creado bajo `Aum prodz Group` y enlazado localmente.
- La importación automática desde GitHub está bloqueada porque la integración de Vercel no tiene acceso al repositorio privado.
- Dependency Review nativo requiere GitHub Advanced Security en este repositorio privado; el workflow usa `pnpm audit --prod` como fallback y conserva el job nativo detrás de `ENABLE_GHAS_DEPENDENCY_REVIEW`.
- CodeQL requiere GitHub Code Security en repositorios privados; el workflow mantiene CodeQL detrás de `ENABLE_GITHUB_CODE_SECURITY` y ejecuta lint, typecheck y detección de secretos como fallback gratuito.
- La creación de Supabase bajo `Aum prodz Group` está bloqueada por el límite de dos proyectos gratuitos del miembro. No se pausó ni eliminó ningún proyecto existente y no se cambió el plan.
- Sin Supabase remoto no se aplican migraciones remotas, no se crea el administrador y no se habilita producción.
- Supabase local usa Colima. Analítica y Storage Vector locales están desactivados porque son opcionales y su contenedor requiere un montaje incompatible; esto no decide su configuración futura en producción.

## Política de release

- Preview puede publicarse únicamente sin datos reales, `noindex` y con todas las funciones riesgosas desactivadas.
- Producción debe salir de `main` tras CI y no se publica mientras falten las variables críticas de Supabase.
- La activación pública exige completar la matriz de `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`.
