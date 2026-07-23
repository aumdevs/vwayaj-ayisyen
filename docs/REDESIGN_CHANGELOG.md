# Changelog del rediseño premium

Fecha: 2026-07-23

Rama: `redesign/premium-ui-v2`

## Reemplazado

- sistema visual completo, tipografía y tokens;
- header, navegación móvil, selector de idioma y footer;
- home y narrativa editorial;
- índice y detalle de países;
- comparador, recomendador, servicios y guías;
- páginas About, FAQ, contacto, cursos, búsqueda y legal;
- shell de autenticación;
- shell de cliente y navegación móvil privada;
- shells operativos para asesor, profesional, editorial, moderación y administración;
- estados vacíos, 404, offline y error.

## Conservado

- App Router y rutas localizadas;
- acciones y flujos Supabase Auth;
- MFA y requisito AAL2;
- `requireViewer`, roles y redirects server-side;
- RLS, migraciones, Storage y tipos generados;
- Stripe, uploads, citas, WhatsApp e IA detrás de sus gates existentes;
- CSP con nonce, headers de seguridad y caché privada;
- PWA, sitemap, robots y estructura SEO existente.

## Eliminado

- módulo heredado de reproducción de página;
- implementación, copias y controles asociados en cinco idiomas;
- navegación pública compartida con Auth y áreas privadas;
- repetición de placeholders técnicos;
- puntuaciones, precios o métricas ficticias.

## Activos editoriales

Se generaron cinco imágenes originales mediante el generador de imágenes integrado:

1. comunidad haitiana preparando una decisión de viaje;
2. escena urbana para Estados Unidos;
3. escena urbana para Chile;
4. escena urbana para Brasil;
5. escena urbana para México.

Los prompts pidieron fotografía editorial realista, personas haitianas tratadas con dignidad, luz natural, composición adaptable y ausencia de texto, logos, banderas dominantes o afirmaciones.

## Seguridad verificada

- 26 pruebas unitarias aprobadas;
- 20 pruebas E2E aprobadas;
- 23 invariantes/RLS pgTAP aprobadas;
- lint de base de datos sin hallazgos;
- integraciones riesgosas continúan fail-closed;
- ningún secreto productivo se incorporó al cliente ni al repositorio.

## Evidencia relacionada

- `docs/REDESIGN_AUDIT.md`
- `docs/DESIGN_DIRECTION.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/SCREEN_INVENTORY.md`
- `docs/RESPONSIVE_QA.md`
- `docs/ACCESSIBILITY_QA.md`
- `docs/VERIFIED_ROUTES.md`
- `docs/FEATURE_FLAGS.md`
- `docs/REDESIGN_BLOCKERS.md`
- `docs/LIGHTHOUSE_REPORT.md`
