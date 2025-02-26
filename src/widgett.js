import './styles/widget.css';
import { toggleFontFamily } from './button/buttonToggleFont';
import { toggleReadingBar } from './button/buttonToggleReandingBar';
import { highlightLinks } from './button/highlightLinks';
import { resetAllSettings } from './button/buttonReset';

/**
 * Alterna el modo de alto contraste en el cuerpo del documento.
 */
function toggleContrast() {
  document.body.classList.toggle("high-contrast");
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
          <button id="reset-all">Restablecer Todo</button>
          <button id="toggle-contrast">Alto Contraste</button>
          <button id="increase-text-size">Aumentar Texto</button>
          <button id="decrease-text-size">Disminuir Texto</button>
          <button id="toggle-dark-mode">Modo Oscuro</button>
        </div>
        <div class="button-column">
          <button id="read-text-aloud">Leer en voz alta</button>
          <button id="change-voice">Voz: Predeterminada</button>    
          <button id="toggle-font">Cambiar letras</button>
          <button id="pause-resume">Pausar/Reanudar</button>
          <button id="highlight-links">Resaltar enlaces</button>
          <button id="toggles-none-animation">Detener Animaciones</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  document.getElementById("reset-all").addEventListener("click", resetAllSettings);
  document.getElementById("accessibility-button").addEventListener("click", function() {
    document.getElementById("accessibility-menu").classList.toggle("hidden");
  });

  document.getElementById("toggle-font").addEventListener("click", toggleFontFamily);
  document.getElementById("toggle-contrast").addEventListener("click", toggleContrast);
  document.getElementById("close-menu").addEventListener("click", function() {
    document.getElementById("accessibility-menu").classList.add("hidden");
  });

  let textSize = 16;
  document.getElementById("increase-text-size").addEventListener("click", () => {
    textSize += 2;
    document.body.style.fontSize = `${textSize}px`;
  });

  document.getElementById("decrease-text-size").addEventListener("click", () => {
    textSize -= 2;
    document.body.style.fontSize = `${textSize}px`;
  });

  document.getElementById("toggle-dark-mode").addEventListener("click", () => {
    document.body.classList.toggle('dark-mode');
  });

  document.getElementById("toggle-reading-bar").addEventListener("click", toggleReadingBar);
  document.getElementById("highlight-links").addEventListener("click", highlightLinks);

  let voices = [];
  let selectedVoiceIndex = 0;
  let pitch = 1;

  function loadVoices() {
    voices = window.speechSynthesis.getVoices();
  }

  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  function speakTextWithHighlight() {
    let selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;

    let words = selectedText.split(/\s+/);
    let speech = new SpeechSynthesisUtterance(selectedText);
    speech.lang = "es-ES";
    speech.voice = voices[selectedVoiceIndex] || voices[0];
    speech.pitch = pitch;

    let currentIndex = 0;
    let elements = document.querySelectorAll("p, h1, h2, h3, h4, span, div");

    function highlightWord() {
      elements.forEach((element) => {
        let innerHTML = element.innerHTML;
        let regex = new RegExp(`\\b${words[currentIndex]}\\b`, "gi");
        element.innerHTML = innerHTML.replace(regex, (match) => {
          return `<span class="highlight">${match}</span>`;
        });
      });
    }

    speech.onboundary = (event) => {
      if (event.name === "word" && currentIndex < words.length) {
        highlightWord();
        currentIndex++;
      }
    };

    speech.onend = () => {
      document.querySelectorAll(".highlight").forEach((el) => {
        el.classList.remove("highlight");
      });
    };

    window.speechSynthesis.speak(speech);
  }

  let style = document.createElement("style");
  style.innerHTML = `
    .highlight {
      background-color: yellow;
      color: black;
      font-weight: bold;
      padding: 2px;
      border-radius: 3px;
    }
  `;
  document.head.appendChild(style);

  document.getElementById("read-text-aloud").addEventListener("click", speakTextWithHighlight);
}

initWidget("123434");
