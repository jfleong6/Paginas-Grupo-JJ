const creditosData = [
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
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/inmediatopng-p4ypo3j3xbqd9kuoy3ym2lpxx5qwgdnraqv73zf2k4.png",
        "descripcion": "Línea de crédito diseñada para atender necesidades urgentes de forma ágil.",
        "condiciones": {
            "valor_maximo": "1 SMMLV",
            "plazo_maximo_meses": 5
        },
        "requisitos": [
            "Formato de solicitud de crédito.",
            "Última tira de pago.",
            "Estudio de crédito.",
            "No requiere antigüedad en el fondo."
        ]
    },
    {
        "id": "credito_rotativo",
        "nombre": "Crédito Rotativo",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/credito-rotativo-p4za8yxlfn70xt6ntk4t0j3a3jjevgm3gpi5zhagtw.png",
        "descripcion": "Línea de crédito que se renueva automáticamente a medida que se libera el cupo.",
        "condiciones": {
            "valor_maximo": 3000000,
            "plazo_maximo_meses": 12
        },
        "requisitos": [
            "Formato de solicitud.",
            "Dos últimas tiras de pago.",
            "Estudio de crédito.",
            "Mínimo 4 meses de antigüedad."
        ]
    },
    {
        "id": "refinanciacion",
        "nombre": "Refinanciación",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2022-10-19-at-10.16.51-AM-1-pwg6727mm4d51uga3vuzw7s3dzocat756b4fbp0xx0.jpeg",
        "descripcion": "Permite unificar o mejorar las condiciones de créditos vigentes.",
        "condiciones": {
            "valor_maximo": "Total de las obligaciones",
            "plazo_maximo_meses": 36
        },
        "requisitos": [
            "Formato de solicitud.",
            "Última tira de pago.",
            "Certificado laboral.",
            "No requiere antigüedad."
        ]
    },
    {
        "id": "credito_convenios",
        "nombre": "Crédito por Convenios",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/credito-convenios-p4ynm1stj6d6ngetc3onnaep8epy2rozs8q6397kqc.png",
        "descripcion": "Crédito destinado a la adquisición de bienes y servicios a través de convenios.",
        "condiciones": {
            "valor_maximo": 6000000,
            "plazo_maximo_meses": 36
        },
        "requisitos": [
            "Formato de solicitud.",
            "Dos últimas tiras de pago.",
            "Estudio de crédito.",
            "No requiere antigüedad."
        ]
    },
    {
        "id": "credito_primas",
        "nombre": "Crédito de Primas",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/credito-de-primas-p4ype7a9z46p1d85qbz0blm8s4isf3dhlrm6843a2c.png",
        "descripcion": "Crédito otorgado con base en el valor de la prima legal.",
        "condiciones": {
            "valor_maximo": "90% de la prima",
            "plazo_maximo_meses": 1
        },
        "requisitos": [
            "Formato de solicitud.",
            "Certificado laboral.",
            "Estudio de crédito.",
            "Mínimo 4 meses de afiliación."
        ]
    },
    {
        "id": "crediaportes",
        "nombre": "Crediaportes",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/crediaportes-e1617055234298-p4y7ugx6qle440uplrgl1iko2g906cfvqzd7uarlx0.png",
        "descripcion": "Crédito respaldado por los aportes y ahorros permanentes del asociado.",
        "condiciones": {
            "valor_maximo": "5 veces los aportes",
            "plazo_maximo_meses": 36
        },
        "requisitos": [
            "Formato de solicitud.",
            "Dos últimas tiras de pago.",
            "Estudio de crédito.",
            "Mínimo 4 meses de afiliación."
        ]
    },
    {
        "id": "crediaportes_plus",
        "nombre": "Crediaportes Plus",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/crediaportes-e1617055234298-p4y7ugx6qle440uplrgl1iko2g906cfvqzd7uarlx0.png",
        "descripcion": "Línea especial para asociados con mayor nivel de aportes.",
        "condiciones": {
            "valor_maximo": 50000000,
            "plazo_maximo_meses": 60
        },
        "requisitos": [
            "Formato de solicitud.",
            "Soporte de aportes.",
            "Estudio de crédito.",
            "Cumplir monto mínimo de aportes."
        ]
    },
    {
        "id": "impuestos_seguros",
        "nombre": "Impuestos y Seguros",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/impuestos-y-seguros-p4yqbvu3lpk3r6sj3leythfvh9yqo5ty7gmxs4irp0.png",
        "descripcion": "Crédito destinado a la compra de diferentes seguros y al pago de impuestos de vehículos, predios y otros conceptos que abarquen esta línea.",
        "condiciones": {
            "valor_maximo": "Hasta 2.5 veces aportes y ahorros",
            "plazo_maximo_meses": 12
        },
        "requisitos": [
            "Diligenciar formato de solicitud de crédito.",
            "Adjuntar dos últimas tiras de pago y certificado laboral donde se demuestre salario y antigüedad.",
            "Sujeto a estudio de crédito para evaluar capacidad de endeudamiento y pago por nómina, incluyendo consulta en centrales de riesgo.",
            "Tener como mínimo 4 meses de antigüedad en el fondo."
        ]
    },
    {
        "id": "salud_odontologia",
        "nombre": "Salud y Odontología",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/salud-odontologia-p4z9vu4rxz7spy9fidrgocefaq9sbph3zpcxlarhro.png",
        "descripcion": "Destinado a cubrir gastos derivados de la prevención, corrección y atención médica y odontológica del asociado y/o su núcleo familiar, debidamente soportados.",
        "condiciones": {
            "valor_maximo": "Hasta 2.5 veces aportes y ahorros",
            "plazo_maximo_meses": 24
        },
        "requisitos": [
            "Diligenciar formato de solicitud de crédito.",
            "Adjuntar dos últimas tiras de pago y certificado laboral donde se demuestre salario y antigüedad.",
            "Sujeto a estudio de crédito para evaluar capacidad de endeudamiento y pago por nómina, incluyendo consulta en centrales de riesgo.",
            "Presentar factura de la entidad que realiza el cobro, a la cual se girarán los recursos.",
            "Tener como mínimo 4 meses de afiliación al fondo."
        ]
    },
    {
        "id": "recreacion_turismo",
        "nombre": "Recreación y Turismo",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/turismo-e1617060408968-p4yblka4zeboqgmer5oaefblm2e4gar2zmrgvygnn8.png",
        "descripcion": "Crédito otorgado para la adquisición de paquetes turísticos, tiquetes aéreos o terrestres y actividades relacionadas con la recreación y el turismo.",
        "condiciones": {
            "valor_maximo": 6000000,
            "plazo_maximo_meses": 24
        },
        "requisitos": [
            "Diligenciar formato de solicitud de crédito.",
            "Adjuntar dos últimas tiras de pago y certificado laboral donde se demuestre salario y antigüedad.",
            "Sujeto a estudio de crédito para evaluar capacidad de endeudamiento y pago por nómina, incluyendo consulta en centrales de riesgo.",
            "Presentar factura o cotización del servicio turístico.",
            "Tener como mínimo 4 meses de afiliación al fondo.",
            "Aplican términos y condiciones del crédito."
        ]
    },
    {
        "id": "compra_cartera",
        "nombre": "Compra de Cartera",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/credito-para-compra-de-cartera-p4ypz0fnw025naep98w0tc2sjyu1isltrx3trv7mt0.png",
        "descripcion": "Crédito otorgado para la compra de cartera adquirida con personas jurídicas legalmente constituidas, diferentes a FEUIS.",
        "condiciones": {
            "valor_maximo": "Sujeto a capacidad de endeudamiento",
            "plazo_maximo_meses": 36
        },
        "requisitos": [
            "Diligenciar formato de solicitud de crédito.",
            "Adjuntar dos últimas tiras de pago y certificado laboral donde se especifique salario y antigüedad.",
            "Presentar extracto o certificación de la entidad a la cual se le comprará la cartera.",
            "El fondo realizará directamente el pago de la obligación adquirida.",
            "Sujeto a estudio de crédito para evaluar capacidad de endeudamiento y pago por nómina, incluyendo consulta en centrales de riesgo.",
            "Tener como mínimo 4 meses de antigüedad en el fondo."
        ]
    },
    {
        "id": "credito_educacion",
        "nombre": "Crédito de Educación",
        "imagen": "https://feuis.com/wp-content/uploads/elementor/thumbs/educacion-p4yo99fcaw53csp0smvzpxjhbyb95oudb4otq8sl2s.png",
        "descripcion": "Crédito exclusivo para financiar programas educativos, matrículas, pensiones, cursos de capacitación y la compra de materiales e implementos educativos para el asociado y su núcleo familiar.",
        "condiciones": {
            "valor_maximo": "Hasta el 100% del valor",
            "plazo_maximo_meses": 12
        },
        "requisitos": [
            "Diligenciar formato de solicitud de crédito.",
            "Adjuntar dos últimas tiras de pago y certificado laboral donde se demuestre salario y antigüedad.",
            "Presentar recibo expedido por el ente educativo o proveedor del bien o servicio.",
            "El crédito será girado directamente al ente educativo o proveedor correspondiente.",
            "Sujeto a estudio de crédito para evaluar capacidad de endeudamiento y pago por nómina, incluyendo consulta en centrales de riesgo.",
            "Tener como mínimo 4 meses de antigüedad en el fondo."
        ]
    }
]

