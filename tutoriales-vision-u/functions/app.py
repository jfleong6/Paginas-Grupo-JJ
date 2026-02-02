from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_from_directory
import os
import json  # <--- ESTA IMPORTACIÓN FALTABA
import firebase_admin
from firebase_admin import credentials, auth, firestore
from googleapiclient.discovery import build
from google.oauth2 import service_account
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)

# --- Configuración de Red/Proxy ---
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
app.secret_key = "GRUPO_JJ_SECURITY_KEY_2026"
app.config.update(
    SESSION_COOKIE_NAME='__session',
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_SAMESITE='Lax',
)

# --- Inicialización de Credenciales ---
base_dir = os.path.dirname(os.path.abspath(__file__))
cert_path = os.path.join(base_dir, "service-account-key.json")

if not firebase_admin._apps:
    if os.path.exists(cert_path):
        cred = credentials.Certificate(cert_path)
        firebase_admin.initialize_app(cred)
    else:
        firebase_admin.initialize_app() 

db = firestore.client()

# --- Configuración de Google Drive ---
def get_drive_service():
    SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
    try:
        # 1. Intentar leer desde las variables de entorno de Firebase (Secreto)
        # Esto es lo que guardaste con firebase functions:secrets:set
        creds_json = os.environ.get("DRIVE_CREDENTIALS")

        if creds_json:
            # Caso Producción: Cargamos desde el secreto de Firebase
            info = json.loads(creds_json)
        else:
            # Caso Local: Por si quieres seguir probando en tu PC con el archivo .json
            cert_path = os.path.join(os.path.dirname(__file__), "service-account-key.json")
            if os.path.exists(cert_path):
                with open(cert_path, "r") as f:
                    info = json.load(f)
            else:
                raise Exception("No se encontraron credenciales (ni secreto ni archivo local)")

        # 2. Crear credenciales
        creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)

        # 3. Construir servicio
        service = build('drive', 'v3', credentials=creds, static_discovery=False)
        return service

    except Exception as e:
        print(f"!!! FALLO CRÍTICO DRIVE: {str(e)}")
        return None

# --- Rutas de la Aplicación ---

@app.route('/')
def index():
    # Renderiza tu nuevo HTML de tutoriales
    return render_template('index.html')

@app.route('/api/videos')
def get_videos():    
    try:
        service = get_drive_service()
        if service is None:
            return jsonify({"error": "No se pudo conectar con Google Drive"}), 500

        folder_id = '1DNw-IsFP3T4rt5s1wNZSyrZESbFONk4i'
        
        # Agregamos 'createdTime' para poder ordenar y 'name' para filtrar el rar
        # Modifica la query en app.py
        query = f"'{folder_id}' in parents and (mimeType contains 'video/' or name contains '.rar' or name contains '.xlsx' or name contains '.xls')"
        
        results = service.files().list(
            q=query, 
            fields="files(id, name, thumbnailLink, createdTime, mimeType)",
            pageSize=50
        ).execute()
        
        files = results.get('files', [])
        
        videos = []
        instalador = None

        for f in files:
            # Dentro del bucle for f in files:
            if f['name'].lower().endswith(('.xlsx', '.xls')):
                f['isExcel'] = True
                f['downloadLink'] = f"https://drive.google.com/uc?export=download&id={f['id']}"
                videos.append(f) # Lo metemos en la lista de videos para que respete el orden por fecha
            # Detectar el instalador .rar
            elif f['name'].lower().endswith('.rar'):
                f['downloadLink'] = f"https://drive.google.com/uc?export=download&id={f['id']}"
                instalador = f
            else:
                # Es un video
                f['embedLink'] = f"https://drive.google.com/file/d/{f['id']}/preview"
                videos.append(f)
        
        # ORDENAR: Del más antiguo (primero que deben ver) al más reciente
        # createdTime viene en formato ISO (ej: 2026-01-28T...) lo cual es fácil de ordenar
        videos.sort(key=lambda x: x['createdTime'])
            
        return jsonify({
            "videos": videos, 
            "instalador": instalador
        })
    except Exception as e:
        print(f"Error en ruta /api/videos: {str(e)}")
        return jsonify({"error": str(e)}), 500
# --- Iniciar Localmente ---
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)