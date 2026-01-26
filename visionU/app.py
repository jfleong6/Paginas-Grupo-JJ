import io
import tempfile
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
import pandas as pd
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from PyPDF2 import PdfReader, PdfWriter
import fitz  # PyMuPDF
import base64
from config.config_manager import ConfigManager
from routes.preview_routes import preview_bp

# Función para obtener la ruta correcta (sea .py o .exe)
def resource_path(relative_path):
    if hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, relative_path)
    return os.path.join(os.path.abspath("."), relative_path)

# Al crear la app, usa estas rutas
app = Flask(__name__, 
            template_folder=resource_path("templates"),
            static_folder=resource_path("static"))
app.config['UPLOAD_FOLDER'] = 'temp'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB
app.register_blueprint(preview_bp)


config_manager = ConfigManager()

# --- RUTAS DEL BACKEND ---
@app.route('/')
def index():
    return render_template('index.html', datos = config_manager.data)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)