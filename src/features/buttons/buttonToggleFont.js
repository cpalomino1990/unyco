import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

export function toggleFontStyle() {
  const fontClassArial = "font-arial";
  const fontClassVerdana = "font-verdana";
  const body = document.body;

  if (body.classList.contains(fontClassArial)) {
    body.classList.remove(fontClassArial);
    body.classList.add(fontClassVerdana);
    localStorage.setItem("fontStyle", 1);
    toggleCheckButton({ id: "fontStyle", checked: true, option: 1 });

  } else if (body.classList.contains(fontClassVerdana)) {
    body.classList.remove(fontClassVerdana);
    body.style.color = "";
    localStorage.removeItem("fontStyle");
    toggleCheckButton({ id: "fontStyle", checked: false, option: null });

  } else {
    body.classList.add(fontClassArial);
    localStorage.setItem("fontStyle", 0);
    toggleCheckButton({ id: "fontStyle", checked: true, option: 0 });
  }
}

export function loadFontSetting() {

  const savedFont = localStorage.getItem("fontStyle");
  if (savedFont === "0") {
      
    document.body.classList.add("font-arial");
    toggleCheckButton({ id: "fontStyle", checked: true, option: 0 });
  } else if (savedFont === "1") {
    document.body.classList.add("font-verdana");
    toggleCheckButton({ id: "fontStyle", checked: true, option: 1 });
  } else {
    toggleCheckButton({ id: "fontStyle", checked: false, option: null });
  }
}

// Agregar los estilos de fuentes
let styleTag = document.createElement("style");
styleTag.innerHTML = `
  .font-arial, .font-arial * { font-family: Arial, sans-serif !important; }
  .font-verdana, .font-verdana * { font-family: Verdana, sans-serif !important; }
`;
document.head.appendChild(styleTag);


