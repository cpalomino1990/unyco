import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

const SIMPLIFIEDTEXT = "simplifiedText";

export function toggleSimplifiedText() {
  const isActive = document.body.classList.toggle("simplified-text");
  toggleCheckButton({ id: SIMPLIFIEDTEXT, checked: isActive, option: null });
  localStorage.setItem(SIMPLIFIEDTEXT, isActive ? "true" : "false");
}

export function loadSimplifiedTextSetting() {
  if (localStorage.getItem(SIMPLIFIEDTEXT) === "true") {
    document.body.classList.add("simplified-text");
    toggleCheckButton({ id: SIMPLIFIEDTEXT, checked: true, option: null });
  }
}

// Estilos para modo simplificado
const simplifiedStyle = document.createElement("style");
simplifiedStyle.innerHTML = `
  .simplified-text header:not(my-widget *),
  .simplified-text nav:not(my-widget *),
  .simplified-text aside:not(my-widget *),
  .simplified-text footer:not(my-widget *),
  .simplified-text .sidebar:not(my-widget *),
  .simplified-text .ad:not(my-widget *),
  .simplified-text img:not(my-widget *),
  .simplified-text picture:not(my-widget *) {
    display: none !important;
  }

  .simplified-text:not(my-widget *) {
    animation: none !important;
    transition: none !important;
  }

  .simplified-text video,
  .simplified-text audio,
  .simplified-text img,
  .simplified-text picture {
    display: none !important;
  }
`;
document.head.appendChild(simplifiedStyle);

// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", loadSimplifiedTextSetting);
