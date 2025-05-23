import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

const STYLE_ID = "letter-size-style-space";
const STORAGE_KEY = "letterSpacingSpace";

const spacingLevels = [
  { spacing: "0.05em", label: "Espaciado +25%" },
  { spacing: "0.1em", label: "Espaciado +50%" },
  { spacing: "0.15em", label: "Espaciado +75%" }
];




let currentSpacingIndex = 0;
let spacingButton = null; // Referencia al botón

export function toggleLetterSpacing() {
  let styleTag = document.getElementById(STYLE_ID);

  if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      document.head.appendChild(styleTag);
  }

  // Si ya llegamos al último nivel, restablecemos
  if (currentSpacingIndex >= spacingLevels.length) {
      removeLetterSpacing();
      localStorage.removeItem(STYLE_ID);
      currentSpacingIndex = 0;
     toggleCheckButton({ id: STYLE_ID, checked: false, option: null });
  } else {
      applyLetterSpacing(spacingLevels[currentSpacingIndex].spacing);
      localStorage.setItem( STYLE_ID, currentSpacingIndex);
      toggleCheckButton({ id: STYLE_ID, checked: true, option: currentSpacingIndex });
      currentSpacingIndex++;
  }
}

// Inyectar el espaciado en la página (afectando todos los textos)
function applyLetterSpacing(spacing) {
  let  styleTag = document.getElementById(STYLE_ID);
 if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = STYLE_ID;
  }

  styleTag.innerHTML = `
      body *:not(#my-widget):not(#my-widget *)
      {
          letter-spacing: ${spacing} !important;
      }
  `;
  document.head.appendChild(styleTag);
}

// Eliminar el espaciado
function removeLetterSpacing() {
  const styleTag = document.getElementById(STYLE_ID);
  if (styleTag) {
      styleTag.innerHTML = ""; // Limpia el contenido en lugar de eliminarlo
  }
}



// Aplicar el estado guardado al recargar la página
export function loadLetterSpacingSetting() {
   const savedIndex = parseInt(localStorage.getItem(STYLE_ID), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < spacingLevels.length) {
      applyLetterSpacing(spacingLevels[savedIndex].spacing);
      toggleCheckButton({ id: STYLE_ID, checked: true, option: savedIndex });;
      currentSpacingIndex = savedIndex + 1;
  }
}
