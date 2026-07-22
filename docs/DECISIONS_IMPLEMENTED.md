# Decisiones implementadas

Fecha de corte: 2026-07-22. Este documento registra decisiones técnicas; no sustituye aprobaciones legales, editoriales o comerciales.

## Plataforma

- Next.js `16.2.11`, React `19.2.4`, TypeScript `5.9.3`, Node `24.18.0` y pnpm `11.15.0` fijados.
- App Router, Server Components por defecto, `proxy.ts`, CSP con nonce y Supabase SSR actual.
- PostgreSQL 17 local con migraciones inmutables, RLS forzada y grants explícitos.
- Tipos de Supabase generados desde la base remota y consumidos por todos los clientes.
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

- Repositorio público creado en `aumdevs/haitian-legal-travel-platform`, con licencia propietaria: público no significa open source ni autoriza reutilización.
- El historial, los logs de 69 ejecuciones de Actions y los artifacts fueron auditados antes del cambio de visibilidad sin detectar secretos.
- `main` exige PR, historial lineal y conversaciones resueltas; se bloquearon force-push y borrado. Secret scanning, push protection, Dependabot, reporte privado y aprobación de workflows externos están activos.
- Proyecto Vercel `prj_7ypksu4QMxUZLss5pZGGTSIDBLXV` recreado bajo `Aum prodz Group` mediante importación GitHub; `main` es Production y las demás ramas son Preview.
- El recurso Supabase está conectado sólo a Production y únicamente exporta a runtime la URL pública y la clave publicable necesarias. Las otras 14 variables añadidas por la integración fueron retiradas.
- Proyecto Supabase `gaknpocbfmiamghpoqhw` creado mediante Vercel Marketplace en São Paulo, enlazado y migrado.
- Auth exige contraseña robusta, confirmación de email, cambio seguro, rotación de refresh tokens y TOTP; la base exige SSL.
- Supabase usa ES256 para firmar sesiones. La firma HS256 anterior, las API keys heredadas y la clave privada inicialmente emitida fueron revocadas; la contraseña de Postgres también fue rotada y verificada.
- Los grants explícitos y RLS fueron verificados en el remoto con 21 pruebas pgTAP. Los buckets públicos permiten descarga directa sin permitir listados anónimos.
- El administrador inicial fue creado de forma transaccional y el RPC de bootstrap quedó revocado después de usarlo.
- Dependency Review y CodeQL nativos quedaron habilitados gratuitamente al convertir el repositorio a público; `ENABLE_GHAS_DEPENDENCY_REVIEW` y `ENABLE_GITHUB_CODE_SECURITY` están activos.
- Supabase local usa Colima. Analítica y Storage Vector locales están desactivados porque son opcionales y su contenedor requiere un montaje incompatible; esto no decide su configuración futura en producción.
- GitHub Actions fue bloqueado inicialmente por pagos recientes fallidos o límite de gasto de la cuenta privada. Después de la auditoría, el repositorio pasó a público y app, base de datos, E2E, CodeQL, Dependency Review y Gitleaks aprobaron en runners públicos.
- Los patrones de secretos no asociados a proveedores y los validity checks requieren GitHub Team/Enterprise con Secret Protection; Gitleaks y el escáner propio cubren adicionalmente el plan gratuito.
- El proyecto Vercel anterior, creado por CLI y con clasificación incorrecta, no tenía deployments útiles y fue reemplazado. El proyecto actual está conectado a GitHub, conserva cero deployments y bloquea builds temporalmente con `exit 0` hasta cerrar CI.
- OIDC quedó desactivado en el proyecto Vercel actual después de retirar los archivos de entorno locales, por lo que no puede emitir nuevos tokens mientras permanezca en este estado.

## Política de release

- Preview puede publicarse únicamente sin datos reales, `noindex` y con todas las funciones riesgosas desactivadas; no recibe variables del Supabase de producción.
- Producción debe salir de `main` tras CI; indexación y funciones sensibles permanecen apagadas hasta completar sus gates.
- SMTP propio, CAPTCHA, contenido aprobado, revisión legal, restore drill y pentest siguen siendo bloqueos de lanzamiento público.
- La activación pública exige completar la matriz de `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`.
