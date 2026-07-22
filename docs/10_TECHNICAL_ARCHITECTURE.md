# Arquitectura técnica

## Resumen

Arquitectura modular monolítica con Next.js y Supabase. El objetivo es mantener una sola aplicación desplegable, límites claros y controles de autorización consistentes.

```text
Browser / PWA
   |
Vercel Edge + Firewall + Bot protection
   |
Next.js App Router
   |- Server Components
   |- Server Actions
   |- Route Handlers
   |- server-only DAL
   |
Supabase
   |- Auth
   |- Postgres + RLS
   |- Storage
   |- Realtime
   |- Edge Functions / Cron
   |
Third parties
   |- Stripe Checkout
   |- Email provider
   |- OpenAI/provider
   |- Malware scanner
   |- Video meeting provider/manual URL
```

## Versiones y herramientas

Al implementar, verificar las últimas versiones estables compatibles.

- Node.js 24 LTS.
- pnpm 11.
- Next.js 16 App Router o posterior estable.
- React soportado por Next.js.
- TypeScript estricto.
- Tailwind CSS.
- Supabase JS + `@supabase/ssr`.
- Zod.
- React Hook Form.
- `next-intl` o alternativa madura.
- Vitest.
- Playwright.
- axe-core.
- ESLint y Prettier.

## Estructura sugerida

```text
app/
  [locale]/
    (public)/
    (auth)/
    portal/
    advisor/
    professional/
    editor/
    moderation/
    admin/
  api/
components/
  ui/
  public/
  portal/
  admin/
features/
  auth/
  content/
  comparison/
  assessment/
  packages/
  payments/
  crm/
  cases/
  documents/
  appointments/
  courses/
  community/
  ai/
lib/
  auth/
  db/
  dal/
  security/
  validation/
  encryption/
  rate-limit/
  i18n/
  observability/
  stripe/
  ai/
  storage/
supabase/
  migrations/
  functions/
  tests/
scripts/
tests/
```

## Capas

### Presentación

- Server Components por defecto.
- Client Components sólo para interacción.
- DTOs mínimos.
- Nunca pasar registros DB completos al cliente.

### Acciones

- Server Actions delgadas.
- Validar input.
- Llamar DAL.
- Revalidar.
- No contener lógica de autorización duplicada.

### DAL

- `import 'server-only'`.
- Obtiene usuario.
- Verifica `aal`.
- Verifica rol y pertenencia al recurso.
- Ejecuta DB.
- Devuelve DTO mínimo.
- Registra acción sensible.

### Base de datos

- RLS como barrera final.
- Funciones `security definer` con `search_path` fijo.
- Sin SQL dinámico basado en input.
- Índices y constraints.
- Eventos de auditoría append-only.

## Supabase clients

- Browser client: clave publicable, sólo operaciones permitidas por RLS.
- Server client: cookies SSR y clave publicable para actuar como usuario.
- Admin/service client: clave secreta, sólo en módulos server-only para webhooks, tareas y bootstrap.
- No usar service role para consultas normales de usuario, porque evita RLS.

## Caché

### Público

- Contenido publicado puede usar caché y revalidación por tags.
- Revalidar al publicar/actualizar.
- Cachear por locale y country.
- No cachear respuestas personalizadas.

### Privado

- `no-store`.
- No CDN caching.
- `Cache-Control: private, no-store`.
- No precargar rutas con información sensible si puede exponer metadata.

## CSP

- Superficies privadas sensibles: nonce por solicitud y render dinámico.
- Público: evaluar CSP hash/SRI compatible con generación estática; si el soporte experimental no es aceptable, usar una política revisada sin introducir terceros innecesarios.
- Permitir sólo dominios indispensables.
- No Google Tag Manager por defecto.
- Stripe se abre en Checkout alojado.
- Frames sólo para proveedor de video aprobado.

## Cifrado de campos

Para PII de CRM y enlaces privados:

- AES-256-GCM en aplicación.
- Clave principal en Vercel env, nunca DB.
- Formato versionado: `v1:iv:tag:ciphertext`.
- HMAC-SHA-256 separado para búsquedas exactas normalizadas.
- Rotación con key ID.
- No cifrar campos que deban filtrar frecuentemente sin necesidad.
- Minimizar PII antes de cifrar.

## Integraciones

Cada integración usa un adaptador:

```ts
interface EmailProvider {}
interface AIProvider {}
interface MalwareScanner {}
interface MeetingProvider {}
interface RateLimitProvider {}
```

La aplicación debe arrancar con integraciones desactivadas y producir mensajes operativos claros, no errores 500.

## Zonas y latencia

- Base de datos en región sudamericana disponible, preferentemente São Paulo.
- Vercel global para contenido público.
- Funciones que acceden a DB configuradas cerca de DB cuando sea posible.
- Medir antes de optimizar.

## Datos en tiempo real

Usar Realtime con moderación:

- Notificaciones.
- Cambios de estado.
- Mensajes de expediente.

No suscribirse a tablas amplias ni depender de Realtime para autorización.

## Background jobs

- Recordatorios.
- Contenido vencido.
- Retención documental.
- Entrega de notificaciones.
- Reindexado IA.
- Limpieza de sesiones anónimas.

Los jobs deben ser idempotentes y autenticados con secreto rotatable.

## Diagramas

Ver `/schemas/architecture.mmd` y `/schemas/er-diagram.mmd`.
