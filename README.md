# Vwayaj Ayisyen

Aplicación y handoff de una plataforma web multilingüe construida con Next.js, Supabase, Vercel, GitHub, PWA, CRM, expedientes, cursos, comunidad privada y asistente de inteligencia artificial.

## Propósito del producto

La plataforma orientará y acompañará a personas haitianas interesadas en viajar, estudiar, trabajar, vivir o establecerse legalmente en:

- Estados Unidos
- Chile
- Brasil
- México

El producto combinará información oficial, experiencia práctica, realidad comunitaria, advertencias, comparación de países, evaluación de perfil y servicios pagados. No garantizará visas, entradas, trabajo, residencia ni resultados administrativos.

## Stack objetivo

- Next.js con App Router y TypeScript
- Node.js LTS y pnpm
- Supabase Auth, Postgres, Row Level Security, Storage, Realtime, Edge Functions y Cron
- Vercel para hosting, funciones, previews, observabilidad y protección
- GitHub público para control de versiones y CI, con licencia propietaria de Aum Prodz
- Stripe Checkout para pagos
- OpenAI u otro proveedor configurable para el asistente, sin acceso predeterminado a documentos privados
- PWA instalable, accesible y optimizada para teléfonos económicos y conexiones lentas

## Principios

1. Kreyòl haitiano como idioma predeterminado.
2. Fácil de usar para personas mayores o con poca experiencia digital.
3. Seguridad y privacidad por diseño.
4. RLS en todas las tablas expuestas.
5. MFA obligatorio para cuentas privilegiadas.
6. Información legal con fuentes, fechas y revisión humana.
7. No almacenar más datos sensibles de los necesarios.
8. Nada de secretos en el repositorio.
9. No publicar contenido generado automáticamente sin revisión.
10. Diseño premium sin sacrificar simplicidad.

## Licencia y seguridad

El repositorio es públicamente visible, pero no es open source. El código y la
documentación permanecen bajo la licencia propietaria de `LICENSE`; no se
autoriza su uso, copia, despliegue o redistribución sin permiso escrito de Aum
Prodz.

Los hallazgos de seguridad deben enviarse mediante **Security > Advisories >
Report a vulnerability**. No publiques secretos ni datos personales en issues.

Consulta `00_START_HERE.md` para el orden de lectura.

## Desarrollo local

Requisitos: Node `24.18.0`, pnpm `11.15.0`, Supabase CLI y un runtime Docker compatible.

```bash
pnpm install --frozen-lockfile
pnpm db:start
pnpm db:reset
pnpm db:lint
pnpm db:test
pnpm db:types
pnpm check:all
pnpm test:e2e
```

Copia únicamente nombres y valores locales seguros desde `.env.example` a un archivo `.env.local` ignorado. Nunca uses secretos de producción en desarrollo o preview.

## Estado seguro por defecto

- Kreyòl es el idioma inicial; también existen francés, español, portugués e inglés.
- Las páginas de país leen sólo la vista RLS de contenido publicado y revisado.
- Comparador y cuestionario no muestran puntuaciones hasta que reglas y fuentes estén validadas.
- Pagos, documentos, IA, comunidad, citas, intake, WhatsApp, cursos y portal profesional usan kill switches cerrados.
- Vwayaj Ayisyen es el nombre oficial y `https://vwayajayisyen.com` es la URL pública oficial.
- Consulta `docs/DECISIONS_IMPLEMENTED.md` y `operations/CODEX_FINAL_REPORT.md` para el estado verificado y los bloqueos.

## Cómo usar este handoff

1. Abrir `00_START_HERE.md`.
2. Dar a Codex `CODEX_MASTER_PROMPT.md` y el ZIP completo.
3. Mantener todas las credenciales fuera del repositorio y de los logs de CI.
4. Exigir que Codex complete `operations/CODEX_FINAL_REPORT_TEMPLATE.md`.
5. No activar pagos, documentos, IA, comunidad, citas o intake hasta cumplir sus gates.

`CODEX_ALL_IN_ONE.md` ofrece una lectura consolidada. `FILE_INDEX.md` explica la estructura completa.
