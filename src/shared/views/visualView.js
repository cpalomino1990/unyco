// components/visualView.js
import { switchView } from "../../widget";
import { allButtons } from "../components/allButtons/allButtons";
import { ToggleActiveProfiles } from "../utils/actions";
import { createCardProfile, createCardTitle } from "../utils/createElements";

// Crea la vista de perfiles visuales
export function visualView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "accessibility-visual-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Contenedor de perfiles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

  profiles.append(
    createCardProfile({
      id: "accessibility-btn-visual",
      title: "Baja Visión",
      title_i18n: "viewCategory.visual.profile1.title",
      description: "Experiencia visual propia que enriquece la forma de percibir el entorno.",
      description_i18n: "viewCategory.visual.profile1.description",
      onclick: () => ToggleActiveProfiles("accessibility-btn-visual", "Baja Visión", "accessibility-visual-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-total-blindness",
      title: "Ceguera",
      title_i18n: "viewCategory.visual.profile2.title",
      description: "Forma de percepción que prioriza otros sentidos para interpretar el mundo.",
      description_i18n: "viewCategory.visual.profile2.description",
      onclick: () => ToggleActiveProfiles("accessibility-btn-total-blindness", "Ceguera", "accessibility-visual-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-color-blindness",
      title: "Daltonismo",
      title_i18n: "viewCategory.visual.profile3.title",
      description: "Experiencia singular en la apreciación y distinción de los colores.",
      description_i18n: "viewCategory.visual.profile3.description",
      onclick: () =>
        ToggleActiveProfiles("accessibility-btn-color-blindness", "Daltonismo", "accessibility-visual-view"),
    })
  );

  // Contenedor de botones adicionales (oculto por defecto)
  const contentButtonProfiles = document.createElement("div");
  contentButtonProfiles.id = "accessibility-content-button-profiles";

  // Ensamblado de la vista
  categoriesView.appendChild(
    createCardTitle({
      id: "",
      text: "Perfiles de capacidad diversa",
      text_i18n: "viewCategory.title1",
      btnBack: true,
      collapse: false,
      onclick: () => switchView("view-initial"),
    })
  );
  categoriesView.appendChild(profiles);
  categoriesView.appendChild(contentButtonProfiles);
  categoriesView.appendChild(
    createCardTitle({
      id: "",
      text: "Mas configuraciones",
      text_i18n: "viewCategory.title2",
      btnBack: false,
      collapse: false,
    })
  );
  // Sección general de botones: muestra todos
  categoriesView.appendChild(allButtons("accessibility-content-others-buttons"));

  return categoriesView;
}
//fin//