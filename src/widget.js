import './styles/widget.css';

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
 * @param {string} accountId - ID de la cuenta del usuario.
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
          <button id="reset">Restablecer</button>
          <button id="toggle-contrast">Alto Contraste</button>
          <button id="increase-text-size">Aumentar Texto</button>
          <button id="decrease-text-size">Disminuir Texto</button>
          <button id="toggle-dark-mode">Modo Oscuro</button>
          <button id="toggle-reading-bar">Barra de lectura</button>
        </div>
        <div class="button-column">
          <button id="read-text-aloud">Leer en voz alta</button>
          <button id="voice-button1">Voz 1</button>
          <button id="voice-button2">Voz 2</button>
          <button id="voice-button3">Voz 3</button>
          <button id="increase-pitch">Aumentar tono</button>
          <button id="decrease-pitch">Disminuir tono</button>
          <button id="pause-resume">Pausar/Reanudar</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  // Manejo de eventos de los botones
  document.getElementById("accessibility-button").addEventListener("click", function() {
    document.getElementById("accessibility-menu").classList.toggle("hidden");
  });
  document.getElementById("toggle-contrast").addEventListener("click", toggleContrast);
  document.getElementById("close-menu").addEventListener("click", function() {
    document.getElementById("accessibility-menu").classList.add("hidden");
  });
  document.getElementById("reset").addEventListener("click", resetSettings);
  
  let pitch = 1;
  let selectedVoice = null;
  let isSpeaking = false;
  let isPaused = false;
  let currentText = "";
  let speech;

  function speakText() {
    if (currentText.length === 0) return;

    speech = new SpeechSynthesisUtterance(currentText);
    speech.lang = 'es-ES';
    speech.voice = selectedVoice || window.speechSynthesis.getVoices()[0];
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

  function restartSpeech() {
    window.speechSynthesis.cancel();
    speakText();
  }

  function changeVoice(voiceIndex) {
    const voices = window.speechSynthesis.getVoices();
    selectedVoice = voices[voiceIndex] || voices[0];
    if (isSpeaking) restartSpeech();
  }

  document.getElementById("voice-button1").addEventListener("click", () => changeVoice(3));
  document.getElementById("voice-button2").addEventListener("click", () => changeVoice(4));
  document.getElementById("voice-button3").addEventListener("click", () => changeVoice(9));

  document.getElementById("toggle-reading-bar").addEventListener("click", () => {
    document.body.classList.toggle("reading-bar-active");
  });

  // Estilo para la barra de lectura que sigue el cursor
  const style = document.createElement('style');
  style.innerHTML = `
    .reading-bar {
      position: fixed;
      left: 0;
      width: 100%;
      height: 5px;
      background: rgba(0, 0, 0, 0.5);
      pointer-events: none;
      z-index: 9999;
    }
  `;
  document.head.appendChild(style);

  const readingBar = document.createElement('div');
  readingBar.classList.add('reading-bar');
  document.body.appendChild(readingBar);

  document.addEventListener('mousemove', (event) => {
    readingBar.style.top = `${event.clientY}px`;
  });
}

initWidget("123434");