# Internacionalización y flujo de traducción

## Locales

| Código | Idioma |
|---|---|
| ht | Kreyòl ayisyen — predeterminado |
| fr | Français |
| es | Español |
| pt | Português |
| en | English |

## Arquitectura

- Prefijo de locale en URL.
- Detección inicial mediante preferencia guardada, no geolocalización obligatoria.
- Cookie no sensible para preferencia.
- `hreflang` y canonical.
- Diccionarios de interfaz versionados.
- Contenido editorial en tablas de traducción.
- Fechas, monedas y números mediante `Intl`.
- Base de datos UTC; mostrar zona local.

## Reglas

- Kreyòl requerido para publicación.
- No usar francés como sustituto silencioso.
- Si falta traducción, mostrar idioma disponible con aviso.
- Contenido legal de otro idioma no se publica como traducción automática definitiva.
- Términos como PIX, RUT, CPF, SSN, ITIN, CURP, RFC, CLABE y SPEI se mantienen y se explican.
- Lectura de página usa la voz disponible del navegador; si no existe voz en kreyòl, informar.

## Estados de traducción

- `missing`
- `machine_draft`
- `human_draft`
- `in_review`
- `approved`
- `outdated`

Cuando cambia el original, traducciones aprobadas pasan a `outdated`.

## Calidad

Cada traducción registra:

- Traductor.
- Revisor.
- Fecha.
- Versión del contenido original.
- Notas terminológicas.

## Glosario

Tabla central con:

- Término original.
- País.
- Categoría.
- Definición simple en cada idioma.
- Fuente.
- Fecha.
- Sinónimos y términos que no deben usarse.

## Copy inicial

No publicar textos extensos en kreyòl sin revisión humana competente. Codex puede crear claves y borradores claramente marcados.
