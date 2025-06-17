// components/mentalView.js
import { switchView } from "../../widget";
import { allButtons } from "../components/allButtons/allButtons";
import { ToggleActiveProfiles } from "../utils/actions";
import { createCardProfile, createCardTitle } from "../utils/createElements";

// Crea la vista de perfilesmentales
export function mentalView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "accessibility-mental-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Contenedor de perfiles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

  profiles.append(
    createCardProfile({
      id: "accessibility-btn-asperger",
      title: "TEA",
      title_i18n: "viewCategory.mental.profile1.title",
      description: "Maneras distintivas de enfocar intereses, comunicación y relaciones.",
      description_i18n: "viewCategory.mental.profile1.description",
      onclick: () => ToggleActiveProfiles("accessibility-btn-asperger", "Asperger", "accessibility-mental-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-downsyndrom",
      title: "Down",
      title_i18n: "viewCategory.mental.profile2.title",
      description: "Manera propia y valiosa de experimentar el desarrollo personal y social.",
      description_i18n: "viewCategory.mental.profile2.description",
      onclick: () =>
        ToggleActiveProfiles("accessibility-btn-downsyndrom", "Sindrome de Down", "accessibility-mental-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-dyslexia",
      title: "Dislexia",
      title_i18n: "viewCategory.mental.profile3.title",
      description: "Forma especial de percibir y decodificar la estructura de los textos.",
      description_i18n: "viewCategory.mental.profile3.description",
      onclick: () => ToggleActiveProfiles("accessibility-btn-dyslexia", "Dislexia", "accessibility-mental-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-epilepsy",
      title: "Epilepsia",
      title_i18n: "viewCategory.mental.profile4.title",
      description: "Manifestaciones únicas del funcionamiento neurológico que representan la diversidad.",
      description_i18n: "viewCategory.mental.profile4.description",
      onclick: () => ToggleActiveProfiles("accessibility-btn-epilepsy", "Epilepsia", "accessibility-mental-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-hyperactivity",
      title: "TDAH",
      title_i18n: "viewCategory.mental.profile5.title",
      description: "Dinámicas especiales de atención, energía y procesamiento de estímulos.",
      description_i18n: "viewCategory.mental.profile5.description",
      onclick: () =>
        ToggleActiveProfiles("accessibility-btn-hyperactivity", "Hiperactividad", "accessibility-mental-view"),
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
