
export function resetAllSettings() {
    // Restablecer tamaño de fuente
    document.body.style.fontSize = "16px"; // Tamaño de fuente predeterminado
    
    // Restablecer el alto contraste
    document.body.classList.remove("high-contrast");
    
    // Restablecer el modo oscuro
    document.body.classList.remove("dark-mode");
    
    // Restablecer la fuente
    document.body.classList.remove('toggle-font');
    
    // Restablecer la barra de lectura (suponiendo que el estado se gestiona con una clase CSS)
    document.body.classList.remove("toggle-reading-bar" );

    
    // Restablecer la voz y el tono de lectura
    window.speechSynthesis.cancel();  // Detener cualquier lectura en curso
    
    // Restablecer texto leído en voz alta
    isSpeaking = false;
    isPaused = false;
    pitch = 1; // Valor de tono predeterminado
    selectedVoiceIndex = 0; // Restaurar la voz predeterminada
    updateVoiceButton(); // Actualiza el botón de voz
    
    // Restablecer resaltado de enlaces
    document.querySelectorAll('a').forEach(link => {
      link.classList.remove('highlighted');
    });
    
    // Restaurar el tamaño de texto
    textSize = 16;
    document.body.style.fontSize = `${textSize}px`;
  }