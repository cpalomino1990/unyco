// components/allButtons/allButtons.js
import { FontsizeChange } from "../../../features/buttons/buttonChangeTextSize";
import { toggleLargeCursor } from "../../../features/buttons/buttonCursorSatyle";
import { toggleHighlightImportant } from "../../../features/buttons/buttonhighlightimportant";
import { highlightLinks } from "../../../features/buttons/buttonhighlightLinks";
import { toggleLetterSpacing } from "../../../features/buttons/buttonLetterSpacing";
import { toggleAnimations } from "../../../features/buttons/buttonNoneAnimation";
import { toggleOutlineMode } from "../../../features/buttons/buttonOutlineMode";
import { toggleReadSpeed } from "../../../features/buttons/buttonReadingSpeed";
import { toggleReadOnHover } from "../../../features/buttons/buttonreadPageAloud";
import { toggleFontStyle } from "../../../features/buttons/buttonToggleFont";
import { toggleReadingBar } from "../../../features/buttons/buttonToggleReadingBar";
import { toggleTextMagnifier } from "../../../features/buttons/buttonToggleZoom";
import { toggleVolumeControl } from "../../../features/buttons/buttonVolumeControlButton";
import { toggleDyslexiaFont } from "../../../features/buttons/buttonDyslexiaFont";
import { toggleSelectiveContrast } from "../../../features/buttons/buttonSelectiveContrast";
import { toggleReadingMask } from "../../../features/buttons/buttonReadingMask";
import { toggleSimplifiedText } from "../../../features/buttons/buttonSimplifiedText";
//import { initEyeCursorControl } from "../../../features/EyeCursorControl/buttonEyeCursorControl";
import { toggleFocusFrame } from "../../../features/buttons/buttonFocusFrame";
import { toggleWordByWordReading } from "../../../features/buttons/buttonGuidedReading";
import { setGlobalMediaVolumeToZero } from "../../../features/buttons/buttonToggleGlobalMute";
import { preventAbruptScroll } from "../../../features/buttons/buttonScollControl";
import {
  toggleHighlightColors,
  activateAchromatomaly,
  activateAchromatopsia,
  activateDeuteranomaly,
  activateDeuteranopia,
  activateProtanomaly,
  activateProtanopia,
  activateTritanomaly,
  activatetritanopia,
  activateLowContrast,
} from "../../../features/buttons/buttondaltonismo";
import { setupColorSlider } from "../../../features/buttons/buttonColorSlider";
//import { startCalibration } from "../../../features/buttons/startCalibration";

import { createFuncionalityButton } from "../../utils/createElements";
import { toggleVirtualKeyboard } from "../../../features/buttons/buttonActivateKeyBoard";
import { host } from "../../constants/enviroments";
import { iconsFuncionality } from "../../assets/icons/iconsFuncionalityButtons/IconsFuncionality";
import { showCalibrationInstructions } from "../../../features/EyeCursorControl/showCalibrationInstructions";

