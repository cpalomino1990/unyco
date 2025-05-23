import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

const STORAGE_KEY = "highlightImportant";



// Alternar resaltado
export function toggleHighlightImportant() {
  const isActive = document.body.classList.toggle(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, isActive ? "true" : "false");

  if (isActive) {
    applyHighlightStyles();
  } else {
    removeHighlightStyles();
  }

  toggleCheckButton({ id: STORAGE_KEY, checked: isActive, option: null });
}

// Aplicar estilo y marcar elementos importantes
function applyHighlightStyles() {
  if (!document.getElementById(STORAGE_KEY)) {
    const styleTag = document.createElement("style");
    styleTag.id = STORAGE_KEY;
    styleTag.innerHTML = `
      .${STORAGE_KEY} [data-highlighted="true"] {
        outline: 2px solid #f7c948 !important;
        outline-offset: 4px;
        box-shadow: 0 0 6px rgba(247, 201, 72, 0.4) !important;
        transition: outline 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
      }
    `;
    document.head.appendChild(styleTag);
  }

  const selectors = [
    "h1", "h2", "h3",
    "a", "button", "input",
    "textarea", "select",
    '[role="button"]'
  ];

  const elements = document.querySelectorAll(selectors.join(","));
  elements.forEach(el => {
    if (!el.closest('[data-highlighted="true"]')) {
      el.setAttribute("data-highlighted", "true");
    }
  });
}

// Eliminar estilos y atributos
function removeHighlightStyles() {
  const styleTag = document.getElementById(STORAGE_KEY);
  if (styleTag) styleTag.remove();

  const elements = document.querySelectorAll('[data-highlighted="true"]');
  elements.forEach(el => el.removeAttribute("data-highlighted"));
}

// Cargar configuración guardada
export function loadHighlightImportantSetting() {
  if (localStorage.getItem(STORAGE_KEY) === "true") {
    document.body.classList.add(STORAGE_KEY);
    applyHighlightStyles();
    toggleCheckButton({ id: STORAGE_KEY, checked: true, option: null });
  }
}
