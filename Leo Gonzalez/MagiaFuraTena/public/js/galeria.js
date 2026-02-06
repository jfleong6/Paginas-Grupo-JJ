// ===== SISTEMA DE GALERÍA DINÁMICA =====
function inicializarGaleriaDinamica() {
    const galeriaGrid = document.getElementById('galeria-grid');
    const lightbox = document.getElementById('lightbox');
    
    if (!galeriaGrid) return;
    
    // Configuración
    const configGaleria = {
        rutaGaleria: 'img/Galeria/',
        rutaMiniaturas: 'img/Galeria/miniaturas/',
        imagenesPorPagina: 12,
        paginaActual: 1,
        imagenesCargadas: 0,
        todasLasImagenes: [],
        imagenesFiltradas: [],
        filtroActual: 'todas'
    };
    
    // Datos para las imágenes (se completarán dinámicamente)
    const categorias = {
        'paisajes': 'Paisajes',
        'flora': 'Flora',
        'fauna': 'Fauna', 
        'cultura': 'Cultura',
        'actividades': 'Actividades'
    };
    
    // Inicializar galería
    cargarImagenesReales();
    
    // ===== FUNCIONES PRINCIPALES =====
    
    async function cargarImagenesReales() {
        mostrarEstadoCarga();
        
        try {
            // Obtener lista de imágenes de la carpeta
            const nombresImagenes = await obtenerNombresImagenes();
            
            if (nombresImagenes.length === 0) {
                mostrarSinImagenes();
                return;
            }
            
            // Mezclar las imágenes aleatoriamente
            const imagenesMezcladas = mezclarArray(nombresImagenes);
            
            // Crear objetos de imágenes con metadatos
            const nuevasImagenes = crearObjetosImagenes(imagenesMezcladas);
            
            // Actualizar configuración
            configGaleria.todasLasImagenes = [...configGaleria.todasLasImagenes, ...nuevasImagenes];
            configGaleria.imagenesFiltradas = nuevasImagenes;
            
            // Renderizar imágenes
            renderizarImagenes(nuevasImagenes);
            
            // Actualizar contador
            configGaleria.imagenesCargadas += nuevasImagenes.length;
            
        } catch (error) {
            console.error('Error cargando imágenes:', error);
            mostrarErrorGaleria();
        }
    }
    
    async function obtenerNombresImagenes() {
        // Lista de imágenes conocidas (puedes ampliarla)
        const imagenesConocidas = [
            'AMFT-2.jpg',
            'AMFT-3.jpg', 
            'AMFT-4.jpg',
            'AMFT-5.jpg',
            'AMFT-6.jpg'
        ];
        
        // En un entorno real con backend, aquí harías fetch a una API
        // Por ahora usamos las imágenes conocidas más un chequeo de existencia
        const imagenesExistentes = [];
        
        // Verificar qué imágenes existen realmente
        for (const imagen of imagenesConocidas) {
            if (await imagenExiste(`${configGaleria.rutaGaleria}${imagen}`)) {
                imagenesExistentes.push(imagen);
            }
        }
        
        // Si no hay imágenes, usar placeholder
        if (imagenesExistentes.length === 0) {
            console.warn('No se encontraron imágenes en la carpeta. Usando imágenes de ejemplo.');
            return ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg'];
        }
        
        return imagenesExistentes;
    }
    
    function imagenExiste(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            
            // Timeout por si la imagen no responde
            setTimeout(() => resolve(false), 1000);
        });
    }
    
    function mezclarArray(array) {
        // Algoritmo Fisher-Yates para mezclar aleatoriamente
        const mezclado = [...array];
        for (let i = mezclado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mezclado[i], mezclado[j]] = [mezclado[j], mezclado[i]];
        }
        return mezclado;
    }
    
    function crearObjetosImagenes(nombresImagenes) {
        const categoriasDisponibles = Object.keys(categorias);
        const titulosPorNombre = {
            'AMFT-2.jpg': 'Vista Panorámica del Cerro Fura',
            'AMFT-3.jpg': 'Atardecer en los Cerros Gemelos',
            'AMFT-4.jpg': 'Sendero Ecológico entre Montañas',
            'AMFT-5.jpg': 'Flora Nativa del Bosque',
            'AMFT-6.jpg': 'Mirador Natural con Vista Aérea'
        };
        
        const descripcionesPorNombre = {
            'AMFT-2.jpg': 'Captura aérea que muestra la majestuosidad del cerro Fura en todo su esplendor.',
            'AMFT-3.jpg': 'Los últimos rayos del sol pintan el cielo sobre los cerros Fura y Tena.',
            'AMFT-4.jpg': 'Sendero natural que serpentea entre la vegetación autóctona de la región.',
            'AMFT-5.jpg': 'Diversidad de especies vegetales que habitan en este ecosistema único.',
            'AMFT-6.jpg': 'Vista privilegiada desde uno de nuestros miradores naturales estratégicos.'
        };
        
        return nombresImagenes.map((nombre, index) => {
            // Asignar categoría aleatoria para variedad
            const categoriaIndex = index % categoriasDisponibles.length;
            const categoria = categoriasDisponibles[categoriaIndex];
            
            // Obtener título y descripción
            const titulo = titulosPorNombre[nombre] || `Imagen ${index + 1} - Magia Fura y Tena`;
            const descripcion = descripcionesPorNombre[nombre] || 
                `Fotografía capturada en los majestuosos cerros Fura y Tena, mostrando la belleza natural del lugar.`;
            
            return {
                id: Date.now() + index, // ID único
                src: `${configGaleria.rutaGaleria}${nombre}`,
                srcMiniatura: `${configGaleria.rutaMiniaturas}${nombre}`,
                nombreArchivo: nombre,
                titulo: titulo,
                descripcion: descripcion,
                categoria: categoria,
                categoriaTexto: categorias[categoria],
                fecha: obtenerFechaAleatoria(),
                likes: Math.floor(Math.random() * 150) + 50,
                vistas: Math.floor(Math.random() * 1000) + 200
            };
        });
    }
    
    function obtenerFechaAleatoria() {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const mes = meses[Math.floor(Math.random() * 12)];
        const año = 2022 + Math.floor(Math.random() * 3); // 2022-2024
        return `${mes} ${año}`;
    }
    
    function mostrarEstadoCarga() {
        const skeletons = Array(configGaleria.imagenesPorPagina).fill().map((_, i) => `
            <div class="galeria-item cargando" style="animation-delay: ${i * 50}ms">
                <div class="skeleton"></div>
            </div>
        `).join('');
        
        galeriaGrid.innerHTML = skeletons;
    }
    
    function renderizarImagenes(imagenes) {
        // Limpiar skeletons
        const skeletons = document.querySelectorAll('.galeria-item.cargando');
        skeletons.forEach(skeleton => skeleton.remove());
        
        // Agregar imágenes reales
        imagenes.forEach((imagen, index) => {
            const delay = index * 50;
            
            const imagenElement = document.createElement('div');
            imagenElement.className = 'galeria-item';
            imagenElement.style.animationDelay = `${delay}ms`;
            imagenElement.dataset.id = imagen.id;
            imagenElement.dataset.categoria = imagen.categoria;
            
            // Crear elemento de imagen con lazy loading
            const imgElement = document.createElement('img');
            imgElement.loading = 'lazy';
            imgElement.alt = imagen.titulo;
            
            // Usar un placeholder pequeño mientras carga
            imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyNSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';
            imgElement.dataset.src = imagen.src;
            
            // Cargar la imagen real
            const imgReal = new Image();
            imgReal.onload = () => {
                imgElement.src = imagen.src;
                imgElement.classList.add('cargado');
            };
            imgReal.src = imagen.src;
            
            // Manejar error
            imgElement.onerror = () => {
                imgElement.src = 'img/placeholder.jpg';
                imgElement.alt = 'Imagen no disponible';
            };
            
            imagenElement.innerHTML = `
                <div class="imagen-contenedor">
                    <!-- Imagen se insertará aquí -->
                </div>
                <div class="galeria-overlay">
                    <div class="galeria-info">
                        <h3>${imagen.titulo}</h3>
                        <p>${imagen.descripcion}</p>
                    </div>
                </div>
            `;
            
            // Insertar la imagen en el contenedor
            imagenElement.querySelector('.imagen-contenedor').appendChild(imgElement);
            
            // Agregar evento click para lightbox
            imagenElement.addEventListener('click', () => {
                abrirLightbox(imagen);
            });
            
            // Agregar efecto de carga gradual
            setTimeout(() => {
                galeriaGrid.appendChild(imagenElement);
            }, delay);
        });
        
        // Inicializar observador para lazy loading
        inicializarLazyLoading();
    }
    
    function inicializarLazyLoading() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target.querySelector('img');
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            delete img.dataset.src;
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });
            
            document.querySelectorAll('.galeria-item:not(.cargando)').forEach(item => {
                observer.observe(item);
            });
        }
    }
    
    function mostrarSinImagenes() {
        galeriaGrid.innerHTML = `
            <div class="sin-imagenes">
                <i class="fas fa-images"></i>
                <h3>Galería Vacía</h3>
                <p>No se encontraron imágenes en la carpeta de galería.</p>
                <p>Agrega imágenes en: <code>${configGaleria.rutaGaleria}</code></p>
                <div class="imagenes-ejemplo">
                    <p>Imágenes esperadas:</p>
                    <ul>
                        <li>AMFT-2.jpg</li>
                        <li>AMFT-3.jpg</li>
                        <li>AMFT-4.jpg</li>
                        <li>AMFT-5.jpg</li>
                        <li>AMFT-6.jpg</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    function mostrarErrorGaleria() {
        galeriaGrid.innerHTML = `
            <div class="error-galeria">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Cargando Galería</h3>
                <p>Ocurrió un problema al cargar las imágenes.</p>
                <button class="btn-reintentar" id="btn-reintentar">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
        
        document.getElementById('btn-reintentar')?.addEventListener('click', () => {
            location.reload();
        });
    }
    
    // ===== LIGHTBOX =====
    
    function abrirLightbox(imagen) {
        // Actualizar lightbox con la imagen
        document.getElementById('lightbox-imagen').src = imagen.src;
        document.getElementById('lightbox-titulo').textContent = imagen.titulo;
        document.getElementById('lightbox-descripcion').textContent = imagen.descripcion;
        
        // Actualizar miniaturas
        // actualizarMiniaturas(imagen.id);
        
        // Mostrar lightbox
        lightbox.classList.add('mostrar');
        document.body.style.overflow = 'hidden';
        
        // Configurar navegación
        configurarNavegacionLightbox(imagen.id);
    }
    

    function configurarNavegacionLightbox(imagenIdActual) {
        const btnCerrar = document.getElementById('lightbox-cerrar');
        const btnPrev = document.getElementById('lightbox-prev');
        const btnNext = document.getElementById('lightbox-next');
        
        if (btnCerrar) {
            btnCerrar.onclick = cerrarLightbox;
        }
        
        if (btnPrev) {
            btnPrev.onclick = () => navegarImagen('anterior', imagenIdActual);
        }
        
        if (btnNext) {
            btnNext.onclick = () => navegarImagen('siguiente', imagenIdActual);
        }
        
        // Eventos de teclado
        const tecladoHandler = (e) => {
            if (e.key === 'Escape') cerrarLightbox();
            if (e.key === 'ArrowLeft') navegarImagen('anterior', imagenIdActual);
            if (e.key === 'ArrowRight') navegarImagen('siguiente', imagenIdActual);
        };
        
        document.addEventListener('keydown', tecladoHandler);
        
        // Cerrar haciendo clic fuera
        lightbox.onclick = (e) => {
            if (e.target === lightbox) cerrarLightbox();
        };
        
        // Guardar referencia para limpiar después
        lightbox.dataset.tecladoHandler = tecladoHandler;
    }
    
    function navegarImagen(direccion, imagenIdActual) {
        const imagenes = configGaleria.imagenesFiltradas;
        const indiceActual = imagenes.findIndex(img => img.id === imagenIdActual);
        
        let nuevoIndice;
        if (direccion === 'siguiente') {
            nuevoIndice = (indiceActual + 1) % imagenes.length;
        } else {
            nuevoIndice = (indiceActual - 1 + imagenes.length) % imagenes.length;
        }
        
        const nuevaImagen = imagenes[nuevoIndice];
        if (nuevaImagen) {
            abrirLightbox(nuevaImagen);
        }
    }
    
    function cerrarLightbox() {
        lightbox.classList.remove('mostrar');
        document.body.style.overflow = '';
        
        // Limpiar event listeners
        if (lightbox.dataset.tecladoHandler) {
            document.removeEventListener('keydown', lightbox.dataset.tecladoHandler);
            delete lightbox.dataset.tecladoHandler;
        }
        
        const btnCerrar = document.getElementById('lightbox-cerrar');
        const btnPrev = document.getElementById('lightbox-prev');
        const btnNext = document.getElementById('lightbox-next');
        
        if (btnCerrar) btnCerrar.onclick = null;
        if (btnPrev) btnPrev.onclick = null;
        if (btnNext) btnNext.onclick = null;
        lightbox.onclick = null;
    }
        
    // ===== BOTÓN MEZCLAR =====
    
    function crearBotonMezclar() {
        const btnMezclar = document.createElement('button');
        btnMezclar.className = 'btn-mezclar';
        btnMezclar.innerHTML = '<i class="fas fa-random"></i> Mezclar Imágenes';
        btnMezclar.onclick = mezclarImagenes;
        
        // Insertar después de los filtros
        const filtrosContainer = document.querySelector('.filtros-galeria');
        if (filtrosContainer) {
            filtrosContainer.appendChild(btnMezclar);
        }
    }
    
    function mezclarImagenes() {
        // Mezclar las imágenes actuales
        configGaleria.imagenesFiltradas = mezclarArray([...configGaleria.imagenesFiltradas]);
        
        // Volver a renderizar
        galeriaGrid.innerHTML = '';
        renderizarImagenes(configGaleria.imagenesFiltradas);
        
        // Efecto visual
        const btnMezclar = document.querySelector('.btn-mezclar');
        btnMezclar.classList.add('animando');
        setTimeout(() => {
            btnMezclar.classList.remove('animando');
        }, 500);
    }
    
    // ===== INICIALIZACIÓN =====
}

// Agregar CSS adicional para la galería dinámica
function agregarEstilosGaleriaDinamica() {
    const estilos = `
        
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = estilos;
    document.head.appendChild(styleSheet);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    agregarEstilosGaleriaDinamica();
    inicializarGaleriaDinamica();
});

// También puedes mezclar imágenes periódicamente
setInterval(() => {
    const btnMezclar = document.querySelector('.btn-mezclar');
    if (btnMezclar && Math.random() > 0.7) { // 30% de probabilidad
        btnMezclar.click();
    }
}, 30000); // Cada 30 segundos