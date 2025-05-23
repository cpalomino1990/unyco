import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

const sizeLevels = [
  { fontsize: "105%" },
  { fontsize: "110%"  },
  { fontsize: "115%" }
];

let currentSizeIndex = 0;
let sizeButton = null;

export function FontsizeChange() {
  let styleTag = document.getElementById("letter-size-style");

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "letter-size-style";
    document.head.appendChild(styleTag);
  }

  // Si ya pasamos el último nivel, reiniciamos
  if (currentSizeIndex >= sizeLevels.length) {
    removeFontsizeChange();
    localStorage.removeItem("letter-size-style");
    currentSizeIndex = 0;
    toggleCheckButton({ id: "letter-size-style", checked: false, option: null });
  } else {
    applyLetterSize(sizeLevels[currentSizeIndex].fontsize);
    localStorage.setItem("letter-size-style", currentSizeIndex);
    toggleCheckButton({ id: "letter-size-style", checked: true, option: currentSizeIndex });
    currentSizeIndex++;

  }
}

function applyLetterSize(fontsize) {
  let styleTag = document.getElementById("letter-size-style");
  
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "letter-size-style";
  }

  styleTag.innerHTML = `
    body *:not(#my-widget):not(#my-widget *)
    {
      font-size: ${fontsize} !important;
    }
  `;
  
  document.head.appendChild(styleTag);
}


function removeFontsizeChange() {
  const styleTag = document.getElementById("letter-size-style");
  if (styleTag) {
    styleTag.innerHTML = "";
  }
}

export function loadFontsizeSetting() {
  const savedIndex = parseInt(localStorage.getItem("letter-size-style"), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < sizeLevels.length) {
    applyLetterSize(sizeLevels[savedIndex].fontsize);
    toggleCheckButton({ id: "letter-size-style", checked: true, option: savedIndex });
    currentSizeIndex = savedIndex + 1;
  }
}
