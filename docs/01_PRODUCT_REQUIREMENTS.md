# Product Requirements Document (PRD)

## 1. Resumen

La plataforma es una agencia digital de orientación, preparación y acompañamiento para personas haitianas que consideran viajar, estudiar, trabajar, vivir o establecerse legalmente en Estados Unidos, Chile, Brasil o México.

No es una agencia de turismo genérica y no es un portal de promesas migratorias. Su ventaja es unir tres capas de información:

1. **Información oficial:** normas, procedimientos, documentos y costos gubernamentales.
2. **Realidad práctica:** bancos, vivienda, trabajo, transporte, salud, educación y adaptación.
3. **Experiencia comunitaria:** testimonios, encuestas y aprendizajes haitianos, presentados como experiencia y no como hechos universales.

## 2. Problema

La comunidad objetivo suele encontrar información fragmentada, demasiado técnica, desactualizada o presentada sin contexto. También enfrenta estafas, barreras de idioma, baja alfabetización digital y decisiones importantes tomadas con información incompleta.

## 3. Propuesta de valor

Ayudar a una persona a:

- Comprender opciones legales.
- Comparar países de forma realista.
- Identificar un país que podría adaptarse a sus prioridades.
- Preparar documentos y presupuesto.
- Entender cómo será la vida cotidiana.
- Evitar estafas y errores frecuentes.
- Contratar acompañamiento con alcance transparente.
- Llevar un expediente y comunicarse con asesores.
- Aprender mediante cursos y comunidad.

## 4. Usuarios principales

### Visitante anónimo

Lee contenido, compara países, realiza el cuestionario sin guardar datos, revisa servicios y abre WhatsApp.

### Usuario registrado

Guarda resultados, compra servicios, gestiona perfil, citas, cursos, notificaciones, comunidad, IA y expedientes.

### Cliente con expediente

Carga documentos, consulta estados, completa tareas, recibe mensajes, revisa citas y accede a entregables.

### Asesor

Gestiona leads y expedientes asignados, tareas, citas, mensajes y documentos autorizados.

### Profesional externo

Ve sólo expedientes y documentos concedidos, con permisos y expiración.

### Editor de contenido

Crea, traduce y actualiza contenido, pero no administra pagos ni roles.

### Moderador

Gestiona reportes y comunidad, sin acceso a documentos migratorios.

### Administrador

Gestiona toda la operación, permisos, contenido, paquetes, seguridad y configuración.

## 5. Objetivos de negocio

- Generar confianza mediante información honesta.
- Convertir visitas en evaluaciones, conversaciones y compras.
- Estandarizar el acompañamiento.
- Reducir preguntas repetitivas.
- Mantener trazabilidad y calidad editorial.
- Crear una relación de largo plazo con cursos y comunidad.
- Evitar exposición jurídica por promesas o contenido desactualizado.

## 6. Objetivos de usuario

- Encontrar información en menos de tres clics.
- Entender textos sin conocimientos legales.
- Completar formularios desde un teléfono económico.
- Saber siempre qué hacer después.
- Distinguir información oficial de experiencia.
- Conocer costos y límites de los servicios.
- Ver quién accedió a sus documentos cuando sea aplicable.
- Poder solicitar corrección o eliminación de datos.

## 7. Indicadores iniciales

No recopilar métricas sensibles. Indicadores agregados:

- Porcentaje que encuentra un país o guía.
- Finalización del comparador/cuestionario.
- Clics a WhatsApp por país y paquete.
- Conversión de evaluación a compra.
- Tiempo hasta primera respuesta.
- Expedientes con tareas vencidas.
- Contenido vencido o sin revisar.
- Finalización de cursos.
- Reportes comunitarios y tiempo de moderación.
- Respuestas de IA con feedback negativo.
- Errores, latencia y disponibilidad.

## 8. Requisitos no funcionales

- WCAG 2.2 AA como objetivo.
- Mobile-first.
- PWA instalable.
- Idioma predeterminado kreyòl.
- Sin dependencia obligatoria de JavaScript para contenido esencial cuando sea razonable.
- Seguridad por diseño y mínimo privilegio.
- RLS de denegación por defecto.
- Auditoría de acciones sensibles.
- Bajo consumo de datos.
- Índices y caché para crecimiento.
- Migraciones reproducibles.
- Backups y restauración probada.
- Logs sin PII sensible.
- Disponibilidad degradada segura: si falla IA, Stripe o WhatsApp, la información principal sigue disponible.

## 9. Restricciones de producto

- Sólo cuatro países en el lanzamiento.
- No garantizar resultados.
- No publicar contenido legal sin revisión.
- No almacenar tarjetas.
- No usar IA como decisor migratorio.
- No permitir rutas clandestinas, fraude documental o venta de citas.
- No lanzar documentos privados sin análisis antimalware.
- No usar testimonios inventados.
