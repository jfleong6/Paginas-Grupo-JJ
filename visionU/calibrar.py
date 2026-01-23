import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import mm
from pypdf import PdfReader, PdfWriter

def crear_cuadricula_overlay(output_buffer):
    """Genera un PDF transparente con una cuadrícula milimetrada."""
    c = canvas.Canvas(output_buffer, pagesize=letter)
    width, height = letter
    
    # Configuración de colores
    c.setLineWidth(0.5)
    
    # --- LÍNEAS VERTICALES ---
    # Dibujamos cada 5mm
    for x in range(0, int(width) + 1, int(5 * mm)):
        # Líneas maestras cada 10mm (más oscuras)
        if x % int(10 * mm) == 0:
            c.setStrokeColorRGB(0.2, 0.2, 0.2) # Gris oscuro
            c.setLineWidth(0.8)
            # Etiqueta de coordenada X
            c.setFont("Helvetica", 6)
            c.drawString(x + 1, 10, f"{int(x/mm)}mm") # Etiqueta abajo
            c.drawString(x + 1, height - 10, f"{int(x/mm)}mm") # Etiqueta arriba
        else:
            # Líneas secundarias cada 5mm (más claras)
            c.setStrokeColorRGB(0.7, 0.7, 0.7) # Gris claro
            c.setLineWidth(0.3)
            
        c.line(x, 0, x, height)

    # --- LÍNEAS HORIZONTALES ---
    # Dibujamos cada 5mm
    for y in range(0, int(height) + 1, int(5 * mm)):
        # Líneas maestras cada 10mm
        if y % int(10 * mm) == 0:
            c.setStrokeColorRGB(0.2, 0.2, 0.2)
            c.setLineWidth(0.8)
            # Etiqueta de coordenada Y
            c.setFont("Helvetica", 6)
            c.drawString(10, y + 1, f"{int(y/mm)}mm") # Etiqueta izq
            c.drawString(width - 25, y + 1, f"{int(y/mm)}mm") # Etiqueta der
        else:
            c.setStrokeColorRGB(0.7, 0.7, 0.7)
            c.setLineWidth(0.3)
            
        c.line(0, y, width, y)

    c.save()

def superponer_cuadricula(pdf_entrada, pdf_salida):
    try:
        # 1. Crear la cuadrícula en memoria
        packet = io.BytesIO()
        crear_cuadricula_overlay(packet)
        packet.seek(0)
        
        # 2. Leer la cuadrícula recién creada
        grid_pdf = PdfReader(packet)
        grid_page = grid_pdf.pages[0]

        # 3. Leer el PDF original del usuario
        original_pdf = PdfReader(pdf_entrada)
        writer = PdfWriter()

        # 4. Fusionar solo la primera página (para calibrar basta con una)
        if len(original_pdf.pages) > 0:
            pagina_base = original_pdf.pages[0]
            # Superponemos la cuadrícula sobre la página base
            pagina_base.merge_page(grid_page)
            writer.add_page(pagina_base)
        
        # 5. Guardar el resultado
        with open(pdf_salida, "wb") as f_out:
            writer.write(f_out)
            
        print(f"✅ ¡Éxito! Abre el archivo '{pdf_salida}' para ver las coordenadas.")

    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo '{pdf_entrada}'. Verifica el nombre.")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == "__main__":
    archivo_original = "Hojas de respuestas - sesión2.pdf"
    archivo_resultado = "Hoja_con_Cuadricula.pdf"
    
    print("Generando malla de calibración...")
    superponer_cuadricula(archivo_original, archivo_resultado)