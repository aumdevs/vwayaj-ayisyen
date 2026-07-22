# haitian-legal-travel-platform

Paquete de especificación y handoff para que Codex construya una plataforma web completa con Next.js, Supabase, Vercel, GitHub, Stripe, PWA, CRM, expedientes, cursos, comunidad privada y asistente de inteligencia artificial.

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
- GitHub privado para control de versiones y CI
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

Consulta `00_START_HERE.md` para el orden de lectura.

## Cómo usar este handoff

1. Abrir `00_START_HERE.md`.
2. Dar a Codex `CODEX_MASTER_PROMPT.md` y el ZIP completo.
3. Mantener el archivo privado de credenciales fuera del repositorio.
4. Exigir que Codex complete `operations/CODEX_FINAL_REPORT_TEMPLATE.md`.
5. No activar pagos, documentos, IA, comunidad, citas o intake hasta cumplir sus gates.

`CODEX_ALL_IN_ONE.md` ofrece una lectura consolidada. `FILE_INDEX.md` explica la estructura completa.
