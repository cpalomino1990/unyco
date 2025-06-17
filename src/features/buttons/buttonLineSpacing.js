import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

const spacingLevels = [
  { lineHeight: "1.6" },
  { lineHeight: "1.8" },
  { lineHeight: "2.0" }
];

let currentSpacingIndex = 0;

export function LineHeightChange() {
  let styleTag = document.getElementById("line-spacing-style");

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "line-spacing-style";
    document.head.appendChild(styleTag);
  }

  // Si ya pasamos el último nivel, reiniciamos
  if (currentSpacingIndex >= spacingLevels.length) {
    removeLineHeightChange();
    localStorage.removeItem("line-spacing-style");
    currentSpacingIndex = 0;
    toggleCheckButton({ id: "line-spacing-style", checked: false, option: null });
  } else {
    applyLineHeight(spacingLevels[currentSpacingIndex].lineHeight);
    localStorage.setItem("line-spacing-style", currentSpacingIndex);
    toggleCheckButton({ id: "line-spacing-style", checked: true, option: currentSpacingIndex });
    currentSpacingIndex++;
  }
}

function applyLineHeight(lineHeight) {
  let styleTag = document.getElementById("line-spacing-style");

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "line-spacing-style";
  }

  styleTag.innerHTML = `
    body *:not(#my-widget):not(#my-widget *) {
      line-height: ${lineHeight} !important;
    }
  `;

  document.head.appendChild(styleTag);
}

function removeLineHeightChange() {
  const styleTag = document.getElementById("line-spacing-style");
  if (styleTag) {
    styleTag.innerHTML = "";
  }
}

export function loadLineHeightSetting() {
  const savedIndex = parseInt(localStorage.getItem("line-spacing-style"), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < spacingLevels.length) {
    applyLineHeight(spacingLevels[savedIndex].lineHeight);
    toggleCheckButton({ id: "line-spacing-style", checked: true, option: savedIndex });
    currentSpacingIndex = savedIndex + 1;
  }
}
