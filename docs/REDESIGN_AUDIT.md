# Auditoría del rediseño premium

Fecha: 2026-07-22

Rama: `redesign/premium-ui-v2`

Referencia auditada: `https://vwayaj-ayisyen.vercel.app/ht`

## Alcance revisado

- 39 archivos de rutas y estados de App Router.
- 23 componentes compartidos de interfaz.
- Cinco diccionarios de interfaz: `ht`, `fr`, `es`, `pt` y `en`.
- Flujos server-side de Supabase Auth, contenido publicado, Stripe, uploads, citas, IA y WhatsApp.
- 48 documentos de producto, seguridad, datos y operación.
- Capturas baseline de ocho superficies en escritorio y móvil.

## Evidencia visual inicial

Las capturas están en `docs/screenshots/redesign/before/`:

- inicio;
- países;
- guía de Estados Unidos;
- comparador;
- recomendador;
- servicios;
- guías;
- inicio de sesión.

## Problemas confirmados

1. El layout localizado monta el mismo header, footer y control de audio en público, Auth y áreas privadas.
2. Un control heredado de lectura asistida ocupaba una franja propia y contradecía la dirección actual; fue retirado del producto.
3. El header depende de enlaces largos, un menú móvil basado en `details` y una jerarquía débil.
4. La home carece de fotografía editorial, contraste entre destinos y una narrativa de producto completa.
5. Las páginas de país muestran hasta quince secciones vacías con el mismo mensaje interno.
6. Copy como “revisión obligatoria”, “no hay fuentes aprobadas” y “función no disponible” expone el estado del equipo al público.
7. Comparador y recomendador parecen controles incompletos en vez de estados premium protegidos por configuración.
8. Servicios, guías, cursos y páginas legales reutilizan una única plantilla de indisponibilidad.
9. Auth comparte navegación pública y presenta un formulario sin shell narrativo, visibilidad de contraseña ni jerarquía refinada.
10. Cliente, asesor, profesional, editorial, moderación y administración reutilizan un único shell genérico.
11. El CSS global concentra todos los módulos, con pocos tokens semánticos y sin dirección editorial consistente.
12. No existen fotografías de destino ni componentes suficientes para tablas, timeline, métricas y estados de producto.

## Piezas funcionales que se conservan

- App Router y rutas localizadas existentes.
- Supabase SSR, refresco de sesión, Auth, TOTP y requisito `aal2`.
- `requireViewer`, roles del servidor y redirects seguros.
- lectura exclusiva de `published_country_content` y validación Zod.
- RLS, migraciones, Storage y tipos generados, sin cambios.
- kill switches y respuesta fail-closed de integraciones sensibles.
- creación de precios y estados de Stripe exclusivamente en servidor.
- CSP con nonce, cabeceras, PWA pública y exclusión de caché privada.
- los cinco locales y preservación de ruta al cambiar idioma.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Debilitar autorización al separar shells | Mantener intactos `proxy.ts`, `requireViewer` y RLS; cambiar sólo presentación. |
| Mostrar contenido no aprobado | Renderizar únicamente filas publicadas; si no existen, una sola experiencia editorial útil. |
| Inventar datos para llenar la UI | Usar texto de orientación de producto, nunca cifras, precios, requisitos o testimonios ficticios. |
| Habilitar integraciones incompletas | Mantener kill switches y ocultar acciones públicas cuando su configuración no está aprobada. |
| Regresión de marca o PWA | Conservar el símbolo existente y centralizar la identidad textual; revisar iconos y manifest. |
| Regresión responsive | Verificar ocho viewports, overflow, menús, tablas y safe areas con Playwright. |
| Regresión de accesibilidad | Mantener landmarks, foco, teclado, 44 px, reduced motion y ejecutar axe. |
| Preview sin Supabase | Verificar UI pública y fail-closed; no conectar datos productivos a Preview. |

## Decisión de arquitectura visual

El layout de locale quedará neutro. El grupo público recibirá su propio header/footer; Auth tendrá un shell independiente; las áreas privadas se renderizarán con un shell de cliente o un shell operativo según el rol. La seguridad seguirá viviendo en las mismas fronteras server-side.
