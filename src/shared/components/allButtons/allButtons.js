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
import { toggleMediaSilence } from "../../../features/buttons/buttonToggleGlobalMute";
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
  activateLowContrast,
  activateTritanopia,
} from "../../../features/buttons/buttondaltonismo";
import { toggleTextColorSlider } from "../../../features/buttons/buttonColorSlider";
//import { startCalibration } from "../../../features/buttons/startCalibration";

import { createFuncionalityButton } from "../../utils/createElements";
import { toggleVirtualKeyboard } from "../../../features/buttons/buttonActivateKeyBoard";
import { iconsFuncionality } from "/public/icons/iconsFuncionalityButtons/IconsFuncionality";
import { showCalibrationInstructions } from "../../../features/EyeCursorControl/showCalibrationInstructions";
import { toggleSigLanguge } from "../../../features/buttons/buttonSigLanguge";
import { resetAllFunctionalities, resetAllFunctionalities1 } from "../resetAllButton";
import { DeactivateProfile } from "../../utils/actions";
import { toggleTextAlignRight } from "../../../features/buttons/buttonTextAlignRight";
import { toggleTextAlignLeft } from "../../../features/buttons/buttontoggleTextAlignLeft";
import { LineHeightChange, toggleLineSpacing } from "../../../features/buttons/buttonLineSpacing";
import { toggleTextAlignCeter } from "../../../features/buttons/buttonTextAlignCenter";
import { applyTranslations, svgStructure } from "../../../widget";

