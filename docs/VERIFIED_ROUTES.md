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
- `/es/legal/terms?version=terms-2026-07-23-v1`
- `/es/legal/privacy?version=privacy-2026-07-23-v1`
- `/pt/legal/cookies?version=cookies-2026-07-23-v1`
- `/manifest.webmanifest`
- `/sw.js`
- `/ht/page-that-does-not-exist`
- `/offline`
- `/api/health`
- `/api/search`
- `/api/ai/chat`

También se verificó el cambio de idioma conservando ruta para `ht`, `fr`, `es`, `pt` y `en`.

## Matriz PWA local

- teléfono 390 × 844 con App Bar y navegación inferior;
- tableta táctil 768 × 1024 y 1024 × 768 con App Shell;
- laptop/escritorio sin App Shell y con mega-menús;
- instalación Android sólo tras acción explícita;
- instrucciones iPhone y detección iPad;
- invitación una vez por sesión y ausente en standalone;
- actualización explícita y bloqueo con formulario en progreso;
- offline público y caché privada excluida;
- 35 capturas, 0 errores y 0 overflow.

## Preview final

URL base:
`https://vwayaj-ayisyen-1hw65xw65-aum-prodz-group.vercel.app`

Respuestas verificadas con protección autenticada:

| Ruta | Estado |
|---|---:|
| `/ht` | 200 |
| `/ht/countries` | 200 |
| `/ht/countries/usa` | 200 |
| `/ht/compare` | 200 |
| `/ht/find-my-country` | 200 |
| `/ht/services` | 200 |
| `/ht/guides` | 200 |
| `/ht/auth/sign-in` | 200 |
| `/ht/page-that-does-not-exist` | 404 |
| `/api/health` | 200 |

La matriz visual histórica del Preview terminó con 26 capturas, cero errores de consola y
cero desbordamientos. La consulta de logs de Vercel no devolvió errores de
runtime para el despliegue auditado.

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

No se ejecutaron mutaciones con usuarios productivos. El E2E creó y eliminó una
cuenta efímera local y verificó el hook de Auth. La separación de datos,
versiones y hashes legales, DSR y RPC AAL2 se verificó con 81 pruebas pgTAP.
