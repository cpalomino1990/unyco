import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

// Activadores individuales
export const activateProtanopia = createFilterActivator("protanopia");
export const activateDeuteranomaly = createFilterActivator("deuteranomaly");
export const activateDeuteranopia = createFilterActivator("deuteranopia");
export const activateTritanopia = createFilterActivator("tritanopia");
export const activateAchromatomaly = createFilterActivator("achromatomaly");
export const activateAchromatopsia = createFilterActivator("achromatopsia");
export const activateProtanomaly = createFilterActivator("protanomaly");
export const activateTritanomaly = createFilterActivator("tritanomaly");
export const activateLowContrast = createFilterActivator("lowContrast");

// Estilos estándar
const highlightStyles = [
  { filter: "contrast(150%)", label: "Contraste Alto" },
  { filter: "grayscale(100%)", label: "Escala de Grises" },
  { filter: "hue-rotate(100deg)", label: "Cambio de Tonos" },
];

// Estilos para tipos de daltonismo
const highlightStylesDolto = {
  protanomaly: { filter: "contrast(1.1) saturate(0.8) hue-rotate(15deg)", label: "protanomalía" },
  deuteranomaly: { filter: "contrast(1.1) saturate(0.8) hue-rotate(-15deg)", label: "Deuteranomalía" },
  tritanomaly: { filter: "contrast(1.1) saturate(0.8) hue-rotate(50deg)", label: "Tritanomalía" },
  deuteranopia: { filter: "contrast(1.1) saturate(0.6) hue-rotate(-30deg)", label: "Deuteranopía" },
  tritanopia: { filter: "contrast(1.1) saturate(0.6) hue-rotate(90deg)", label: "Tritanopía" },
  protanopia: { filter: "contrast(1.1) saturate(0.6) hue-rotate(30deg)", label: "Protanopía" },
  achromatomaly: { filter: "grayscale(0.8) contrast(1.2)", label: "Acromatomalía" },
  achromatopsia: { filter: "grayscale(1) contrast(1.2)", label: "Acromatopsia" },
  lowContrast: { filter: "contrast(0.8) brightness(1.1) saturate(0.8)", label: "Bajo Contraste" },
};

let currentFilterIndex = 0;

// Toggle para filtros estándar (rotativos)
export function toggleHighlightColors() {
  clearHighlightFilters(); // 👈 Limpia cualquier filtro de daltonismo activo

  let styleTag = document.getElementById("highlightColors");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "highlightColors";
    document.head.appendChild(styleTag);
  }

  if (currentFilterIndex >= highlightStyles.length) {
    clearStandardHighlightFilters();
  } else {
    applyHighlightStyles(highlightStyles[currentFilterIndex].filter);
    localStorage.setItem("highlightColors", currentFilterIndex);
    toggleCheckButton({ id: "highlightColors", checked: true, option: currentFilterIndex });
    currentFilterIndex++;
  }
}

// Aplicar filtro estándar
function applyHighlightStyles(filter) {
  let styleTag = document.getElementById("highlightColors");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "highlightColors";
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = `
    body *:not(#my-widget):not(#my-widget *) {
      filter: ${filter} !important;
    }
  `;
}

// Aplicar filtro de daltonismo
function applyHighlightStylesDolto(filter) {
  let styleTag = document.getElementById("highlightColors");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "highlightColors";
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = `html { filter: ${filter} !important; }`;
}

// Eliminar estilos de filtro
function removeHighlightStyles() {
  const styleTag = document.getElementById("highlightColors");
  if (styleTag) {
    styleTag.remove();
  }
}

// Limpiar filtros estándar
function clearStandardHighlightFilters() {
  localStorage.removeItem("highlightColors");
  toggleCheckButton({ id: "highlightColors", checked: false, option: null });
  currentFilterIndex = 0;
  removeHighlightStyles();
}

// Limpiar filtros de daltonismo
function clearHighlightFilters() {
  Object.keys(highlightStylesDolto).forEach(key => {
    const isActive = localStorage.getItem(key) === "true";
    if (isActive) {
      localStorage.removeItem(key);
      toggleCheckButton({ id: key, checked: false, option: null });
    }
  });
  removeHighlightStyles();
}

// Activadores individuales de daltonismo
export function createFilterActivator(key) {
  return function () {
    const isActive = localStorage.getItem(key) === "true";

    clearHighlightFilters();
    clearStandardHighlightFilters(); // Limpia `highlightColors` también
    localStorage.removeItem("highlightColors"); // Extra por seguridad
    currentFilterIndex = 0;

    if (!isActive) {
      applyHighlightStylesDolto(highlightStylesDolto[key].filter);
      toggleCheckButton({ id: key, checked: true, option: null });
      localStorage.setItem(key, "true");
    }
  };
}

// Cargar configuración al iniciar
export function loadHighlightSetting() {
  const savedIndex = parseInt(localStorage.getItem("highlightColors"), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < highlightStyles.length) {
    clearHighlightFilters();
    applyHighlightStyles(highlightStyles[savedIndex].filter);
    toggleCheckButton({ id: "highlightColors", checked: true, option: savedIndex });
    currentFilterIndex = savedIndex + 1;
  }
}

export function loadHighlightSetting1() {
  const activeKey = Object.keys(highlightStylesDolto).find(key => localStorage.getItem(key) === "true");
  clearHighlightFilters();
  if (activeKey) {
    applyHighlightStylesDolto(highlightStylesDolto[activeKey].filter);
    toggleCheckButton({ id: activeKey, checked: true, option: null });
    localStorage.setItem(activeKey, "true");
  }
}

// Carga correcta según lo guardado
export function loadCorrectHighlightSetting() {
  const daltonKey = Object.keys(highlightStylesDolto).find(key => localStorage.getItem(key) === "true");

  if (daltonKey) {
    clearStandardHighlightFilters();
    loadHighlightSetting1();
  } else {
    clearHighlightFilters();
    loadHighlightSetting();
  }
}
