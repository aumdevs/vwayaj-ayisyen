# PWA, rendimiento, SEO y bajo consumo

## PWA

La aplicación será instalable, pero una PWA no debe ampliar el riesgo de datos privados.

### Manifest

- nombre configurable;
- `short_name`;
- iconos adecuados;
- `display: standalone`;
- `start_url` locale-aware;
- `scope`;
- `theme_color` y `background_color`;
- accesos directos sólo a rutas públicas seguras.

### Service worker

Permitido cachear:

- shell público;
- fuentes autoalojadas;
- iconos;
- imágenes optimizadas;
- contenido editorial público versionado;
- página offline genérica.

Nunca cachear:

- `/dashboard`, `/admin`, `/advisor`, `/professional`;
- Route Handlers autenticados;
- cookies/tokens;
- expedientes/documentos;
- URLs firmadas;
- respuestas de Stripe;
- conversaciones IA;
- datos personales.

Usar `NetworkOnly` para superficies privadas y limpiar caches al cambiar versión. No implementar “offline sync” de formularios sensibles.

## Rendimiento

Objetivos iniciales de laboratorio y campo:

- LCP ≤ 2.5 s en p75;
- INP ≤ 200 ms en p75;
- CLS ≤ 0.1 en p75;
- JS inicial mínimo;
- imágenes AVIF/WebP con dimensiones;
- fuentes autoalojadas y subset cuando licencia lo permita;
- Server Components por defecto;
- Client Components sólo por interacción;
- streaming/suspense con cuidado;
- paginación y virtualización en paneles grandes;
- consultas indexadas y límites estrictos.

Probar móvil de gama baja, 360 px y red lenta. El modo bajo consumo desactiva videos automáticos, fondos pesados y precargas no esenciales.

## SEO

Sólo contenido público indexable.

- metadata por locale;
- canonical;
- `hreflang`;
- sitemap por contenido publicado;
- robots excluye auth/portales/API;
- JSON-LD prudente para organización, artículos, cursos y FAQ;
- títulos/descripciones revisados;
- Open Graph sin datos personales;
- no indexar resultados de cuestionario, casos, comunidad privada ni previews.

## Seguridad SEO

- Slugs únicos y saneados.
- Redirects allowlist; no open redirect.
- No generar páginas indexables desde parámetros arbitrarios.
- No incluir contenido privado en metadata, sitemap o previsualización.
- Sanitizar Markdown.
- Subidas públicas sólo por editores autorizados.
- Cabeceras correctas para archivos.

## Analítica respetuosa

- Consentimiento según revisión legal.
- Preferir medición agregada.
- No grabación de sesiones en páginas sensibles.
- No capturar campos, query params con PII, contenido de comunidad o chat.
- Eventos: visita a país, comparador iniciado/completado, CTA, curso, conversión.
- Identificadores rotables y minimizados.
