# Asistente de IA: seguridad, RAG y límites

## Propósito

Ayudar a encontrar y explicar contenido **ya aprobado** de la plataforma. No sustituye a un abogado, autoridad, asesor humano ni recomendación determinista de país.

La función se lanza detrás de `FEATURE_AI_ASSISTANT=false` hasta completar evaluación, datos, proveedor, presupuesto, moderación y pruebas.

## Casos permitidos

- resumir una guía publicada;
- explicar un término como PIX, CuentaRUT, ITIN o SPEI;
- localizar una sección o curso;
- comparar información publicada;
- orientar hacia un formulario o asesor;
- responder preguntas generales citando la plataforma.

## Casos prohibidos

- predecir aprobación, deportación, asilo, visa o residencia;
- decidir país para una persona usando perfil sensible;
- elaborar historias o documentos falsos;
- instruir cómo entrar o permanecer ilegalmente;
- dar plazos/costos no contenidos en fuentes vigentes;
- acceder a expediente, documentos, CRM, pagos o notas internas;
- recibir pasaportes o datos sensibles en el chat;
- presentar opinión como información oficial.

## Arquitectura

1. Sólo usuarios autenticados para conversaciones persistentes; modo público opcional con límites más bajos y sin historial.
2. Clasificador de intención y riesgo.
3. Recuperación desde `ai_content_chunks` generados sólo de versiones publicadas/aprobadas.
4. Filtro por locale, país, fecha de vigencia y estado.
5. Respuesta con IDs de fuente, título y fecha.
6. Comprobación de cobertura: si no hay evidencia suficiente, decir que no se dispone de información verificada.
7. Guardrails de salida.
8. Registro mínimo y redacción de PII.
9. Botón de reporte y derivación humana.

## Defensa contra prompt injection

- Contenido recuperado se trata como datos no confiables, no instrucciones.
- Delimitar claramente documentos en el prompt.
- Ignorar instrucciones incrustadas en páginas o comentarios.
- Allowlist de herramientas sin acceso general a red, DB o archivos.
- No permitir consultas SQL generadas por el modelo.
- No pasar secretos, cabeceras, cookies ni objetos completos.
- Validar salida estructurada.
- Limitar número/tamaño de fragmentos.
- Comunidad y contenido no aprobado nunca entran al índice.
- Probar ataques multilingües.

## Privacidad

- Mensaje visible: no introducir números de documento, contraseñas, salud ni información privada.
- Detector/redactor de PII antes de enviar al proveedor cuando sea técnicamente viable.
- Retención corta y configurable.
- Exclusión de entrenamiento según contrato/configuración del proveedor.
- No mezclar conversaciones entre usuarios.
- No usar expedientes como contexto.
- No mostrar conversaciones completas en analytics o error tracking.
- Eliminación desde privacidad.

## Calidad y actualidad

- Cada respuesta cita contenido interno visible.
- Mostrar última revisión.
- Preferir kreyòl simple.
- Separar “oficial”, “práctico”, “comunidad” y “advertencia”.
- No completar huecos con conocimiento general del modelo.
- Una fuente expirada o en revisión no es recuperable.
- Reindexar tras publicación y retirar fragmentos tras despublicación.

## Límites de abuso y costo

- Rate limits por usuario, IP y organización.
- Cuota diaria/mensual.
- Longitud máxima de entrada/salida.
- Timeout y cancelación.
- Modelo pequeño por defecto; escalamiento controlado.
- Cache sólo para consultas públicas normalizadas sin PII.
- Alertas de gasto.
- Kill switch global.
- Prohibir streaming de contenido antes de validar cuando la ruta sea de alto riesgo.

## Evaluación antes de activar

Crear un conjunto en los cinco idiomas con:

- preguntas respondibles;
- preguntas sin evidencia;
- cambios legales;
- solicitudes de garantía;
- fraude/documentos falsos;
- prompt injection;
- PII;
- odio/discriminación;
- emergencias;
- confusión entre países.

Métricas mínimas:

- precisión de citas;
- tasa de abstención correcta;
- no filtración;
- cumplimiento de idioma;
- latencia/costo;
- escalamiento adecuado.

Revisión humana obligatoria y aprobación de seguridad/producto antes de `true`.
