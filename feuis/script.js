// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('FEUIS - Inicializando aplicación');

    // Inicializar Swiper para el hero
    initSwiper();

    // Cargar créditos desde JSON
    loadCreditos();

    // Cargar convenios
    loadConvenios();

    // Configurar navegación por tabs
    setupTabNavigation();

    // Configurar eventos
    setupEventListeners();

    // Inicializar tooltips de Bootstrap
    initBootstrapComponents();
});

// ===== SWIPER HERO =====
function initSwiper() {
    const swiper = new Swiper('.hero-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Efectos
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

// ===== NAVEGACIÓN POR TABS =====
function setupTabNavigation() {
    // Navegación por tabs
    const tabLinks = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section-tab');

    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetTab = this.getAttribute('data-tab');

            // Actualizar tabs activos
            tabLinks.forEach(tab => {
                tab.classList.remove('active');
            });
            this.classList.add('active');

            // Mostrar sección correspondiente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab) {
                    section.classList.add('active');
                }
            });

            // Scroll suave a la sección
            const sectionElement = document.getElementById(targetTab);
            if (sectionElement) {
                window.scrollTo({
                    top: sectionElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Cerrar menú móvil si está abierto
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
                if (bsOffcanvas) bsOffcanvas.hide();
            }
        });
    });

    // Manejar URLs con hash
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}

function handleHashChange() {
    const hash = window.location.hash.substring(1);
    const validTabs = ['conocenos', 'creditos', 'convenios', 'documentos'];

    if (validTabs.includes(hash)) {
        const tabLink = document.querySelector(`.nav-tab[data-tab="${hash}"]`);
        if (tabLink) {
            tabLink.click();
        }
    }
}

