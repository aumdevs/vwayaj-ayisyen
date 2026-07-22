# Carga segura de documentos

## Estado de lanzamiento

La UI y el flujo pueden estar implementados, pero `document_uploads_enabled` permanece desactivado en producción hasta configurar análisis antimalware privado y aprobar el checklist.

## Flujo

1. Usuario autenticado y autorizado solicita upload.
2. Servidor valida expediente, cuota, consentimiento y rate limit.
3. Genera `document_id`, path aleatorio y registro `quarantined`.
4. Emite permiso de subida limitado.
5. Cliente sube a bucket de cuarentena.
6. Cliente confirma.
7. Servidor verifica tamaño, MIME, magic bytes y hash.
8. Scanner analiza.
9. Si clean, copiar mediante API a bucket clean con nombre aleatorio.
10. Marcar `clean`; eliminar cuarentena.
11. Si infected/error, marcar rejected y eliminar.
12. Notificar sin detalles sensibles.

## Tipos

Permitidos inicialmente:

- `application/pdf`
- `image/jpeg`
- `image/png`
- `image/webp`

Bloqueados:

- SVG.
- HTML.
- XML arbitrario.
- JavaScript.
- Ejecutables.
- ZIP/RAR/7z.
- DOC/DOCX/XLS/PPT.
- Audio/video.
- Archivos con múltiples extensiones sospechosas.

## Validación

- Extension allowlist.
- MIME declarado.
- MIME detectado.
- Magic bytes.
- Tamaño máximo 10 MB.
- Dimensiones máximas de imagen.
- Descompresión segura si se habilita alguna vez.
- PDF: rechazar cifrado no soportado, JavaScript/acciones y archivos embebidos cuando el sanitizador pueda detectarlo.
- Re-encode de imágenes para eliminar payload y EXIF.
- Hash SHA-256 para duplicados/auditoría.

## Escaneo

Requisitos del proveedor:

- Procesamiento privado.
- No reutilización o publicación de archivos.
- DPA.
- Región documentada.
- Retención mínima.
- API con autenticación y firma.
- Resultado machine-readable.
- Timeouts.
- Idempotencia.
- SLA.
- No VirusTotal para PII.

Alternativa: servicio ClamAV aislado y mantenido, fuera del runtime normal de Vercel.

## Descarga

- Endpoint autenticado.
- Check de propietario/participant/grant.
- AAL2 para staff.
- Registro previo.
- Signed URL 30–60 segundos.
- `Content-Disposition: attachment`.
- `X-Content-Type-Options: nosniff`.
- No URL en email o logs.
- No thumbnails generados por parser inseguro.

## Cuotas

- Máximo de documentos por caso.
- Máximo total por usuario.
- Alertas.
- Eliminación de uploads incompletos.
- Backpressure cuando scanner esté caído.

## Retención

- `retention_delete_at`.
- Job idempotente.
- Aviso antes de eliminación.
- Legal hold explícito y auditado.
- Eliminar objeto y metadata sensible.
- Mantener evento mínimo sin nombre original ni contenido.

## Nombre original

Guardar cifrado sólo si es necesario para mostrarlo. Al descargar, usar un nombre seguro construido por la app, sin caracteres de control.
