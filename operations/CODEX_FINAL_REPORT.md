# Informe de implementación

Fecha de corte: 2026-07-22.

## Recursos

- GitHub: `https://github.com/aumdevs/haitian-legal-travel-platform` (privado).
- Rama de infraestructura: `aumdevs/connect-production-infrastructure`.
- Vercel: equipo `Aum prodz Group`, proyecto `haitian-legal-travel-platform`.
- Supabase remoto: `gaknpocbfmiamghpoqhw`, São Paulo, plan gratuito, creado mediante Vercel Marketplace.
- GitHub Code Security: no disponible para Dependency Review ni CodeQL nativos; fallbacks de auditoría y análisis estático activos.
- Supabase: PostgreSQL 17, SSL obligatorio, Auth endurecido y RLS validada local y remotamente.
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

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` y `DATABASE_URL` están configuradas en Vercel.
- Preview, Production y Development conservan `NEXT_PUBLIC_ALLOW_INDEXING=false`, `ALLOW_ADMIN_BOOTSTRAP=false` y todos los `DISABLE_*` en `true`.
- Stripe, SMTP, CAPTCHA, cifrado CRM, escáner, reuniones, observabilidad e IA siguen pendientes y sus funciones continúan apagadas.

## Pasos externos pendientes

1. Verificar preview, fusionar esta rama y conectar GitHub con Vercel para desplegar desde `main`.
2. Iniciar sesión como `admin@aumprodz.com`, cambiar la contraseña temporal y verificar TOTP/AAL2.
3. Configurar SMTP propio y CAPTCHA antes de admitir registros públicos; el SMTP predeterminado no es apto para producción.
4. Completar marca, contenido, legal, privacidad, soporte y observabilidad antes de permitir indexación.
5. Ejecutar restore drill y pentest antes de aceptar documentos reales.

## Reversión

- Código: revertir el commit/release desde GitHub y redeplegar el último commit aprobado de `main`.
- Base: migraciones forward-only con backup y script correctivo; no hacer rollback destructivo improvisado.
- Funciones: mantener o devolver `DISABLE_*="true"` y feature flag de base a `false`.
