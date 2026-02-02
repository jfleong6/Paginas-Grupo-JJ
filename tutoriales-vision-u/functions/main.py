from firebase_functions import https_fn
from app import app

# Importante: El nombre de la función debe coincidir con el destination de tu firebase.json
# Añadimos secrets=["DRIVE_CREDENTIALS"] para otorgar permisos de lectura en la nube
@https_fn.on_request(secrets=["DRIVE_CREDENTIALS"])
def vision_u_api(req: https_fn.Request) -> https_fn.Response:
    """
    Punto de entrada para Firebase Functions.
    Mapea las peticiones de Firebase hacia la aplicación Flask.
    """
    with app.request_context(req.environ):
        return app.full_dispatch_request()