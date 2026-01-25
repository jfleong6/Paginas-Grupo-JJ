# VisionU - Sistema de Verificación de Formularios
**Desarrollado por Grupo JJ**

VisionU es una aplicación de escritorio diseñada para automatizar la verificación y calibración de campos en formularios PDF. Permite procesar datos desde archivos Excel y generar vistas previas con precisión milimétrica.

## 🚀 Características
- **Procesamiento de PDF:** Basado en PyMuPDF para alta fidelidad.
- **Calibración Dinámica:** Ajuste de coordenadas mediante el archivo `config_campos.json`.
- **Interfaz Web Local:** Panel de control intuitivo desarrollado con Flask.
- **Generación de Reportes:** Creación automática de PDFs con datos cruzados de Excel.

## 🛠️ Instalación para Desarrolladores
1. Clonar el repositorio.
2. Instalar dependencias: `pip install -r requirements.txt`.
3. Ejecutar: `python app.py`.

## 📦 Uso del Ejecutable
Para usuarios finales, simplemente ejecute `VisionU_App.exe`. Puede modificar los campos de impresión editando el archivo `config_campos.json` en la carpeta raíz sin necesidad de reinstalar.

---
© 2026 Grupo JJ. Todos los derechos reservados.