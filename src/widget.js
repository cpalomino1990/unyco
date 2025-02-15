import './styles/widget.css';
import {toggleFontFamily} from'./button/buttonToggleFont';
import {toggleReadingBar} from './button/buttonToggleReandingBar';

/**
 * Alterna el modo de alto contraste en el cuerpo del documento.
 */
function toggleContrast() {
  document.body.classList.toggle("high-contrast");
}

/**
 * Restablece la configuración de accesibilidad eliminando el alto contraste y el tamaño de fuente personalizado.
 */
function resetSettings() {
  document.body.style.fontSize = "";
  document.body.classList.remove("high-contrast");
}

/**
 * Inicializa el widget de accesibilidad.
 * @param {string} accountId 
 */
function initWidget(accountId) {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'my-widget';
  widgetContainer.className = 'widget-container';
  
  widgetContainer.innerHTML = `
    <button id="accessibility-button">
      <img src="security_11769361.png" alt="" style="width: 50px; height: 50px;" />
    </button>
    <div id="accessibility-menu" class="hidden">
      <button id="close-menu" class="close-btn">X</button>
      <div class="button-columns">
        <div class="button-column">
         <button id="toggle-reading-bar">Activar Barra de lectura</button>
          <button id="reset">Restablecer</button>
          <button id="toggle-contrast">Alto Contraste</button>
          <button id="increase-text-size">Aumentar Texto</button>
          <button id="decrease-text-size">Disminuir Texto</button>
          <button id="toggle-dark-mode">Modo Oscuro</button>
        </div>
        <div class="button-column">
          <button id="read-text-aloud">Leer en voz alta</button>
          <button id="change-voice">Voz: Predeterminada</button>
          <button id="increase-pitch">Aumentar tono</button>
          <button id="decrease-pitch">Disminuir tono</button>
          <button id="toggle-font"> Cambiar letras</button>
          <button id="pause-resume">Pausar/Reanudar</button>
          <button id="highlight-url">Resaltar URL</button> <!-- New button -->
          <button id="highlight-links">Resaltar Enlaces</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  document.getElementById("accessibility-button").addEventListener("click", function() {
    document.getElementById("accessibility-menu").classList.toggle("hidden");
  });

  document.getElementById("toggle-font").addEventListener("click", toggleFontFamily);
  document.getElementById("toggle-contrast").addEventListener("click", toggleContrast);
  document.getElementById("close-menu").addEventListener("click", function() {
    document.getElementById("accessibility-menu").classList.add("hidden");
  });

  let textSize = 16; // Default text size
  document.getElementById("increase-text-size").addEventListener("click", () => {
    textSize += 2;
    document.body.style.fontSize = `${textSize}px`;
  });
  document.getElementById("decrease-text-size").addEventListener("click", () => {
    textSize -= 2;
    document.body.style.fontSize = `${textSize}px`;
  });

  const darkModeButton = document.getElementById('toggle-dark-mode');
  darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  document.getElementById("highlight-url").addEventListener("click", highlightUrl);
  document.getElementById("reset").addEventListener("click", resetSettings);
  document.getElementById("toggle-reading-bar").addEventListener("click", toggleReadingBar);
  document.getElementById("highlight-links").addEventListener("click", highlightLinks);

  let pitch = 1;
  let selectedVoiceIndex = 0;
  let isSpeaking = false;
  let isPaused = false;
  let currentText = "";
  let speech;
  let voices = [];
  const voiceIndexes = [3, 4, 9]; // Índices de las tres voces permitidas

  function loadVoices() {
    voices = window.speechSynthesis.getVoices().filter((_, index) => voiceIndexes.includes(index));
    updateVoiceButton();
  }

  function updateVoiceButton() {
    const voiceButton = document.getElementById("change-voice");
    if (voices.length > 0) {
      voiceButton.textContent = `Voz: ${voices[selectedVoiceIndex].name}`;
      console.log(voices)
    }
  }

  function speakText() {
    if (currentText.length === 0) return;

    speech = new SpeechSynthesisUtterance(currentText);
    speech.lang = 'es-ES';
    speech.voice = voices[selectedVoiceIndex] || voices[0];
    speech.pitch = pitch;

    speech.onend = () => {
      isSpeaking = false;
      isPaused = false;
    };

    window.speechSynthesis.speak(speech);
    isSpeaking = true;
  }

  document.getElementById("read-text-aloud").addEventListener("click", () => {
    currentText = window.getSelection().toString();
    speakText();
  });

  document.getElementById("increase-pitch").addEventListener("click", () => {
    pitch = Math.min(2, pitch + 0.1);
    if (isSpeaking) restartSpeech();
  });

  document.getElementById("decrease-pitch").addEventListener("click", () => {
    pitch = Math.max(0.5, pitch - 0.1);
    if (isSpeaking) restartSpeech();
  });

  document.getElementById("pause-resume").addEventListener("click", () => {
    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
      } else {
        window.speechSynthesis.pause();
        isPaused = true;
      }
    }
  });

  document.getElementById("change-voice").addEventListener("click", () => {
    selectedVoiceIndex = (selectedVoiceIndex + 1) % voices.length;
    updateVoiceButton();
    if (isSpeaking) restartSpeech();
  });

  function restartSpeech() {
    window.speechSynthesis.cancel();
    speakText();localStorage
  }

  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  function highlightUrl() {
    const url = window.location.href;
  
    // Crea un campo de texto temporal para copiar la URL
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
  
    // Selecciona el contenido del campo de texto
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Para dispositivos móviles
  
    // Copia la URL al portapapeles
    document.execCommand('copy');
    document.body.removeChild(textarea);
  
    alert("¡URL copiada al portapapeles!");
  }

  let linksHighlighted = false;  // Estado para saber si los enlaces están resaltados

  // Función para alternar el resalte de los enlaces
  function toggleHighlightLinks() {
    const links = document.querySelectorAll("a");
    if (linksHighlighted) {
      // Si están resaltados, eliminamos el resalte
      links.forEach(link => {
        link.style.backgroundColor = "";
        link.style.color = "";
        link.style.padding = "";
      });
    } else {
      // Si no están resaltados, los resaltamos
      links.forEach(link => {
        link.style.backgroundColor = "yellow";
        link.style.color = "red";
        link.style.padding = "2px";
      });
    }
    // Cambiar el estado
    linksHighlighted = !linksHighlighted;
  }

  // Asignamos la función al botón de "Alternar Resalte Enlaces"
  document.getElementById("highlight-links").addEventListener("click", toggleHighlightLinks);
}




initWidget("123434");
 