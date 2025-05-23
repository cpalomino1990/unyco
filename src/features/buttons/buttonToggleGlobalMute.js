// Función que recorre todos los elementos <audio> y <video> y establece su volumen a 0



export function setGlobalMediaVolumeToZero() {
  const mediaElements = document.querySelectorAll("audio, video");
  mediaElements.forEach(el => {
    try {
      el.volume = 0;
    } catch (error) {
      console.warn("No se pudo ajustar el volumen de un elemento:", error);
    }
  });
}



// Ejemplo de integración: agrega el botón a un contenedor específico del widget
window.addEventListener("DOMContentLoaded", () => {
  const controlsContainer = document.getElementById("widget-controls"); // Asegúrate de tener este contenedor en el DOM
  if (controlsContainer) {
    controlsContainer.appendChild(createSilenceButton());
  }
});
