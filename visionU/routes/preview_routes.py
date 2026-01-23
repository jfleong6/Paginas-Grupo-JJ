import io
import json
import os
import pandas as pd
from flask import Blueprint, request, send_file
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import mm
from pypdf import PdfReader, PdfWriter
from config.config_manager import ConfigManager

preview_bp = Blueprint("preview", __name__)
config_manager = ConfigManager()

# --- LÓGICA DE GENERACIÓN ---
def generar_pdf_base(df, incluir_plantilla=False, es_preview=False):
    config = config_manager.data
    plantilla_path = "Hojas de respuestas - sesión2.pdf"
    writer = PdfWriter()
    
    # Determinamos si procesamos uno o todos
    filas = df.head(1).iterrows() if es_preview else df.iterrows()

    for _, row in filas:
        # --- SOLUCIÓN AL SOBREESCRITO: Leer la plantilla en cada iteración ---
        reader_plantilla = PdfReader(plantilla_path)
        pagina_base = reader_plantilla.pages[0]
        
        packet = io.BytesIO()
        c = canvas.Canvas(packet, pagesize=letter)
        c.setFont(config["font_family"], config["font_size"])
        
        for col, coords in config["campos"].items():
            valor = str(row.get(col, ""))
            if valor and pd.notna(row.get(col)):
                # Dibujamos el texto en la posición configurada
                c.drawString(coords["x"] * mm, coords["y"] * mm, valor)
        
        c.save()
        packet.seek(0)
        overlay_page = PdfReader(packet).pages[0]

        if incluir_plantilla:
            # Para vista previa: fusionar texto con fondo
            pagina_base.merge_page(overlay_page)
            writer.add_page(pagina_base)
        else:
            # Para impresión final: solo la página de texto (fondo blanco)
            writer.add_page(overlay_page)
    
    out = io.BytesIO()
    writer.write(out)
    out.seek(0)
    return out

# --- RUTAS ---
@preview_bp.route("/preview", methods=["POST"])
def preview():
    file = request.files.get('excel')
    if not file: return "Archivo no encontrado", 400
    df = pd.read_excel(file)
    # Vista previa: CON plantilla para ver si calza bien
    return send_file(generar_pdf_base(df, incluir_plantilla=True), mimetype='application/pdf')

@preview_bp.route("/generate-final", methods=["POST"])
def generate():
    file = request.files.get('excel')
    if not file: return "Archivo no encontrado", 400
    df = pd.read_excel(file)
    # Final: SIN plantilla, solo texto para imprimir sobre la hoja real
    return send_file(generar_pdf_base(df, incluir_plantilla=False, es_preview=False), mimetype='application/pdf')