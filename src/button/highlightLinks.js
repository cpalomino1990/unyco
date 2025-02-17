/*Función para resaltar los enlaces de la página.
 */
export function highlightLinks() {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.classList.toggle("highlight");  // Agrega o quita la clase para resaltar
  });
}


