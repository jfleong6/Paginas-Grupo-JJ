var archivo; // Variable global para mantener el archivo en memoria

// 1. Función para Cargar Excel y mostrar Vista Previa (CON PLANTILLA)
function buscarExcel(input) {
    archivo = input.files[0];
    if (!archivo) return;

    // Referencias al DOM
    const btnPdf = document.getElementById('btn-pdf');
    const loader = document.getElementById('loading-preview');
    const visor = document.getElementById('pdf-embed');

    // UI: Bloquear botón y mostrar cargando
    btnPdf.disabled = true;
    loader.style.display = 'flex';

    // Preparar datos
    const formData = new FormData();
    formData.append('excel', archivo);

    // --- NUEVO: Capturamos solo el estado del Switch ---
    // (La columna y posición ya están configuradas en el backend)
    const usarQr = document.getElementById('chk-qr').checked;
    formData.append('generar_qr', usarQr);
    // --------------------------------------------------

    fetch('/preview', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) throw new Error('Error al generar la vista previa');
            return response.blob();
        })
        .then(pdfBlob => {
            // Limpiamos URL anterior para evitar fugas de memoria
            if (visor.src) URL.revokeObjectURL(visor.src);

            const pdfUrl = URL.createObjectURL(pdfBlob);
            visor.src = pdfUrl;
            visor.style.display = 'block';
            
            // Habilitamos el botón de generar final
            btnPdf.disabled = false;
        })
        .catch(error => {
            console.error(error);
            alert('No fue posible generar la vista previa. Revisa la consola para más detalles.');
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}

// 2. Generar PDF Final (SOLO TEXTO) y mostrar en visor
document.getElementById('btn-pdf').addEventListener('click', function () {
    const btn = this;
    const visor = document.getElementById('pdf-embed');

    // Elementos opcionales para feedback visual en el botón (si existen en tu HTML)
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');

    if (!archivo) return alert("Selecciona un archivo primero");

    // UI: Estado de carga
    btn.disabled = true;
    if (btnText) btnText.textContent = "Generando...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    const formData = new FormData();
    formData.append('excel', archivo);

    // --- NUEVO: Capturamos el estado del Switch también aquí ---
    const usarQr = document.getElementById('chk-qr').checked;
    formData.append('generar_qr', usarQr);
    // ----------------------------------------------------------

    fetch('/generate-final', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) throw new Error('Error en generación final');
            return response.blob();
        })
        .then(blob => {
            // Limpieza de URL anterior
            if (visor.src) URL.revokeObjectURL(visor.src);

            const pdfUrl = URL.createObjectURL(blob);

            // Truco para forzar la recarga visual del PDF en algunos navegadores
            visor.src = "";
            setTimeout(() => {
                visor.src = pdfUrl;
                visor.style.display = 'block';
            }, 50);

            console.log("PDF final cargado correctamente");
        })
        .catch(error => {
            console.error(error);
            alert('Error al generar el documento final.');
        })
        .finally(() => {
            // Restaurar estado del botón
            btn.disabled = false;
            if (btnText) btnText.textContent = "Generar PDF";
            if (btnSpinner) btnSpinner.style.display = "none";
        });
});

/* OPCIONAL:
   Si quieres que la vista previa se actualice automáticamente 
   apenas tocas el switch (sin tener que volver a cargar el excel),
   puedes descomentar este bloque:
*/

/*
document.getElementById('chk-qr').addEventListener('change', function() {
    // Solo refrescamos si ya hay un archivo seleccionado
    if (archivo) {
        // Simulamos la carga reutilizando la lógica de buscarExcel
        // Creamos un objeto "falso" que tenga la propiedad files
        buscarExcel({ files: [archivo] });
    }
});
*/