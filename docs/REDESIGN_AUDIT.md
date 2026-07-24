# Auditoría del rediseño premium y PWA

Fecha de cierre: 2026-07-23

Rama de cierre: `agent/legal-center-production`

Referencia de producción: `https://vwayajayisyen.com/ht`

## Alcance revisado

- Rutas públicas, autenticación y áreas privadas de App Router.
- Componentes compartidos, navegación, formularios y estados.
- Cinco diccionarios de interfaz: `ht`, `fr`, `es`, `pt` y `en`.
- Flujos server-side de Supabase Auth, contenido publicado, Stripe, uploads, citas, IA y WhatsApp.
- Manifest, service worker, política de caché, instalación y actualización PWA.
- Capturas reales en escritorio, teléfono y tableta táctil.

## Evidencia visual inicial

El baseline anterior está en `docs/screenshots/redesign/before/`. La evidencia
final web/PWA está en `docs/screenshots/pwa-acceptance/`:

- 16 superficies de escritorio;
- 14 superficies móviles;
- 5 superficies de tableta;
- cuatro screenshots reales publicados en el manifest.

## Problemas confirmados

1. El primer rediseño seguía ofreciendo en móvil una web responsive, no un App Shell.
2. La tableta táctil horizontal podía recibir el shell de laptop.
3. El manifest no tenía tamaños de icono, screenshots, shortcuts ni metadatos suficientes.
4. El service worker actualizaba de inmediato y no protegía formularios con progreso.
5. La instalación no tenía flujo propio Android ni instrucciones iOS/iPadOS.
6. La navegación desktop era plana y no ofrecía mega-menús accesibles.
7. Persistían superficies grandes oscuras en tarjetas, Auth, footer y operación.
8. Faltaban evidencia visual y pruebas específicas de instalación, standalone, offline y actualización.

Todos estos puntos fueron corregidos. La única superficie deliberadamente
oscura que permanece es el enlace pequeño de salto al contenido mientras recibe
foco; no existe modo oscuro ni fondos oscuros como superficie de página o card.

## Piezas funcionales que se conservan

- App Router y rutas localizadas existentes.
- Supabase SSR, refresco de sesión, Auth, TOTP y requisito `aal2`.
- `requireViewer`, roles del servidor y redirects seguros.
- lectura exclusiva de `published_country_content` y validación Zod.
- RLS, migraciones, Storage y tipos generados, sin cambios.
- kill switches y respuesta fail-closed de integraciones sensibles.
- creación de precios y estados de Stripe exclusivamente en servidor.
- CSP con nonce, cabeceras y exclusión absoluta de caché privada, Auth y APIs.
- los cinco locales y preservación de ruta al cambiar idioma.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Debilitar autorización al separar shells | Mantener intactos `proxy.ts`, `requireViewer` y RLS; cambiar sólo presentación. |
| Mostrar contenido no aprobado | Renderizar únicamente filas publicadas; si no existen, una sola experiencia editorial útil. |
| Inventar datos para llenar la UI | Usar texto de orientación de producto, nunca cifras, precios, requisitos o testimonios ficticios. |
| Habilitar integraciones incompletas | Mantener kill switches y ocultar acciones públicas cuando su configuración no está aprobada. |
| Regresión de marca o PWA | Reutilizar el símbolo propio existente, generar todos sus tamaños y comprobar manifest/screenshots. |
| Regresión responsive | Verificar ocho viewports, overflow, menús, tablas y safe areas con Playwright. |
| Regresión de accesibilidad | Mantener landmarks, trampa/retorno de foco, teclado, 44 px, reduced motion y ejecutar axe. |
| Preview sin Supabase | Verificar UI pública y fail-closed; no conectar datos productivos a Preview. |
| Actualización con trabajo en curso | No activar el worker nuevo hasta una acción explícita y bloquearla si existe progreso en formularios. |
| Caché de datos privados | Ignorar métodos no GET, APIs, Auth, áreas privadas, Authorization y respuestas `private`/`no-store`. |

## Decisión de arquitectura visual

Laptop y escritorio conservan una web pública amplia, clara y editorial.
Teléfono, tableta táctil y modo standalone reciben barra superior, navegación
inferior de cinco destinos, menú “Más”, safe areas y superficies orientadas a
tareas. Auth y las áreas privadas mantienen shells claros independientes. La
seguridad sigue en las mismas fronteras server-side y no depende de CSS ni del
tipo de dispositivo.
