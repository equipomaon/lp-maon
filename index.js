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

// ================== 7. LÓGICA DEL QUIZ INTERACTIVO ==================
let score = 0; // Variable global para seguir el puntaje

// Función para avanzar entre preguntas
function nextStep(step, points) {
    score += points;
    
    // 1. Actualizar la barra de progreso visual
    // Calculamos el progreso basado en 3 pasos totales
    const progress = (step / 3) * 100;
    const progressBar = document.getElementById('quizProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    
    // 2. Cambiar la visibilidad de los pasos
    // Ocultamos todos los pasos y mostramos solo el actual
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const nextStepEl = document.getElementById('step' + step);
    if (nextStepEl) {
        nextStepEl.classList.add('active');
    }
}

// Función para mostrar el resultado final y preparar el formulario
function showResult(area) {
    // 1. Ocultar preguntas y mostrar pantalla de resultados
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const resultStep = document.getElementById('stepResult');
    if (resultStep) {
        resultStep.classList.add('active');
    }
    
    // 2. Completar la barra de progreso al 100%
    const progressBar = document.getElementById('quizProgress');
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    
    // 3. Calcular el porcentaje de automatización
    // Sumamos un margen base y limitamos a 97% para realismo
    let finalPercent = Math.min(score + 15, 97);
    
    // 4. Inyectar los datos en el HTML del Modal
    document.getElementById('percentNumber').innerText = finalPercent + '%';
    document.getElementById('areaDetectada').innerText = area;
    
    // 5. Guardar el resultado en el campo oculto del formulario
    // Esto es lo que te llegará a tu correo de Formspree
    const hiddenInput = document.getElementById('quizHiddenInput');
    if (hiddenInput) {
        hiddenInput.value = `Potencial: ${finalPercent}%, Área de interés: ${area}`;
    }
}