// Configuración de todos los botones con perfiles asociados
export const buttonsConfig = [
  {
    id: "outline-mode",
    title: "Resaltar todo",
    icon: iconsFuncionality["icon-highlight"],
    onclick: toggleOutlineMode,
    profiles: [
      "accessibility-btn-visual",
      "accessibility-btn-color-blindness",
      "Trastornos de Aprendizaje",
      "Discapacidad Cognitiva",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
    ],
  },
  {
    id: "highlightImportant",
    title: "Resaltar Texto",
    icon: iconsFuncionality["icon-highlight-text"],
    onclick: toggleHighlightImportant,
    profiles: [
      "accessibility-btn-visual",
      "Trastornos de Aprendizaje",
      "accessibility-btn-autism",
    ],
  },
  {
    id: "textMagnifierEnabled",
    title: "Lupa",
    icon: iconsFuncionality["icon-zoom-text"],
    onclick: toggleTextMagnifier,
    profiles: ["accessibility-btn-visual"],
  },
  {
    id: "letter-size-style",
    title: "Aumentar Texto",
    icon: iconsFuncionality["icon-text-up"],
    onclick: FontsizeChange,
    countOptions: 3,
    labelOptions: ["Aumentado 25%", "Aumentado 50%", "Aumentado 75%"],
    iconOptions: [
      iconsFuncionality["icon-text-up1"],
      iconsFuncionality["icon-text-up2"],
      iconsFuncionality["icon-text-up3"],
    ],
    profiles: [
      "accessibility-btn-visual",
      "Trastornos de Aprendizaje",
      "accessibility-btn-downsyndrom",
    ],
  },
  {
    id: "letter-size-style-space",
    title: "Aumentar Espaciado",
    icon: iconsFuncionality["icon-text-space"],
    onclick: toggleLetterSpacing,
    countOptions: 3,
    labelOptions: ["Aumentado 5%", "Aumentado 10%", "Aumentado 15%"],
    iconOptions: [
      iconsFuncionality["icon-text-space1"],
      iconsFuncionality["icon-text-space2"],
      iconsFuncionality["icon-text-space3"],
    ],
    profiles: [
      "Trastornos de Aprendizaje",
      "accessibility-btn-downsyndrom",
      "accessibility-btn-visual",
    ],
  },

  {
    id: "readingEnabled",
    title: "Leer en voz alta",
    icon: iconsFuncionality["icon-read-text"],
    onclick: toggleReadOnHover,
    labelOptions: ["Leer normal"],
    profiles: [
      "accessibility-btn-total-blindness",
      "Discapacidad Cognitiva",
      "Trastornos de Aprendizaje",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-autism",
    ],
  },
  {
    id: "highlights",
    title: "Resaltar Enlaces",
    icon: iconsFuncionality["icon-highlight-links"],
    onclick: highlightLinks,
    profiles: ["accessibility-btn-visual", "accessibility-btn-autism"],
  },
  {
    id: "noneAnimation",
    title: "Detener Animaciones",
    icon: iconsFuncionality["icon-stop-animations"],
    onclick: toggleAnimations,
    profiles: [
      "Discapacidad Cognitiva",
      "accessibility-btn-asperger",
      "accessibility-btn-downsyndrom",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-hyperactivity",
      "accessibility-btn-autism",
    ],
  },
  {
    id: "readingBarEnabled",
    title: "Activar Barra de Lectura",
    icon: iconsFuncionality["icon-read-bar"],
    onclick: toggleReadingBar,
    profiles: ["Trastornos de Aprendizaje", "accessibility-btn-visual"],
  },
  {
    id: "cursor-large",
    title: "Cursor Grande",
    icon: iconsFuncionality["icon-big-cursor"],
    onclick: toggleLargeCursor,
    profiles: [
      "accessibility-btn-visual",
      "Motora",
      "accessibility-btn-downsyndrom",
    ],
  },
  {
    id: "fontStyle",
    title: "Fuente Legible",
    icon: iconsFuncionality["icon-font-change"],
    onclick: toggleFontStyle,
    countOptions: 2,
    labelOptions: ["Fuente arial", "Fuente verdana"],
    profiles: [
      "Trastornos de Aprendizaje",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
    ],
  },
  {
    id: "readingSpeed",
    title: "Velocidad de Lectura",
    icon: iconsFuncionality["icon-read-speed"],
    onclick: toggleReadSpeed,
    countOptions: 2,
    labelOptions: ["Leer 1.5x", "Leer 0.5x"],
    profiles: [
      "accessibility-btn-total-blindness",
      "Discapacidad Cognitiva",
      "Trastornos de Aprendizaje",
    ],
  },
  {
    id: "highlightColors",
    title: "Resaltar Colores",
    icon: iconsFuncionality["icon-highlight-colors"],
    onclick: toggleHighlightColors,
    countOptions: 3,
    labelOptions: ["Contraste Alto", "Escala de Grises", "Cambio de Tonos"],
    profiles: ["accessibility-btn-visual"],
  },
  {
    id: "volumeControl",
    title: "Control de Volumen",
    countOptions:2,
    icon: iconsFuncionality["icon-sound-volume"],
    onclick: toggleVolumeControl,
    labelOptions: ["Medio", "Bajo"],
    profiles: ["accessibility-btn-total-blindness"],
  },
  {
    id: "protanopia",
    title: "Protanopia",
    icon: iconsFuncionality["icon-eye-protanopia"],
    onclick: activateProtanopia,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "deuteranopia",
    title: "Deuteranopia",
    icon: iconsFuncionality["icon-eye-deuteranopia"],
    onclick: activateDeuteranopia,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "tritanopia",
    title: "Tritanopia",
    icon: iconsFuncionality["icon-eye-tritanopia"],
    onclick: activatetritanopia,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "protanomaly",
    title: "Protanomalia",
    icon: iconsFuncionality["icon-eye-protanomalia"],
    onclick: activateProtanomaly,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "deuteranomaly",
    title: "Deuteranomalia",
    icon: iconsFuncionality["icon-eye-deuteranomalia"],
    onclick: activateDeuteranomaly,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "tritanomaly",
    title: "Tritanomalia",
    icon: iconsFuncionality["icon-eye-tritanomalia"],
    onclick: activateTritanomaly,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "achromatomaly",
    title: "Acromatomalia",
    icon: iconsFuncionality["icon-eye-acromatomalia"],
    onclick: activateAchromatomaly,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "achromatopsia",
    title: "Acromatopsia",
    icon: iconsFuncionality["icon-eye-acromatopsia"],
    onclick: activateAchromatopsia,
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "focus-frame-active",
    title: "Marco de Enfoque",
    icon: iconsFuncionality["icon-focus-framework"],
    onclick: toggleFocusFrame,
    profiles: [
      "accessibility-btn-color-blindness",
      "Trastornos de Aprendizaje",
      "Discapacidad Cognitiva",
    ],
  },
  {
    id: "selectiveContrast",
    title: "Contraste Selectivo",
    icon: iconsFuncionality["icon-selective-contrast"],
    onclick: toggleSelectiveContrast,
    profiles: ["Visión Baja", "accessibility-btn-color-blindness"],
  },
  {
    id: "guided-word",
    title: "Lectura Pausada",
    icon: iconsFuncionality["icon-read-paused"],
    onclick: toggleWordByWordReading,
    profiles: ["accessibility-btn-asperger", "Discapacidad Cognitiva"],
  },
  {
    id: "simplifiedText",
    title: "Modo Concentracion",
    icon: iconsFuncionality["icon-focus-mode"],
    onclick: toggleSimplifiedText,
    profiles: [
      "Discapacidad Cognitiva",
      "accessibility-btn-asperger",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-autism",
    ],
  },
  {
    id: "toggle-mute",
    title: "Silenciar Sonido",
    icon: iconsFuncionality["icon-sound-muted"],
    onclick: setGlobalMediaVolumeToZero,
    profiles: ["Sordera", "accessibility-btn-asperger"],
  },
  {
    id: "readingMask",
    title: "Máscara de Lectura",
    icon: iconsFuncionality["icon-read-mask"],
    onclick: toggleReadingMask,
    profiles: [
      "Trastornos de Aprendizaje",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-hyperactivity",
    ],
  },
  {
    id: "font-dyslexia",
    title: "Fuente Disléxica",
    icon: iconsFuncionality["icon-dislexic-font"],
    onclick: toggleDyslexiaFont,
    profiles: ["accessibility-btn-dyslexia"],
  },
  {
    id: "control-scroll",
    title: "Control Desplazamiento",
    icon: iconsFuncionality["icon-scroll-control"],
    onclick: preventAbruptScroll,
    profiles: [
      "Motora",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
    ],
  },
  {
    id: "lowContrast",
    title: "Contraste Bajo",
    icon: iconsFuncionality["icon-low-contrast"],
    onclick: activateLowContrast,
    profiles: [
      "accessibility-btn-visual",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-autism",
    ],
  },
  {
    id: "calibration-instructions-modal",
    title: "Control si Manos",
    icon: iconsFuncionality["icon-no-hands-control"],
    onclick: showCalibrationInstructions,
    profiles: ["accessibility-btn-physical"],
  },
  {
    id: "sig-lenguaje",
    title: "Traductor de Lengua de Señas",
    icon: iconsFuncionality["icon-sig-lenguaje"],
    onclick: null,
    profiles: ["accessibility-btn-sorta"],
  },
  {
    id: "virtualKeyboard",
    title: "Teclado En Pantalla",
    icon: iconsFuncionality["icon-virtual-keyboard"],
    onclick: toggleVirtualKeyboard,
    profiles: ["accessibility-btn-physical"],
  },
  {
    id: "color-slider",
    title: "Cambiar Color Texto",
    icon: iconsFuncionality["icon-color-slider"],
    onclick: setupColorSlider,
    profiles: ["accessibility-btn-visual"],
    type: "sliderColor", // Indica que este botón es un slider
  },
];

