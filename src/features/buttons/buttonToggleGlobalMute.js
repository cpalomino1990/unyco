import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

let silenceActive = false;

export function toggleMediaSilence() {
  const mediaElements = document.querySelectorAll("audio, video");

  // Alterna el estado
  silenceActive = !silenceActive;

  mediaElements.forEach(el => {
    try {
      el.volume = silenceActive ? 0 : 1;
    } catch (error) {
      console.warn("No se pudo ajustar el volumen de un elemento:", error);
    }
  });

  // Guarda el estado en localStorage
  localStorage.setItem("mediaSilence", silenceActive.toString());

  // Actualiza el botón visual
  const btn = document.getElementById("media-silence-button");
  if (btn) {
    btn.textContent = silenceActive ? " Desactivar silencio" : " Activar silencio";
  }

  // ✅ Refleja el estado en la interfaz visual con toggleCheckButton
  toggleCheckButton({
    id: "mediaSilence", // Cambia el ID si es diferente
    checked: silenceActive,
    option: null,
  });
}