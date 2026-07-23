# Decisiones implementadas

Fecha de corte: 2026-07-23. Este documento registra decisiones técnicas; no sustituye aprobaciones legales, editoriales o comerciales.

## Plataforma

- Next.js `16.2.11`, React `19.2.4`, TypeScript `5.9.3`, Node `24.18.0` y pnpm `11.15.0` fijados.
- App Router, Server Components por defecto, `proxy.ts`, CSP con nonce y Supabase SSR actual.
- PostgreSQL 17 local con migraciones inmutables, RLS forzada y grants explícitos.
- Tipos de Supabase generados desde la base remota y consumidos por todos los clientes.
- El frontend consulta `published_country_content`; no consulta drafts ni renderiza HTML almacenado.
- Los cuerpos editoriales aceptan sólo bloques de texto validados. Las URL de fuentes se limitan a HTTP/HTTPS.

## Producto y contenido

- **Vwayaj Ayisyen** es la identidad textual oficial. El dominio propio y la URL pública oficial son `vwayajayisyen.com` y `https://vwayajayisyen.com`.
- Kreyòl es el locale predeterminado; los cinco diccionarios conservan la misma estructura.
- Laptop/escritorio usan web pública normal; teléfono, tableta táctil y modo
  standalone usan App Shell con barra superior y navegación inferior.
- No se sembraron afirmaciones migratorias, costos, salarios, testimonios ni puntuaciones.
- Comparador y recomendador muestran su estructura, pero quedan bloqueados hasta revisión especializada.
- Servicios y cursos no muestran precio ni oferta hasta contar con contenido y condiciones aprobadas.

## Seguridad

- Funciones de alto riesgo requieren kill switch de entorno, configuración completa y gate independiente en base de datos.
- Pagos, uploads, IA, comunidad, citas, intake, WhatsApp, cursos y portal profesional permanecen apagados.
- Personal requiere rol en base de datos y sesión `aal2`; nunca se confía en `user_metadata` para autorización.
- Caché offline excluye Auth, APIs, Authorization, `no-store` y todas las superficies privadas.
- El service worker no usa `skipWaiting` automático: la persona decide cuándo
  actualizar y el cliente bloquea la acción si detecta progreso en un formulario.
- El aviso de instalación aparece una vez por sesión, nunca fuerza el prompt
  nativo y se oculta en standalone.
- Actions de GitHub están fijadas a SHA. `sharp` y `postcss` usan overrides corregidos por avisos de seguridad vigentes.

## Infraestructura y bloqueos

- Repositorio público creado en `aumdevs/vwayaj-ayisyen`, con licencia propietaria: público no significa open source ni autoriza reutilización.
- El historial, los logs de 69 ejecuciones de Actions y los artifacts fueron auditados antes del cambio de visibilidad sin detectar secretos.
- `main` exige PR, historial lineal y conversaciones resueltas; se bloquearon force-push y borrado. Secret scanning, push protection, Dependabot, reporte privado y aprobación de workflows externos están activos.
- Proyecto Vercel `prj_7ypksu4QMxUZLss5pZGGTSIDBLXV` recreado bajo `Aum prodz Group` y reconectado a GitHub; `main` es la única rama autorizada para Production.
- El recurso Supabase está conectado sólo a Production y únicamente exporta a runtime la URL pública y la clave publicable necesarias. Las otras 14 variables añadidas por la integración fueron retiradas.
- Proyecto Supabase **Vwayaj Ayisyen** (`gaknpocbfmiamghpoqhw`) creado mediante Vercel Marketplace en São Paulo, enlazado y migrado.
- Auth exige contraseña robusta, confirmación de email, cambio seguro, rotación de refresh tokens y TOTP; la base exige SSL.
- El registro, la conexión y la recuperación integran Cloudflare Turnstile; los
  tokens se envían a Supabase Auth para validación de servidor. El alta falla
  cerrada si falta el site key público.
- Supabase usa ES256 para firmar sesiones. La firma HS256 anterior, las API keys heredadas y la clave privada inicialmente emitida fueron revocadas; la contraseña de Postgres también fue rotada y verificada.
- Los grants explícitos y RLS fueron verificados en el remoto con 21 pruebas pgTAP. Los buckets públicos permiten descarga directa sin permitir listados anónimos.
- El alta exige tres controles separados: Términos, reconocimiento de Privacidad
  y confirmación 18+/capacidad. El hook de Auth valida HMAC, marca de tiempo y
  las versiones activas guardadas en una tabla privada, no sólo variables del
  frontend.
- Las solicitudes de privacidad sólo se completan mediante un RPC AAL2 que
  bloquea la fila, registra verificación/resumen, emite auditoría y crea un
  evento outbox.
- El administrador inicial fue creado de forma transaccional y el RPC de bootstrap quedó revocado después de usarlo.
- Dependency Review y CodeQL nativos quedaron habilitados gratuitamente al convertir el repositorio a público; `ENABLE_GHAS_DEPENDENCY_REVIEW` y `ENABLE_GITHUB_CODE_SECURITY` están activos.
- El runtime Colima se conserva, pero su VM local se eliminó para liberar espacio; GitHub Actions recrea el stack Supabase desde cero para las pruebas de migraciones y RLS. Analítica y Storage Vector locales son opcionales y permanecen fuera del baseline.
- GitHub Actions fue bloqueado inicialmente por pagos recientes fallidos o límite de gasto de la cuenta privada. Después de la auditoría, el repositorio pasó a público y app, base de datos, E2E, CodeQL, Dependency Review y Gitleaks aprobaron en runners públicos.
- Los patrones de secretos no asociados a proveedores y los validity checks requieren GitHub Team/Enterprise con Secret Protection; Gitleaks y el escáner propio cubren adicionalmente el plan gratuito.
- El primer webhook del proyecto actual etiquetó incorrectamente la rama de la PR como Production. La barrera previa lo canceló antes de publicar, Git fue reconectado y el Ignored Build Step ahora cancela permanentemente cualquier target `production` cuyo `VERCEL_GIT_COMMIT_REF` no sea exactamente `main`.
- La siguiente prueba Git fue clasificada correctamente como Preview y quedó protegida por Vercel Authentication, sin Supabase, Postgres, alias de Production, OIDC ni bypass de automatización.
- OIDC quedó desactivado en el proyecto Vercel actual después de retirar los archivos de entorno locales, por lo que no puede emitir nuevos tokens mientras permanezca en este estado.

## Política de release

- Preview puede publicarse únicamente sin datos reales, `noindex` y con todas las funciones riesgosas desactivadas; no recibe variables del Supabase de producción.
- Producción debe salir de `main` tras CI; indexación y funciones sensibles permanecen apagadas hasta completar sus gates.
- Resend verificó `vwayajayisyen.com` con DKIM, SPF y MX; DMARC está publicado.
  Supabase Auth tiene SMTP Resend con
  `Vwayaj Ayisyen <noreply@vwayajayisyen.com>` y el secreto de Turnstile; el
  site key público está limitado a Vercel Production. El registro permanece
  cerrado tanto en la aplicación como en Supabase hasta publicar términos
  revisados y aprobar alta, confirmación y recuperación reales. Stripe, Zoom y
  OpenAI también permanecen desactivados hasta contar con sus credenciales y
  gates completos.
- La activación pública exige completar la matriz de `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`.
