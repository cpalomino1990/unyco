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

  // Crear un elemento  en el centro de la barra
  const centerElement = document.createElement('span');
  centerElement.classList.add('center-element');
  centerElement.textContent = '🤩'; // Puedes usar cualquier cosa aquí )
  readingBar.appendChild(centerElement);

  // Llamar a la función que mueve la barra
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
 * La barra se mantiene dentro de los límites de la pantalla.
 * @param {MouseEvent} event - Evento del mouse.
 */
function moveReadingBar(event) {
  const readingBar = document.querySelector('.reading-bar');
  const centerElement = document.querySelector('.center-element');
  
  if (readingBar && centerElement) {
      // Obtener el tamaño de la barra y el span
      const barWidth = readingBar.offsetWidth;
      const barHeight = readingBar.offsetHeight;
      const centerWidth = centerElement.offsetWidth;

      // Calcular la nueva posición de la barra
      let newLeft = event.clientX - barWidth / 2;
      let newTop = event.clientY - barHeight / 2;

      // Limitar la barra dentro de la pantalla (evitar que salga por los bordes)
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - barWidth));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - barHeight));

      // Posicionar la barra
      readingBar.style.left = `${newLeft}px`;
      readingBar.style.top = `${newTop}px`;

      // Mover el elemento (span) horizontalmente sobre la barra
      const offset = event.clientX - newLeft; // Posición horizontal del puntero dentro de la barra
      centerElement.style.left = `${offset - centerWidth / 2}px`; // Centrar el span dentro de la barra
  }

}
