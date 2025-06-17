// components/visualView.js
import { switchView } from "../../widget";
import { allButtons } from "../components/allButtons/allButtons";
import { createCardTitle } from "../utils/createElements";

// Crea la vista de perfiles visuales
export function customView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "accessibility-custom-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Contenedor de perfiles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

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
