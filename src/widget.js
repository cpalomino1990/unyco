import './styles/widget.css';
import {toggleFontFamily} from'./button/buttonToggleFont';
import {toggleReadingBar} from './button/buttonToggleReandingBar';
import {highlightLinks} from './button/highlightLinks'
import {resetAllSettings} from './button/buttonReset'




/**
 * Restablece la configuración de accesibilidad eliminando el alto contraste y el tamaño de fuente personalizado.
 */
function resetSettings() {
  document.body.style.fontSize = "";
  document.body.classList.remove("high-contrast");
}

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
          <button id="toggle-font"> Cambiar letras</button>
          <button id="pause-resume">Pausar/Reanudar</button>
          <button id="highlight-links">Resaltar enlaces</button> <!-- Nuevo botón para resaltar -->
          <button id="toggles-none-animation">Detener Animaciones</button> <!-- Nuevo botón -->
          
         
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  document.getElementById("reset-all").addEventListener("click", resetAllSettings);

  document.getElementById("accessibility-button").addEventListener("click", function() {
    document.getElementById("accessibility-menu").classList.toggle("hidden");

  document.getElementById("toggle-font").addEventListener("click", toggleFontFamily);
  document.getElementById("toggle-contrast").addEventListener("click", toggleContrast);
  document.getElementById("close-menu").addEventListener("click", function() {
  document.getElementById("accessibility-menu").classList.add("hidden");
  //document.getElementById('toggles-none-animation').addEventListener("click",noneAnimation)
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

// Activar desactivación de animaciones
  const noneAnimation = document.getElementById('toggles-none-animation')
   noneAnimation.addEventListener('click',()=>{
    document.body.classList.toggle('none-animation');
   })
// O
document.body.classList.remove('none-animation'); // Reactivar animaciones


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

  
    function  contanetLoaded() {
      document.addEventListener('DOMContentLoaded', () => {
        let speech;
        let voices = [];
        let selectedVoiceIndex = 0;
        let pitch = 1;
      });
    }
    
      

    function loadVoices() {
      voices = window.speechSynthesis.getVoices();
    }
  
    function speakText(text) {
      if (!text) return;
      
      speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'es-ES';
      speech.voice = voices[selectedVoiceIndex] || voices[0];
      speech.pitch = pitch;
  
      window.speechSynthesis.speak(speech);
    }
  
    function setupHoverReading() {
      document.querySelectorAll('div, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
          }
          speakText(element.innerText);
        });
  
        element.addEventListener('mouseleave', () => {
          window.speechSynthesis.cancel();
        });
      });
    }
  
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    setupHoverReading();
  });
  

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
    currentText = window.getSelection().toString().setupHoverReading();
    speakText().contanetLoaded();
  });






}

initWidget("123434");
 