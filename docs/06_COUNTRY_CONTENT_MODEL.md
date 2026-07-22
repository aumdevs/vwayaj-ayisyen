# Modelo editorial para cada país

## Estructura obligatoria

Cada país usa el mismo orden para reducir carga cognitiva.

### 1. Resumen

- Cómo es la vida en términos sencillos.
- Fortalezas.
- Dificultades.
- Perfil que podría adaptarse.
- Aviso de variación por ciudad y situación.

### 2. Para quién puede ser adecuado

Explicaciones orientativas sobre:

- Personalidad y ritmo.
- Idiomas.
- Clima.
- Presupuesto.
- Familia.
- Estudios.
- Emprendimiento.
- Tolerancia a procesos largos.

Evitar estereotipos y absolutos.

### 3. Para quién puede no ser adecuado

- Barreras comunes.
- Costos.
- Idioma.
- Competitividad.
- Clima.
- Seguridad.
- Complejidad administrativa.

### 4. Vías legales

Cada vía debe tener:

- Nombre oficial.
- Propósito.
- Elegibilidad general.
- Documentos generales.
- Autoridad responsable.
- Costos oficiales conocidos.
- Tiempo oficial, si existe.
- Tiempo observado, separado y con tamaño de muestra.
- Riesgos.
- Errores frecuentes.
- Fecha.
- Fuentes.
- Qué hace el servicio y qué no.

### 5. Realidad haitiana

- Ciudades con comunidad.
- Redes y organizaciones verificadas.
- Trabajo frecuente.
- Idioma e integración.
- Experiencias de discriminación, sin generalizar.
- Diferencias regionales.
- Consejos comunitarios moderados.

### 6. Trabajo y salarios

- Sectores.
- Permisos.
- Contratos.
- Salario bruto/neto.
- Horarios.
- Derechos.
- Búsqueda de empleo.
- Currículum.
- Estafas.
- Fuentes y fecha.

No publicar un salario aislado sin moneda, periodicidad, ciudad, fuente y fecha.

### 7. Costo de vida

Perfiles:

- Persona sola.
- Pareja.
- Estudiante.
- Familia con uno o dos hijos.

Categorías:

- Habitación/arriendo.
- Depósito.
- Comida.
- Transporte.
- Internet y teléfono.
- Salud.
- Educación.
- Cuidado infantil.
- Envío de dinero.
- Fondo de emergencia.

Mostrar rangos, ciudad, fecha y método.

### 8. Bancos y dinero

#### Estados Unidos

SSN, ITIN, checking, savings, debit, credit, credit score, Zelle y comisiones.

#### Chile

RUT, CuentaRUT, ClaveÚnica, transferencias, límites, Fonasa, AFP y Previred cuando corresponda.

#### Brasil

CPF, PIX, bancos digitales, cuenta, SUS y Carteira de Trabalho cuando corresponda.

#### México

CURP, RFC, CLABE, SPEI, bancos y cuentas digitales.

Todo término conserva el nombre original y tiene explicación simple.

### 9. Vivienda

- Tipos.
- Documentos.
- Depósito.
- Contrato.
- Compartir.
- Barrios y transporte.
- Anuncios falsos.
- Derechos y obligaciones.
- Checklist antes de pagar.

### 10. Estudios

- Niños.
- Formación técnica.
- Universidad.
- Idiomas.
- Becas.
- Convalidación.
- Costos.
- Documentos.

### 11. Salud

- Público/privado.
- Emergencia.
- Seguro.
- Embarazo.
- Niños.
- Medicamentos.
- Documentos.
- Números oficiales verificados.

### 12. Primeros 30 días

- Llegada.
- SIM/internet.
- Transporte.
- Registro.
- Cuenta.
- Salud.
- Vivienda.
- Trabajo.
- Escuela.
- Presupuesto.
- Seguridad.

### 13. Estafas y riesgos

- Visa falsa.
- Abogado falso.
- Contrato falso.
- Empleo con cobro.
- Arriendo falso.
- Venta de citas.
- Falsificación.
- Retención de pasaporte.
- Rutas clandestinas.
- Préstamos abusivos.
- Suplantación digital.

### 14. Paquetes

Mostrar servicios activos del país.

### 15. Fuentes y revisión

- Autor.
- Revisor.
- Fecha de acceso.
- Última revisión.
- Próxima revisión.
- Historial de cambios.

## Estados editoriales

- `draft`
- `in_review`
- `published`
- `stale`
- `archived`

Un contenido vencido puede seguir visible sólo con advertencia clara y decisión editorial registrada. Los requisitos legales críticos deben ocultarse si no se pueden verificar.

## Etiquetas

- `official`
- `practical`
- `community`
- `warning`

## Plantilla de contenido

```yaml
country: US|CL|BR|MX
section: legal_pathways|work|cost_of_living|...
information_type: official|practical|community|warning
status: draft
risk_level: low|medium|high
source_required: true
last_reviewed_at:
next_review_at:
author_id:
reviewer_id:
translations:
  ht:
    title:
    summary:
    body_markdown:
```
