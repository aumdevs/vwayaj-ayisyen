# Rutas verificadas

Fecha: 2026-07-23

## Públicas

Se abrieron y revisaron en escritorio y móvil:

- `/ht`
- `/ht/countries`
- `/ht/countries/usa`
- `/ht/countries/usa/legal-pathways`
- `/ht/compare`
- `/ht/find-my-country`
- `/ht/services`
- `/ht/guides`
- `/ht/about`
- `/ht/faq`
- `/ht/contact`
- `/ht/courses`
- `/ht/search`
- `/ht/legal/privacy`
- `/ht/auth/sign-in`
- `/ht/auth/sign-up`
- `/ht/page-that-does-not-exist`
- `/offline`
- `/api/health`
- `/api/search`
- `/api/ai/chat`

También se verificó el cambio de idioma conservando ruta para `ht`, `fr`, `es`, `pt` y `en`.

## Privadas

Los shells y sus estados vacíos se revisaron visualmente para:

- portal del cliente;
- expediente;
- documentos;
- asesor;
- administración;
- tabla de usuarios;
- editor de contenido;
- estado de error.

La frontera real de `/[locale]/portal`, `/advisor`, `/professional`, `/editor`, `/moderation` y `/admin` se probó sin sesión: redirige a Auth. Las rutas continúan generándose desde `src/lib/navigation/private.ts` y conservan las mismas comprobaciones server-side.

No se ejecutaron mutaciones con usuarios productivos. La separación de datos se verificó con las 23 pruebas RLS locales existentes.
