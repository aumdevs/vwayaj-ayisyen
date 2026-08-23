# Vwayaj Ayisyen

[Vwayaj Ayisyen](https://vwayajayisyen.com) es una plataforma web multilingüe
para la comunidad haitiana. Su versión promocionable actual es un directorio de
fuentes oficiales de Estados Unidos, presentado en lenguaje claro y con fechas,
límites y estado de revisión visibles.

Kreyòl haitiano es el idioma predeterminado; también están disponibles francés,
español, portugués e inglés.

## Estado del producto

| Superficie | Estado |
|---|---|
| Directorio oficial de Estados Unidos | listo para prelaunch |
| Contacto institucional y captación por email | listo; no admite documentos sensibles |
| About, FAQ y centro legal | listo |
| Chile, Brasil y México | fuera de promoción hasta revisión editorial |
| Comparador, recomendador, guías, cursos y servicios | noindex y fuera de navegación promocional |
| Pagos, documentos, IA, comunidad, citas y WhatsApp | desactivados por kill switch |

El proyecto no garantiza visas, entradas, trabajo, residencia ni resultados
administrativos y no sustituye a un profesional autorizado. El contenido
migratorio de alto impacto requiere revisión factual, legal y lingüística
humana antes de publicarse.

El informe de preparación y sus bloqueos están en
[`docs/48_PROMOTION_READINESS_2026-08-23.md`](docs/48_PROMOTION_READINESS_2026-08-23.md).

## Stack

- Next.js App Router, React y TypeScript
- Supabase Auth y PostgreSQL con RLS
- Vercel para hosting y previews
- PWA responsive con superficie offline controlada
- Vitest, Playwright, Axe, ESLint, Prettier y escaneo de secretos

## Principios

1. Kreyòl primero y lenguaje sencillo.
2. Fuentes primarias, fechas y límites cerca del contenido.
3. Nada de consejos o datos migratorios inventados.
4. Revisión humana para contenido de alto impacto.
5. Privacidad, mínimo de datos y seguridad por defecto.
6. Funciones incompletas ocultas de promoción e indexación.
7. Accesibilidad WCAG 2.2 AA como objetivo.

## Desarrollo local

Requisitos: Node 24 y pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm check:all
pnpm test:e2e
```

Para trabajar con la base local:

```bash
pnpm db:start
pnpm db:reset
pnpm db:lint
pnpm db:test
pnpm db:types
```

Copia sólo nombres y valores locales seguros desde `.env.example` a un archivo
`.env.local` ignorado. Nunca uses secretos de Production en Development o
Preview.

## Seguridad y licencia

El repositorio es público, pero no es open source. El código y la documentación
permanecen bajo la licencia propietaria de [`LICENSE`](LICENSE); no se autoriza
su uso, copia, despliegue o redistribución sin permiso escrito de Aum Prodz.

Reporta vulnerabilidades mediante **Security → Advisories → Report a
vulnerability**. No publiques secretos, documentos ni datos personales en
issues.

## Documentación principal

- [`00_START_HERE.md`](00_START_HERE.md): orden de lectura.
- [`docs/DECISIONS_IMPLEMENTED.md`](docs/DECISIONS_IMPLEMENTED.md): decisiones técnicas vigentes.
- [`docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`](docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md): gates externos.
- [`content/pilot/usa-launch-draft.json`](content/pilot/usa-launch-draft.json): dossier editorial no publicado.
