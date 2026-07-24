# QA responsive del rediseño

Fecha: 2026-07-23

Resultado: **PASS**

## Matriz verificada

| Viewport | Perfil | Overflow horizontal |
|---:|---|---|
| 360 × 800 | móvil pequeño | no |
| 390 × 844 | móvil principal | no |
| 430 × 932 | móvil grande | no |
| 768 × 1024 | tableta vertical | no |
| 1024 × 768 | tableta horizontal | no |
| 1280 × 800 | portátil | no |
| 1440 × 900 | escritorio | no |
| 1728 × 1117 | escritorio grande | no |

## Evidencia

- 35 capturas finales web/PWA en `docs/screenshots/pwa-acceptance/`.
- Reporte final en `docs/screenshots/pwa-acceptance/report.json`: 35 capturas,
  0 errores de navegador y 0 desbordamientos.
- Screenshots reales del manifest en `public/screenshots/pwa/`.
- 42 capturas revisadas en `docs/screenshots/redesign/after/`.
- Baseline previo en `docs/screenshots/redesign/before/`.
- Reporte automatizado en `docs/screenshots/redesign/after/report.json`.
- Resultado del reporte: 42 capturas, 0 fallos y 0 desbordamientos.
- Preview final revisado en 26 combinaciones públicas.
- Reporte del Preview en `docs/screenshots/redesign/preview/report.json`.
- Resultado del Preview: 26 capturas, 0 errores de consola y 0 desbordamientos.

Las capturas privadas se generaron con datos vacíos mediante un arnés exclusivo de desarrollo. El arnés fue retirado antes del commit y no forma parte de la aplicación desplegable.

## Superficies revisadas

- inicio;
- países y país;
- comparador y recomendador;
- servicios y guías;
- login;
- portal, documentos y expediente;
- asesor, administración, tabla administrativa y editor;
- 404 y error.
- cuatro mega-menús de escritorio;
- App Shell móvil y tableta táctil en ambas orientaciones;
- menú “Más”, instalación Android, instrucciones iOS, offline y actualización;
- modo standalone e invitación una vez por sesión.

## Correcciones realizadas durante QA

- se fijó el posicionamiento CSS de imágenes `fill` para funcionar con la CSP estricta;
- `style-src-attr` autoriza únicamente los hashes exactos de `fill` de Next/Image
  y del contenedor flexible de Turnstile, sin habilitar `unsafe-inline`;
- se corrigió el recorte del hero de país;
- se apiló correctamente la composición del estado de error;
- se verificó la marca completa dentro de los shells privados;
- se corrigió el control visual del selector de comparación;
- se reemplazó el drawer público móvil por App Bar, menú “Más” y navegación inferior;
- se mantuvo App Shell en tableta táctil horizontal;
- se validaron safe areas, teclado, contenido no cubierto y modo standalone.

## Observaciones

El pequeño cuadro visible en la esquina inferior izquierda de algunas capturas locales pertenece al indicador de desarrollo de Next.js afectado por la CSP. No es parte del producto y no aparece en el build de producción.
