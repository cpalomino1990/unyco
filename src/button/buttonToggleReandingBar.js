


/**
 * Alterna la barra de lectura activándola o desactivándola y cambia el texto del botón.
 */
export function toggleReadingBar() {
const button = document.getElementById("toggle-reading-bar");
if (document.querySelector('.reading-bar')) {
  deactivateReadingBar();
  button.textContent = "Activar Barra de lectura";
} else {
  activateReadingBar();
  button.textContent = "Desactivar Barra de lectura";
}
}

/**
 * Activa la barra de lectura que sigue el cursor.
 */
  function activateReadingBar() {
const style = document.createElement('style');
style.id = 'reading-bar-style';

document.head.appendChild(style);

const readingBar = document.createElement('div');
readingBar.classList.add('reading-bar');
document.body.appendChild(readingBar);

document.addEventListener('mousemove', moveReadingBar);
}

/**
 * Desactiva la barra de lectura eliminándola del DOM.
 */
function deactivateReadingBar() {
const readingBar = document.querySelector('.reading-bar');
if (readingBar) readingBar.remove();

const style = document.getElementById('reading-bar-style');
if (style) style.remove();

document.removeEventListener('mousemove', moveReadingBar);
}

/**
 * Mueve la barra de lectura siguiendo la posición del cursor.
 * @param {MouseEvent} event - Evento del mouse.
 */
function moveReadingBar(event) {
  const readingBar = document.querySelector('.reading-bar');
  if (readingBar) {
    readingBar.style.top = `${event.clientY}px`;
  }
}



