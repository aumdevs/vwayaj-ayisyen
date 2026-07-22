# Dependencias y cadena de suministro

## Selección

Codex debe verificar la versión estable compatible al ejecutar y fijarla en lockfile. No usar `latest` como versión persistente.

Preferencias:

- API nativa/plataforma antes que paquete;
- proyecto mantenido y con política de seguridad;
- licencia compatible;
- bundle razonable;
- soporte ESM/TypeScript;
- sin postinstall innecesario;
- sin acceso a red/sistema fuera de propósito;
- comunidad/descargas no sustituyen auditoría.

## Categorías previstas

### Núcleo

- Next.js / React;
- TypeScript;
- Tailwind;
- Supabase JS/SSR;
- Zod.

### UI

- Radix/shadcn como fuente de componentes, no dependencia ciega;
- React Hook Form;
- iconos SVG internos de librería conocida.

### Pruebas

- Vitest;
- Testing Library;
- Playwright;
- axe-core.

### Pagos/IA

- SDK oficial Stripe;
- AI SDK/OpenAI oficial según decisión.

### Utilidades

Añadir sólo tras justificar. Evitar paquetes pequeños para tareas triviales.

## pnpm

- Fijar `packageManager`.
- Lockfile obligatorio.
- `minimumReleaseAge`/protecciones de pnpm disponibles se evalúan y documentan.
- Revisar scripts de instalación.
- Allowlist explícita de paquetes que pueden ejecutar build scripts.
- No usar `--ignore-scripts=false` indiscriminadamente en CI.
- Store/cache de CI sin secretos.

## CI

- Dependabot.
- Dependency Review.
- CodeQL.
- secret scan.
- `pnpm audit` como señal; no única evaluación.
- SBOM en releases.
- Licencias.
- Revisión de cambios transitivos grandes.
- Pin de GitHub Actions por SHA tras bootstrap.

## Actualización

- Parches de seguridad críticos acelerados.
- Renovación mensual.
- Major upgrades en PR dedicado con pruebas.
- Node/Next/Supabase SDK según soporte oficial.
- Registrar excepciones con fecha de expiración.

## Prohibiciones

- Paquetes abandonados para auth/crypto/sanitización.
- Criptografía casera.
- `eval`/code generation.
- CDN de JS en producción.
- Librerías que envían telemetría no documentada.
- Copiar código sin licencia.
