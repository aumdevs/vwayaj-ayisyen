# Guías prácticas de migración 2026

Fecha: 2026-08-25.

## Problema resuelto

La web ofrecía fuentes oficiales, pero no explicaba de forma suficientemente
directa qué opciones tiene una persona haitiana, qué debe preparar desde Haití
ni qué necesita hacer al llegar al país elegido.

## Alcance entregado

- guías completas para Estados Unidos, Chile, Brasil y México;
- explicaciones en kreyòl haitiano, francés, español, portugués e inglés;
- situación real de entrada en 2026 y avisos visibles cuando una vía está
  cerrada, limitada o disponible;
- vías de trabajo, familia, estudios, visita y protección;
- preparación desde Haití y trámites esenciales después de la llegada;
- empleo, identificación, salud, educación y protección en cada destino;
- explicación de corredores irregulares y riesgos sin contactos, transportes,
  cruces ni instrucciones para evadir controles;
- 48 fuentes oficiales con fecha visible de revisión;
- diseño editorial premium, adaptable a escritorio y teléfono.

## Decisiones importantes de contenido

- Estados Unidos informa la suspensión de emisión de visas para nacionales
  haitianos vigente desde el 1 de enero de 2026 y sus excepciones limitadas.
- Se aclara que CHNV terminó y que TPS Haití ya no es una vía disponible.
- Chile presenta residencia por trabajo, estudios y reunión familiar solicitada
  desde el exterior, además de refugio cuando existe necesidad real de protección.
- Brasil aclara que la antigua vía humanitaria específica para Haití no quedó
  abierta automáticamente en 2026 y separa las alternativas ordinarias.
- México explica autorización NUT, estudios, visita y protección mediante COMAR.
- Ninguna ruta descrita garantiza visa, admisión, residencia ni asilo.

## Fuentes revisadas

La investigación prioriza autoridades responsables: Department of State,
USCIS, DHS, DOJ, Servicio Nacional de Migraciones de Chile, ChileAtiende,
Ministério da Justiça e Segurança Pública de Brasil, Polícia Federal,
Ministério das Relações Exteriores, Embajada de México en Haití, INM, COMAR,
SEP y la Dirección de Inmigración y Emigración de Haití.

## Seguridad y privacidad

- la web continúa sin cuentas, pagos, formularios ni carga de documentos;
- no se solicitan datos personales ni se ofrecen intermediarios;
- todos los enlaces de acción dirigen a autoridades o servicios públicos;
- las advertencias sobre movilidad irregular son preventivas y no operativas.

## Validación de producción

- formato, lint, TypeScript y build: **PASS**;
- 42 pruebas unitarias: **PASS**;
- cobertura: 93,87 % de sentencias y 97,5 % de líneas;
- E2E en escritorio y teléfono: 15 pruebas **PASS** y 1 omisión esperada;
- accesibilidad automática y rutas retiradas: **PASS**;
- auditoría de producción: 0 vulnerabilidades conocidas;
- detección de secretos y variables de producción: **PASS**;
- 25 capturas en escritorio, teléfono y tableta: 0 errores y 0 desbordamientos;
- enlaces externos: todos respondieron; cinco portales con protección contra
  verificación automática fueron contrastados mediante sus resultados oficiales.

## Rollback

Restaurar el despliegue de producción anterior y revertir este cambio. No hay
migraciones ni datos de usuario que revertir.

## Riesgo pendiente

Las reglas migratorias cambian con poca anticipación. Cada guía muestra la fecha
de revisión y dirige a la autoridad responsable antes de cualquier gasto o viaje.
