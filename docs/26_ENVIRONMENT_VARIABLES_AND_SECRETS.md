# Variables de entorno y gestión de secretos

## Clasificación

### Públicas

Sólo valores seguros para navegador con prefijo `NEXT_PUBLIC_`:

- URL pública del sitio.
- URL y anon/publishable key de Supabase, según modelo actual.
- site key pública de Cloudflare Turnstile.
- identificador público de Stripe publishable, si la UI lo requiere.
- flags estrictamente no sensibles compilados.

La clave anon/publishable no sustituye RLS.

### Servidor

- Supabase service role.
- Stripe secret/webhook.
- cifrado/HMAC de CRM.
- claves de proveedores.
- cron secret.
- Sentry/observabilidad.
- OpenAI.
- escáner.
- bootstrap temporal.

Nunca usar prefijo público.

## Entornos

Separar:

- local;
- test;
- preview/staging;
- production.

No copiar secretos de producción a preview. Los datos de producción no se usan en test.

## Inventario propuesto

| Variable | Sensible | Entornos | Obligatoria para |
|---|---:|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | todos | app |
| `NEXT_PUBLIC_SUPABASE_URL` | No | todos | app |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | No | todos | app |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | todos los entornos con Auth | Auth antiabuso |
| `SUPABASE_SERVICE_ROLE_KEY` | Sí | server | tareas privilegiadas |
| `SUPABASE_AUTH_CAPTCHA_SECRET` | Sí | CLI/Supabase | aplicar Turnstile en Auth |
| `REGISTRATION_TERMS_VERSION` | No/operativo | server | identificar términos publicados aceptados |
| `REGISTRATION_GATE_SIGNING_KEY` | Sí | Vercel server + Supabase Vault | impedir altas directas o manipuladas |
| `DATABASE_URL` | Sí | CI/admin | migración controlada |
| `STRIPE_SECRET_KEY` | Sí | server | pagos |
| `STRIPE_WEBHOOK_SECRET` | Sí | server | webhook |
| `CRM_ENCRYPTION_KEY_V1` | Sí | server | CRM |
| `CRM_BLIND_INDEX_KEY_V1` | Sí | server | búsqueda CRM |
| `APP_SIGNING_KEY` | Sí | server | tokens internos |
| `CRON_SECRET` | Sí | server | cron |
| `EMAIL_PROVIDER_API_KEY` | Sí | server | email |
| `EMAIL_FROM` | No/operativo | server | email |
| `OPENAI_API_KEY` | Sí | server | IA |
| `AI_MODEL` | No | server | IA |
| `MALWARE_SCANNER_URL` | Interna | server | uploads |
| `MALWARE_SCANNER_TOKEN` | Sí | server | uploads |
| `MEETING_PROVIDER_*` | Mixta | server | video |
| `OBSERVABILITY_DSN` | Sí/limitada | server | errores |
| `BOOTSTRAP_ADMIN_EMAIL` | Confidencial | local temporal | bootstrap |
| `BOOTSTRAP_ADMIN_PASSWORD` | Sí crítico | local temporal | bootstrap |
| `ALLOW_ADMIN_BOOTSTRAP` | No | local temporal | bootstrap |

## Generación

- Generar al menos 32 bytes aleatorios para claves simétricas.
- Codificar en base64url o hex según función.
- Claves distintas por propósito y entorno.
- No derivar varias claves desde la contraseña admin.
- Registrar versión de clave, no material secreto.
- Rotación con lectura de versión anterior y escritura nueva.

## Manejo

- `.env.example` sólo nombres y comentarios.
- `.env.local` ignorado y permisos 600.
- No ejecutar `printenv`.
- No guardar `SUPABASE_AUTH_CAPTCHA_SECRET` en Vercel: pertenece a la
  configuración local/remota de Supabase Auth.
- Generar `REGISTRATION_GATE_SIGNING_KEY` con al menos 32 bytes aleatorios,
  conservarla en Vercel Production y duplicarla en Supabase Vault bajo
  `vwayaj_registration_gate_hmac`; nunca enviarla al navegador, Preview ni CI
  real. `REGISTRATION_TERMS_VERSION` sólo se define después de publicar y
  aprobar esa versión.
- La contraseña SMTP de Resend no es una variable de la aplicación. Se conserva
  en el gestor seguro y se aplica directamente al control plane de Supabase; no
  se copia a `.env.local`, CI ni Vercel.
- En scripts, nunca `console.log` secretos.
- Redactar headers/cookies.
- En Vercel, limitar variables a entornos y scopes necesarios.
- En GitHub, mínimo de secrets y permisos.
- Rotar de inmediato ante sospecha o exposición histórica.

## Arranque seguro

La aplicación debe fallar de forma clara al iniciar una función habilitada sin secretos. No debe “degradar” a una implementación insegura.

Ejemplos:

- pagos activados sin webhook → error/health no listo;
- uploads activados sin escáner → bloqueo;
- IA activada sin proveedor → bloqueo;
- CRM sin claves → bloqueo;
- admin bootstrap en producción → bloqueo.

## Secretos temporales de administrador

El archivo privado entregado con este paquete no se incluye en el ZIP. Codex debe:

1. leerlo sólo localmente;
2. ejecutar bootstrap;
3. obligar cambio de contraseña;
4. enrolar MFA;
5. borrar variables temporales;
6. eliminar el archivo local de forma segura;
7. verificar que nunca entró a Git.
