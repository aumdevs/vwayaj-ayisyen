# Informe de implementación

Fecha de corte: 2026-07-22.

## Recursos

- GitHub: `https://github.com/aumdevs/haitian-legal-travel-platform` (público, licencia propietaria de Aum Prodz).
- Rama de infraestructura: `aumdevs/connect-production-infrastructure`.
- Vercel: equipo `Aum prodz Group`, proyecto `haitian-legal-travel-platform` (`prj_7ypksu4QMxUZLss5pZGGTSIDBLXV`), conectado a GitHub con `main` como única rama Production y una barrera que cancela cualquier target Production cuyo Git ref no sea `main`.
- Supabase remoto: `gaknpocbfmiamghpoqhw`, São Paulo, plan gratuito, creado mediante Vercel Marketplace.
- GitHub Code Security: CodeQL y Dependency Review nativos habilitados después de convertir el repositorio a público.
- GitHub: secret scanning, push protection, alertas de dependencias, actualizaciones de seguridad de Dependabot y reporte privado de vulnerabilidades habilitados.
- GitHub `main`: cambios sólo por PR, historial lineal, conversaciones resueltas, sin force-push ni borrado; Actions fijadas a SHA y workflows de forks sujetos a aprobación.
- Supabase: PostgreSQL 17, SSL obligatorio, Auth endurecido y RLS validada local y remotamente.
- Supabase Auth firma con ES256; la firma HS256 anterior y las API keys heredadas están revocadas/deshabilitadas.
- Stripe: no configurado; pagos desactivados.

## Implementación

- Shell público responsive y accesible, cinco locales, estructura uniforme para USA, Chile, Brasil y México.
- CMS público conectado a vistas RLS; contenido sin aprobar nunca se renderiza.
- Auth por email, verificación, recuperación, cambio de contraseña, cierre de sesión y TOTP implementados.
- Portales de usuario, asesor, profesional, editor, moderación y admin protegidos por sesión, rol y AAL2 cuando corresponde.
- Esquema completo para contenido, evaluación, CRM, casos, documentos, pagos, citas, notificaciones, cursos, comunidad e IA.
- PWA, caché pública restringida, sitemap, robots, hreflang, health endpoint y cabeceras de seguridad.
- CI, CodeQL, dependency review, Gitleaks y Dependabot configurados.

## Evidencia local

| Control | Resultado |
|---|---|
| Migraciones desde base vacía | 15 aplicadas local y remotamente |
| Lint PostgreSQL | sin hallazgos |
| Pruebas pgTAP/RLS | 21 aprobadas local y remotamente |
| Schema drift | vacío |
| Unit tests | 23 aprobadas |
| Cobertura del núcleo | 100% líneas, 97.29% ramas |
| Playwright desktop/móvil | 16 aprobadas |
| Axe WCAG serio/crítico | 0 en home desktop/móvil |
| Lighthouse desktop | rendimiento 100, accesibilidad 100, buenas prácticas 100 |
| Lighthouse SEO | 66, limitado intencionalmente por `noindex` previo al lanzamiento |
| TypeScript/ESLint | aprobados |
| Next.js production build | aprobado |
| Audit de dependencias | 0 vulnerabilidades conocidas tras remediación |
| Clave privada nueva de Supabase | REST remoto `200` |
| Contraseña rotada de Postgres | conexión SSL directa aprobada |
| GitHub Actions | app, base de datos, E2E, CodeQL, Dependency Review y Gitleaks aprobados en runners públicos |
| Vercel | cero deployments activos; la primera prueba de routing fue cancelada y el dominio oficial sigue sin publicación |

## Estado de funciones

| Función | Estado | Gate pendiente |
|---|---|---|
| Contenido público | estructura activa, contenido real vacío | fuentes y revisión humana |
| Comparación/evaluación | desactivada | método, datos y revisión |
| Servicios/WhatsApp | desactivada | oferta, número, privacidad |
| Pagos | desactivada | Stripe test, webhook, legal |
| Intake/CRM | desactivada | consentimiento, CAPTCHA, rate limit, cifrado |
| Documentos | desactivada | escáner, restore, consentimiento, pentest |
| Citas | desactivada | proveedor, privacidad, zonas horarias |
| Cursos | desactivada | contenido, transcripciones, accesibilidad |
| Comunidad | desactivada | moderación, apelación, antiabuso |
| IA | desactivada | DPA, RAG eval, PII, presupuesto |

