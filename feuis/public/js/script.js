// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('FEUIS - Inicializando aplicación');

    // Inicializar Swiper para el hero
    initSwiper();


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

console.log('FEUIS - Aplicación cargada exitosamente');