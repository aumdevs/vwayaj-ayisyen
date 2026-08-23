# Preparación para promoción — 2026-08-23

## Resultado

La superficie pública queda preparada como **prelanzamiento informativo**, no
como servicio migratorio ni marketplace. El alcance promocionable es el
directorio de fuentes oficiales de Estados Unidos, contacto institucional,
información del proyecto, FAQ y documentos legales publicados.

No se debe anunciar todavía un comparador funcional, recomendación de país,
asesoría, paquetes, cursos ni guías migratorias completas.

## País y contenido piloto

- País: `usa`.
- Criterio: primer país consistente en configuración, contrato API y QA. La
  elección es reversible antes de publicar contenido editorial completo.
- Locales del dossier: Kreyòl (`ht`) e inglés (`en`).
- Estructura: las 15 secciones del modelo editorial.
- Fuentes públicas verificadas: myUSCIS, directorio de visas del Departamento
  de Estado, I-94 de CBP, representación legal de EOIR y prevención de estafas
  de FTC.
- Fecha de comprobación de enlaces: 2026-08-23.
- Único contenido autorizado públicamente: directorio y descripción neutral de
  la función de cada fuente.
- Archivo de trabajo: `content/pilot/usa-launch-draft.json`.

## Superficie promocionable

| Ruta | Estado | Indexable cuando se autorice |
|---|---|---|
| `/{locale}` | lista | sí |
| `/{locale}/countries` | lista; sólo muestra el piloto | sí |
| `/{locale}/countries/usa` | lista como directorio oficial | sí |
| `/{locale}/about` | lista | sí |
| `/{locale}/faq` | lista | sí |
| `/{locale}/contact` | lista; correos activos, sin documentos | sí |
| legales publicados | lista; ES/PT son las versiones oficiales | sí sólo en ES/PT; otros locales usan canonical a ES |
| compare, assessment, guides, services, courses, search | incompleta | no; fuera de sitemap y navegación promocional |
| Chile, Brasil y México | sin contenido | no; fuera de sitemap y navegación promocional |

## SEO implementado

- canonical y hreflang siguen la ruta real y agregan `x-default`.
- Las páginas no promocionables reciben `noindex` incluso si la indexación
  global se activa.
- Sitemap reducido a rutas promocionables.
- Robots permite rastreo durante prelaunch para que `noindex` sea visible.
- Metadata localizada, Open Graph de 1200×630, Twitter card y JSON-LD de
  Organization, WebSite y breadcrumbs.

`NEXT_PUBLIC_ALLOW_INDEXING` debe permanecer en `false` hasta completar las
aprobaciones externas de esta lista.

## Captación y analítica

- La CTA ya no promete hablar con un asesor. Invita a recibir novedades.
- La captación usa `mailto:promo@vwayajayisyen.com`; no agrega una base de datos
  ni un formulario de datos personales sin consentimiento y retención aprobados.
- Los tres correos oficiales están visibles y advierten no enviar pasaportes,
  credenciales ni expedientes.
- La analítica mínima está implementada, sin identificadores ni query strings,
  y desactivada por ausencia de endpoint. Activarla exige proveedor/collector,
  DPA, base jurídica, región y retención aprobados.

## Aprobaciones externas pendientes

1. Nombrar revisor factual, revisor migratorio estadounidense autorizado y
   revisor humano de Kreyòl.
2. Completar razón social pública, CNPJ y dirección comercial antes de vender o
   facturar.
3. Definir alcance profesional; el proyecto no puede llamarse asesoría mientras
   esto siga pendiente.
4. Aprobar política/operación de analítica antes de configurar el endpoint.
5. Elegir monitoreo operativo con scrub de PII, alertas y retención.
6. Confirmar horario, idiomas, escalamiento y SLA de soporte antes de prometerlo.
7. Ejecutar deploy de esta rama, revisar visualmente Production y entonces
   decidir si se activa `NEXT_PUBLIC_ALLOW_INDEXING=true`.
8. Actualizar el campo Website del repositorio GitHub al dominio oficial; la CLI
   de GitHub no está disponible en este entorno.

## Criterio de salida para promoción

Se puede promocionar como **directorio informativo en prelaunch** cuando CI,
E2E, accesibilidad y revisión visual de Production estén aprobados. Para
promocionar guías, recomendaciones o servicios deben cerrarse además los gates
editoriales, profesionales, legales y comerciales correspondientes.
