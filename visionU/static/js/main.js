var archivo; // Variable global

// 1. Función para Cargar Excel y mostrar Vista Previa (CON PLANTILLA)
function buscarExcel(input) {
    archivo = input.files[0];
    if (!archivo) return;

    const btnPdf = document.getElementById('btn-pdf');
    const loader = document.getElementById('loading-preview');
    const visor = document.getElementById('pdf-embed');

    btnPdf.disabled = true;
    loader.style.display = 'flex';
    
    const formData = new FormData();
    formData.append('excel', archivo);

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
        btnPdf.disabled = false;
    })
    .catch(error => {
        console.error(error);
        alert('No fue posible generar la vista previa');
    })
    .finally(() => {
        loader.style.display = 'none';
    });
}

// 2. Generar PDF Final (SOLO TEXTO) y mostrar en visor
document.getElementById('btn-pdf').addEventListener('click', function () {
    const btn = this;
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const visor = document.getElementById('pdf-embed');
    
    if (!archivo) return alert("Selecciona un archivo primero");

    // UI Estado de carga
    btn.disabled = true;
    if (btnText) btnText.textContent = "Generando...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    const formData = new FormData();
    formData.append('excel', archivo);

    fetch('/generate-final', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en generación final');
        return response.blob();
    })
    .then(blob => {
        // IMPORTANTE: Revocar la URL anterior antes de asignar la nueva
        if (visor.src) URL.revokeObjectURL(visor.src);
        
        const pdfUrl = URL.createObjectURL(blob);
        
        // Forzar recarga del visor (algunos navegadores lo necesitan)
        visor.src = ""; 
        setTimeout(() => {
            visor.src = pdfUrl;
            visor.style.display = 'block'; 
        }, 50);
        
        console.log("PDF final cargado correctamente");
    })
    .catch(error => {
        console.error(error);
        alert('Error al generar el documento');
    })
    .finally(() => {
        btn.disabled = false;
        if (btnText) btnText.textContent = "Generar PDF";
        if (btnSpinner) btnSpinner.style.display = "none";
    });
});