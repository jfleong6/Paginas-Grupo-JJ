// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Datos de los servicios
    const servicios = [
        {
            id: 1,
            nombre: "Panorámicas a Fura y Tena",
            descripcion: "Disfruta de vistas espectaculares a los majestuosos cerros Fura y Tena, dos monumentos naturales que dominan el paisaje local. Ofrecemos miradores estratégicamente ubicados para capturar las mejores fotografías y experiencias visuales.",
            icono: "fas fa-mountain",
            caracteristicas: [
                { icono: "fas fa-binoculars", texto: "Miradores estratégicos" },
                { icono: "fas fa-camera", texto: "Fotografía panorámica" },
                { icono: "fas fa-user-friends", texto: "Acompañamiento guiado" },
                { icono: "fas fa-clock", texto: "Horarios flexibles" }
            ]
        },
        {
            id: 2,
            nombre: "Hospedaje Rural",
            descripcion: "Vive la auténtica experiencia campesina en nuestras cómodas y acogedoras habitaciones rurales. Confort y tradición se combinan para ofrecerte una estadía inolvidable en contacto directo con la naturaleza.",
            icono: "fas fa-home",
            caracteristicas: [
                { icono: "fas fa-bed", texto: "Habitaciones cómodas" },
                { icono: "fas fa-leaf", texto: "Ambiente campesino" },
                { icono: "fas fa-wifi", texto: "Wi-Fi disponible" },
                { icono: "fas fa-coffee", texto: "Desayuno incluido" }
            ]
        },
        {
            id: 3,
            nombre: "Museo del campesino",
            descripcion: "Conoce la historia, tradiciones y herramientas del campesinado local en nuestro museo interactivo. Una experiencia educativa y cultural que te transportará a las raíces de nuestra comunidad.",
            icono: "fas fa-landmark",
            caracteristicas: [
                { icono: "fas fa-desktop", texto: "Exhibiciones interactivas" },
                { icono: "fas fa-tools", texto: "Herramientas históricas" },
                { icono: "fas fa-user-tie", texto: "Guías especializados" },
                { icono: "fas fa-map-signs", texto: "Recorrido cultural" }
            ]
        },
        {
            id: 4,
            nombre: "Galeria Temática a la Esmeralda",
            descripcion: "Adéntrate en el fascinante mundo de las esmeraldas, piedra preciosa emblemática de la región. Nuestra galería muestra el proceso de extracción, tallado y valoración de estas gemas.",
            icono: "fas fa-gem",
            caracteristicas: [
                { icono: "fas fa-gem", texto: "Exhibición de esmeraldas" },
                { icono: "fas fa-cut", texto: "Proceso de tallado" },
                { icono: "fas fa-ring", texto: "Venta de joyería" },
                { icono: "fas fa-chalkboard-teacher", texto: "Talleres educativos" }
            ]
        },
        {
            id: 5,
            nombre: "Caminatas ecológicas",
            descripcion: "Explora senderos naturales rodeados de biodiversidad con nuestras caminatas ecológicas guiadas. Una oportunidad para conectarte con la naturaleza y aprender sobre la flora y fauna local.",
            icono: "fas fa-hiking",
            caracteristicas: [
                { icono: "fas fa-sign", texto: "Senderos señalizados" },
                { icono: "fas fa-compass", texto: "Guías especializados" },
                { icono: "fas fa-dove", texto: "Avistamiento de aves" },
                { icono: "fas fa-mountain", texto: "Diferentes niveles" }
            ]
        },
        {
            id: 6,
            nombre: "Gastronomía campesina previa reservación",
            descripcion: "Saborea la auténtica cocina campesina preparada con ingredientes locales y recetas tradicionales. Una experiencia culinaria que despierta todos los sentidos (servicio con reservación previa).",
            icono: "fas fa-utensils",
            caracteristicas: [
                { icono: "fas fa-utensil-spoon", texto: "Platos típicos" },
                { icono: "fas fa-seedling", texto: "Ingredientes locales" },
                { icono: "fas fa-calendar-check", texto: "Reservación previa" },
                { icono: "fas fa-concierge-bell", texto: "Menú degustación" }
            ]
        },
        {
            id: 7,
            nombre: "Peña del Corazon Encantado",
            descripcion: "Noche de música folclórica, danzas tradicionales y diversión en nuestra peña cultural. Un espacio donde la alegría y las tradiciones se encuentran para crear recuerdos inolvidables.",
            icono: "fas fa-music",
            caracteristicas: [
                { icono: "fas fa-guitar", texto: "Música en vivo" },
                { icono: "fas fa-user-friends", texto: "Danzas tradicionales" },
                { icono: "fas fa-glass-cheers", texto: "Bar con bebidas típicas" },
                { icono: "fas fa-home", texto: "Ambiente familiar" }
            ]
        },
        {
            id: 8,
            nombre: "Cascada el baño de los abuelos",
            descripcion: "Visita esta impresionante cascada de aguas cristalinas, llamada así por la tradición local que cuenta que era el lugar preferido de los ancianos para refrescarse y compartir sabiduría.",
            icono: "fas fa-water",
            caracteristicas: [
                { icono: "fas fa-water", texto: "Cascada natural" },
                { icono: "fas fa-swimmer", texto: "Zona de baño" },
                { icono: "fas fa-book", texto: "Leyendas locales" },
                { icono: "fas fa-tree", texto: "Paisaje exuberante" }
            ]
        },
        {
            id: 9,
            nombre: "Charco la Moya",
            descripcion: "Sumérgete en las aguas tranquilas y refrescantes del Charco La Moya, un paraíso natural ideal para el relax y la conexión con el entorno. Un lugar perfecto para escapar del calor y el estrés.",
            icono: "fas fa-swimming-pool",
            caracteristicas: [
                { icono: "fas fa-tint", texto: "Aguas cristalinas" },
                { icono: "fas fa-umbrella-beach", texto: "Zona de descanso" },
                { icono: "fas fa-leaf", texto: "Naturaleza preservada" },
                { icono: "fas fa-shield-alt", texto: "Acceso seguro" }
            ]
        },
        {
            id: 10,
            nombre: "El enxanto de las mariposas azules",
            descripcion: "Admira el fascinante espectáculo de las mariposas azules en su hábitat natural. Un santuario donde estas criaturas aladas realizan su danza aérea, crear un paisaje mágico y colorido.",
            icono: "fas fa-dove",
            caracteristicas: [
                { icono: "fas fa-pagelines", texto: "Santuario natural" },
                { icono: "fas fa-feather-alt", texto: "Especies endémicas" },
                { icono: "fas fa-camera", texto: "Fotografía permitida" },
                { icono: "fas fa-map-marked-alt", texto: "Visitas guiadas" }
            ]
        }
    ];

    // Estado de la aplicación
    const estado = {
        servicioActual: 0,
        carruselActual: 0
    };

    // ===== INICIALIZACIÓN =====
    inicializar();

    function inicializar() {
        // Ocultar loader
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
            
            iniciarAplicacion();
        }, 1500);
    }

    function iniciarAplicacion() {
        // Configurar navegación
        configurarNavegacion();
        
        // Configurar servicios
        configurarServicios();
        
        // Configurar formulario
        configurarFormulario();
        
        // Configurar scroll y botón volver arriba
        configurarScroll();
        
        // Configurar carrusel móvil
        configurarCarrusel();
    }

    // ===== CONFIGURACIÓN DE NAVEGACIÓN =====
    function configurarNavegacion() {
        // Menú hamburguesa
        const navToggle = document.getElementById('nav-toggle');
        const navEnlaces = document.querySelector('.nav-enlaces');
        
        if (navToggle && navEnlaces) {
            navToggle.addEventListener('click', () => {
                navEnlaces.classList.toggle('mostrar');
                navToggle.innerHTML = navEnlaces.classList.contains('mostrar') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
            
            // Cerrar menú al hacer clic en un enlace
            navEnlaces.querySelectorAll('a').forEach(enlace => {
                enlace.addEventListener('click', () => {
                    navEnlaces.classList.remove('mostrar');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
        
        // Cambiar estilo del menú al hacer scroll
        const navMenu = document.querySelector('.nav-menu');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navMenu.classList.add('scrolled');
            } else {
                navMenu.classList.remove('scrolled');
            }
        });
    }

    // ===== CONFIGURACIÓN DE SERVICIOS =====
    function configurarServicios() {
        // Generar grid de servicios desktop
        const serviciosGrid = document.getElementById('servicios-grid');
        const serviciosCarrusel = document.getElementById('servicios-carrusel');
        
        if (serviciosGrid) {
            serviciosGrid.innerHTML = '';
            servicios.forEach((servicio, index) => {
                const card = crearCardServicio(servicio, index, 'desktop');
                serviciosGrid.appendChild(card);
            });
        }
        
        // Generar carrusel de servicios móvil
        if (serviciosCarrusel) {
            serviciosCarrusel.innerHTML = '';
            servicios.forEach((servicio, index) => {
                const card = crearCardServicio(servicio, index, 'mobile');
                serviciosCarrusel.appendChild(card);
            });
        }
        
        // Generar indicadores del carrusel
        generarIndicadoresCarrusel();
        
        // Mostrar primer servicio por defecto
        mostrarServicio(estado.servicioActual);
    }

    function crearCardServicio(servicio, index, tipo) {
        const card = document.createElement('div');
        card.className = `servicio-card ${tipo === 'mobile' ? 'servicio-card-mobile' : ''} ${index === 0 ? 'activo' : ''}`;
        card.dataset.id = index;
        
        // Acortar descripción para tarjetas
        let descripcionCorta = servicio.descripcion.substring(0, 100);
        if (servicio.descripcion.length > 100) {
            descripcionCorta += '...';
        }
        
        card.innerHTML = `
            <div class="servicio-icono">
                <i class="${servicio.icono}"></i>
            </div>
        `;
        
        card.addEventListener('click', () => {
            if (tipo === 'mobile') {
                // En móvil, también actualizar carrusel
                estado.carruselActual = index;
                actualizarCarrusel();
            }
            mostrarServicio(index);
        });
        
        return card;
    }

    function mostrarServicio(index) {
        // Validar índice
        if (index < 0 || index >= servicios.length) return;
        
        // Actualizar estado
        estado.servicioActual = index;
        
        // Obtener servicio
        const servicio = servicios[index];
        
        // Actualizar tarjetas activas
        document.querySelectorAll('.servicio-card').forEach((card, i) => {
            card.classList.toggle('activo', i === index);
        });
        
        document.querySelectorAll('.servicio-card-mobile').forEach((card, i) => {
            card.classList.toggle('activo', i === index);
        });
        
        // Actualizar vista detallada
        const detalle = document.getElementById('servicio-detalle');
        if (detalle) {
            detalle.querySelector('.detalle-icono i').className = servicio.icono;
            detalle.querySelector('.detalle-titulo').textContent = servicio.nombre;
            detalle.querySelector('.detalle-descripcion').textContent = servicio.descripcion;
            
            const caracteristicasContainer = detalle.querySelector('.detalle-caracteristicas');
            caracteristicasContainer.innerHTML = servicio.caracteristicas.map(caract => `
                <div class="caracteristica">
                    <i class="${caract.icono}"></i>
                    <span>${caract.texto}</span>
                </div>
            `).join('');
            
            // Animación
            detalle.style.animation = 'none';
            setTimeout(() => {
                detalle.style.animation = 'fadeInUp 0.5s ease';
            }, 10);
        }
    }

    // ===== CONFIGURACIÓN CARRUSEL MÓVIL =====
    function configurarCarrusel() {
        const btnPrev = document.getElementById('carrusel-prev');
        const btnNext = document.getElementById('carrusel-next');
        
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                estado.carruselActual = estado.carruselActual > 0 ? estado.carruselActual - 1 : servicios.length - 1;
                actualizarCarrusel();
            });
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                estado.carruselActual = estado.carruselActual < servicios.length - 1 ? estado.carruselActual + 1 : 0;
                actualizarCarrusel();
            });
        }
        
        // Swipe para móviles
        const carrusel = document.getElementById('servicios-carrusel');
        if (carrusel) {
            let startX = 0;
            let endX = 0;
            
            carrusel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            carrusel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Umbral mínimo para considerar swipe
                    if (diff > 0) {
                        // Swipe izquierda = siguiente
                        estado.carruselActual = estado.carruselActual < servicios.length - 1 ? estado.carruselActual + 1 : 0;
                    } else {
                        // Swipe derecha = anterior
                        estado.carruselActual = estado.carruselActual > 0 ? estado.carruselActual - 1 : servicios.length - 1;
                    }
                    actualizarCarrusel();
                }
            });
        }
    }

    function actualizarCarrusel() {
        // Actualizar indicadores
        document.querySelectorAll('.carrusel-indicador').forEach((indicador, i) => {
            indicador.classList.toggle('activo', i === estado.carruselActual);
        });
        
        // Desplazar carrusel
        const carrusel = document.getElementById('servicios-carrusel');
        if (carrusel) {
            const cardWidth = carrusel.querySelector('.servicio-card-mobile').offsetWidth;
            const gap = 16; // 1rem en px
            const scrollPosition = estado.carruselActual * (cardWidth + gap);
            carrusel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
        
        // Mostrar servicio correspondiente
        mostrarServicio(estado.carruselActual);
    }

    function generarIndicadoresCarrusel() {
        const contenedor = document.getElementById('carrusel-indicadores');
        if (!contenedor) return;
        
        contenedor.innerHTML = '';
        servicios.forEach((_, index) => {
            const indicador = document.createElement('div');
            indicador.className = `carrusel-indicador ${index === 0 ? 'activo' : ''}`;
            indicador.addEventListener('click', () => {
                estado.carruselActual = index;
                actualizarCarrusel();
            });
            contenedor.appendChild(indicador);
        });
    }

    // ===== CONFIGURACIÓN FORMULARIO =====
    function configurarFormulario() {
        const formulario = document.getElementById('form-contacto');
        
        if (formulario) {
            formulario.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtener valores
                const nombre = document.getElementById('nombre').value.trim();
                const email = document.getElementById('email').value.trim();
                const mensaje = document.getElementById('mensaje').value.trim();
                
                // Validar
                if (!nombre || !email || !mensaje) {
                    mostrarAlerta('Por favor, completa todos los campos.', 'error');
                    return;
                }
                
                if (!validarEmail(email)) {
                    mostrarAlerta('Por favor, ingresa un email válido.', 'error');
                    return;
                }
                
                // Simular envío
                const btnEnviar = this.querySelector('.btn-enviar');
                const textoOriginal = btnEnviar.innerHTML;
                
                btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                btnEnviar.disabled = true;
                
                // Simular tiempo de envío
                setTimeout(() => {
                    mostrarAlerta('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                    formulario.reset();
                    btnEnviar.innerHTML = textoOriginal;
                    btnEnviar.disabled = false;
                }, 1500);
            });
        }
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function mostrarAlerta(mensaje, tipo) {
        // Crear alerta
        const alerta = document.createElement('div');
        alerta.className = `alerta alerta-${tipo}`;
        alerta.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${mensaje}</span>
            <button class="alerta-cerrar">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Estilos para la alerta (agregar al CSS)
        const estiloAlerta = document.createElement('style');
        estiloAlerta.textContent = `
            .alerta {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .alerta-success {
                background-color: #d4edda;
                color: #155724;
                border-left: 4px solid #28a745;
            }
            .alerta-error {
                background-color: #f8d7da;
                color: #721c24;
                border-left: 4px solid #dc3545;
            }
            .alerta-cerrar {
                background: none;
                border: none;
                cursor: pointer;
                color: inherit;
                margin-left: auto;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(estiloAlerta);
        document.body.appendChild(alerta);
        
        // Botón cerrar
        alerta.querySelector('.alerta-cerrar').addEventListener('click', () => {
            alerta.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                alerta.remove();
                estiloAlerta.remove();
            }, 300);
        });
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => {
                    alerta.remove();
                    estiloAlerta.remove();
                }, 300);
            }
        }, 5000);
    }

    // ===== CONFIGURACIÓN SCROLL =====
    function configurarScroll() {
        // Botón volver arriba
        const btnTop = document.getElementById('btn-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnTop.classList.add('visible');
            } else {
                btnTop.classList.remove('visible');
            }
        });
        
        if (btnTop) {
            btnTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animado');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animar
        document.querySelectorAll('.servicio-card, .tarjeta, .info-item').forEach(el => {
            observer.observe(el);
        });
        
        // Agregar clase animado a CSS
        const estiloAnimado = document.createElement('style');
        estiloAnimado.textContent = `
            .servicio-card, .tarjeta, .info-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            .servicio-card.animado, .tarjeta.animado, .info-item.animado {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(estiloAnimado);
    }
});

