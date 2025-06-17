// components/physicalView.js
import { switchView } from "../../widget";
import { allButtons } from "../components/allButtons/allButtons";
import { ToggleActiveProfiles } from "../utils/actions";
import { createCardProfile, createCardTitle } from "../utils/createElements";

// Crea la vista de perfiles physical
export function physicalView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "accessibility-physical-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Contenedor de perfiles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

  profiles.append(
    createCardProfile({
      id: "accessibility-btn-physical",
      title: "Movilidad Superior",
      title_i18n: "viewCategory.physical.profile1.title",
      description: "Formas particulares de movimiento y expresión en la parte superior del cuerpo.",
      description_i18n: "viewCategory.physical.profile1.description",
      onclick: () =>
        ToggleActiveProfiles("accessibility-btn-physical", "Movilidad Superior Baja", "accessibility-physical-view"),
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
      btnBack: true,
      text_i18n: "viewCategory.title1",
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
