# Suposiciones, decisiones y elementos abiertos

## Decisiones tomadas para construir

| Tema | Decisión |
|---|---|
| Slug técnico | `haitian-legal-travel-platform` |
| Marca | Pendiente; editable, no inventar marca definitiva |
| Repo | Privado en `aumdevs` |
| Supabase | Proyecto propio en `aumprodz Group` |
| Vercel | Proyecto en `aum prodz Group` |
| Idioma base | Kreyòl haitiano (`ht`) |
| Locales | `ht`, `fr`, `es`, `pt`, `en` |
| Stack | Next.js App Router + TypeScript + Supabase + Vercel |
| Pagos | Stripe Checkout |
| Recomendación país | Motor determinista, no IA |
| IA | RAG sólo contenido aprobado; apagada inicialmente |
| Video | Adaptador externo/manual; no infraestructura propia |
| Comunidad | Texto, sin DM ni adjuntos inicialmente |
| Documentos | Cuarentena + scanner privado; apagados sin scanner |
| Accesibilidad | WCAG 2.2 AA |
| Seguridad | ASVS L2 como objetivo, controles reforzados |
| Admin inicial | `admin@aumprodz.com`, password temporal externo |
| Países | Sólo USA, Chile, Brasil y México |

## Elementos que Codex no debe inventar

- nombre/logotipo;
- dominio;
- entidad legal/dirección/registro;
- número WhatsApp;
- precios;
- monedas definitivas;
- Stripe account/productos live;
- abogados/profesionales;
- políticas finales;
- contenido migratorio;
- salarios/costo de vida;
- estadísticas comunitarias;
- testimonios;
- proveedores de email/video/scanner/observabilidad;
- plazos de respuesta/servicio;
- retención legal;
- SLA.

Usar configuración vacía segura, placeholders explícitos y flags apagados.

## Preguntas de negocio que no bloquean el scaffold

1. ¿Dónde estará registrada la empresa?
2. ¿Cuál será el nombre comercial?
3. ¿Cuál es el dominio?
4. ¿Qué número recibirá WhatsApp?
5. ¿Qué paquetes/precios/monedas se venderán?
6. ¿Qué equipo atenderá cada país/idioma?
7. ¿Habrá acompañamiento presencial?
8. ¿Quién revisa legalmente cada país?
9. ¿Qué tiempos de respuesta y reembolso aplican?
10. ¿Qué proveedor SMTP/video/scanner/IA se contratará?

Codex debe dejar estas decisiones en `site_settings`/config y documentar bloqueos, no detener toda la construcción.

## ADR iniciales

### ADR-001 — Supabase y Vercel

Aceptado por requerimiento del propietario. Mitigar lock-in manteniendo SQL/migraciones, capas de proveedor y código portable.

### ADR-002 — Monolito modular Next.js

Adecuado para un equipo inicial y despliegue simple. Módulos por dominio y contratos internos. Extraer servicios sólo por necesidad de escala/seguridad.

### ADR-003 — RLS + DAL

Defensa en profundidad. Ninguna de las dos sustituye a la otra.

### ADR-004 — Feature flags de seguridad

Funciones con proveedor o control incompleto permanecen apagadas. No hay fallback inseguro.

### ADR-005 — Contenido estructurado

Evitar CMS de HTML libre. Facilita accesibilidad, traducción, auditoría y sanitización.

### ADR-006 — No documentos en IA

El asistente no necesita expedientes para cumplir su objetivo; excluirlos reduce riesgo.

### ADR-007 — Sin DMs comunitarios

Reduce acoso, fraude y moderación. Reconsiderar tras evidencia y threat model nuevo.
