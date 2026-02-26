// Selección de elementos del DOM
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;

// Función para mover el carrusel
function updatePosition() {
    // Calculamos el ancho de una carta + el espacio (gap)
    const cardWidth = track.children[0].offsetWidth + 30; 
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

// Evento Botón Siguiente
nextBtn.addEventListener('click', () => {
    // Determinamos cuántas cartas se ven (3 en PC, 1 en móvil)
    const cardsVisible = window.innerWidth > 768 ? 3 : 1;
    const maxIndex = track.children.length - cardsVisible;

    if (index < maxIndex) {
        index++;
        updatePosition();
    } else {
        // Opcional: Volver al inicio si llega al final
        index = 0;
        updatePosition();
    }
});

// Evento Botón Anterior
prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updatePosition();
    } else {
        // Opcional: Ir al final si está en el inicio
        const cardsVisible = window.innerWidth > 768 ? 3 : 1;
        index = track.children.length - cardsVisible;
        updatePosition();
    }
});

// Reajustar si el usuario cambia el tamaño de la pantalla
window.addEventListener('resize', () => {
    index = 0; // Reiniciamos para evitar errores de cálculo
    updatePosition();
});