import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

const STORAGE_KEY_ALIGN_LEFT = "textAlignLeft";

// Alternar alineación del texto a la izquierda
export function toggleTextAlignLeft() {
  const isActive = document.body.classList.toggle(STORAGE_KEY_ALIGN_LEFT);
  localStorage.setItem(STORAGE_KEY_ALIGN_LEFT, isActive ? "true" : "false");

  if (isActive) {
    applyTextAlignLeft();
  } else {
    removeTextAlignLeft();
  }

  toggleCheckButton({ id: STORAGE_KEY_ALIGN_LEFT, checked: isActive, option: null });
}

// Aplicar alineación izquierda a todo menos al widget
function applyTextAlignLeft() {
  let styleTag = document.getElementById(STORAGE_KEY_ALIGN_LEFT);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = STORAGE_KEY_ALIGN_LEFT;
    document.head.appendChild(styleTag);
  }

  styleTag.innerHTML = `
    body *:not(#my-widget):not(#my-widget *) {
      text-align: left !important;
    }
  `;
}

// Quitar alineación izquierda
function removeTextAlignLeft() {
  const styleTag = document.getElementById(STORAGE_KEY_ALIGN_LEFT);
  if (styleTag) styleTag.remove();
}

// Cargar configuración guardada al iniciar
export function loadTextAlignLeftSetting() {
  if (localStorage.getItem(STORAGE_KEY_ALIGN_LEFT) === "true") {
    document.body.classList.add(STORAGE_KEY_ALIGN_LEFT);
    applyTextAlignLeft();
    toggleCheckButton({ id: STORAGE_KEY_ALIGN_LEFT, checked: true, option: null });
  }
}