## Administrador inicial

- Email creado y confirmado: `admin@aumprodz.com`.
- Roles verificados: `user`, `admin`, `super_admin`; cuenta activa y cambio de contraseña obligatorio.
- La contraseña temporal está únicamente en macOS Keychain bajo el servicio `com.aumprodz.haitian-legal-travel.admin`.
- El permiso remoto de ejecución del bootstrap fue revocado incluso para `service_role` después del alta.
- El primer inicio de sesión, cambio de contraseña y enrolamiento TOTP requieren la intervención del propietario.

## Variables y gates

- Vercel conserva únicamente `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` de Supabase, sólo en Production; se verificaron los 17 valores y targets configurados sin exponerlos.
- `SUPABASE_SERVICE_ROLE_KEY`, claves privadas y credenciales de Postgres no están en Vercel; las credenciales operativas rotadas viven únicamente en macOS Keychain.
- Preview y Development no reciben credenciales de la base productiva. Production conserva `NEXT_PUBLIC_ALLOW_INDEXING=false`, `ALLOW_ADMIN_BOOTSTRAP=false` y todos los `DISABLE_*` en `true`.
- El Ignored Build Step cancela todo target `production` cuando `VERCEL_GIT_COMMIT_REF` no es exactamente `main`; un fallo de clasificación de Vercel no puede publicar una rama de trabajo.
- Stripe, SMTP, CAPTCHA, cifrado CRM, escáner, reuniones, observabilidad e IA siguen pendientes y sus funciones continúan apagadas.

## Rotación de credenciales del 2026-07-22

- Una inspección local mostró accidentalmente credenciales de un archivo `.vercel/.env.preview.local` ignorado por Git.
- Se eliminaron las copias locales `.env.local`, `.env.development.local` y `.vercel/.env.preview.local`.
- Se creó una nueva API key privada, se revocó la anterior como comprometida y se deshabilitaron `anon`/`service_role` heredadas.
- Se revocó la firma HS256 anterior; ES256 permanece activa.
- Se rotó y verificó la contraseña de Postgres. Ningún valor se registró en el repositorio.
- Se desactivó OIDC en el proyecto Vercel actual para impedir nuevas emisiones. El token temporal de Development ya emitido tiene TTL fijo de 12 horas y caduca el 2026-07-22 a las 12:19:48 de Santiago; no hay deployment ni proveedor cloud que lo consuma.

## Publicación segura del repositorio

- Antes del cambio de visibilidad, Gitleaks `8.30.1` revisó 17 commits y el escáner propio revisó el árbol actual sin detectar secretos.
- Se compararon los 289 paths actuales con todo el historial: no existen dumps, respaldos, archivos borrados ocultos ni binarios sensibles.
- Se revisaron 69 ejecuciones históricas de Actions y sus logs con Gitleaks; no se detectaron credenciales.
- Los artifacts existentes son únicamente reportes SARIF de Gitleaks.
- La visibilidad pública no concede una licencia open source: `LICENSE` conserva todos los derechos de Aum Prodz.
- Los patrones no asociados a proveedores y los validity checks de Secret Protection requieren GitHub Team/Enterprise; Gitleaks y `check-no-secrets.sh` permanecen como cobertura adicional gratuita.

## Pasos externos pendientes

1. Crear un backend aislado de staging antes de habilitar Preview con datos; no reutilizar Supabase de producción.
2. Iniciar sesión como `admin@aumprodz.com`, cambiar la contraseña temporal y verificar TOTP/AAL2.
3. Configurar SMTP propio y CAPTCHA antes de admitir registros públicos; el SMTP predeterminado no es apto para producción.
4. Completar marca, contenido, legal, privacidad, soporte y observabilidad antes de permitir indexación.
5. Ejecutar restore drill y pentest antes de aceptar documentos reales.

## Reversión

- Código: revertir el commit/release desde GitHub y redeplegar el último commit aprobado de `main`.
- Base: migraciones forward-only con backup y script correctivo; no hacer rollback destructivo improvisado.
- Funciones: mantener o devolver `DISABLE_*="true"` y feature flag de base a `false`.
