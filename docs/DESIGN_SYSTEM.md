# Sistema de diseño premium

Fecha: 2026-07-22

## Tokens

Los tokens viven en `src/app/globals.css` y usan nombres semánticos.

| Token | Valor base | Uso |
|---|---:|---|
| `--ink-950` | `#0B1324` | títulos, footer y shell operativo |
| `--ink-800` | `#1C2A3A` | texto fuerte |
| `--ink-600` | `#526170` | texto secundario |
| `--canvas` | `#F6F7FB` | fondo de producto |
| `--warm-canvas` | `#FBF7F0` | secciones editoriales |
| `--surface` | `#FFFFFF` | tarjetas y formularios |
| `--border` | `#E3E7EE` | divisores |
| `--brand-600` | `#3157D9` | acción principal |
| `--brand-700` | `#2647B8` | hover/activo |
| `--aqua-600` | `#0D9488` | confianza y orientación |
| `--coral-500` | `#E86B58` | acento humano |
| `--gold-500` | `#D6A13A` | detalle premium |

## Escala

- contenedor público: 1320 px;
- lectura: 760 px;
- gutters: 20 px móvil, 36 px tableta, 64 px escritorio;
- botones e inputs: radio 13 px;
- tarjetas: radio 20 px;
- editoriales: radio 28 px;
- target interactivo mínimo: 44 px.

## Componentes

### Navegación

- `SiteHeader`
- `MobileNavigationDrawer`
- `LanguageSwitcher`
- `SiteFooter`
- `ContextualAdvisorCTA`

### Editorial y marketing

- `HeroSection`
- `SectionHeading`
- `CountryCard`
- `EditorialCard`
- `PackageCard`
- `TrustStrip`
- `CountryQuickFacts`

### Producto y operación

- `AppSidebar` / `AppTopbar` integrados en `PrivateAreaShell`
- `MetricCard`
- `Timeline`
- `DataTable`
- `StatusBadge`
- `EmptyState`
- `FeatureUnavailable` para estados privados/configurados, nunca para repetir placeholders públicos

### Formularios

- campos con labels reales;
- ayuda sólo cuando aporta;
- error junto al campo y resumen accesible;
- password visible/oculta;
- requisitos al enfocar o escribir;
- loading y disabled distinguibles sin depender sólo del color.

## Estados

Cada superficie contempla loading, vacío, primera vez, permiso insuficiente, sesión expirada, error, mantenimiento y éxito. Los estados públicos no exponen códigos internos; el ID de incidente sólo aparece cuando existe uno real.

## Accesibilidad

- landmarks y jerarquía semántica;
- foco de 3 px con offset;
- drawer con Escape, bloqueo de scroll y retorno de foco;
- overlays con `aria-modal`;
- `aria-live` sólo en feedback dinámico;
- imágenes con alt contextual;
- tablas con caption y encabezados;
- reduced motion y zoom 200–400 %.
