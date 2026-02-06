document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    // El tiempo debe ser un poco menor al de la animación CSS 
    // para que el desvanecimiento sea fluido.
    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 2800); 
});

// Suavizado de scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});