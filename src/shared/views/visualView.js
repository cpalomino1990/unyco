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
      description: "Este perfil mejora la visibilidad del contenido para personas con visión reducida.",
      onclick: () => ToggleActiveProfiles("accessibility-btn-visual", "Baja Visión", "accessibility-visual-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-total-blindness",
      title: "Ceguera",
      description: "Este perfil permite escuchar el contenido mediante lectura por voz.",
      onclick: () => ToggleActiveProfiles("accessibility-btn-total-blindness", "Ceguera", "accessibility-visual-view"),
    }),
    createCardProfile({
      id: "accessibility-btn-color-blindness",
      title: "Daltonismo",
      description: "Este perfil ofrece filtros de color adaptados a distintos tipos de daltonismola.",
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
