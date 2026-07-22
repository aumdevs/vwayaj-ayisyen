# Diseño, interfaz y accesibilidad

## Dirección visual

El producto debe sentirse premium, confiable y sereno, no como una landing agresiva.

### Paleta provisional

Verificar contraste antes de usar.

- Ink/Navy: `#0B1F33`
- Deep Blue: `#155E8A`
- Warm Ivory: `#FAF7F0`
- White: `#FFFFFF`
- Gold accent: `#B7791F`
- Success: `#176B4D`
- Danger: `#A12622`
- Muted text: `#526273`

La marca es editable desde settings. Evitar usar la bandera haitiana como decoración dominante.

### Tipografía

- Cuerpo: fuente altamente legible, preferiblemente Atkinson Hyperlegible o una alternativa compatible.
- Encabezados: Manrope o equivalente sobria.
- Servir con `next/font` para evitar trackers.
- Cuerpo base 18 px en artículos.
- Line-height 1.55–1.75.
- Longitud máxima 65–75 caracteres.

### Espaciado

- Escala de 4/8 px.
- Mucho espacio en blanco.
- Cards con contenido breve.
- No más de una acción principal por bloque.

## Componentes esenciales

- Header.
- Language switcher.
- Country card.
- Information-type badge.
- Source list.
- Updated-date banner.
- Alert.
- Step list.
- Cost table.
- Comparison matrix.
- Quiz step.
- Package card.
- WhatsApp CTA.
- Breadcrumb.
- Audio/read control.
- Empty state.
- Skeleton.
- Error state.
- Consent dialog.
- Secure document uploader.
- Status timeline.
- Accessible data table.
- Confirmation dialog.
- Toast con alternativa persistente para errores importantes.

## Requisitos WCAG 2.2 AA

- HTML semántico.
- Un `h1` por página.
- Orden lógico de headings.
- Skip link.
- Foco visible y no cubierto.
- Teclado completo.
- Labels explícitas.
- Errores anunciados con `aria-live`.
- Alternativas de texto.
- Subtítulos/transcripción.
- No tiempo límite sin extensión.
- No CAPTCHA visual como única opción.
- Reflow a 320 CSS px.
- Zoom hasta 200%.
- Contraste AA.
- Estados no dependen sólo de color.
- Target táctil suficiente.
- Ayuda consistente.
- Autenticación accesible.

## Adultos mayores y baja alfabetización digital

- Verbos concretos: “Ver Chile”, no “Explorar”.
- Frases cortas.
- Resumen antes del detalle.
- Icono acompañado por texto.
- Confirmar acciones destructivas.
- Mostrar progreso.
- Guardar borradores.
- Teléfono/WhatsApp visibles.
- Evitar carruseles automáticos.
- No esconder información crucial en tooltips.
- Evitar tablas horizontales imposibles en móvil; usar cards comparativas.

## Pruebas

- axe-core.
- Lighthouse.
- Playwright keyboard flows.
- VoiceOver Safari.
- NVDA o equivalente.
- Zoom.
- Alto contraste.
- Reduced motion.
- Dispositivo Android de gama baja o emulación.
- Pruebas con usuarios haitianos mayores antes de lanzamiento.
