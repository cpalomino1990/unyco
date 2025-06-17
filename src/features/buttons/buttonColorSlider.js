import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";



const STORAGE_KEY = "textColorSlider";


export function toggleTextColorSlider() {
  const isActive = document.body.classList.toggle(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, isActive ? "true" : "false");

  if (!isActive) {
  
    removeTextColorStyles();
  }

  toggleCheckButton({ id: STORAGE_KEY, checked: isActive, option: null });
}


// Remover estilos y el slider
function removeTextColorStyles() {
  document.querySelectorAll("p, span, a, h1, h2, h3, h4, h5, h6, li, td, th").forEach(el => {
    el.style.color = "";
  });

  
}

// Cargar configuración guardada al iniciar
export function loadTextColorSliderSetting() {
  
  if (localStorage.getItem(STORAGE_KEY) === "true") {
    document.body.classList.add(STORAGE_KEY);
  
    toggleCheckButton({ id: STORAGE_KEY, checked: true, option: null });
  }
}
