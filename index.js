// ================== 1. SELECCIÓN DE ELEMENTOS DEL CARRUSEL ==================
const cards = document.querySelectorAll('.card');

// ================== 2. CONFIGURACIÓN DEL ESTADO INICIAL (CENTRO ACTIVO) ==================
// Al cargar la página, la tarjeta del medio (índice 1) se activa por defecto
if (cards.length > 1) {
    cards[1].classList.add('active');
}

// ================== 3. LÓGICA DE INTERACCIÓN POR MOVIMIENTO DEL RATÓN (HOVER) ==================
cards.forEach((card) => {
    // Evento cuando el ratón entra en una tarjeta
    card.addEventListener('mouseenter', () => {
        // Quitamos el brillo a todas las tarjetas
        cards.forEach(c => c.classList.remove('active'));
        // Activamos solo la tarjeta donde está el cursor
        card.classList.add('active');
    });

    // Evento cuando el ratón sale de una tarjeta
    card.addEventListener('mouseleave', () => {
        // Llamamos a la función de reseteo para que la del medio vuelva a brillar
        resetToDefault();
    });
});

// ================== 4. FUNCIÓN DE RESETEO AUTOMÁTICO AL CENTRO ==================
function resetToDefault() {
    // Usamos un pequeño retraso para verificar si el ratón entró en otra tarjeta
    setTimeout(() => {
        const isAnyHovered = Array.from(cards).some(c => c.matches(':hover'));
        
        // Si el ratón no está sobre ninguna tarjeta del carrusel, activamos la central
        if (!isAnyHovered && cards.length > 1) {
            cards.forEach(c => c.classList.remove('active'));
            cards[1].classList.add('active');
        }
    }, 150); // 150ms de tolerancia para suavidad visual
}

// ================== 5. AJUSTE DE RESPONSIVIDAD (RESIZE) ==================
window.addEventListener('resize', () => {
    // En caso de cambio de pantalla, aseguramos que el estado visual sea el correcto
    cards.forEach(c => c.classList.remove('active'));
    if (cards.length > 1) cards[1].classList.add('active');
});

// ================== 6. LÓGICA DE CIERRE AUTOMÁTICO DEL NAVBAR (MÓVIL) ==================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos todos los enlaces que llevan a una sección (#)
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 2. Seleccionamos el contenedor del menú desplegable (asegúrate que el ID sea 'navbarNav')
    const menuCollapse = document.getElementById('navbarNav');

    // 3. Verificamos que el menú exista para evitar errores
    if (menuCollapse) {
        // Inicializamos el controlador de Bootstrap para el menú
        const bsCollapse = new bootstrap.Collapse(menuCollapse, { toggle: false });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                // Solo cerramos si el menú está desplegado (tiene la clase 'show')
                // Esto evita conflictos en la versión de escritorio
                if (menuCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }
});