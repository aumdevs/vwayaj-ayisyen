# Analítica y experimentación

## Objetivos

Mejorar comprensión, accesibilidad y conversión sin perfilar vulnerabilidades migratorias.

## Eventos permitidos

- page_view pública;
- country_view;
- compare_started/completed;
- assessment_started/completed;
- CTA genérico;
- package_view;
- signup_completed;
- course progress agregado;
- error técnico;
- Core Web Vitals.

## Prohibido enviar

- nombre/email/teléfono;
- respuestas del cuestionario;
- país actual + situación migratoria individual;
- case/document/order IDs;
- contenido de mensajes/comunidad/IA;
- URL firmada;
- query params;
- formularios;
- texto buscado sin redacción;
- grabación/replay en áreas sensibles.

## Consentimiento

Configurar según revisión legal. La app funciona sin analítica no esencial. DNT/GPC cuando sea aplicable.

## Identificadores

- sesión seudónima rotatoria;
- no fingerprint invasivo;
- no vincular marketing con expediente;
- no exportar audiencias vulnerables;
- agregación y umbral mínimo.

## Experimentos

- No experimentar con requisitos, advertencias legales, precios ocultos, consentimientos o seguridad.
- No usar dark patterns.
- Hipótesis y métrica.
- Aprobación.
- Accesibilidad.
- Duración/stop rule.
- Segmentos no sensibles.
- Resultado registrado.

## Implementación mínima (2026-08-23)

- `PublicAnalytics` emite únicamente `page_view`, `country_view`, `cta_clicked`
  y `official_source_opened`.
- El payload contiene sólo `event`, `locale` y `pathname`; elimina query string y
  fragmento, no crea ID de sesión y no envía referrer.
- DNT y Global Privacy Control desactivan la emisión.
- La ausencia de `NEXT_PUBLIC_ANALYTICS_ENDPOINT` desactiva totalmente la
  analítica. El proveedor, DPA, región, retención y base jurídica siguen siendo
  una decisión externa previa a activarla en Production.
- La CSP sólo autoriza el origen HTTPS configurado. Una URL inválida falla
  cerrada.
- Las pruebas unitarias fijan el vocabulario y la eliminación de query strings.
