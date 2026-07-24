# Bloqueos reales restantes

Fecha: 2026-07-23

La web informativa, la PWA y la cuenta mínima pueden publicarse sin resolver
estos puntos. Las funciones afectadas deben seguir cerradas hasta contar con
evidencia.

## Propietario y operación

- CNPJ/identificador fiscal y domicilio registral completo;
- alcance de orientación y profesionales autorizados;
- revisión humana de kreyòl;
- contenido de países con fuentes y fechas aprobadas;
- revisión jurídica externa de los documentos publicados antes de venta o tratamiento sensible.

## Proveedores

- Auth/Resend: infraestructura completa el 2026-07-23. `vwayajayisyen.com`
  está verificado, DMARC está publicado, SMTP Resend y Turnstile están
  configurados en Supabase y el site key está en Vercel Production. El gate
  está habilitado sólo en Production con versiones legales exactas, aceptación
  separada y confirmación de edad/capacidad;
- Stripe: faltan productos, precios, moneda, impuestos y política de reembolso aprobados;
- Zoom: faltan credenciales, política de grabación y revisión de privacidad;
- OpenAI: faltan proyecto, modelo, evaluación, presupuesto y política de retención;
- documentos: falta escáner privado y revisión de privacidad;
- WhatsApp: falta número, plantillas y aviso de privacidad;
- comunidad: falta operación de moderación y apelaciones;
- observabilidad: falta proveedor y política de exclusión de PII.

## Regla de Preview

El Preview no debe conectarse a Supabase de producción ni activar pagos, registro, documentos, IA, comunidad, citas, captación o WhatsApp.

La matriz completa de requisitos permanece en `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`.
