# Informe de implementación

Fecha de corte: 2026-07-23.

## Recursos

- GitHub: `https://github.com/aumdevs/vwayaj-ayisyen` (público, licencia propietaria de Aum Prodz).
- Rama de release: `agent/legal-center-production`; PR `#16`.
- Vercel: equipo `Aum prodz Group`, proyecto `vwayaj-ayisyen` (`prj_7ypksu4QMxUZLss5pZGGTSIDBLXV`), conectado a GitHub con `main` como única rama Production; Preview protegido por Vercel Authentication.
- Supabase remoto: **Vwayaj Ayisyen** (`gaknpocbfmiamghpoqhw`), São Paulo, plan gratuito, creado mediante Vercel Marketplace.
- GitHub Code Security: CodeQL y Dependency Review nativos habilitados después de convertir el repositorio a público.
- GitHub: secret scanning, push protection, alertas de dependencias, actualizaciones de seguridad de Dependabot y reporte privado de vulnerabilidades habilitados.
- GitHub `main`: cambios sólo por PR, historial lineal, conversaciones resueltas, sin force-push ni borrado; Actions fijadas a SHA y workflows de forks sujetos a aprobación.
- Supabase: PostgreSQL 17, SSL obligatorio, Auth endurecido y RLS validada local y remotamente.
- Supabase Auth firma con ES256; la firma HS256 anterior y las API keys heredadas están revocadas/deshabilitadas.
- Proveedores elegidos: Stripe para pagos, Resend para email, Zoom para citas y OpenAI para IA. Sus funciones siguen desactivadas hasta completar credenciales, configuración comercial y gates de privacidad/seguridad.

## Implementación

- Web pública clara para laptop/escritorio y App Shell PWA para teléfono,
  tableta táctil y standalone, en cinco locales.
- Mega-menús accesibles en escritorio; App Bar, menú “Más” y navegación inferior
  de cinco destinos en la experiencia de aplicación.
- Manifest completo, iconos propios, screenshots reales, instalación Android,
  instrucciones iPhone/iPad, offline público y actualización controlada.
- CMS público conectado a vistas RLS; contenido sin aprobar nunca se renderiza.
- Auth por email, verificación, recuperación, cambio de contraseña, cierre de sesión y TOTP implementados.
- Alta con aceptación separada de Términos, reconocimiento de Privacidad y
  confirmación 18+/capacidad; HMAC, timestamp, versiones activas y hash SHA-256
  exacto del contenido oficial por idioma se validan en el hook de Auth.
- Centro de privacidad con intake autenticado, unicidad de solicitudes abiertas,
  consolidación histórica, cola administrativa, transiciones intermedias y
  cierre mediante acciones admin+AAL2 y RPCs AAL2 auditados; un reenvío
  actualiza los detalles de la solicitud abierta sin duplicarla.
- Despliegue de registro sin corte: los formatos HMAC anteriores sólo se
  aceptan durante una ventana de 24 horas y no fabrican evidencia legal nueva.
- Evidencia legal firmada inmutable para navegadores; los case managers
  conservan sólo la actualización de estado/retiro para consentimientos no
  legales y no pueden convertirlos en Términos o Privacidad.
- Configuración oficial aplicada mediante merge idempotente que conserva
  horario, WhatsApp, routing, logo personalizado, CNPJ y domicilio completados.
- El merge conserva sólo valores aún presentes: no puede reconstruir una
  configuración sobrescrita antes de esta versión. Cualquier entorno afectado
  debe restaurarla desde un backup o exportación de auditoría anterior.
- El bootstrap inicial serializa intentos válidos con un advisory lock de
  transacción antes de comprobar que aún no existe un `super_admin`.
- Portales de usuario, asesor, profesional, editor, moderación y admin protegidos por sesión, rol y AAL2 cuando corresponde.
- Esquema completo para contenido, evaluación, CRM, casos, documentos, pagos, citas, notificaciones, cursos, comunidad e IA.
- PWA, caché pública restringida, sitemap, robots, hreflang, health endpoint y cabeceras de seguridad.
- CI, CodeQL, dependency review, Gitleaks y Dependabot configurados.

## Evidencia local

