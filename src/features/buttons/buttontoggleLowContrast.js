const lowContrastStyle = document.createElement("style");
lowContrastStyle.innerHTML = `
  .low-contrast {
    filter: contrast(0.8) brightness(1.1) saturate(0.8) !important;
  }
`;
document.head.appendChild(lowContrastStyle);

export function toggleLowContrast() {
    const body = document.body;
    const className = "low-contrast";
  
    const isActive = body.classList.toggle(className);
  
    if (isActive) {
      localStorage.setItem("lowContrastEnabled", "true");
    } else {
      localStorage.removeItem("lowContrastEnabled");
    }
  
    // Cambia el texto del botón
    const btn = document.getElementById("low-contrast");
    if (btn) {
      btn.innerText = isActive ? "Contraste bajo activado" : "  Contraste Bajo";
    }
  }