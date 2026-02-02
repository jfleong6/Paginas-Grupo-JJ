# Sitio Web Lego Tech - Fotografía y Producción de Eventos

## Características Implementadas

### 1. Menú Responsive con Efecto Ruleta
- **Escritorio**: Menú horizontal tradicional con logo centrado
- **Móvil**: Solo se muestra el logo, al hacer clic aparece menú circular (ruleta)
- Los 5 enlaces de navegación aparecen alrededor del logo
- Animaciones suaves al abrir/cerrar
- Se cierra automáticamente al seleccionar opción

### 2. Optimización para Imágenes Verticales
- Tarjetas de servicios ajustadas para formato vertical
- Galería con altura fija para mantener proporciones
- Efectos hover mejorados para imágenes verticales
- Clase `.vertical-img` para manejar imágenes en formato vertical

### 3. Botones Flotantes Fijos
- Instagram a la izquierda (con enlace al perfil)
- WhatsApp a la izquierda (con enlace directo)
- Posición fija en el centro izquierdo de la pantalla
- Animaciones y efectos hover

### 4. Paleta de Colores Mejorada
- **Colores Base**:
  - Blanco: `#ffffff`
  - Rojo Primario: `#db2424` (botones principales)
  - Negro: `#000000` (textos)
  - Azul Primario: `#2832bd` (encabezados, acentos)
  
- **Colores Complementarios**:
  - Azul Secundario: `#3a44d5`
  - Rojo Secundario: `#c91f1f`
  - Gris Claro: `#f5f5f7`
  - Gris Medio: `#e8e8e8`
  - Gris Oscuro: `#333333`

### 5. Videos de Portada
- Desktop: Video 16:9 (`portada pc.mp4`)
- Móvil: Video vertical (`portada movil.mp4`)
- Overlay con efecto blur y gradiente

## Estructura de Archivos
lego-tech-website/
├── index.html
├── README.md
└── static/
    ├── css/
    │   └── index.css
    ├── js/
    │   └── menu.js
    ├── img/
    │   ├── logo.png
    │   ├── galeria1.jpg
    │   ├── galeria2.jpg
    │   ├── galeria3.jpg
    │   ├── galeria4.jpg
    │   ├── galeria5.jpg
    │   └── galeria6.jpg
    └── video/
        ├── portada pc.mp4
        └── portada movil.mp4


## Instrucciones de Uso

### 1. Reemplazar Archivos Multimedia
- Colocar el logo en `static/img/logo.png`
- Colocar las imágenes de galería en `static/img/` (galeria1.jpg a galeria6.jpg)
- Colocar los videos en `static/video/`

### 2. Personalizar Enlaces
- **Instagram**: Actualizar en el botón flotante y footer
- **WhatsApp**: Actualizar número en el botón flotante
- **TikTok**: Actualizar en el footer
- **Email y Teléfono**: Actualizar en el footer

### 3. Personalizar Contenido
- Textos en las secciones "Nosotros" y "Servicios"
- Información de contacto en el footer
- Textos de los formularios según necesidades

### 4. Adaptar para Producción
- Agregar funcionalidad real al formulario de contacto
- Implementar analytics si es necesario
- Optimizar imágenes y videos para web
- Configurar SSL y dominio propio

## Responsive Breakpoints

- **> 1024px**: Desktop (4 columnas galería, 2 columnas servicios)
- **768px - 1024px**: Tablet (2 columnas galería, 2 columnas servicios)
- **< 768px**: Móvil (1 columna, menú ruleta activado)

## Compatibilidad
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Compatible con dispositivos móviles
- Soporte para touch devices
- Optimizado para performance

## Créditos
- Diseñado por Grupo JJ
- Programado por Ing. Fredy
- Iconos de Font Awesome
- Fuentes de Google Fonts

---

**Nota**: Este sitio está diseñado específicamente para servicios de fotografía y producción de eventos, con énfasis en la visualización de contenido visual y facilidad de contacto.