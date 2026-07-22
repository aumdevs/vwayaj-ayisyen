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

- Repositorio privado creado en `aumdevs/haitian-legal-travel-platform`.
- Proyecto Vercel creado bajo `Aum prodz Group`; el recurso Supabase está conectado sólo a Production y únicamente exporta a runtime la URL pública y la clave publicable necesarias.
- Proyecto Supabase `gaknpocbfmiamghpoqhw` creado mediante Vercel Marketplace en São Paulo, enlazado y migrado.
- Auth exige contraseña robusta, confirmación de email, cambio seguro, rotación de refresh tokens y TOTP; la base exige SSL.
- Supabase usa ES256 para firmar sesiones. La firma HS256 anterior, las API keys heredadas y la clave privada inicialmente emitida fueron revocadas; la contraseña de Postgres también fue rotada y verificada.
- Los grants explícitos y RLS fueron verificados en el remoto con 21 pruebas pgTAP. Los buckets públicos permiten descarga directa sin permitir listados anónimos.
- El administrador inicial fue creado de forma transaccional y el RPC de bootstrap quedó revocado después de usarlo.
- Dependency Review nativo requiere GitHub Advanced Security en este repositorio privado; el workflow usa `pnpm audit --prod` como fallback y conserva el job nativo detrás de `ENABLE_GHAS_DEPENDENCY_REVIEW`.
- CodeQL requiere GitHub Code Security en repositorios privados; el workflow mantiene CodeQL detrás de `ENABLE_GITHUB_CODE_SECURITY` y ejecuta lint, typecheck y detección de secretos como fallback gratuito.
- Supabase local usa Colima. Analítica y Storage Vector locales están desactivados porque son opcionales y su contenedor requiere un montaje incompatible; esto no decide su configuración futura en producción.
- GitHub Actions no llegó a ejecutar ningún paso de la PR `#9`: GitHub lo bloqueó por pagos recientes fallidos o límite de gasto. Es un bloqueo de cuenta, no un fallo del código.
- El proyecto Vercel creado inicialmente por CLI clasificó despliegues de rama como Production. Los despliegues se eliminaron, el dominio quedó sin publicar y Git se desconectó hasta reimportar el repositorio correctamente.
- OIDC quedó desactivado en ese proyecto Vercel después de retirar los archivos de entorno locales, por lo que no puede emitir nuevos tokens mientras permanezca en este estado.

## Política de release

- Preview puede publicarse únicamente sin datos reales, `noindex` y con todas las funciones riesgosas desactivadas.
- Producción debe salir de `main` tras CI; indexación y funciones sensibles permanecen apagadas hasta completar sus gates.
- SMTP propio, CAPTCHA, contenido aprobado, revisión legal, restore drill y pentest siguen siendo bloqueos de lanzamiento público.
- La activación pública exige completar la matriz de `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`.