// ===== CARGA DE CRÉDITOS =====
async function loadCreditos() {
    try {
        // Usar los datos proporcionados directamente
        const creditosData = {
            creditos: [
                {
                    "id": "libre_inversion",
                    "nombre": "Crédito Libre Inversión",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Será otorgado para atender necesidades de cualquier índole por parte de los asociados.",
                    "condiciones": {
                        "valor_maximo": 15000000,
                        "plazo_maximo_meses": 36
                    },
                    "requisitos": [
                        "Formato de solicitud de crédito.",
                        "Dos últimas tiras de pago y certificado laboral.",
                        "Estudio de crédito y consulta en centrales de riesgo.",
                        "Mínimo 4 meses de antigüedad en el fondo."
                    ]
                },
                {
                    "id": "credito_inmediato",
                    "nombre": "Crédito Inmediato",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Línea de crédito creada para solucionar situaciones de último momento.",
                    "condiciones": {
                        "valor_maximo": "1 salario mínimo",
                        "plazo_maximo_meses": 5
                    },
                    "requisitos": [
                        "Formato de solicitud de crédito.",
                        "Certificado laboral.",
                        "No requiere antigüedad en el fondo."
                    ]
                },
                {
                    "id": "credito_primas",
                    "nombre": "Crédito de Primas",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito otorgado sobre la prima de servicios o prima de Navidad.",
                    "condiciones": {
                        "cobro": "Al momento de la consignación de la prima"
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Dos últimas tiras de pago.",
                        "Certificado laboral.",
                        "Mínimo 4 meses de afiliación."
                    ]
                },
                {
                    "id": "crediaportes",
                    "nombre": "Crediaportes",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito para cubrir aportes u obligaciones específicas del asociado.",
                    "condiciones": {
                        "giro": "Directo a la entidad que realiza el cobro"
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Certificado laboral.",
                        "Factura de la entidad.",
                        "Mínimo 4 meses de afiliación."
                    ]
                },
                {
                    "id": "credito_rotativo",
                    "nombre": "Crédito Rotativo",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Línea de crédito que se renueva a medida que se libere el cupo.",
                    "condiciones": {
                        "valor_maximo": 3000000,
                        "renovable": true
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Certificado laboral.",
                        "Última tira de pago."
                    ]
                },
                {
                    "id": "credito_educativo",
                    "nombre": "Crédito Educativo",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito destinado al pago de estudios o formación académica.",
                    "condiciones": {
                        "giro": "Directo al ente educativo"
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Recibo de la institución educativa.",
                        "Certificado laboral.",
                        "Mínimo 4 meses de antigüedad."
                    ]
                },
                {
                    "id": "credito_vehiculo",
                    "nombre": "Crédito para Vehículo",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito para la compra o mejora de vehículo.",
                    "condiciones": {
                        "autorizacion_gerencia": false
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Última tira de pago.",
                        "Certificado laboral.",
                        "Copia de la tarjeta de propiedad."
                    ]
                },
                {
                    "id": "credito_salud",
                    "nombre": "Crédito de Salud",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito para cubrir gastos médicos y de salud.",
                    "condiciones": {
                        "giro": "Entidad prestadora del servicio"
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Factura o soporte médico.",
                        "Certificado laboral."
                    ]
                },
                {
                    "id": "credito_vivienda",
                    "nombre": "Crédito de Vivienda",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito destinado a mejoras o adquisición de vivienda.",
                    "condiciones": {
                        "plazo_maximo_meses": 60
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Soporte del inmueble.",
                        "Certificado laboral.",
                        "Estudio de crédito."
                    ]
                },
                {
                    "id": "credito_calidad_vida",
                    "nombre": "Crédito Calidad de Vida",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito para bienestar y mejoramiento de condiciones personales.",
                    "condiciones": {},
                    "requisitos": [
                        "Formato de solicitud.",
                        "Certificado laboral."
                    ]
                },
                {
                    "id": "credito_tecnologia",
                    "nombre": "Crédito de Tecnología",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito para compra de equipos tecnológicos.",
                    "condiciones": {
                        "giro": "Proveedor del bien"
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Factura del proveedor.",
                        "Certificado laboral."
                    ]
                },
                {
                    "id": "credito_emergencia",
                    "nombre": "Crédito de Emergencia",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito para atender situaciones imprevistas del asociado.",
                    "condiciones": {
                        "aprobacion_rapida": true
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Certificado laboral."
                    ]
                },
                {
                    "id": "credito_especial",
                    "nombre": "Crédito Especial",
                    "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/libre-inversion-p4yotoh4rc3bjv1bkgm8vs1xv9oaczwgs6uj0mipx0.png",
                    "descripcion": "Crédito sujeto a condiciones particulares definidas por el fondo.",
                    "condiciones": {
                        "evaluacion": "Caso a caso"
                    },
                    "requisitos": [
                        "Formato de solicitud.",
                        "Estudio de crédito."
                    ]
                }
            ]
        };

        const container = document.getElementById('grid-creditos');
        if (!container) return;

        container.innerHTML = '';

        if (!creditosData.creditos || creditosData.creditos.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        No hay créditos disponibles en este momento.
                    </div>
                </div>
            `;
            return;
        }

        // Crear grid de créditos
        creditosData.creditos.forEach((credito, index) => {
            const creditoCard = createCreditoCard(credito, index);
            container.appendChild(creditoCard);
        });

        // Configurar filtros
        setupCreditosFilters();

    } catch (error) {
        console.error('Error cargando créditos:', error);
        document.getElementById('grid-creditos').innerHTML = `
            <div class="col-12 text-center text-danger">
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Error cargando información de créditos. Intente nuevamente más tarde.
                </div>
            </div>
        `;
    }
}

// ===== CREAR CARD DE CRÉDITO INNOVADOR =====
function createCreditoCard(credito, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.setAttribute('data-category', getCreditoCategory(credito));

    // Determinar color basado en el índice (para efecto visual)
    const colorClass = getColorClass(index);

    // Formatear condiciones
    let condicionesHTML = '';
    if (credito.condiciones) {
        Object.entries(credito.condiciones).forEach(([key, value]) => {
            let label = key.replace('_', ' ').toUpperCase();
            let displayValue = value;

            if (typeof value === 'number' && value > 1000) {
                displayValue = formatCurrency(value);
            } else if (typeof value === 'boolean') {
                displayValue = value ? 'Sí' : 'No';
            }

            condicionesHTML += `
                <div class="condition-item">
                    <span class="condition-label">${label}</span>
                    <span class="condition-value">${displayValue}</span>
                </div>
            `;
        });
    }

    col.innerHTML = `
        <div class="credito-grid-card cursor-pointer" data-credito-id="${credito.id}">
            <div class="credito-grid-header">
                <img src="${credito.imagen}" alt="${credito.nombre}">
                <div class="credito-grid-category">${getCategoryLabel(credito)}</div>
            </div>
            
            <div class="credito-grid-body">
                <h3 class="credito-grid-title">${credito.nombre}</h3>
                <p class="credito-grid-desc">${credito.descripcion}</p>
                
                <div class="credito-grid-conditions">
                    ${condicionesHTML || '<p class="text-muted small">Consulte condiciones específicas</p>'}
                </div>
                
                <div class="credito-grid-footer">
                    <span class="text-primary fw-bold">
                        <i class="fas fa-file-alt me-1"></i>
                        ${credito.requisitos?.length || 0} requisitos
                    </span>
                    <button class="btn btn-sm btn-outline-primary ver-detalle-btn">
                        Ver detalles
                    </button>
                </div>
            </div>
        </div>
    `;

    return col;
}

// ===== FUNCIONES AUXILIARES CRÉDITOS =====
function getCreditoCategory(credito) {
    const nombre = credito.nombre.toLowerCase();

    if (nombre.includes('libre') || nombre.includes('inmediato') || nombre.includes('rotativo')) {
        return 'libre';
    } else if (nombre.includes('educat') || nombre.includes('tecnolog') || nombre.includes('vivienda') || nombre.includes('vehiculo')) {
        return 'especializado';
    } else if (nombre.includes('emergencia') || nombre.includes('inmediato')) {
        return 'emergencia';
    } else if (nombre.includes('salud') || nombre.includes('calidad') || nombre.includes('primas')) {
        return 'especializado';
    } else {
        return 'otros';
    }
}

function getCategoryLabel(credito) {
    const category = getCreditoCategory(credito);
    const labels = {
        'libre': 'Libre Inversión',
        'especializado': 'Especializado',
        'emergencia': 'Emergencia',
        'educacion': 'Educación',
        'otros': 'General'
    };
    return labels[category] || 'General';
}

function getColorClass(index) {
    const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'bg-danger', 'bg-secondary'];
    return colors[index % colors.length];
}

function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// ===== FILTROS DE CRÉDITOS =====
function setupCreditosFilters() {
    const filterButtons = document.querySelectorAll('.filtros-creditos .btn');
    const creditoCards = document.querySelectorAll('#grid-creditos > .col-md-6');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filtrar créditos
            creditoCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    card.style.display = category === filter ? 'block' : 'none';
                }
            });
        });
    });

    // Búsqueda por texto
    const searchInput = document.getElementById('searchCreditos');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            creditoCards.forEach(card => {
                const title = card.querySelector('.credito-grid-title').textContent.toLowerCase();
                const desc = card.querySelector('.credito-grid-desc').textContent.toLowerCase();

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// ===== DETALLE DE CRÉDITO =====
function setupDetalleCredito() {
    document.addEventListener('click', function (e) {
        // Ver detalles del crédito
        if (e.target.closest('.ver-detalle-btn') || e.target.closest('.credito-grid-card')) {
            const card = e.target.closest('.credito-grid-card');
            if (!card) return;

            const creditoId = card.getAttribute('data-credito-id');
            showDetalleCredito(creditoId);
        }

        // Volver al grid
        if (e.target.id === 'volver-grid' || e.target.closest('#volver-grid')) {
            document.getElementById('grid-creditos').classList.remove('d-none');
            document.getElementById('detalle-credito').classList.add('d-none');
        }
    });
}

async function showDetalleCredito(creditoId) {
    try {
        // Obtener datos del crédito (simulado - en producción sería una llamada API)
        const response = await fetch('creditos.json');
        const data = await response.json();
        const credito = data.creditos.find(c => c.id === creditoId);

        if (!credito) return;

        // Actualizar UI
        document.getElementById('grid-creditos').classList.add('d-none');
        document.getElementById('detalle-credito').classList.remove('d-none');

        // Llenar detalles
        document.getElementById('detalle-imagen').src = credito.imagen;
        document.getElementById('detalle-imagen').alt = credito.nombre;
        document.getElementById('detalle-nombre').textContent = credito.nombre;
        document.getElementById('detalle-categoria').textContent = getCategoryLabel(credito);
        document.getElementById('detalle-descripcion').textContent = credito.descripcion;

        // Condiciones
        const condicionesDiv = document.getElementById('detalle-condiciones');
        condicionesDiv.innerHTML = '';

        if (credito.condiciones && Object.keys(credito.condiciones).length > 0) {
            Object.entries(credito.condiciones).forEach(([key, value]) => {
                let label = key.replace('_', ' ').toUpperCase();
                let displayValue = value;

                if (typeof value === 'number' && value > 1000) {
                    displayValue = formatCurrency(value);
                } else if (typeof value === 'boolean') {
                    displayValue = value ? 'Sí' : 'No';
                }

                const div = document.createElement('div');
                div.className = 'mb-2';
                div.innerHTML = `<strong>${label}:</strong> ${displayValue}`;
                condicionesDiv.appendChild(div);
            });
        } else {
            condicionesDiv.innerHTML = '<p class="text-muted">Consulte condiciones específicas</p>';
        }

        // Requisitos
        const requisitosList = document.getElementById('detalle-requisitos');
        requisitosList.innerHTML = '';

        if (credito.requisitos && credito.requisitos.length > 0) {
            credito.requisitos.forEach(req => {
                const li = document.createElement('li');
                li.className = 'mb-2';
                li.textContent = req;
                requisitosList.appendChild(li);
            });
        } else {
            requisitosList.innerHTML = '<li class="text-muted">No hay requisitos específicos listados</li>';
        }

        // Scroll al detalle
        document.getElementById('detalle-credito').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error mostrando detalle:', error);
        alert('Error al cargar los detalles del crédito');
    }
}

// ===== CONVENIOS =====
async function loadConvenios() {
    try {
        // Datos de convenios simulados (en producción sería una llamada API)
        const conveniosData = [
            {
                id: 1,
                empresa: "Clínica Foscal Internacional",
                categoria: "Salud",
                descripcion: "Descuentos especiales en consultas médicas, exámenes diagnósticos, procedimientos y hospitalización para asociados FEUIS y sus familias.",
                beneficios: [
                    "20% descuento en consultas médicas especializadas",
                    "15% descuento en exámenes de laboratorio e imagenología",
                    "10% descuento en procedimientos quirúrgicos",
                    "Plan dental familiar con 25% de descuento",
                    "Acceso prioritario a urgencias"
                ],
                validoHasta: "31/12/2026",
                contacto: "contacto@foscal.com - Tel: 607-1234567"
            },
            {
                id: 2,
                empresa: "Universidad Industrial de Santander",
                categoria: "Educación",
                descripcion: "Beneficios exclusivos en programas de posgrado, educación continua y formación especializada para asociados y familiares directos.",
                beneficios: [
                    "15% descuento en matrícula de posgrados",
                    "10% descuento en programas de educación continua",
                    "Acceso gratuito a biblioteca digital UIS",
                    "Talleres de finanzas personales sin costo",
                    "Prioridad en procesos de admisión"
                ],
                validoHasta: "30/06/2027",
                contacto: "convenios@uis.edu.co - Tel: 607-6344000"
            },
            {
                id: 3,
                empresa: "Decameron Colombia",
                categoria: "Turismo",
                descripcion: "Tarifas especiales en hoteles todo incluido a nivel nacional, con beneficios adicionales para nuestros asociados.",
                beneficios: [
                    "30% descuento en tarifas publicadas",
                    "Upgrade de habitación sujeto a disponibilidad",
                    "Masaje de bienvenida para dos personas",
                    "Tours y excursiones incluidos",
                    "Check-in y check-out prioritario"
                ],
                validoHasta: "15/12/2026",
                contacto: "grupos@decameron.com - Tel: 01-800-123456"
            },
            {
                id: 4,
                empresa: "Almacenes Éxito",
                categoria: "Compras",
                descripcion: "Descuentos en supermercado, electrodomésticos, tecnología y mercancía en general en todas las tiendas del país.",
                beneficios: [
                    "10% descuento en supermercado los martes y jueves",
                    "15% descuento en línea blanca y electrodomésticos",
                    "6 meses sin intereses en compras superiores a $500.000",
                    "Doble de puntos en el programa de fidelización",
                    "Despacho a domicilio sin costo"
                ],
                validoHasta: "31/12/2026",
                contacto: "empresas@exito.com - Tel: 607-7654321"
            },
            {
                id: 5,
                empresa: "Constructora Bolívar",
                categoria: "Vivienda",
                descripcion: "Condiciones especiales en proyectos de vivienda nueva y asesoría integral para crédito hipotecario con FEUIS.",
                beneficios: [
                    "5% descuento sobre el valor de la unidad",
                    "Asesoría legal gratuita en la compra",
                    "Garantía extendida a 5 años",
                    "Crédito directo con FEUIS sin intermediarios",
                    "Diseño personalizado de acabados"
                ],
                validoHasta: "30/09/2026",
                contacto: "proyectos@constructorabolivar.com - Tel: 607-9876543"
            },
            {
                id: 6,
                empresa: "Gym Power Fit",
                categoria: "Bienestar",
                descripcion: "Membresía corporativa con acceso a todas las sedes del país y clases dirigidas sin costo adicional.",
                beneficios: [
                    "40% descuento en membresía anual",
                    "Acceso ilimitado a todas las sedes nacionales",
                    "Clases grupales incluidas (spinning, yoga, etc.)",
                    "Evaluación física y nutricional gratuita",
                    "Invitado gratis los fines de semana"
                ],
                validoHasta: "31/12/2026",
                contacto: "corporativo@gympower.com - Tel: 607-4567890"
            }
        ];

        const container = document.getElementById('grid-convenios');
        if (!container) return;

        container.innerHTML = '';

        conveniosData.forEach(convenio => {
            const convenioCard = createConvenioCard(convenio);
            container.appendChild(convenioCard);
        });

    } catch (error) {
        console.error('Error cargando convenios:', error);
        document.getElementById('grid-convenios').innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Error cargando información de convenios.
                </div>
            </div>
        `;
    }
}

function createConvenioCard(convenio) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';

    // Color según categoría
    const categoryColors = {
        'Salud': 'bg-danger',
        'Educación': 'bg-success',
        'Turismo': 'bg-warning',
        'Compras': 'bg-info',
        'Vivienda': 'bg-secondary',
        'Bienestar': 'bg-primary'
    };

    const colorClass = categoryColors[convenio.categoria] || 'bg-primary';

    // Beneficios como HTML
    let beneficiosHTML = '';
    convenio.beneficios.forEach(beneficio => {
        beneficiosHTML += `
            <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${beneficio}</span>
            </div>
        `;
    });

    col.innerHTML = `
        <div class="convenio-card">
            <div class="convenio-header">
                <div class="convenio-category ${colorClass}">${convenio.categoria}</div>
                <h3 class="convenio-empresa">${convenio.empresa}</h3>
                <p class="opacity-90 mb-0">Válido hasta: ${convenio.validoHasta}</p>
            </div>
            
            <div class="convenio-body">
                <p class="convenio-desc">${convenio.descripcion}</p>
                
                <div class="convenio-benefits">
                    <h6 class="fw-bold mb-3">Beneficios:</h6>
                    ${beneficiosHTML}
                </div>
                
                <div class="convenio-footer">
                    <small class="text-muted">
                        <i class="fas fa-phone me-1"></i>
                        ${convenio.contacto.split(' - ')[1]}
                    </small>
                    <button class="btn btn-sm btn-outline-primary ver-convenio-btn" 
                            data-convenio-id="${convenio.id}">
                        Más información
                    </button>
                </div>
            </div>
        </div>
    `;

    return col;
}

