import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";
import { host } from "../../shared/constants/enviroments";


const cursorManito = `${host}/public/07.svg`;
// const cursorGrande = "http://127.0.0.1:5501/public/01.svg"
const cursorGrande = `${host}/public/10.svg`


export function toggleLargeCursor() {
    const isActive = document.body.classList.toggle("cursor-large");
    toggleCheckButton({id:"cursor-large", checked: isActive, option: null })
    localStorage.setItem("cursor-large", isActive ? "true" : "false");
}

// Aplicar configuración guardada al cargar la página
export function loadCursorSetting() {
    if (localStorage.getItem("cursor-large") === "true") {
        document.body.classList.add("cursor-large");
        toggleCheckButton({id:"cursor-large", checked: true, option: null })
    }
}

// Agregar estilos CSS para los cursores personalizados
const cursorStyleTag = document.createElement("style");
cursorStyleTag.innerHTML = `
  /* Cursor normal grande */
  .cursor-large { 
    cursor: url('${cursorGrande}') 13 9, default !important; 
  }
  

  /* Cursor de "manito" para enlaces */
  .cursor-large a, 
  .cursor-large button, 
  .cursor-large [role="button"] {
    cursor: url('${ cursorManito}') 30 9, pointer !important; 
  }
`;
document.head.appendChild(cursorStyleTag);

// Cargar la configuración al iniciar