// ===== SISTEMA DEL CARRUSEL =====
class CarruselCreditos {
    constructor() {
        this.currentIndex = 0;
        this.totalSlides = creditosData.length;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.renderCarousel();
        this.renderThumbnails();
        this.setupEventListeners();
    }

    // ===== RENDERIZAR CARRUSEL PRINCIPAL =====
    renderCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        carouselTrack.innerHTML = '';

        creditosData.forEach((credito, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;

            // Determinar categoría del crédito
            const categoria = this.getCategoriaFromId(credito.id);

            // Formatear condiciones para mostrar
            let condicionesHTML = '';
            if (credito.condiciones && Object.keys(credito.condiciones).length > 0) {
                Object.entries(credito.condiciones).forEach(([key, value]) => {
                    let label = this.formatLabel(key);
                    let displayValue = this.formatValue(value);

                    condicionesHTML += `
                                <div class="condition-item">
                                    <span class="condition-value">${displayValue}</span>
                                    <span class="condition-label">${label}</span>
                                </div>
                            `;
                });
            } else {
                condicionesHTML = `
                            <div class="condition-item">
                                <span class="condition-value">Consultar</span>
                                <span class="condition-label">Condiciones</span>
                            </div>
                        `;
            }

            slide.innerHTML = `
                        <div class="slide-image" style="background-image: url('${credito.imagen}')"></div>
                        <div class="slide-overlay"></div>
                        <div class="slide-content">
                            <div class="slide-info">
                                <span class="slide-category">${categoria}</span>
                                <h2 class="slide-title">${credito.nombre}</h2>
                                <p class="slide-desc">${credito.descripcion}</p>
                                
                                <div class="slide-conditions">
                                    ${condicionesHTML}
                                    <div class="condition-item">
                                        <span class="condition-value">${credito.requisitos.length}</span>
                                        <span class="condition-label">Requisitos</span>
                                    </div>
                                </div>
                                
                                <div class="slide-actions">
                                    <button class="btn btn-primary" onclick="carrusel.verDetalles(${index})">
                                        <i class="fas fa-info-circle"></i>
                                        Ver Detalles Completos
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;

            carouselTrack.appendChild(slide);
        });
    }

    // ===== RENDERIZAR MINIATURAS =====
    renderThumbnails() {
        const thumbnailsTrack = document.getElementById('thumbnailsTrack');
        thumbnailsTrack.innerHTML = '';

        creditosData.forEach((credito, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.dataset.index = index;

            // Determinar categoría
            const categoria = this.getCategoriaFromId(credito.id);

            thumbnail.innerHTML = `
                        <div class="thumbnail-number">${index + 1}</div>
                        <img src="${credito.imagen}" alt="${credito.nombre}" class="thumbnail-image" loading="lazy">
                        <div class="thumbnail-info">
                            <div class="thumbnail-title">${credito.nombre}</div>
                            <div class="thumbnail-category">${categoria}</div>
                        </div>
                    `;

            thumbnail.addEventListener('click', () => {
                if (!this.isAnimating) {
                    this.goToSlide(index);
                }
            });

            thumbnailsTrack.appendChild(thumbnail);
        });
    }

    // ===== NAVEGACIÓN =====
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;

        this.isAnimating = true;
        this.currentIndex = index;

        // Mover carrusel principal
        const carouselTrack = document.getElementById('carouselTrack');
        carouselTrack.style.transform = `translateX(-${index * 100}%)`;

        // Actualizar miniaturas activas
        this.updateActiveThumbnail();



        // Centrar miniatura en vista
        this.scrollThumbnailIntoView();

        // Habilitar animación después de un tiempo
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    nextSlide() {
        if (this.isAnimating) return;

        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        if (this.isAnimating) return;

        const prevIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
        this.goToSlide(prevIndex);
    }

    // ===== ACTUALIZAR ESTADOS =====
    updateActiveThumbnail() {
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateCounter() {
        const counter = document.getElementById('counter');
        counter.textContent = `${this.currentIndex + 1} / ${this.totalSlides}`;
    }

    scrollThumbnailIntoView() {
        const activeThumbnail = document.querySelector(`.thumbnail[data-index="${this.currentIndex}"]`);
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }

    // ===== CONFIGURAR EVENT LISTENERS =====
    setupEventListeners() {
        // Botones de navegación
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key >= '1' && e.key <= '9') {
                const index = parseInt(e.key) - 1;
                if (index < this.totalSlides) this.goToSlide(index);
            }
        });

        // Swipe para móviles
        let startX = 0;
        let endX = 0;

        const carouselTrack = document.getElementById('carouselTrack');

        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        carouselTrack.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', () => {
            const diff = startX - endX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }

    // ===== FUNCIONALIDADES =====
    simularCredito(index) {
        const credito = creditosData[index];
        alert(`🚀 Simulando: ${credito.nombre}\n\nSe abriría el simulador interactivo para calcular:\n• Cuota mensual\n• Plazo\n• Intereses\n• Tabla de amortización`);
    }

    verDetalles(index) {
        const credito = creditosData[index];
        const modalOverlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('modal');

        // Determinar categoría
        const categoria = this.getCategoriaFromId(credito.id);

        // Crear HTML de requisitos
        let requisitosHTML = '';
        credito.requisitos.forEach((req, i) => {
            requisitosHTML += `
                        <li style="margin-bottom: 8px; padding-left: 5px;">
                            <i class="fas fa-check-circle" style="color: #00A896; margin-right: 10px;"></i>
                            ${req}
                        </li>
                    `;
        });

        // Crear HTML de condiciones
        let condicionesHTML = '';
        if (credito.condiciones && Object.keys(credito.condiciones).length > 0) {
            condicionesHTML += '<h4 style="margin-bottom: 15px; color: #0A2463;">📊 Condiciones</h4>';
            condicionesHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">';

            Object.entries(credito.condiciones).forEach(([key, value]) => {
                let label = this.formatLabel(key);
                let displayValue = this.formatValue(value);

                condicionesHTML += `
                            <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px solid #E2E8F0;">
                                <div style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">${label}</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0A2463;">${displayValue}</div>
                            </div>
                        `;
            });

            condicionesHTML += '</div>';
        }

        modal.innerHTML = `
                    <button class="modal-close" onclick="carrusel.cerrarModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div style="padding: 40px;">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0A2463, #3E78B2); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 22px;">
                                ${index + 1}
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">${categoria}</div>
                                <h2 style="font-size: 28px; font-weight: 900; color: #0A2463; margin: 0;">${credito.nombre}</h2>
                            </div>
                        </div>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #64748B; margin-bottom: 30px;">${credito.descripcion}</p>
                        
                        ${condicionesHTML}
                        
                        <h4 style="margin-bottom: 15px; color: #0A2463;">📝 Requisitos (${credito.requisitos.length})</h4>
                        <ul style="margin-bottom: 30px; padding-left: 20px; color: #64748B;">
                            ${requisitosHTML}
                        </ul>
                        
                        
                    </div>
                `;

        modalOverlay.classList.add('active');
    }

    cerrarModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        modalOverlay.classList.remove('active');
    }

    // ===== FUNCIONES UTILITARIAS =====
    getCategoriaFromId(id) {
        const categorias = {
            'libre_inversion': 'Libre Inversión',
            'credito_inmediato': 'Emergencia',
            'credito_primas': 'Primas',
            'crediaportes': 'Aportes',
            'credito_rotativo': 'Rotativo',
            'credito_educativo': 'Educación',
            'credito_vehiculo': 'Vehículo',
            'credito_salud': 'Salud',
            'credito_vivienda': 'Vivienda',
            'credito_calidad_vida': 'Calidad de Vida',
            'credito_tecnologia': 'Tecnología',
            'credito_emergencia': 'Emergencia',
            'credito_especial': 'Especial'
        };

        return categorias[id] || 'General';
    }

    formatLabel(key) {
        const labels = {
            'valor_maximo': 'Valor Máximo',
            'plazo_maximo_meses': 'Plazo Máximo',
            'cobro': 'Cobro',
            'giro': 'Giro Directo',
            'renovable': 'Renovable',
            'autorizacion_gerencia': 'Autorización',
            'aprobacion_rapida': 'Aprobación Rápida',
            'evaluacion': 'Evaluación'
        };

        return labels[key] || key.replace('_', ' ').toUpperCase();
    }

    formatValue(value) {
        if (typeof value === 'number') {
            if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(0)}K`;
            }
            return `$${value}`;
        } else if (typeof value === 'boolean') {
            return value ? 'Sí' : 'No';
        }
        return value;
    }
}

// ===== INICIALIZAR CARRUSEL =====
let carrusel;

document.addEventListener('DOMContentLoaded', () => {
    carrusel = new CarruselCreditos();

    // Auto avanzar cada 8 segundos
    setInterval(() => {
        carrusel.nextSlide();
    }, 8000);

    console.log('✅ Carrusel de créditos FEUIS cargado');
});

// Exportar para uso en consola
window.carrusel = carrusel;
