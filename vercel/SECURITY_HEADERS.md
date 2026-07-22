# Cabeceras y CSP

Implementar preferiblemente en `next.config.ts`/`proxy.ts` y probar; `vercel.json` no debe duplicar políticas incompatibles.

## Base

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` sólo después de confirmar todos los subdominios HTTPS.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: desactivar cámara/micrófono/geolocalización salvo rutas de video que realmente las requieran.
- `Cross-Origin-Opener-Policy: same-origin` cuando no rompa Stripe/proveedores.
- `frame-ancestors 'none'` en CSP.
- `object-src 'none'`
- `base-uri 'self'`
- `form-action 'self'`
- `upgrade-insecure-requests` producción.

## CSP

Generar nonce por request para superficies dinámicas privadas. No usar `unsafe-eval`. Evitar `unsafe-inline`; si Next/proveedor obliga una excepción, documentarla, limitarla y crear issue.

Allowlist mínima para:

- self;
- Supabase exacto;
- Stripe exacto;
- proveedor de observabilidad;
- imágenes públicas aprobadas;
- sin comodines amplios.

Recoger reportes CSP en endpoint que no registre PII y aplicar rate limit.
