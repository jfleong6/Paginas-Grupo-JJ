from pypdf import PdfReader, PdfWriter
import os

def combinar_para_verificar(pdf_solo_texto, pdf_plantilla, salida="RESULTADO_VERIFICACION.pdf"):
    if not os.path.exists(pdf_solo_texto) or not os.path.exists(pdf_plantilla):
        print("Error: No se encuentran los archivos. Asegúrate de tener el PDF generado y la plantilla.")
        return

    reader_texto = PdfReader(pdf_solo_texto)
    reader_plantilla = PdfReader(pdf_plantilla)
    writer = PdfWriter()

    # Combinamos cada página
    for i in range(len(reader_texto.pages)):
        # Si la plantilla solo tiene 1 página, usamos esa para todas
        idx_plantilla = 0 if len(reader_plantilla.pages) == 1 else i
        print(idx_plantilla)
        
        page_fondo = reader_plantilla.pages[idx_plantilla]
        page_texto = reader_texto.pages[i]
        
        # EL MERGE: pone el texto sobre el fondo
        page_fondo.merge_page(page_texto)
        writer.add_page(page_fondo)

    with open(salida, "wb") as f:
        writer.write(f)
    
    print(f"✅ ¡Hecho! Abre '{salida}' para ver si los datos caen en los cuadros.")

if __name__ == "__main__":
    # Ajusta estos nombres a tus archivos reales
    combinar_para_verificar("prueba.pdf", "Hojas de respuestas - sesión2.pdf")