// Funcion para checkear los botones de funcionalidad
export const toggleCheckButton = (props = { id, checked, option: null }) => {
  const item = buttonsConfig.find((button) => button.id === props.id); // Busca el boton por ID
  const elements = document.querySelectorAll(`[data-id="${props.id}"]`); // Obtiene el elemento por ID

  elements?.forEach((element) => {
    const checks = element.querySelectorAll(
      ".accessibility-funcionality-button-bar-option"
    ); // Obtiene todos los checks dentro del elemento
    const text = element.querySelector(
      ".accessibility-funcionality-button-content p"
    );
    const icon = element.querySelector(
      ".accessibility-funcionality-button-icon"
    );
    if (props.checked) {
      if (props.option !== null) {
        text.innerHTML = item.labelOptions?.[props.option] ?? item.title; // Cambia el texto del botón al label correspondiente o al título por defecto
        icon.innerHTML = item.iconOptions?.[props.option] ?? item.icon ?? null; // Cambia el icono del botón al icono correspondiente o al icono por defecto
        // Establece el check actual al color primario
        checks[props.option].style.background = "var(--primaryColor)"; // Muestra el check correspondiente

        // Cambia el check anterior a #cacaca si existe
        if (props.option > 0) {
          checks[props.option - 1].style.background = "#cacaca"; // Cambia el color del check anterior
        }
      }
      
      element.classList.add("active"); // Alterna la clase "active"
      element
        .querySelector(".accessibility-content-checks")
        ?.classList.remove("hidden");
    } else {
      text.innerHTML = item.title; // Cambia el texto del botón al título por defecto
      icon.innerHTML = item.icon ?? null; // Cambia el icono del botón al icono por defecto
      checks.forEach((check) => {
        check.style.background = "#cacaca"; // Cambia el color del ultimo check
      });
      element.classList.remove("active"); // Alterna la clase "active"
      element
        .querySelector(".accessibility-content-checks")
        ?.classList.add("hidden");
    }
  });
};

