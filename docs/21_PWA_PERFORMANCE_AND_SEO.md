# PWA, rendimiento, SEO y bajo consumo

## PWA

La aplicación es instalable, pero la PWA no amplía el riesgo de datos privados.

### Manifest implementado

- `id=/`, nombre `Vwayaj Ayisyen` y nombre corto `Vwayaj`;
- `start_url=/ht?source=pwa`, `scope=/`, `display=standalone`;
- tema y fondo blancos, orientación libre, locale kreyòl;
- iconos normales 48–512, maskable, monochrome y Apple Touch Icon;
- screenshots reales: home móvil, comparador móvil, país móvil y home tableta;
- shortcuts a comparar, países, guías y cuenta.

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

La implementación usa network-first para navegación pública y
stale-while-revalidate para activos públicos. No intercepta lo privado en
absoluto; por tanto queda network-only por diseño. Los caches tienen prefijo y
versión, y sólo se limpian los caches propios obsoletos. No existe
sincronización offline de formularios.

### App Shell e instalación

- teléfono ≤767 px;
- tableta táctil ≤1366 px sin hover, también horizontal;
- `standalone` y `fullscreen`;
- barra superior, idioma, atrás, menú “Más” y cinco destinos inferiores;
- safe areas y ocultamiento de navegación cuando el teclado ocupa la pantalla;
- aviso una vez por sesión después de 2,5 segundos;
- Android usa `beforeinstallprompt` sólo después del botón;
- iPhone/iPad reciben instrucciones;
- no solicita notificaciones.

### Actualización

El worker espera. La interfaz anuncia una versión y ofrece “Actualizar” o “Más
tarde”. Si cualquier formulario contiene progreso, no envía `SKIP_WAITING` y
explica que primero debe finalizarse o guardarse.

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
