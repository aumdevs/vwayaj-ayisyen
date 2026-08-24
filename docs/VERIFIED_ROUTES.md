# Rutas verificadas

Fecha: 2026-08-24.

## Respuesta esperada

| Ruta | Estado |
|---|---:|
| `/ht` | 200 |
| `/ht/countries` | 200 |
| `/ht/countries/usa` | 200 |
| `/ht/countries/chile` | 200 |
| `/ht/countries/brazil` | 200 |
| `/ht/countries/mexico` | 200 |
| `/ht/about` | 200 |
| `/ht/faq` | 200 |
| `/ht/contact` | 200 |
| `/es/legal/privacy` | 200 |
| `/pt/legal/terms` | 200 |
| `/manifest.webmanifest` | 200 |
| `/sw.js` | 200 |
| `/offline` | 200 |
| `/ht/auth/sign-in` | 404 |
| `/ht/portal` | 404 |
| `/ht/admin` | 404 |
| `/ht/services` | 404 |
| `/api/health` | 404 |

La matriz E2E comprueba las rutas en escritorio y teléfono, los 32 enlaces
mostrados, accesibilidad, ausencia de desbordamiento, navegación pública,
manifest e instalación PWA.