// Configuración de todos los botones con perfiles asociados
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const buttonsConfig = [
  {
    id: "outline-mode",
    title: "Modo resaltado",
    title_i18n: "functionalityButtons.button1.title",
    description: "Resalta contenido importante.",
    description_i18n: "functionalityButtons.button1.description",
    icon: iconsFuncionality["icon-highlight"],
    onclick: toggleOutlineMode,
    // profiles: [
    //   "accessibility-btn-visual",
    //   "accessibility-btn-color-blindness",
    //   "Trastornos de Aprendizaje",
    //   "Discapacidad Cognitiva",
    //   "accessibility-btn-dyslexia",
    //   "accessibility-btn-epilepsy",
    // ],
    active: false,
  },
  {
    id: "highlightImportant",
    title: "Resaltar Texto",
    title_i18n: "functionalityButtons.button2.title",
    description: "Destaca el texto visible.",
    description_i18n: "functionalityButtons.button2.description",
    icon: iconsFuncionality["icon-highlight-text"],
    onclick: toggleHighlightImportant,
    profiles: ["accessibility-btn-visual", "Trastornos de Aprendizaje", "accessibility-btn-autism"],
    active: false,
  },
  {
    id: "textMagnifierEnabled",
    title: "Lupa",
    title_i18n: "functionalityButtons.button3.title",
    description: "Amplia el texto al pasar el cursor.",
    description_i18n: "functionalityButtons.button3.description",
    icon: iconsFuncionality["icon-zoom-text"],
    onclick: toggleTextMagnifier,
    profiles: ["accessibility-btn-visual"],
    active: false,
  },
  {
    id: "letter-size-style",
    title: "Aumentar Texto",
    title_i18n: "functionalityButtons.button4.title",
    description: "Aumenta el tamaño del texto en la página.",
    description_i18n: "functionalityButtons.button4.description",
    icon: iconsFuncionality["icon-text-up"],
    onclick: FontsizeChange,
    countOptions: 3,
    labelOptions: ["Aumentado 25%", "Aumentado 50%", "Aumentado 75%"],
    iconOptions: [
      iconsFuncionality["icon-text-up1"],
      iconsFuncionality["icon-text-up2"],
      iconsFuncionality["icon-text-up3"],
    ],
    profiles: ["accessibility-btn-visual", "Trastornos de Aprendizaje", "accessibility-btn-downsyndrom"],
    active: false,
  },
  {
    id: "letter-size-style-space",
    title: "Aumentar Espaciado",
    title_i18n: "functionalityButtons.button5.title",
    description: "Mejora el espaciado del texto.",
    description_i18n: "functionalityButtons.button5.description",
    icon: iconsFuncionality["icon-text-space"],
    onclick: toggleLetterSpacing,
    countOptions: 3,
    labelOptions: ["Aumentado 5%", "Aumentado 10%", "Aumentado 15%"],
    iconOptions: [
      iconsFuncionality["icon-text-space1"],
      iconsFuncionality["icon-text-space2"],
      iconsFuncionality["icon-text-space3"],
    ],
    profiles: ["Trastornos de Aprendizaje", "accessibility-btn-downsyndrom", "accessibility-btn-visual"],
    active: false,
  },
  {
    id: "readingEnabled",
    title: "Leer en voz alta",
    title_i18n: "functionalityButtons.button6.title",
    description: "Lee el texto de la página al pasar el cursor.",
    description_i18n: "functionalityButtons.button6.description",
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
      "accessibility-btn-toc",
    ],
    active: false,
  },
  {
    id: "highlights",
    title: "Resaltar Enlaces",
    title_i18n: "functionalityButtons.button7.title",
    description: "Destaca los enlaces en la página.",
    description_i18n: "functionalityButtons.button7.description",
    icon: iconsFuncionality["icon-highlight-links"],
    onclick: highlightLinks,
    profiles: ["accessibility-btn-visual", "accessibility-btn-autism", "accessibility-btn-toc"],
    active: false,
  },
  {
    id: "noneAnimation",
    title: "Detener Animaciones",
    title_i18n: "functionalityButtons.button8.title",
    description: "Desactiva todas las animaciones de la página.",
    description_i18n: "functionalityButtons.button8.description",
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
      "accessibility-btn-toc",
    ],
    active: false,
  },
  !isMobile && {
    id: "readingBarEnabled",
    title: "Activar Barra de Lectura",
    title_i18n: "functionalityButtons.button9.title",
    description: "Muestra una barra que facilita la lectura.",
    description_i18n: "functionalityButtons.button9.description",
    icon: iconsFuncionality["icon-read-bar"],
    onclick: toggleReadingBar,
    profiles: ["Trastornos de Aprendizaje", "accessibility-btn-visual"],
    active: false,
  },
  !isMobile && {
    id: "cursor-large",
    title: "Cursor Grande",
    title_i18n: "functionalityButtons.button10.title",
    description: "Cambia el cursor a un tamaño más grande.",
    description_i18n: "functionalityButtons.button10.description",
    icon: iconsFuncionality["icon-big-cursor"],
    onclick: toggleLargeCursor,
    profiles: ["accessibility-btn-visual", "accessibility-btn-toc", "accessibility-btn-downsyndrom"],
    active: false,
  },
  {
    id: "fontStyle",
    title: "Fuente Legible",
    title_i18n: "functionalityButtons.button11.title",
    description: "Cambia la fuente del texto a una más legible.",
    description_i18n: "functionalityButtons.button11.description",
    icon: iconsFuncionality["icon-font-change"],
    onclick: toggleFontStyle,
    countOptions: 2,
    labelOptions: ["Fuente arial", "Fuente verdana"],
    profiles: ["Trastornos de Aprendizaje", "accessibility-btn-dyslexia", "accessibility-btn-epilepsy"],
    active: false,
  },
  {
    id: "readingSpeed",
    title: "Velocidad de Lectura",
    title_i18n: "functionalityButtons.button12.title",
    description: "Ajusta la velocidad de lectura del texto.",
    description_i18n: "functionalityButtons.button12.description",
    icon: iconsFuncionality["icon-read-speed"],
    onclick: toggleReadSpeed,
    countOptions: 2,
    labelOptions: ["Leer 1.5x", "Leer 0.5x"],
    profiles: ["accessibility-btn-total-blindness", "Discapacidad Cognitiva", "Trastornos de Aprendizaje"],
    active: false,
  },
  {
    id: "highlightColors",
    title: "Resaltar Colores",
    title_i18n: "functionalityButtons.button13.title",
    description: "Cambia los colores de resaltado para mejorar la visibilidad.",
    description_i18n: "functionalityButtons.button13.description",
    icon: iconsFuncionality["icon-highlight-colors"],
    onclick: toggleHighlightColors,
    countOptions: 3,
    labelOptions: ["Contraste Alto", "Escala de Grises", "Cambio de Tonos"],
    profiles: ["accessibility-btn-visual", "accessibility-btn-toc"],
    active: false,
  },
  {
    id: "volumeControl",
    title: "Control de Volumen",
    title_i18n: "functionalityButtons.button14.title",
    description: "Ajusta el volumen del lector de pantalla.",
    description_i18n: "functionalityButtons.button14.description",
    countOptions: 2,
    icon: iconsFuncionality["icon-sound-volume"],
    onclick: toggleVolumeControl,
    labelOptions: ["Medio", "Bajo"],
    profiles: ["accessibility-btn-total-blindness"],
    active: false,
  },
  {
    id: "protanopia",
    title: "Protanopia",
    title_i18n: "functionalityButtons.button15.title",
    description: "Ajuste de colores para falta de percepción del rojo.",
    description_i18n: "functionalityButtons.button15.description",
    icon: iconsFuncionality["icon-eye-protanopia"],
    onclick: activateProtanopia,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "deuteranopia",
    title: "Deuteranopia",
    title_i18n: "functionalityButtons.button16.title",
    description: "Ajuste de colores para falta de percepción del verde.",
    description_i18n: "functionalityButtons.button16.description",
    icon: iconsFuncionality["icon-eye-deuteranopia"],
    onclick: activateDeuteranopia,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "tritanopia",
    title: "Tritanopia",
    title_i18n: "functionalityButtons.button17.title",
    description: "Ajuste de colores para falta de percepción del azul.",
    description_i18n: "functionalityButtons.button17.description",
    icon: iconsFuncionality["icon-eye-tritanopia"],
    onclick: activateTritanopia,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "protanomaly",
    title: "Protanomalia",
    title_i18n: "functionalityButtons.button18.title",
    description: "Ajuste de colores para correcion parcial del rojo.",
    description_i18n: "functionalityButtons.button18.description",
    icon: iconsFuncionality["icon-eye-protanomalia"],
    onclick: activateProtanomaly,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "deuteranomaly",
    title: "Deuteranomalia",
    title_i18n: "functionalityButtons.button19.title",
    description: "Ajuste de colores para correcion parcial del verde.",
    description_i18n: "functionalityButtons.button19.description",
    icon: iconsFuncionality["icon-eye-deuteranomalia"],
    onclick: activateDeuteranomaly,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "tritanomaly",
    title: "Tritanomalia",
    title_i18n: "functionalityButtons.button20.title",
    description: "Ajuste de colores para correcion parcial del azul.",
    description_i18n: "functionalityButtons.button20.description",
    icon: iconsFuncionality["icon-eye-tritanomalia"],
    onclick: activateTritanomaly,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "achromatomaly",
    title: "Acromatomalia",
    title_i18n: "functionalityButtons.button21.title",
    description: "Ajuste de colores parcialmente en blanco y negro.",
    description_i18n: "functionalityButtons.button21.description",
    icon: iconsFuncionality["icon-eye-acromatomalia"],
    onclick: activateAchromatomaly,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "achromatopsia",
    title: "Acromatopsia",
    title_i18n: "functionalityButtons.button22.title",
    description: "Ajuste de colores para Escala de grises total.",
    description_i18n: "functionalityButtons.button22.description",
    icon: iconsFuncionality["icon-eye-acromatopsia"],
    onclick: activateAchromatopsia,
    profiles: ["accessibility-btn-color-blindness"],
    active: false,
    autoActivate: false,
  },
  {
    id: "focus-frame-active",
    title: "Marco de Enfoque",
    title_i18n: "functionalityButtons.button23.title",
    description: "Marca el elemento en el que se esta posicionado.",
    description_i18n: "functionalityButtons.button23.description",
    icon: iconsFuncionality["icon-focus-framework"],
    onclick: toggleFocusFrame,
    profiles: ["accessibility-btn-color-blindness", "Trastornos de Aprendizaje", "Discapacidad Cognitiva"],
    active: false,
  },
  {
    id: "selectiveContrast",
    title: "Contraste Selectivo",
    title_i18n: "functionalityButtons.button24.title",
    description: "Coloca la pagina en modo oscuro.",
    description_i18n: "functionalityButtons.button24.description",
    icon: iconsFuncionality["icon-selective-contrast"],
    onclick: toggleSelectiveContrast,
    profiles: [],
    active: false,
  },
  {
    id: "guided-word",
    title: "Lectura Pausada",
    title_i18n: "functionalityButtons.button25.title",
    description: "Activa la lectura palabra por palabra.",
    description_i18n: "functionalityButtons.button25.description",
    icon: iconsFuncionality["icon-read-paused"],
    onclick: toggleWordByWordReading,
    profiles: ["accessibility-btn-asperger", "Discapacidad Cognitiva"],
    active: false,
    autoActivate: false,
  },
  {
    id: "simplifiedText",
    title: "Modo Concentracion",
    title_i18n: "functionalityButtons.button26.title",
    description: "Elimina las imagenes y videos que distraen.",
    description_i18n: "functionalityButtons.button26.description",
    icon: iconsFuncionality["icon-focus-mode"],
    onclick: toggleSimplifiedText,
    profiles: [
      "Discapacidad Cognitiva",
      "accessibility-btn-asperger",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-autism",
      "accessibility-btn-toc",
    ],
    active: false,
  },
  {
    id: "mediaSilence",
    title: "Silenciar Sonido",
    title_i18n: "functionalityButtons.button27.title",
    description: "Silencia el sonido de la página.",
    description_i18n: "functionalityButtons.button27.description",
    icon: iconsFuncionality["icon-sound-muted"],
    onclick: toggleMediaSilence,
    profiles: ["Sordera", "accessibility-btn-asperger"],
    active: false,
  },
  !isMobile && {
    id: "readingMask",
    title: "Máscara de Lectura",
    title_i18n: "functionalityButtons.button28.title",
    description: "Añade una máscara para facilitar la lectura.",
    description_i18n: "functionalityButtons.button28.description",
    icon: iconsFuncionality["icon-read-mask"],
    onclick: toggleReadingMask,
    profiles: [
      "Trastornos de Aprendizaje",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-hyperactivity",
    ],
    active: false,
  },
  {
    id: "font-dyslexia",
    title: "Fuente Disléxica",
    title_i18n: "functionalityButtons.button29.title",
    description: "Cambia la fuente a una diseñada para dislexia.",
    description_i18n: "functionalityButtons.button29.description",
    icon: iconsFuncionality["icon-dislexic-font"],
    onclick: toggleDyslexiaFont,
    profiles: ["accessibility-btn-dyslexia"],
    active: false,
  },
  !isMobile && {
    id: "scrollControl",
    title: "Control Desplazamiento",
    title_i18n: "functionalityButtons.button30.title",
    description: "Controla el desplazamiento de la página para evitar saltos bruscos.",
    description_i18n: "functionalityButtons.button30.description",
    icon: iconsFuncionality["icon-scroll-control"],
    onclick: preventAbruptScroll,
    profiles: ["Motora", "accessibility-btn-dyslexia", "accessibility-btn-epilepsy"],
    active: false,
  },
  {
    id: "lowContrast",
    title: "Contraste Bajo",
    title_i18n: "functionalityButtons.button31.title",
    description: "Activa el modo de bajo contraste para mejorar la legibilidad.",
    description_i18n: "functionalityButtons.button31.description",
    icon: iconsFuncionality["icon-low-contrast"],
    onclick: activateLowContrast,
    profiles: [
      "accessibility-btn-visual",
      "accessibility-btn-dyslexia",
      "accessibility-btn-epilepsy",
      "accessibility-btn-autism",
    ],
    active: false,
  },
  {
    id: "calibration-instructions-modal",
    title: "Control por retina",
    title_i18n: "functionalityButtons.button32.title",
    description: "Activa la navegación del mouse por retina.",
    description_i18n: "functionalityButtons.button32.description",
    icon: iconsFuncionality["icon-no-hands-control"],
    onclick: showCalibrationInstructions,
    profiles: ["accessibility-btn-physical"],
    active: false,
  },
  {
    id: "sigLanguage",
    title: "Traductor de Lengua de Señas",
    title_i18n: "functionalityButtons.button33.title",
    description: "Activa el modo en lengua de señas de la pagina.",
    description_i18n: "functionalityButtons.button33.description",
    icon: iconsFuncionality["icon-sig-lenguaje"],
    onclick: toggleSigLanguge,
    profiles: ["accessibility-btn-sorta"],
    active: false,
  },
  {
    id: "virtualKeyboard",
    title: "Teclado en pantalla",
    title_i18n: "functionalityButtons.button34.title",
    description: "Activa el teclado en pantalla para facilitar la escritura.",
    description_i18n: "functionalityButtons.button34.description",
    icon: iconsFuncionality["icon-virtual-keyboard"],
    onclick: toggleVirtualKeyboard,
    profiles: [],
    active: false,
  },
  {
    id: "textColorSlider",
    title: "Cambiar Color Texto",
    title_i18n: "functionalityButtons.button35.title",
    description: "Permite cambiar el color del texto de la página.",
    description_i18n: "functionalityButtons.button35.description",
    icon: iconsFuncionality["icon-color-slider"],
    onclick: toggleTextColorSlider,
    profiles: ["accessibility-btn-visual"],
    type: "sliderColor", // Indica que este botón es un slider
    active: false,
  },
  {
    id: "textAlignRight",
    title: "Aliniar Texto a la Derecha",
    title_i18n: "functionalityButtons.button36.title",
    description: "Permite alinear el texto a la derecha.",
    description_i18n: "functionalityButtons.button36.description",
    icon: iconsFuncionality["icon-text-align-right"],
    onclick: toggleTextAlignRight,
    profiles: [""],
    active: false,
  },
  {
    id: "textAlignLeft",
    title: "Aliniar Texto a la Izquierda",
    title_i18n: "functionalityButtons.button37.title",
    description: "Permite alinear el texto a la izquierda.",
    description_i18n: "functionalityButtons.button37.description",
    icon: iconsFuncionality["icon-text-align-left"],
    onclick: toggleTextAlignLeft,
    profiles: [""],
    active: false,
  },
  {
    id: "textAlignCenter",
    title: "Aliniar Texto en el Centro",
    title_i18n: "functionalityButtons.button38.title",
    description: "Permite alinear el texto en el Centro.",
    description_i18n: "functionalityButtons.button38.description",
    icon: iconsFuncionality["icon-text-align-center"],
    onclick: toggleTextAlignCeter,
    profiles: [""],
    active: false,
  },
  {
    id: "line-spacing-style",
    title: "Espaciado de Líneas",
    title_i18n: "functionalityButtons.button39.title",
    description: "Ajusta el espaciado entre líneas del texto.",
    description_i18n: "functionalityButtons.button39.description",
    icon: iconsFuncionality["icon-text-line-space"],
    onclick: LineHeightChange,
    countOptions: 3,
    labelOptions: ["Aumentado 1.6", "Aumentado 1.8", "Aumentado 2.0"],
    iconOptions: [
      iconsFuncionality["icon-text-line-space"],
      iconsFuncionality["icon-text-line-space"],
      iconsFuncionality["icon-text-line-space"],
    ],
    active: false,
  },
].filter(Boolean);

