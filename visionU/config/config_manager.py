import json
import os

# --- GESTOR DE CONFIGURACIÓN ---
class ConfigManager:
    def __init__(self, path="config_campos.json"):
        self.path = path
        self.data = self.cargar()
        self.verificar_integridad()

    def cargar(self):
        if os.path.exists(self.path):
            try:
                with open(self.path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error al cargar configuración: {e}")
                return self.config_default()
        return self.config_default()

    def config_default(self):
        return {
            "font_family": "Times-Roman",
            "font_size": 14.0,
            "campos": {
                "Fecha": {"x": 21, "y": 267.8},
                "Documento": {"x": 96, "y": 267.8},
                "Nombre": {"x": 23, "y": 259},
                "Colegio": {"x": 22, "y": 250.6},
                "Evaluacion": {"x": 27, "y": 241.8},
                "Grupo": {"x": 90, "y": 241.8},
                "Grado": {"x": 136, "y": 241.8},
                "Sesion": {"x": 21, "y": 233.2},
                "Jornada": {"x": 59, "y": 233.2},
                "Ciudad": {"x": 116, "y": 233.2}
            }
        }

    def verificar_integridad(self):
        """Verifica que la configuración tenga todos los campos necesarios"""
        problemas = []
        
        if "font_family" not in self.data:
            problemas.append("Falta font_family")
            self.data["font_family"] = "Times-Roman"
        
        if "font_size" not in self.data:
            problemas.append("Falta font_size")
            self.data["font_size"] = 14.0
        
        if "campos" not in self.data:
            problemas.append("Falta sección campos")
            self.data["campos"] = {}
        
        if problemas:
            print(f"Configuración corregida: {problemas}")
            self.guardar()
        
        return len(problemas) == 0

    def guardar(self):
        try:
            with open(self.path, "w", encoding="utf-8") as f:
                json.dump(self.data, f, indent=4, ensure_ascii=False)
            return True
        except Exception as e:
            print(f"Error al guardar configuración: {e}")
            return False
