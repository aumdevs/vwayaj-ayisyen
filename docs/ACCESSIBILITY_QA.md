# QA de accesibilidad

Fecha: 2026-07-23

Resultado: **PASS para las superficies ejecutadas**

## Evidencia automatizada

Comando:

```bash
pnpm test:e2e
```

Resultado final:

- 20 de 20 pruebas Playwright aprobadas;
- Chromium de escritorio y emulación móvil;
- Axe 4.12 sin violaciones `serious` ni `critical` en la home;
- navegación móvil operable con teclado;
- cierre del drawer con `Escape`;
- foco inicial dentro del drawer y devolución al botón de apertura;
- ausencia total del control de audio heredado.

Lighthouse Accessibility obtuvo **100/100** tanto en el perfil móvil como en
escritorio sobre el Preview final.

## Revisión de implementación

- landmarks y headings con jerarquía;
- enlace para saltar al contenido;
- labels visibles en formularios;
- nombres accesibles en botones sólo-icono;
- foco visible de alto contraste;
- targets táctiles de al menos 44 px;
- `aria-current` en navegación;
- `aria-modal` y trampa de foco en el drawer;
- textos alternativos editoriales;
- soporte para `prefers-reduced-motion`;
- estados dinámicos con roles `status` o `alert` según corresponda.

## Seguridad y accesibilidad privada

Las rutas privadas sin sesión redirigen al login y no filtran contenido. Las políticas RLS se validaron localmente con 23 pruebas pgTAP aprobadas. No se usaron cuentas productivas ni datos reales para la revisión visual.

## Alcance pendiente del propietario

Antes de activar contenido definitivo debe realizarse revisión humana de kreyòl, textos legales y contenido migratorio publicado. Esa revisión editorial no puede sustituirse con pruebas de interfaz.
