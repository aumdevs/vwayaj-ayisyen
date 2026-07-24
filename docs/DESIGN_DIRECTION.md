# Dirección de diseño — claridad editorial y App Shell

Fecha: 2026-07-22

## Idea central

Vwayaj Ayisyen combina el criterio de una revista de viajes, la claridad de una
fintech y la cercanía de un servicio humano. En escritorio toma como referencia
el nivel de orden y cuidado de productos públicos claros como Proton, sin copiar
estructura, activos, textos ni identidad. En teléfono y tableta se comporta como
una aplicación PWA orientada a tareas.

## Principios

1. **Personas antes que trámites.** Fotografía digna, vida cotidiana y autonomía.
2. **Claridad antes que volumen.** Una acción principal y una narrativa por sección.
3. **Confianza demostrada.** Fuentes y fechas aparecen junto al contenido real, no como advertencias dominantes.
4. **Vacíos editoriales, no técnicos.** El público nunca ve colas, gates o notas del equipo.
5. **Densidad según contexto.** Público luminoso; portal orientado a próximas acciones; administración precisa y compacta.
6. **Accesibilidad integrada.** Navegación, foco, contraste y targets táctiles sin estética infantil o geriátrica.
7. **Tema claro único.** Blanco, canvas frío y marfil son las superficies; la tinta oscura se reserva para texto, iconos y acentos pequeños.
8. **Dos experiencias, una arquitectura.** Web normal en laptop/escritorio y App Shell en teléfono/tableta táctil/standalone, sin duplicar lógica de negocio.

## Marca

- Nombre oficial: **Vwayaj Ayisyen**.
- Identidad centralizada en `src/config/brand.ts`.
- Se conserva el símbolo geométrico actual como marca provisional configurable.
- Se conserva exclusivamente la marca Vwayaj Ayisyen y se usa `vwayajayisyen.com` como dominio oficial.

## Tipografía

- Interfaz y cuerpo: Manrope.
- Títulos editoriales: Newsreader.
- Carga local mediante `next/font`.
- Medidas fluidas con `clamp()` y anchos de lectura de 58–72 caracteres.

## Color

- tinta profunda para texto y contraste puntual, nunca como superficie grande;
- canvas frío para producto;
- marfil cálido para narrativa editorial;
- azul cobalto para acciones;
- aqua para orientación y confianza;
- coral y oro sólo como acentos;
- acento moderado por país, nunca una colección de banderas.

## Fotografía

Se produjeron cinco activos originales mediante generación de imagen: una escena de preparación comunitaria y una escena para cada destino. No contienen texto, logos ni afirmaciones; se usan como ambientación editorial y se sirven mediante `next/image`.

## Movimiento

- 180–280 ms;
- desplazamientos y escalas mínimas;
- zoom de imagen máximo 1.035;
- sin autoplay, parallax ni animación constante;
- todas las transiciones se neutralizan con `prefers-reduced-motion`.

## Shells

- **Laptop/escritorio público:** header de una línea con cuatro mega-menús, footer editorial y CTA contextual.
- **Teléfono/tableta pública:** barra superior, idioma, salida/atrás, menú “Más” y navegación inferior fija de cinco destinos.
- **PWA instalada:** el mismo App Shell, safe areas, tema claro, idioma y sesión; sin aviso de instalación.
- **Auth:** composición independiente de dos columnas, sin navegación pública completa.
- **Cliente:** sidebar claro, topbar y navegación móvil compacta.
- **Asesor/profesional/editor/moderación/admin:** shell operativo claro y denso, entorno visible y contenido por tarea.

## Instalación y actualización

- El aviso propio aparece una vez por sesión tras 2,5 segundos, nunca en cada ruta.
- Android invoca `beforeinstallprompt` sólo después del botón de la persona.
- iPhone/iPad muestra instrucciones propias, sin imitar capturas de Apple.
- Una nueva versión se activa sólo con el botón “Actualizar”.
- Si un formulario contiene progreso, la actualización queda bloqueada y el valor se conserva.

## Regla editorial para contenido ausente

Si una ruta no tiene contenido aprobado, se muestra una sola experiencia útil con contexto y rutas alternativas. Nunca se generan múltiples tarjetas vacías, puntuaciones, precios, testimonios ni métricas ficticias.
