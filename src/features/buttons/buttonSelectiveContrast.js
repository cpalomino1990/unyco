import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

// Alternar el modo de contraste selectivo

const SELECTCONTRAST = "selectiveContrast"

export function toggleSelectiveContrast() {
  const isActive = document.body.classList.toggle("selective-contrast");
  toggleCheckButton({ id: SELECTCONTRAST, checked: isActive, option: null });
  localStorage.setItem(SELECTCONTRAST, isActive ? "true" : "false");
  

  const elements = document.querySelectorAll("p, h1, h2, h3, span, a, strong, b");
  elements.forEach(el => {
    if (isActive) {
      el.classList.add("contrast-enhanced");
    } else {
      el.classList.remove("contrast-enhanced");
    }
  });
}

// Cargar la configuración al inicio
export function loadSelectiveContrastSetting() {
  if (localStorage.getItem(SELECTCONTRAST) === "true") {
    document.body.classList.add("selective-contrast");
     toggleCheckButton({ id: SELECTCONTRAST, checked: true, option: null });
    
    const elements = document.querySelectorAll("p, h1, h2, h3, span, a, strong, b");
    elements.forEach(el => el.classList.add("contrast-enhanced"));
  }
}

// Estilos refinados para el contraste selectivo
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .contrast-enhanced {
    background-color: #1e1e1e !important;
    color: #f1f1f1 !important;
    padding: 2px 5px;
    border-radius: 6px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #selective-contrast-btn {
    margin: 5px;
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background-color: #333;
    color: #fff;
    font-size: 18px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  #selective-contrast-btn:hover {
    background-color: #444;
    transform: scale(1.05);
  }

  #selective-contrast-btn:active {
    transform: scale(0.98);
  }
`;
document.head.appendChild(styleTag);


