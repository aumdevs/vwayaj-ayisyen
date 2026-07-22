# Estructura del repositorio y límites

## Árbol objetivo

```text
.
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (public)/
│   │   │   ├── (auth)/
│   │   │   ├── dashboard/
│   │   │   ├── advisor/
│   │   │   ├── professional/
│   │   │   ├── editor/
│   │   │   ├── moderation/
│   │   │   └── admin/
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── content/
│   │   ├── forms/
│   │   └── layouts/
│   ├── features/
│   │   ├── auth/
│   │   ├── content/
│   │   ├── countries/
│   │   ├── comparison/
│   │   ├── assessment/
│   │   ├── packages/
│   │   ├── whatsapp/
│   │   ├── crm/
│   │   ├── cases/
│   │   ├── documents/
│   │   ├── payments/
│   │   ├── appointments/
│   │   ├── courses/
│   │   ├── community/
│   │   ├── notifications/
│   │   ├── ai/
│   │   └── privacy/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── auth/
│   │   ├── security/
│   │   ├── crypto/
│   │   ├── validation/
│   │   ├── observability/
│   │   ├── rate-limit/
│   │   ├── i18n/
│   │   └── config/
│   ├── server/
│   │   ├── dal/
│   │   ├── services/
│   │   ├── jobs/
│   │   └── providers/
│   ├── types/
│   └── styles/
├── public/
├── messages/
├── supabase/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── security/
│   ├── accessibility/
│   └── fixtures/
├── scripts/
├── docs/
└── .github/
```

## Reglas de dependencia

- `app` coordina UI/rutas; no contiene lógica de negocio compleja.
- `components/ui` no importa dominios.
- `features/<domain>` puede importar utilidades compartidas, no otro dominio directamente salvo contrato público.
- `server/dal` es `server-only`.
- `server/providers` encapsula Stripe, email, IA, scanner, video y WhatsApp API.
- El navegador nunca importa service role, crypto server, Stripe secret o DAL.
- `lib/security` no depende de UI.
- Los tipos generados de DB no se editan manualmente.
- Cada dominio exporta un `index.ts` limitado; prohibir deep imports entre dominios.
- No crear carpeta “utils” sin propósito; nombrar por función/riesgo.

## Clientes Supabase

- browser client con publishable/anon key;
- server client ligado a cookies y sesión de usuario;
- admin/service client en módulo separado, `server-only`, usado sólo cuando no puede resolverse con RLS/RPC;
- nunca compartir instancias globales con estado de sesión.

## Route Handlers y Server Actions

- Validar input.
- Obtener usuario/assurance.
- Autorizar.
- Aplicar rate limit.
- Ejecutar servicio.
- Redactar respuesta.
- Auditar.
- No depender de que una página haya ocultado un botón.
- Server Actions no son fronteras mágicas; se tratan como endpoints públicos.

## DTO

No devolver filas completas. Ejemplos:

- `CaseListItem`: referencia, país, estado, próxima acción, updated_at.
- `DocumentSummary`: tipo, estado, tamaño, fecha; nunca ruta/bucket/scanner details.
- `PaymentSummary`: importe, moneda, estado, recibo; nunca provider payload.
- `ProfilePublic`: display_name, avatar, idioma; nunca flags/estado interno.

## Imports prohibidos

Configurar ESLint:

- `src/client/**` no importa `server-only`.
- UI no importa `@supabase/supabase-js` directamente salvo wrapper browser.
- `features/ai` no importa `features/cases`, `documents` o `crm`.
- `community` no importa CRM/cases.
- `content` no importa pagos.
