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
      id: "accessibility-btn-autism",
      title: "Autismo",
      title_i18n: "viewCategory.cognitive.profile1.title",
      description: "Estilo único de percibir, procesar y relacionarse con el entorno y las personas.",
      description_i18n: "viewCategory.cognitive.profile1.description",
      onclick: () => ToggleActiveProfiles("accessibility-btn-autism", "viewCategory.cognitive.profile1.title", "accessibility-cognitive-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-toc",
      title: "TOC",
      title_i18n: "viewCategory.cognitive.profile2.title",
      description: "Formas intensas y estructuradas de organizar pensamientos y acciones.",
      description_i18n: "viewCategory.cognitive.profile2.description",
      onclick: () =>
        ToggleActiveProfiles(
          "accessibility-btn-toc",
          "viewCategory.cognitive.profile2.title",
          "accessibility-cognitive-view"
        ),
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