export const allButtons = (id, profiles = []) => {
  const container = document.createElement("div");
  container.id = id;

  const filteredButtons = buttonsConfig
    .filter((btn) => {
      if (profiles.length === 0) {
        return true;
      } else {
        return btn.profiles?.some((p) => profiles.includes(p));
      }
    })
    .map((btn) => {
      if (btn.profiles?.some((p) => profiles.includes(p))) {
        return { ...btn, active: true };
      }
      return btn;
    });

  filteredButtons.forEach(({ id, title, icon, onclick, countOptions }) => {
    container.appendChild(
      createFuncionalityButton({ id, title, icon, onclick, countOptions })
    );
  });

  return container;
};

// activar botones por defecto segun el perfil escogido
export const activateButtons = (profiles = []) => {
  const filteredButtons = buttonsConfig
    .filter((btn) => {
      if (profiles.length === 0) {
        return true;
      } else {
        return btn.profiles?.some((p) => profiles.includes(p));
      }
    })
    .map((btn) => {
      if (btn.profiles?.some((p) => profiles.includes(p))) {
        return { ...btn, active: true };
      }
      return btn;
    });

  filteredButtons.forEach(({ onclick }) => {
    onclick();
  });
};

// desactivar botones que se activaron previamente por defecto segun el perfil escogido
export const unactivateButtons = (profiles = []) => {
  const filteredButtons = buttonsConfig.filter((btn) => {
    if (profiles.length === 0) return null;
    return btn.profiles?.some((p) => profiles.includes(p));
  });
 
  filteredButtons.forEach((btn) => {
    const { onclick, id, countOptions } = btn;
    onclick();
    // Si tiene múltiples opciones, reiniciar al estado inicial
    if (countOptions && id) {
      let attempts = 0;
      while (localStorage.getItem(id) && localStorage.getItem(id) !== "false") {
        onclick(); // avanzar una opción
        attempts++;
        if (attempts > countOptions + 1) break; // evitar bucle infinito
      }
    }

   
  });
};
