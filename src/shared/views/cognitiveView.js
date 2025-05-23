// components/cognitiveView.js
import { switchView } from "../../widget";
import { allButtons } from "../components/allButtons/allButtons";
import { ToggleActiveProfiles } from "../utils/actions";
import { createCardProfile, createCardTitle } from "../utils/createElements";

// Crea la vista de perfiles cognitive
export function cognitiveView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "accessibility-cognitive-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Contenedor de perfiles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

  profiles.append(
    createCardProfile({
      id: "accessibility-btn-autismo",
      title: "Autismo",
      description: "Lorem ipsum dolor sit amet...",
      onclick: () => ToggleActiveProfiles("accessibility-btn-autism", "Autismo", "accessibility-cognitive-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-tco",
      title: "TCO",
      description: "Lorem ipsum dolor sit amet...",
      onclick: () => ToggleActiveProfiles("accessibility-btn-tco", "TCO", "accessibility-cognitive-view"),
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
      collapse: false,
      onclick: () => switchView("view-initial"),
    })
  );
  categoriesView.appendChild(profiles);
  categoriesView.appendChild(contentButtonProfiles);
  categoriesView.appendChild(createCardTitle({ id: "", text: "Mas configuraciones", btnBack: false, collapse: false }));
  // Sección general de botones: muestra todos
  categoriesView.appendChild(allButtons("accessibility-content-others-buttons"));

  return categoriesView;
}
