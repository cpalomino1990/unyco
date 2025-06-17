import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

const STORAGE_KEY_ALIGN = "textAlignCenter";

// Alternar alineación del texto a la derecha
export function toggleTextAlignCeter() {
  const isActive = document.body.classList.toggle(STORAGE_KEY_ALIGN);
  localStorage.setItem(STORAGE_KEY_ALIGN, isActive ? "true" : "false");

  if (isActive) {
    applyTextAlignRight();
  } else {
    removeTextAlignRight();
  }

  toggleCheckButton({ id: STORAGE_KEY_ALIGN, checked: isActive, option: null });
}

// Aplicar alineación derecha a todo menos al widget
function applyTextAlignRight() {
  let styleTag = document.getElementById(STORAGE_KEY_ALIGN);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = STORAGE_KEY_ALIGN;
    document.head.appendChild(styleTag);
  }

  styleTag.innerHTML = `
    body *:not(#my-widget):not(#my-widget *) {
      text-align: center !important;
    }
  `;
}

// Quitar alineación derecha
function removeTextAlignRight() {
  const styleTag = document.getElementById(STORAGE_KEY_ALIGN);
  if (styleTag) styleTag.remove();
}

// Cargar configuración guardada al iniciar
export function loadTextAlignRightSetting() {
  if (localStorage.getItem(STORAGE_KEY_ALIGN) === "true") {
    document.body.classList.add(STORAGE_KEY_ALIGN);
    applyTextAlignRight();
    toggleCheckButton({ id: STORAGE_KEY_ALIGN, checked: true, option: null });
  }
}
