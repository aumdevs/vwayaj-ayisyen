# Comparador y recomendador de país

## Principio

El sistema ofrece orientación explicable. No reemplaza evaluación jurídica, no toma decisiones por la persona y no garantiza elegibilidad.

## Comparador

### Criterios iniciales

- Potencial de ingresos.
- Costo de vida.
- Dinero inicial.
- Idioma.
- Clima.
- Empleo.
- Estudios.
- Salud.
- Seguridad.
- Vivienda.
- Transporte.
- Comunidad haitiana.
- Emprendimiento.
- Vida familiar.
- Complejidad migratoria.
- Facilidad bancaria.
- Tiempo de adaptación.

Cada combinación país/criterio tiene:

- Puntuación 1–5.
- Explicación.
- Nivel de confianza.
- Fuentes.
- Fecha de revisión.
- Ciudades o población a la que aplica.

No convertir una experiencia limitada en una puntuación nacional absoluta.

## Cuestionario

### Preguntas sugeridas

1. Objetivo principal.
2. Idiomas.
3. Presupuesto inicial.
4. Viaja solo o con familia.
5. Preferencia climática.
6. Prioridad: estabilidad, ingresos, estudios, emprendimiento o comunidad.
7. Ritmo de vida.
8. Disposición para aprender idioma.
9. Tiempo que puede esperar.
10. Necesidad de comunidad cercana.
11. Tipo de experiencia laboral.
12. Preferencia entre ciudad grande o vida más tranquila.

### Preguntas que no deben puntuar

- Raza.
- Religión.
- Opinión política.
- Salud no relevante.
- Discapacidad.
- Orientación sexual.
- Datos biométricos.
- Edad exacta, salvo flujo de protección de menores.

### Algoritmo

- Determinista.
- Pesos guardados en DB.
- Versionado.
- Resultado reproducible.
- Administradores pueden ver la explicación.
- Cambios requieren revisión y pruebas de regresión.
- No usar LLM.

Pseudoalgoritmo:

```text
score[country] = sum(option_weight[country] * question_weight)
normalize score to 0..100
apply transparent warning rules
return top country + alternative + explanation
```

### Reglas de advertencia

- Menor de edad: dirigir a adulto responsable y no recopilar más datos.
- Presupuesto muy bajo: mostrar preparación financiera, no empujar compra.
- Sin idioma y sin disposición a aprender: advertencia.
- Objetivo incompatible con vías publicadas: recomendar asesoría, no afirmar imposibilidad.
- Contenido vencido: no usar el criterio afectado o reducir confianza.

## Resultado

Debe incluir:

- País sugerido.
- Alternativa.
- Cinco razones.
- Tres dificultades.
- Qué investigar.
- Presupuesto orientativo sólo si hay datos revisados.
- Servicio relevante.
- Disclaimer.
- Fecha y versión del algoritmo.

## Privacidad

- El cuestionario funciona sin cuenta.
- Sesión anónima con ID aleatorio.
- No usar fingerprinting.
- No guardar respuestas más de 30 días sin consentimiento.
- Usuario autenticado puede guardar o borrar.
