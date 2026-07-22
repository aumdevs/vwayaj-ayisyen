# Informe de implementación

Fecha de corte: 2026-07-22.

## Recursos

- GitHub: `https://github.com/aumdevs/haitian-legal-travel-platform` (privado).
- Rama de infraestructura: `aumdevs/connect-production-infrastructure`.
- Vercel: equipo `Aum prodz Group`, proyecto `haitian-legal-travel-platform`; sin deployment activo y con Git desconectado hasta corregir la clasificación de entornos.
- Supabase remoto: `gaknpocbfmiamghpoqhw`, São Paulo, plan gratuito, creado mediante Vercel Marketplace.
- GitHub Code Security: no disponible para Dependency Review ni CodeQL nativos; fallbacks de auditoría y análisis estático activos.
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
| GitHub Actions | bloqueado antes de ejecutar por facturación/límite de gasto de la cuenta |
| Vercel | cero deployments; el dominio oficial responde `404` |

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

- Vercel conserva únicamente `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` de Supabase, sólo en Production.
- `SUPABASE_SERVICE_ROLE_KEY`, claves privadas y credenciales de Postgres no están en Vercel; las credenciales operativas rotadas viven únicamente en macOS Keychain.
- Preview y Development no reciben credenciales de la base productiva. Production conserva `NEXT_PUBLIC_ALLOW_INDEXING=false`, `ALLOW_ADMIN_BOOTSTRAP=false` y todos los `DISABLE_*` en `true`.
- Stripe, SMTP, CAPTCHA, cifrado CRM, escáner, reuniones, observabilidad e IA siguen pendientes y sus funciones continúan apagadas.

## Rotación de credenciales del 2026-07-22

- Una inspección local mostró accidentalmente credenciales de un archivo `.vercel/.env.preview.local` ignorado por Git.
- Se eliminaron las copias locales `.env.local`, `.env.development.local` y `.vercel/.env.preview.local`.
- Se creó una nueva API key privada, se revocó la anterior como comprometida y se deshabilitaron `anon`/`service_role` heredadas.
- Se revocó la firma HS256 anterior; ES256 permanece activa.
- Se rotó y verificó la contraseña de Postgres. Ningún valor se registró en el repositorio.
- Se desactivó OIDC en el proyecto Vercel para impedir nuevas emisiones. El token temporal de Development ya emitido tiene TTL fijo de 12 horas y caduca el 2026-07-22 a las 12:19:48 de Santiago; no hay deployment ni proveedor cloud que lo consuma.

## Pasos externos pendientes

1. Corregir `Billing & plans`/límite de gasto de GitHub y volver a ejecutar los checks de la PR `#9`.
2. Reimportar o recrear el proyecto Vercel desde GitHub: el proyecto creado inicialmente por CLI etiquetó como Production incluso los despliegues de la rama de infraestructura. Todos esos despliegues fueron eliminados y Git quedó desconectado.
3. Crear un backend aislado de staging antes de habilitar Preview funcional; no reutilizar Supabase de producción.
4. Iniciar sesión como `admin@aumprodz.com`, cambiar la contraseña temporal y verificar TOTP/AAL2.
5. Configurar SMTP propio y CAPTCHA antes de admitir registros públicos; el SMTP predeterminado no es apto para producción.
6. Completar marca, contenido, legal, privacidad, soporte y observabilidad antes de permitir indexación.
7. Ejecutar restore drill y pentest antes de aceptar documentos reales.

## Reversión

- Código: revertir el commit/release desde GitHub y redeplegar el último commit aprobado de `main`.
- Base: migraciones forward-only con backup y script correctivo; no hacer rollback destructivo improvisado.
- Funciones: mantener o devolver `DISABLE_*="true"` y feature flag de base a `false`.