| Control | Resultado |
|---|---|
| Migraciones desde base vacía | 24 aplicadas localmente; las cuatro últimas se aplican a remoto al publicar este release |
| Lint PostgreSQL | sin hallazgos |
| Pruebas pgTAP/RLS | 104 aprobadas localmente |
| Schema drift | vacío |
| Unit tests | 83 aprobadas en 18 archivos |
| Cobertura del núcleo | 96.36% líneas, 97.43% ramas |
| Playwright desktop/móvil | 33 aprobadas, 7 saltos intencionales por plataforma |
| Axe WCAG serio/crítico | 0 en home desktop/móvil |
| Lighthouse móvil | rendimiento 96, accesibilidad 100, buenas prácticas 100 |
| Lighthouse desktop | rendimiento 100, accesibilidad 100, buenas prácticas 100 |
| Lighthouse SEO | 69, limitado intencionalmente por `noindex` |
| QA visual | 35 capturas, 0 errores de navegador, 0 overflow |
| TypeScript/ESLint | aprobados |
| Next.js production build | aprobado |
| Audit de dependencias | 0 vulnerabilidades conocidas tras remediación |
| Clave privada nueva de Supabase | REST remoto `200` |
| Contraseña rotada de Postgres | conexión SSL directa aprobada |
| GitHub Actions | app, base de datos, E2E, CodeQL, Dependency Review y Gitleaks aprobados en runners públicos |
| Vercel | Preview protegido verificado; publicación de Production reservada a un merge aprobado en `main` |

## Estado de funciones

| Función | Estado | Gate pendiente |
|---|---|---|
| Contenido público/PWA | activo | contenido migratorio sigue vacío hasta fuentes y revisión humana |
| Comparación/evaluación | desactivada | método, datos y revisión |
| Servicios/WhatsApp | desactivada | oferta, número, privacidad |
| Pagos | desactivada | productos/precios, webhook y legal en Stripe |
| Intake/CRM | desactivada | consentimiento, CAPTCHA, rate limit, cifrado |
| Documentos | desactivada | escáner, restore, consentimiento, pentest |
| Citas | desactivada | credenciales Zoom, privacidad y zonas horarias |
| Cursos | desactivada | contenido, transcripciones, accesibilidad |
| Comunidad | desactivada | moderación, apelación, antiabuso |
| IA | desactivada | credenciales OpenAI, DPA, RAG eval, PII y presupuesto |

## Administrador inicial

- Email privado del propietario creado y confirmado; no se publica en el repositorio.
- Roles verificados: `user`, `admin`, `super_admin`; cuenta activa, contraseña rotada y credencial temporal rechazada.
- Las credenciales administrativas están únicamente en macOS Keychain bajo servicios `com.aumprodz.vwayaj-ayisyen.admin*`.
- El permiso remoto de ejecución del bootstrap fue revocado incluso para `service_role` después del alta.
- TOTP está enrolado y la sesión administrativa fue verificada en `aal2`; `force_password_change=false`.

## Variables y gates

- Vercel conserva únicamente `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` de Supabase, sólo en Production; se verificaron los 17 valores y targets configurados sin exponerlos.
- `SUPABASE_SERVICE_ROLE_KEY`, claves privadas y credenciales de Postgres no están en Vercel; las credenciales operativas rotadas viven únicamente en macOS Keychain.
- Preview y Development no reciben credenciales de la base productiva.
  Production conserva `NEXT_PUBLIC_ALLOW_INDEXING=false`,
  `ALLOW_ADMIN_BOOTSTRAP=false`, registro habilitado exclusivamente en
  Production y todos los demás `DISABLE_*` en `true`. Las URL y clave publicable de Supabase quedaron
  restauradas sólo en Production; Preview sigue aislado.
