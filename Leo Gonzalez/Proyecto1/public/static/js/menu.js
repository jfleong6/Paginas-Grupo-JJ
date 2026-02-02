// menu.js - Versión simplificada para menú mobile
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuMobileTrigger = document.getElementById('menuMobileTrigger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuCerrar = document.getElementById('mobileMenuCerrar');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    
    // Abrir menú mobile
    function abrirMenuMobile() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Pequeño delay para la animación
        setTimeout(() => {
            mobileMenuOverlay.style.opacity = '1';
        }, 10);
    }
    
    // Cerrar menú mobile
    function cerrarMenuMobile() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.style.opacity = '0';
        
        setTimeout(() => {
            mobileMenuOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Event listeners
    if (menuMobileTrigger) {
        menuMobileTrigger.addEventListener('click', abrirMenuMobile);
    }
    
    if (mobileMenuCerrar) {
        mobileMenuCerrar.addEventListener('click', cerrarMenuMobile);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', cerrarMenuMobile);
    }
    
    // Cerrar al hacer clic en un enlace del menú
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo cerrar si no es un enlace externo
            if (this.getAttribute('href').startsWith('#')) {
                cerrarMenuMobile();
                
                // Scroll suave a la sección
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            }
        });
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            cerrarMenuMobile();
        }
    });
    
    // Navbar scroll effect para desktop
    const navbarDesktop = document.getElementById('navbarDesktop');
    if (navbarDesktop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbarDesktop.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                navbarDesktop.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbarDesktop.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                navbarDesktop.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        });
    }
});

// video-controls.js - Control para videos en galería
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.galeria-video');
    
    videoItems.forEach(video => {
        // Asegurar que el video se cargue correctamente
        video.addEventListener('loadeddata', function() {
            console.log('Video cargado:', this.src);
        });
        
        // Manejar errores de carga
        video.addEventListener('error', function() {
            console.error('Error cargando video:', this.src);
            // Puedes mostrar una imagen de fallback aquí
            const parent = this.parentElement;
            if (parent.classList.contains('video-item')) {
                parent.style.background = 'var(--color-azul-primario)';
                parent.innerHTML = '<div style="color: white; display: flex; align-items: center; justify-content: center; height: 100%;">Video no disponible</div>';
            }
        });
        
        // Pausar video cuando no está visible (opcional)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            {
                threshold: 0.5 // Cuando el 50% del video es visible
            }
        );
        
        observer.observe(video);
    });
    
    // Control para pausar todos los videos cuando el menú se abre
    const menuTrigger = document.getElementById('menuMobileTrigger');
    if (menuTrigger) {
        menuTrigger.addEventListener('click', function() {
            videoItems.forEach(video => {
                video.pause();
            });
        });
    }
});