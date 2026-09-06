# Rutas verificadas

Fecha: 2026-09-04.

## Respuesta esperada

| Ruta | Estado |
|---|---:|
| `/ht` | 200 |
| `/ht/countries` | 200 |
| `/ht/countries/chile` | 200 |
| `/ht/countries/brazil` | 200 |
| `/ht/news` | 200 |
| `/ht/news/brezil-plan-nasyonal-migrasyon-2026` | 200 |
| `/ht/profile` | 200 |
| `/ht/travel/chile` | 200 |
| `/ht/travel/brazil` | 200 |
| `/ht/travel/chile/from/haiti` | 200 |
| `/ht/travel/brazil/from/dominican-republic` | 200 |
| `/ht/travel/chile/from/other` | 200, orientación limitada |
| `/ht/auth/sign-in` | 200, flujo desactivado sin credenciales |
| `/ht/auth/sign-up` | 200, flujo desactivado sin credenciales |
| `/ht/about` | 200 |
| `/ht/faq` | 200 |
| `/ht/contact` | 200 |
| `/ht/legal/terms` | 200, documento independiente |
| `/ht/legal/privacy` | 200, documento independiente |
| `/ht/legal/security` | 200, documento independiente |
| `/ht/legal/payments` | 200, documento independiente |
| `/es/legal/privacy` | 307 hacia `/ht/legal/privacy` |
| `/pt/legal/terms` | 307 hacia `/ht/legal/terms` |
| `/manifest.webmanifest` | 200 |
| `/sw.js` | 200 |
| `/offline` | 200 |
| `/ht/countries/usa` | 404 |
| `/ht/countries/mexico` | 404 |
| `/ht/portal` | 404 |
| `/ht/admin` | 404 |
| `/ht/services` | 404 |
| `/api/health` | 404 |

La matriz E2E debe comprobar rutas en escritorio y teléfono, acceso inicial de
la PWA, los dos destinos, las diez noticias, accesibilidad, ausencia de
desbordamiento, manifest e instalación.
