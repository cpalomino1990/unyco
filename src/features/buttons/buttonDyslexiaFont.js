  import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

// Inserta la fuente OpenDyslexic desde el CDN si aún no está


export function insertDyslexiaFontCDN() {
  if (!document.getElementById("open-dyslexic-font")) {
    const link = document.createElement("link");
    link.id = "open-dyslexic-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.cdnfonts.com/css/open-dyslexic";
    document.head.appendChild(link);
  }
}

// Inyecta estilos globales para forzar la fuente cuando se activa
function injectDyslexiaFontStyles() {
  if (!document.getElementById("dyslexia-style-tag")) {
    const style = document.createElement("style");
    style.id = "dyslexia-style-tag";
    style.innerHTML = `
      .font-dyslexia * {
        font-family: 'Open-Dyslexic', sans-serif !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Alterna la fuente disléxica y guarda el estado
export function toggleDyslexiaFont() {
  insertDyslexiaFontCDN();
  injectDyslexiaFontStyles();

  const isActive = document.body.classList.toggle("font-dyslexia");
  toggleCheckButton({ id: "font-dyslexia", checked: isActive, option: null });
  localStorage.setItem("font-dyslexia", isActive ? "true" : "false");
}

// Carga la configuración guardada
export function loadDyslexiaFontSetting() {
  if (localStorage.getItem("font-dyslexia") === "true") {
    insertDyslexiaFontCDN();
    injectDyslexiaFontStyles();
    document.body.classList.add("font-dyslexia");
    toggleCheckButton({ id: "font-dyslexia", checked: true, option: null });
  }
}