// Funcion para checkear los botones de funcionalidad
export const toggleCheckButton = (props = { id, checked, option: null }) => {
  const item = buttonsConfig.find((button) => button.id === props.id); // Busca el boton por ID
  const elements = document.querySelectorAll(`[data-id="${props.id}"]`); // Obtiene el elemento por ID

  elements?.forEach((element) => {
    const checks = element.querySelectorAll(".accessibility-funcionality-button-bar-option"); // Obtiene todos los checks dentro del elemento
    const text = element.querySelector(".accessibility-funcionality-button-content p");
    const icon = element.querySelector(".accessibility-funcionality-button-icon");
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
      element.querySelector(".accessibility-content-checks")?.classList.remove("hidden");
    } else {
      text.innerHTML = item.title; // Cambia el texto del botón al título por defecto
      icon.innerHTML = item.icon ?? null; // Cambia el icono del botón al icono por defecto
      checks.forEach((check) => {
        check.style.background = "#cacaca"; // Cambia el color del ultimo check
      });
      element.classList.remove("active"); // Alterna la clase "active"
      element.querySelector(".accessibility-content-checks")?.classList.add("hidden");
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

  filteredButtons.forEach(
    ({ id, title, title_i18n, icon, onclick, countOptions, type, description, description_i18n, autoActivate }) => {
      container.appendChild(
        createFuncionalityButton({
          id,
          title,
          title_i18n,
          icon,
          onclick,
          countOptions,
          type,
          description,
          description_i18n,
          autoActivate,
        })
      );
    }
  );

  return container;
};

export const activateButtons = (profiles = []) => {
  const filteredButtons = buttonsConfig.filter((btn) => {
    if (profiles.length === 0) return true;
    return btn.profiles?.some((p) => profiles.includes(p));
  });

  const activatedButtons = buttonsConfig
    .filter((btn) => {
      if (profiles.length === 0) return true;
      return btn.profiles?.some((p) => profiles.includes(p));
    })
    .filter((btn) => btn.autoActivate !== false);

  activatedButtons.forEach(({ onclick }) => {
    onclick();
  });

  // Oculta los botones filtrados en la vista activa de accesibilidad
  const activeView = document.querySelector(".accessibility-view:not(.hidden)");
  if (activeView) {
    const othersButtonsContainer = activeView.querySelector("#accessibility-content-others-buttons");
    if (othersButtonsContainer) {
      Array.from(othersButtonsContainer.children).forEach((child) => {
        const childId = child.getAttribute("data-id");
        if (filteredButtons.some((item) => item.id === childId)) {
          child.style.display = "none";
        }
      });
    }
  }

  applyTranslations();
  svgStructure();
};

export const unactivateButtons = (profiles = [], excludedButtons = []) => {
  const filteredButtons = buttonsConfig
    .filter((btn) => {
      if (profiles.length === 0) return false;
      return btn.profiles?.some((p) => profiles.includes(p));
    })
    .filter((btn) => !excludedButtons.includes(btn.id));

  filteredButtons.forEach((btn) => {
    const { onclick, id, countOptions } = btn;
    onclick();
    DeactivateProfile(id);
    resetAllFunctionalities1();

    if (countOptions && id) {
      let attempts = 0;
      while (localStorage.getItem(id) && localStorage.getItem(id) !== "false") {
        onclick();
        attempts++;
        if (attempts > countOptions + 1) break;
      }
    }
  });

  // Mostrar nuevamente los botones ocultos
  const activeView = document.querySelector(".accessibility-view:not(.hidden)");
  if (activeView) {
    const othersButtonsContainer = activeView.querySelector("#accessibility-content-others-buttons");
    if (othersButtonsContainer) {
      Array.from(othersButtonsContainer.children).forEach((child) => {
        const childId = child.getAttribute("data-id");
        if (filteredButtons.some((item) => item.id === childId)) {
          child.style.display = "";
        }
      });
    }
  }

  applyTranslations();
  svgStructure();
};
