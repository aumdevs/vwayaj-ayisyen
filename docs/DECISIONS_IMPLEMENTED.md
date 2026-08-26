# Decisiones implementadas

Fecha de corte: 2026-08-25.

## Producto público

- Vwayaj Ayisyen funciona exclusivamente como sitio informativo y PWA pública.
- No existen cuentas, inicio de sesión, paneles, roles, pagos, formularios,
  carga de documentos, expedientes, citas, chat, IA ni APIs de negocio.
- Kreyòl haitiano es el idioma predeterminado. También se publican francés,
  español, portugués e inglés.
- El alcance editorial incluye Estados Unidos, Chile, Brasil y México.
- Cada país presenta una guía práctica y doce enlaces de autoridades o servicios
  públicos responsables.
- La revisión visible de las guías es del 25 de agosto de 2026.

## Contenido

- Se enlazan embajadas, consulados, inmigración, identidad, trabajo, estudios,
  salud y protección según el país.
- Se explican las vías vigentes, la preparación desde Haití y la vida después de
  llegar con fecha de revisión y enlace a la autoridad responsable.
- No se inventan requisitos, precios, plazos, rutas, testimonios ni garantías.
- Cada salida externa identifica al organismo, explica para qué sirve y abre la
  fuente oficial en una pestaña nueva.
- Los corredores irregulares se describen sólo a nivel preventivo, sin contactos,
  transporte, cruces ni instrucciones para evadir controles.
- El sitio recuerda verificar siempre la página de la autoridad antes de
  solicitar, pagar, entregar documentos o viajar.

## Experiencia

- Diseño editorial premium con superficies específicas para escritorio,
  teléfono, tableta y modo instalado.
- Navegación pública superior e inferior sin accesos privados.
- PWA instalable con caché limitada a páginas y recursos públicos.
- Metadatos, sitemap y manifest incluyen únicamente rutas vigentes.
- Accesibilidad, contraste, navegación por teclado, reducción de movimiento y
  desbordamiento se verifican de forma automatizada.

## Operación

- La aplicación sólo consume dos variables públicas: URL del sitio e
  indexación.
- El lanzamiento sale de `main` después de formato, lint, TypeScript, pruebas,
  build, auditoría y escaneo de secretos.
- La reversión consiste en restaurar el deployment anterior desde Vercel y
  revertir el commit de lanzamiento.
