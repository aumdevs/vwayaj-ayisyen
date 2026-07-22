# Búsqueda y descubrimiento

## Alcance

Buscar sólo contenido público aprobado: países, guías, FAQ, glosario y cursos publicados. Comunidad privada tiene búsqueda separada autenticada; expedientes/CRM nunca entran a búsqueda global.

## Estrategia inicial

- Postgres full-text + trigram.
- Índices por locale.
- Diccionario/folding adecuado; kreyòl puede usar configuración simple con normalización.
- Prefijos y sinónimos editoriales para PIX, CPF, RUT, CuentaRUT, ITIN, SSN, CURP, RFC, SPEI, etc.
- Resultados por título/resumen/término; no body completo en respuesta.
- Filtros país/tipo/locale.
- Snippets saneados.

## Seguridad/privacidad

- Rate limit.
- Longitud 2–100.
- Normalizar Unicode.
- No SQL dinámico.
- No registrar consulta completa si puede contener PII; redacción/retención corta.
- No sugerencias basadas en búsquedas individuales sensibles.
- No indexar drafts, vencidos o traducciones no aprobadas.
- Despublicación elimina índice/caché.
- No exponer `tsvector`, IDs internos o metadatos editoriales.

## UX

- Campo grande, etiqueta visible.
- Corrección tolerante, no intrusiva.
- Resultados en idioma.
- “No encontramos información verificada” y rutas alternativas.
- Historial local opcional y claro, no servidor por defecto.
- Teclado/lector.
