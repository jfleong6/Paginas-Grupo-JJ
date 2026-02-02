let allVideos = [];

const ICON_PATH = '/static/img/icono.png';

// 1. TEMA CLARO / OSCURO
const themeToggle = document.getElementById('theme-toggle');
const themeDot = document.getElementById('theme-toggle-dot');
const body = document.body;

// Función para aplicar el tema
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        themeDot.style.transform = 'translateX(24px)'; // Mueve el punto a la derecha
        themeToggle.classList.replace('bg-gray-200', 'bg-indigo-600');
    } else {
        body.classList.remove('dark');
        themeDot.style.transform = 'translateX(4px)'; // Mueve el punto a la izquierda
        themeToggle.classList.replace('bg-indigo-600', 'bg-gray-200');
    }
}

// Cargar preferencia inicial
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// 2. CARGA DE DATOS
async function loadVideos() {
    const playlist = document.getElementById('playlist');
    const spinner = document.getElementById('loading-spinner');

    try {
        const response = await fetch("/api/videos");
        const data = await response.json();

        // 1. Manejar Instalador
        if (data.instalador) {
            document.getElementById('installer-container').classList.remove('hidden');
            document.getElementById('installer-link').href = data.instalador.downloadLink;
            document.getElementById('installer-name').innerText = data.instalador.name;
        }

        // 2. Ocultar el Spinner
        if (spinner) spinner.remove(); // Eliminamos el cargador de la vista

        // 3. Cargar Videos
        allVideos = data.videos || [];
        renderPlaylist(allVideos);

    } catch (error) {
        console.error('Error:', error);
        // En caso de error, mostramos un mensaje en lugar del spinner
        playlist.innerHTML = `
            <div class="p-4 text-center">
                <p class="text-xs text-red-500 font-bold uppercase">Error de conexión</p>
                <p class="text-[10px] text-gray-400">Verifica tu internet o los permisos de Drive</p>
            </div>`;
    }
}

// 3. RENDERIZADO
function renderPlaylist(videos) {
    const playlist = document.getElementById('playlist');
    playlist.innerHTML = '';

    videos.forEach((item, index) => {
        const card = document.createElement('div');
        
        // Si es Excel, le damos un estilo ligeramente diferente (borde verde sutil)
        const isExcel = item.name.toLowerCase().endsWith('.xlsx') || item.name.toLowerCase().endsWith('.xls');
        
        card.className = `fade-in flex gap-4 p-3 rounded-2xl cursor-pointer transition-all border group mb-2 
            ${isExcel ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-gray-100 dark:border-transparent bg-gray-50/50 dark:bg-transparent'}`;

        const thumbUrl = `https://drive.google.com/thumbnail?id=${item.id}&sz=w220`;

        card.innerHTML = `
            <div class="relative flex-shrink-0 w-24 h-14 bg-gray-200 dark:bg-[#111] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <img src="${isExcel ? '/static/img/icono.png' : thumbUrl}" 
                     onerror="this.src='${ICON_PATH}'; this.style.opacity='0.2'; this.style.padding='8px';"
                     class="w-full h-full object-cover transition-transform group-hover:scale-110 ${isExcel ? 'opacity-20 grayscale p-2' : ''}">
                
                ${isExcel ? `
                <div class="absolute inset-0 flex items-center justify-center bg-emerald-600/10">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>` : ''}
            </div>
            <div class="flex flex-col justify-center min-w-0 flex-1">
                <span class="text-[8px] ${isExcel ? 'text-emerald-600' : 'text-indigo-600 dark:text-indigo-400'} font-black tracking-widest uppercase">
                    ${isExcel ? 'Plantilla Descargable' : `Módulo ${index + 1}`}
                </span>
                <h3 class="text-[11px] font-bold text-gray-700 dark:text-gray-300 truncate uppercase transition-colors group-hover:text-indigo-600 dark:group-hover:text-white">
                    ${item.name}
                </h3>
            </div>
            ${isExcel ? `
            <div class="flex items-center pr-2">
                <div class="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                </div>
            </div>` : ''}
        `;

        card.onclick = () => {
            if (isExcel) {
                // Si es Excel, descargamos directamente
                window.open(item.downloadLink, '_blank');
            } else {
                // Si es video, resaltamos y reproducimos
                document.querySelectorAll('.video-card-active').forEach(c => c.classList.remove('ring-2', 'ring-indigo-500', 'video-card-active'));
                card.classList.add('ring-2', 'ring-indigo-500', 'video-card-active');
                playVideo(item.embedLink, item.name);
            }
        };
        playlist.appendChild(card);
    });
}

function playVideo(url, title) {
    const player = document.getElementById('main-player');
    const info = document.getElementById('video-info');
    
    document.getElementById('placeholder').classList.add('hidden');
    player.classList.remove('hidden');
    player.src = url;

    document.getElementById('current-title').innerText = title;
    info.classList.replace('opacity-0', 'opacity-100');
    info.classList.replace('translate-y-4', 'translate-y-0');

    if (window.innerWidth < 768) {
        document.querySelector('section').scrollIntoView({ behavior: 'smooth' });
    }
}
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.querySelector('aside');

// Crear el overlay (fondo oscuro) si no existe
let overlay = document.querySelector('.menu-overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay fixed inset-0 bg-black/50 z-[40] hidden transition-opacity duration-300';
    document.body.appendChild(overlay);
}

function toggleMenu() {
    const isOpen = sidebar.classList.toggle('menu-open');
    overlay.classList.toggle('hidden');
    
    // Cambiar icono: Hamburguesa <-> X
    if (isOpen) {
        menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
    } else {
        menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>`;
    }
}

menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.addEventListener('DOMContentLoaded', loadVideos);