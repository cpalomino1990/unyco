  import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

  const STORAGE_KEY = "focus-frame-active";


  // Alterna el marco de enfoque
  export function toggleFocusFrame() {
    const isActive = document.body.classList.toggle("focus-frame-active");
    toggleCheckButton({ id: "focus-frame-active", checked: isActive, option: null });
    localStorage.setItem(STORAGE_KEY, isActive ? "true" : "false");

    if (isActive) {
      document.body.addEventListener("mouseover", applyFocusFrame);
      document.body.addEventListener("mouseout", removeFocusFrame);
    } else {
      document.body.removeEventListener("mouseover", applyFocusFrame);
      document.body.removeEventListener("mouseout", removeFocusFrame);
    }

    const highlightedElements = document.querySelectorAll(".focus-highlight");
    highlightedElements.forEach(el => el.classList.remove("focus-highlight"));
  }
  
  // Aplica estilo al pasar el cursor
  function applyFocusFrame(event) {
    const tagsToHighlight = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'B'];
    if (tagsToHighlight.includes(event.target.tagName)) {
      event.target.classList.add("focus-highlight");
    }
  }

  // Quita estilo al salir del cursor
  function removeFocusFrame(event) {
    event.target.classList.remove("focus-highlight");

  }

  // Inyecta estilos al documento
  const focusFrameStyle = document.createElement("style");
  focusFrameStyle.innerHTML = `
    .focus-highlight {
      outline: 3px solid #FF6347;
      border-radius: 6px;
      transition: outline 0.3s ease;
    }
  `;
  document.head.appendChild(focusFrameStyle);

  // Carga el estado guardado
  export function loadFocusFrameSetting() {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      document.body.classList.add("focus-frame-active");
      toggleCheckButton({ id: "focus-frame-active", checked: true, option: null });
      document.body.addEventListener("mouseover", applyFocusFrame);
      document.body.addEventListener("mouseout", removeFocusFrame);
    }
  }
