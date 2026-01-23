import io
import pandas as pd
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import mm
from pypdf import PdfReader, PdfWriter
import os

# --- CONFIGURACIÓN ---
ARCHIVO_PLANTILLA = "Hojas de respuestas - sesión2.pdf"
ARCHIVO_SALIDA = "VISTA_PREVIA_CON_DATOS.pdf"

# Mapa de Coordenadas (Ajusta estos valores según tu calibración)
coord_map = {
        "Fecha": (21 * mm, 267.8 * mm),
        "Documento": (96 * mm, 267.8 * mm),
        "Nombre": (23 * mm, 259 * mm),
        "Colegio": (22 * mm, 250.6 * mm),
        "Evaluacion": (27 * mm, 241.8 * mm), 
        "Grupo": (90 * mm, 241.8 * mm),
        "Grado": (136 * mm, 241.8 * mm),
        "Sesion": (21 * mm, 233.2 * mm),
        "Jornada": (59 * mm, 233.2 * mm),
        "Ciudad": (116 * mm, 233.2 * mm),
    }

def crear_overlay_texto(row):
    """Crea una página PDF transparente con solo el texto."""
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=letter)
    
    # 1. Definir la fuente y el tamaño (Ejemplo: Helvetica Negrita, tamaño 10)
    # Las fuentes estándar son: Helvetica, Times-Roman, Courier
    c.setFont("Times-Roman", 14)
    
    for col, (x, y) in coord_map.items():
        if col in row and pd.notna(row[col]):
            dato = str(row[col])
            
            # Si necesitas cambiar la fuente para un dato específico,
            # podrías poner otro c.setFont aquí dentro.
            c.drawString(x, y, dato)
            
    c.save()
    packet.seek(0)
    return PdfReader(packet).pages[0]

def main():
    # 1. Cargar Datos (Aquí puedes usar pd.read_excel("tuexcel.xlsx"))
    # Generamos datos falsos para la prueba:
    print("Cargando datos...")
    
    # Si quieres cargar tu Excel real, descomenta esto:
    try:
        df = pd.read_excel("datos_prueba.xlsx")
    except:
        print("No se encontró el Excel, usando datos de prueba...")

    writer = PdfWriter()
    
    if not os.path.exists(ARCHIVO_PLANTILLA):
        print(f"ERROR: No encuentro el archivo '{ARCHIVO_PLANTILLA}'")
        return

    print(f"Generando {len(df)} páginas de previsualización...")

    for index, row in df.iterrows():
        # 2. Cargar la plantilla original fresca para cada página
        # (Es necesario recargarla o copiarla profundamente para no sobrescribir la anterior en memoria)
        reader_plantilla = PdfReader(ARCHIVO_PLANTILLA)
        pagina_base = reader_plantilla.pages[0] 
        
        # 3. Crear el texto de este estudiante
        pagina_texto = crear_overlay_texto(row)
        
        # 4. FUSIONAR: Poner texto ENCIMA de la plantilla
        # merge_page pone el argumento sobre la página que llama
        pagina_base.merge_page(pagina_texto)
        
        # 5. Añadir al PDF final
        writer.add_page(pagina_base)
        break

    # 6. Guardar
    with open(ARCHIVO_SALIDA, "wb") as f_out:
        writer.write(f_out)
        
    print(f"✅ ¡LISTO! Abre el archivo: {ARCHIVO_SALIDA}")

if __name__ == "__main__":
    main()