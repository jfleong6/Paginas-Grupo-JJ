import io
import pandas as pd
from flask import Blueprint, request, send_file
from pypdf import PdfWriter, PdfReader
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
import qrcode
from config.config_manager import ConfigManager

preview_bp = Blueprint("preview", __name__)
config_manager = ConfigManager()

# --- FUNCIÓN AUXILIAR QR ---
def crear_imagen_qr(dato):
    if not dato:
        return None
    
    # box_size=10 genera una imagen ligera y nítida
    qr = qrcode.QRCode(box_size=10, border=1)
    qr.add_data(dato)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return ImageReader(buffer)

# --- FUNCIÓN GENERADORA ---
def generar_pdf_base(df, incluir_plantilla=False, es_preview=False, generar_qr=False):
    config = config_manager.data
    plantilla_path = "Hojas de respuestas - sesión2.pdf"
    writer = PdfWriter()
    
    qr_conf = config.get("qr", {}) 
    filas = df.head(1).iterrows() if es_preview else df.iterrows()

    for _, row in filas:
        # 1. Leer la plantilla en cada iteración para tener una página limpia
        reader_plantilla = PdfReader(plantilla_path)
        pagina_base = reader_plantilla.pages[0]
        
        ancho_plantilla = float(pagina_base.mediabox.width)
        alto_plantilla = float(pagina_base.mediabox.height)
        
        packet = io.BytesIO()
        c = canvas.Canvas(packet, pagesize=(ancho_plantilla, alto_plantilla))
        c.setFont(config["font_family"], config["font_size"])
        
        # --- A. TEXTOS ---
        for col, coords in config["campos"].items():
            valor = str(row.get(col, ""))
            if valor and pd.notna(row.get(col)):
                c.drawString(coords["x"] * mm, coords["y"] * mm, valor)
        
        # --- B. QR (MULTIDATO) ---
        if generar_qr and qr_conf:
            cols_config = [
                str(v).strip()
                for v in row.values
                if pd.notna(v) and str(v).strip() != ""
            ]
            if cols_config:
                dato_final = ",".join(cols_config)
                imagen_qr = crear_imagen_qr(dato_final)
                if imagen_qr:
                    x = qr_conf.get("x", 150) * mm
                    y = qr_conf.get("y", 250) * mm
                    size = qr_conf.get("size", 30) * mm
                    c.drawImage(imagen_qr, x, y, width=size, height=size)

        # --- C. FINALIZACIÓN DE LA PÁGINA (FUERA DEL IF QR) ---
        c.save()  # Guardamos el canvas siempre
        packet.seek(0)
        
        # Creamos la capa de texto/QR
        overlay_reader = PdfReader(packet)
        if len(overlay_reader.pages) > 0:
            overlay_page = overlay_reader.pages[0]

            if incluir_plantilla:
                pagina_base.merge_page(overlay_page)
                writer.add_page(pagina_base)
            else:
                overlay_page.mediabox = pagina_base.mediabox
                writer.add_page(overlay_page)
    
    # --- D. SALIDA ---
    out = io.BytesIO()
    writer.write(out)
    out.seek(0)
    
    # Verificación de seguridad: si no hay páginas, el visor fallará
    if len(writer.pages) == 0:
        print("Error: El PDF no tiene páginas.")
        
    return out
# --- RUTAS ---

@preview_bp.route("/preview", methods=["POST"])
def preview():
    file = request.files.get('excel')
    if not file: return "Archivo no encontrado", 400
    
    # Solo capturamos si el usuario activó el switch
    usar_qr = request.form.get('generar_qr') == 'true' 
    
    df = pd.read_excel(file)
    
    return send_file(
        generar_pdf_base(
            df, 
            incluir_plantilla=True, 
            es_preview=False, 
            generar_qr=usar_qr
        ), 
        mimetype='application/pdf'
    )

@preview_bp.route("/generate-final", methods=["POST"])
def generate():
    file = request.files.get('excel')
    if not file: return "Archivo no encontrado", 400
    
    usar_qr = request.form.get('generar_qr') == 'true'
    
    df = pd.read_excel(file)
    
    return send_file(
        generar_pdf_base(
            df, 
            incluir_plantilla=False, 
            es_preview=False, 
            generar_qr=usar_qr
        ), 
        mimetype='application/pdf'
    )