# QA responsive de las guías 2026

Fecha: 2026-08-25.

Resultado: **PASS**

## Matriz verificada

| Viewport | Perfil | Overflow horizontal |
|---:|---|---|
| 390 × 844 | teléfono | no |
| 768 × 1024 | tableta vertical | no |
| 1024 × 768 | tableta horizontal | no |
| 1440 × 900 | escritorio | no |

Las pruebas E2E también recorren la experiencia pública en perfiles de
escritorio y iPhone 13.

## Evidencia

- 25 capturas en `docs/screenshots/pwa-acceptance-2026-08-25/`;
- reporte en `docs/screenshots/pwa-acceptance-2026-08-25/report.json`;
- 0 errores del navegador;
- 0 desbordamientos horizontales;
- nuevas capturas de manifest en `public/screenshots/pwa/`.

## Superficies revisadas

- inicio, selector de país y menú de destinos;
- guías de Estados Unidos, Chile, Brasil y México;
- tarjetas de vías legales, preparación desde Haití y vida después de llegar;
- advertencias sobre movilidad irregular;
- directorios de doce fuentes oficiales por país;
- FAQ, contacto y documentos legales;
- barra móvil, navegación inferior, instalación Android/iOS, actualización y
  estado sin conexión.

## Correcciones realizadas durante QA

- se corrigieron los iconos de trabajo, familia, estudios, documentos, salud y
  protección para que correspondan a cada tarjeta;
- se comprobó la jerarquía visual completa de una guía en escritorio y teléfono;
- se validaron los cuatro países sin errores de consola ni contenido duplicado;
- se confirmó que la navegación móvil no tapa la llamada principal ni crea
  desplazamiento horizontal.
