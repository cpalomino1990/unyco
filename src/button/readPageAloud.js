let isReading = false;
let utterance;

export function toggleReadOnHover() {
  isReading = !isReading;
  
  if (!isReading) {
    speechSynthesis.cancel();
    document.body.removeEventListener("mouseover", startReading);
    document.body.removeEventListener("mouseout", stopReading);
  } else {
    document.body.addEventListener("mouseover", startReading);
    document.body.addEventListener("mouseout", stopReading);
  }
}

function startReading(event) {
  if (isReading && event.target.innerText.trim()) {
    // Remueve resaltados previos
    document.querySelectorAll(".highlighted").forEach(el => el.classList.remove("highlighted"));

    // Agrega la clase de resaltado al elemento actual
    event.target.classList.add("highlighted");

    // Crea y configura el objeto de síntesis de voz
    utterance = new SpeechSynthesisUtterance(event.target.innerText);
    utterance.lang = "es-ES";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Cuando termina la lectura, quita el resaltado
    utterance.onend = () => {
      event.target.classList.remove("highlighted");
    };

    speechSynthesis.speak(utterance);
  }
}

function stopReading(event) {
  speechSynthesis.cancel();
  event.target.classList.remove("highlighted"); // Quita el resaltado al salir
}

// Agregar estilos de resaltado dinámicamente
const style = document.createElement("style");
style.innerHTML = `
  .highlighted {
    background-color: yellow;
    transition: background-color 0.3s ease;
  }
`;
document.head.appendChild(style);
