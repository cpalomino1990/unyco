// Función para alternar el modo de resaltar bordes

import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

export function toggleOutlineMode() {
  const isActive = document.body.classList.toggle("outline-mode");
  toggleCheckButton({ id: "outline-mode", checked: isActive, option: null });
  localStorage.setItem("outline-mode", isActive ? "true" : "false");
}

// Aplicar configuración guardada al cargar la página
export function loadOutlineSetting() {
  if (localStorage.getItem("outline-mode") === "true") {
    document.body.classList.add("outline-mode");
    toggleCheckButton({ id: "outline-mode", checked: true, option: null });
  }
}

// Estilos CSS dinámicos para el resaltado de bordes
const outlineStyle = document.createElement("style");
outlineStyle.innerHTML = `
  
    .outline-mode button,
    .outline-mode a,
    .outline-mode input,
    .outline-mode select,
    .outline-mode textarea,
    .outline-mode h1,
    .outline-mode h2,
    .outline-mode h3,
    .outline-mode h4,
    .outline-mode p,
    .outline-mode img {
      outline: 3px solid #FF00FF !important;
      outline-offset: 2px;
      border-radius: 4px;
    }
  `;
document.head.appendChild(outlineStyle);

// Llama a esta función al cargar el widget

