# Informe Lighthouse

Fecha: 2026-07-23

Commit auditado: `40d58a8`

Preview auditado:
`https://vwayaj-ayisyen-1hw65xw65-aum-prodz-group.vercel.app/ht`

## Método

- Lighthouse `13.4.1`.
- Chrome Headless `150`.
- Perfil móvil predeterminado y preset de escritorio.
- Categorías: Performance, Accessibility, Best Practices y SEO.
- Acceso al Preview mediante un bypass de automatización temporal, sin desactivar la protección de Vercel.
- Los headers sensibles fueron reemplazados por `[REDACTED]` en los reportes y el repositorio quedó sin coincidencias del secreto.

## Resultado del Preview

| Perfil | Performance | Accessibility | Best Practices | SEO bruto | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Móvil | 96 | 100 | 100 | 69 | 1,29 s | 2,64 s | 84 ms | 0 | 1,59 s |
| Escritorio | 99 | 100 | 100 | 69 | 0,38 s | 0,62 s | 0 ms | 0 | 1,22 s |

Performance, Accessibility y Best Practices superan los objetivos de producción.
La detección de la imagen LCP pasa los tres controles de Lighthouse: prioridad alta,
descubrimiento en el documento inicial y carga no diferida.

El LCP móvil quedó 0,14 s por encima del objetivo orientativo de 2,5 s bajo la
simulación móvil de Lighthouse. La puntuación Performance sigue siendo 96 y no
hay desplazamiento de layout.

## Interpretación de SEO

El único control SEO que falla en el Preview es `is-crawlable`. Es el resultado
esperado porque:

- la aplicación emite `noindex` en entornos no aprobados para indexación;
- Vercel añade `x-robots-tag: noindex` a los Preview;
- `robots.txt` bloquea el rastreo mientras la indexación está desactivada.

No se debilitó esa protección para mejorar artificialmente la puntuación.

Se ejecutó además el mismo build en modo producción, con indexación habilitada y
sin publicar ese cambio. El resultado SEO fue **100/100**, con:

- `<meta name="robots" content="index, follow">`;
- rastreo público permitido;
- áreas privadas y `/api/` excluidas;
- sitemap apuntando a `https://vwayaj-ayisyen.vercel.app/sitemap.xml`;
- cero auditorías SEO fallidas.

La medición SEO sobre la URL pública debe repetirse cuando el propietario apruebe
la indexación del despliegue final.

## Archivos

- `docs/lighthouse/preview-home-mobile.report.html`
- `docs/lighthouse/preview-home-mobile.report.json`
- `docs/lighthouse/preview-home-desktop.report.html`
- `docs/lighthouse/preview-home-desktop.report.json`
- `docs/lighthouse/production-mode-home-seo.report.html`
- `docs/lighthouse/production-mode-home-seo.report.json`