// ===== EVENT LISTENERS GENERALES =====
function setupEventListeners() {
    // Oficina Virtual
    document.getElementById('oficinaVirtualBtn')?.addEventListener('click', function () {
        alert('Acceso a Oficina Virtual\n\nEn una implementación completa, aquí se redirigiría al portal seguro de autenticación de FEUIS.');
    });

    // Simular crédito desde detalle
    document.getElementById('simular-credito-detalle')?.addEventListener('click', function () {
        alert('Simulador de Crédito\n\nEsta función abriría un formulario interactivo para simular las condiciones del crédito seleccionado, incluyendo cálculo de cuota, tasa de interés y tabla de amortización.');
    });

    // Solicitar crédito
    document.getElementById('solicitar-credito')?.addEventListener('click', function () {
        alert('Solicitud de Crédito\n\nSe redirigiría al formulario de solicitud con prefilled de la información del crédito seleccionado.');
    });

    // Ver detalles de convenio
    document.addEventListener('click', function (e) {
        if (e.target.closest('.ver-convenio-btn')) {
            const btn = e.target.closest('.ver-convenio-btn');
            const convenioId = btn.getAttribute('data-convenio-id');
            alert(`Detalles del convenio #${convenioId}\n\nInformación completa del convenio, documentos requeridos, contacto directo y formulario de solicitud de beneficios.`);
        }
    });

    // Setup detalle de crédito
    setupDetalleCredito();

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INICIALIZAR COMPONENTES BOOTSTRAP =====
function initBootstrapComponents() {
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Modales
    const pseModal = document.getElementById('pseModal');
    if (pseModal) {
        new bootstrap.Modal(pseModal);
    }
}

// ===== FUNCIONES UTILITARIAS =====
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
}

function isMobile() {
    return window.innerWidth <= 768;
}

// Manejar redimensionamiento
window.addEventListener('resize', function () {
    // Recalcular alturas si es necesario
});

console.log('FEUIS - Aplicación cargada exitosamente');