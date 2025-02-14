import './styles/widget.css';

function toggleContrast() {
  document.body.classList.toggle("high-contrast");
}

function resetSettings() {
  document.body.style.fontSize = "";
  document.body.classList.remove("high-contrast");
}

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

  const focusModeButton = document.getElementById('focus-mode');
  focusModeButton.addEventListener('click', () => {
    document.body.classList.toggle('focus-mode');
  });

  const invertColorsButton = document.getElementById('invert-colors');
  invertColorsButton.addEventListener('click', () => {
    document.body.classList.toggle('invert-colors');
  });

  const highlightLinksButton = document.getElementById('highlight-links');
  highlightLinksButton.addEventListener('click', () => {
    document.body.classList.toggle('highlight-links');
  });
}

initWidget("123434");