- El Ignored Build Step cancela todo target `production` cuando `VERCEL_GIT_COMMIT_REF` no es exactamente `main`; un fallo de clasificación de Vercel no puede publicar una rama de trabajo.
- El Preview verificado no contiene variables Supabase/Postgres, alias de producción ni `VERCEL_AUTOMATION_BYPASS_SECRET`; OIDC permanece desactivado y Vercel Authentication devuelve el acceso público a SSO con `noindex`.
- Stripe está accesible sólo en entorno de prueba y aún no tiene productos/precios
  aprobados. Resend verificó `vwayajayisyen.com` con DKIM, SPF y MX en São Paulo;
  DMARC está publicado, TLS está forzado y el seguimiento de aperturas/clics
  permanece apagado. Supabase Auth tiene SMTP Resend y el secreto de Turnstile;
  Vercel Production tiene el site key público. El alta está además protegida
  por un HMAC emitido sólo por el servidor y validado por el hook
  `private.before_user_created`; la versión, fecha, aceptación separada y
  confirmación de edad/capacidad se conservan como evidencia. Cada registro
  conserva además el hash SHA-256 canónico del documento oficial aceptado; las
  versiones y cuatro hashes español/portugués están fijados en una tabla
  privada de PostgreSQL. Zoom y OpenAI no tienen credenciales del proyecto.

## Rotación de credenciales del 2026-07-22

- Una inspección local mostró accidentalmente credenciales de un archivo `.vercel/.env.preview.local` ignorado por Git.
- Se eliminaron las copias locales `.env.local`, `.env.development.local` y `.vercel/.env.preview.local`.
- Se creó una nueva API key privada, se revocó la anterior como comprometida y se deshabilitaron `anon`/`service_role` heredadas.
- Se revocó la firma HS256 anterior; ES256 permanece activa.
- Se rotó y verificó la contraseña de Postgres. Ningún valor se registró en el repositorio.
- Se desactivó OIDC en el proyecto Vercel actual para impedir nuevas emisiones. El token temporal de Development ya emitido tiene TTL fijo de 12 horas y caduca el 2026-07-22 a las 12:19:48 de Santiago; no hay deployment ni proveedor cloud que lo consuma.
- El smoke test de Preview generó tres bypass tokens de automatización; los tres fueron revocados y el mismo commit se reconstruyó sin esa variable antes del cierre.

## Publicación segura del repositorio

- Antes del cambio de visibilidad, Gitleaks `8.30.1` revisó 17 commits y el escáner propio revisó el árbol actual sin detectar secretos.
- Se compararon los 289 paths actuales con todo el historial: no existen dumps, respaldos, archivos borrados ocultos ni binarios sensibles.
- Se revisaron 69 ejecuciones históricas de Actions y sus logs con Gitleaks; no se detectaron credenciales.
- Los artifacts existentes son únicamente reportes SARIF de Gitleaks.
- La visibilidad pública no concede una licencia open source: `LICENSE` conserva todos los derechos de Aum Prodz.
- Los patrones no asociados a proveedores y los validity checks de Secret Protection requieren GitHub Team/Enterprise; Gitleaks y `check-no-secrets.sh` permanecen como cobertura adicional gratuita.

## Pasos externos pendientes

1. Crear un backend aislado de staging antes de habilitar Preview con datos; no reutilizar Supabase de producción.
2. Obtener revisión jurídica externa, CNPJ/domicilio registral completo y
   contratos/DPA antes de venta, documentos o tratamiento sensible.
3. Crear productos/precios y webhook de Stripe, credenciales de Zoom y un
   proyecto/API key de OpenAI antes de activar esas funciones.
4. Completar contenido con fuentes, revisión humana de kreyòl, soporte operativo
   y observabilidad antes de permitir indexación.
5. Ejecutar restore drill y pentest antes de aceptar documentos reales.

## Evidencia visual PWA

- `docs/screenshots/pwa-acceptance/desktop/`: web, mega-menús y rutas públicas;
- `docs/screenshots/pwa-acceptance/mobile/`: App Shell, Más, instalación,
  offline y actualización;
- `docs/screenshots/pwa-acceptance/tablet/`: vertical, horizontal, país,
  comparación e instalación;
- `public/screenshots/pwa/`: cuatro capturas reales usadas por el manifest.

## Reversión

- Código: revertir el commit/release desde GitHub y redeplegar el último commit aprobado de `main`.
- Base: migraciones forward-only con backup y script correctivo; no hacer rollback destructivo improvisado.
- Funciones: mantener o devolver `DISABLE_*="true"` y feature flag de base a `false`.
