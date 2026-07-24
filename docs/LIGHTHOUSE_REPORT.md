# Informe Lighthouse

Fecha: 2026-07-23

Build auditado: rama `agent/legal-center-production`, después del App Shell PWA.

Origen auditado: build final de producción servido localmente con `next start`.

## Método

- Lighthouse `13.4.1`.
- Chrome Headless `150`.
- Perfil móvil predeterminado y preset de escritorio.
- Categorías: Performance, Accessibility, Best Practices y SEO.
- Sin bypass, cuenta productiva, datos reales ni secretos.
- Los archivos conservan su nombre histórico `preview-home-*` para no romper el
  índice/integridad del paquete, pero su contenido corresponde al build final local.

## Resultado del Preview

| Perfil | Performance | Accessibility | Best Practices | SEO bruto | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Móvil | 96 | 100 | 100 | 69 | 1,24 s | 2,74 s | 52 ms | 0 | 1,24 s |
| Escritorio | 100 | 100 | 100 | 69 | 0,33 s | 0,69 s | 0 ms | 0 | 0,57 s |

Performance, Accessibility y Best Practices superan los objetivos de producción.
La detección de la imagen LCP pasa los tres controles de Lighthouse: prioridad alta,
descubrimiento en el documento inicial y carga no diferida.

El LCP móvil quedó 0,24 s por encima del objetivo orientativo de 2,5 s en esta
simulación de laboratorio. La puntuación Performance es 96, TBT 52 ms y CLS 0.
La trazabilidad de Lighthouse confirma que la imagen LCP tiene
`fetchpriority=high`, se descubre en el documento inicial y no usa carga diferida.
El resultado satisface el umbral de Performance >90, pero LCP debe seguir
observándose con datos de campo después del despliegue.

## Interpretación de SEO

El único control SEO que falla en este build es `is-crawlable`. Es el resultado
esperado porque:

- la aplicación emite `noindex` en entornos no aprobados para indexación;
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
