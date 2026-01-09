// JavaScript para la página de Bodas

document.addEventListener('DOMContentLoaded', function() {
    // Botón dinámico de redes sociales
    const socialToggle = document.getElementById('socialToggle');
    const socialText = document.querySelector('.social-text');
    const socialIcon = socialToggle.querySelector('i');
    
    // Redes sociales disponibles
    const socialNetworks = [
        { name: 'Instagram', icon: 'fab fa-instagram', color: '#E4405F' },
        { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2' },
        { name: 'Facebook', icon: 'fab fa-facebook', color: '#1877F2' }
    ];
    
    let currentSocialIndex = 0;
    
    // Función para cambiar la red social
    function toggleSocialNetwork() {
        currentSocialIndex = (currentSocialIndex + 1) % socialNetworks.length;
        const network = socialNetworks[currentSocialIndex];
        
        // Actualizar texto y icono
        socialText.textContent = network.name;
        socialIcon.className = network.icon;
        
        // Cambiar color de fondo
        socialToggle.style.backgroundColor = network.color;
    }
    
    // Cambiar red social cada 5 segundos
    setInterval(toggleSocialNetwork, 5000);
    
    // También cambiar al hacer clic
    socialToggle.addEventListener('click', toggleSocialNetwork);
    
    // Efecto especial en la imagen
    const specialImage = document.getElementById('specialImage');
    
    // Añadir evento para el efecto hover
    specialImage.addEventListener('mouseenter', function() {
        // Asegurarse de que el overlay sea visible
        const overlay = this.querySelector('.image-overlay');
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.backdropFilter = 'blur(5px)';
        
        const overlayContent = overlay.querySelector('.overlay-content');
        overlayContent.style.opacity = '1';
        overlayContent.style.transform = 'translateY(0)';
    });
    
    specialImage.addEventListener('mouseleave', function() {
        // Restaurar el estado inicial
        const overlay = this.querySelector('.image-overlay');
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        overlay.style.backdropFilter = 'blur(0px)';
        
        const overlayContent = overlay.querySelector('.overlay-content');
        overlayContent.style.opacity = '0';
        overlayContent.style.transform = 'translateY(20px)';
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const fecha = document.getElementById('fecha').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (!nombre || !email || !fecha || !mensaje) {
                alert('Por favor, completa todos los campos obligatorios (*)');
                return;
            }
            
            // En un caso real, aquí enviarías los datos al servidor
            // Por ahora, simulamos el envío exitoso
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('¡Gracias! Hemos recibido tu consulta. Nos pondremos en contacto contigo en las próximas 24 horas.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Desplazar al inicio del formulario para confirmación
                window.scrollTo({
                    top: contactForm.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 1500);
        });
    }
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Añadir efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.page-header');
        
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Animación para las tarjetas de servicios al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas de servicios
    document.querySelectorAll('.servicio-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});