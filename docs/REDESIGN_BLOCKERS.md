# Bloqueos reales restantes

Fecha: 2026-07-23

El rediseño y su Preview pueden publicarse sin resolver estos puntos. Las funciones afectadas deben seguir cerradas hasta contar con evidencia.

## Propietario y operación

- entidad legal, país operativo y dirección;
- alcance de orientación y profesionales autorizados;
- canal público de soporte;
- revisión humana de kreyòl;
- contenido de países con fuentes y fechas aprobadas;
- textos legales definitivos.

## Proveedores

- Auth/Resend: `vwayajayisyen.com` está verificado con DKIM, SPF y MX y el código
  integra el remitente, SMTP y Turnstile; faltan DMARC y guardar las
  credenciales SMTP/Turnstile directamente en Supabase antes de abrir el gate;
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
