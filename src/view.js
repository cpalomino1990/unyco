import { host, isMobile } from "./shared/constants/enviroments.js";
import { fullLayout } from "./shared/layout/FullLayout.js";
import { createBannerUser, createButtonCard } from "./shared/utils/createElements.js";
import { createButton, createCategoryView } from "./widget.js";
import { switchView } from "./widget.js";
import { createResetButton } from "./widget.js";
import { visualView } from "./shared/views/visualView.js";
import { mentalView } from "./shared/views/mentalView.js";
import { auditoryView } from "./shared/views/auditoryView.js";
import { physicalView } from "./shared/views/physicalView.js";
import { cognitiveView } from "./shared/views/cognitiveView.js";
import {
  accountView,
  loginView,
  registerView,
  resetPasswordView,
  userImageView,
  userProfileView,
  userTermsView,
  userTermsView2,
} from "./shared/views/userView.js";
import { customView } from "./shared/views/customView.js";
import { alertMessageView } from "./shared/views/alertMessageView.js";
import { languagesView } from "./shared/views/languagesView.js";
import { positionView } from "./shared/views/positionView.js";


export function initialView() {
  const bannerUser = createBannerUser();

  const showVistualButton = createButtonCard({
    id: "show-Visual",
    view: "accessibility-visual-view",
    text: "Visual",
    text_i18n: "category.visual.title",
    icon: "1",
    description: "Formas únicas de percibir o interpretar el entorno a través de la vista.",
    description_i18n: "category.visual.description",
  });

  const showPsicosocialButton = createButtonCard({
    id: "show-Mental",
    view: "accessibility-mental-view",
    text: "Psicosocial",
    text_i18n: "category.mental.title",
    icon: "2",
    description: "Formas auténticas de interactuar, sentir y relacionarse con el mundo.",
    description_i18n: "category.mental.description",
  });

  const showAuditivaButton = createButtonCard({
    id: "show-Auditiva",
    view: "accessibility-auditory-view",
    text: "Auditiva",
    text_i18n: "category.auditory.title",
    icon: "3",
    description: "Maneras diversas de experimentar y conectarse con los sonidos del entorno.",
    description_i18n: "category.auditory.description",
  });

  const showFisicaButton = createButtonCard({
    id: "show-Motora",
    view: "accessibility-physical-view",
    text: "Fisica",
    text_i18n: "category.physical.title",
    icon: "4",
    description: "Estilos propios de movimiento, expresión corporal y coordinación.",
    description_i18n: "category.physical.description",
  });

  const showCognitivaButton = createButtonCard({
    id: "show-Cognitiva",
    view: "accessibility-cognitive-view",
    text: "Cognitiva",
    text_i18n: "category.cognitive.title",
    icon: "5",
    description: "Procesos únicos de pensamiento, aprendizaje, memoria y atención.",
    description_i18n: "category.cognitive.description",
  });

  const showCustomButton = createButtonCard({
    id: "show-custom",
    view: "accessibility-custom-view",
    text: "Personalizado",
    text_i18n: "category.custom.title",
    icon: "6",
    description: "Configura una experiencia adaptada a tus necesidades y preferencias individuales.",
    description_i18n: "category.custom.description",
  });

  // const showComunicaciónButton = createButtonCard("show-Comunicación", "", () => {
  //   switchView("view-categories4");
  // });

  const initialView = document.createElement("div");
  initialView.id = "view-initial";
  initialView.classList.add("accessibility-view", "hidden");
  initialView.classList.add("accessibility-custom-scroll");

  // Agregamos los botones
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("accessibility-view-buttons-container");
  buttonsContainer.appendChild(showVistualButton);
  buttonsContainer.appendChild(showPsicosocialButton);
  buttonsContainer.appendChild(showAuditivaButton);
  buttonsContainer.appendChild(showFisicaButton);
  buttonsContainer.appendChild(showCognitivaButton);
  buttonsContainer.appendChild(showCustomButton);

  // Agregamos el banner de usuario y los botones a la vista inicial
  initialView.appendChild(bannerUser);
  initialView.appendChild(buttonsContainer);

  // Quita el banner si provoca scroll
  // Observa cuando la vista se activa (se le quita el hidden)

  // Ejecuta el ajuste de layout cada vez que initialView se agrega al DOM
  const adjustLayout = () => {
    const minHeight = 670;
    const currentHeight = initialView.offsetHeight;
    if (currentHeight < minHeight && window.innerWidth > 1024) {
      initialView.style.fontSize = "0.8em";
      bannerUser.style.aspectRatio = 20 / 5;
      const cards = buttonsContainer.querySelectorAll(".accessibility-card-button");
      cards.forEach((element) => {
        element.style.aspectRatio = 10 / 6;
      });
    } else {
      initialView.style.fontSize = "";
      bannerUser.style.aspectRatio = "";
      const cards = buttonsContainer.querySelectorAll(".accessibility-card-button");
      cards.forEach((element) => {
        element.style.aspectRatio = "";
      });
    }
  };

  // Usa un MutationObserver para detectar cuando initialView se agrega al DOM
  // 1. Cuando se agregue al DOM
  const observer = new MutationObserver(() => {
    if (document.body.contains(initialView)) {
      // 3. Solo si la clase hidden no está
      if (!initialView.classList.contains("hidden")) {
        adjustLayout();
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 2. Cuando la vh cambie (resize)
  window.addEventListener("resize", () => {
    if (document.body.contains(initialView) && !initialView.classList.contains("hidden")) {
      adjustLayout();
    }
  });

  // 3. Cuando la clase hidden cambie en initialView
  const classObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class" &&
        !initialView.classList.contains("hidden")
      ) {
        adjustLayout();
      }
    }
  });
  classObserver.observe(initialView, { attributes: true, attributeFilter: ["class"] });

  // Limpia el observer cuando initialView se elimina del DOM
  initialView.addEventListener("DOMNodeRemoved", () => {
    observer.disconnect();
  });

  return initialView;
}

export function createCategoriesView5() {
  const categoriesView5 = document.createElement("div");
  categoriesView5.id = "view-categories4";
  categoriesView5.classList.add("accessibility-view", "hidden");
  categoriesView5.setAttribute("aria-hidden", "true");
  categoriesView5.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView5.appendChild(createResetButton());
  categoriesView5.append(
    createButton("btn-autismo", "Autismo", () => switchView("view-autismo")),
    createButton("btn-tco", "TOC Trastorno Obsesivo Compulsivo", () => switchView("view-tco"))
  );
  return categoriesView5;
}

export function renderFullLayout() {
  return fullLayout([
    initialView(),
    visualView(),
    mentalView(),
    auditoryView(),
    physicalView(),
    customView(),
    loginView(),
    accountView(),
    registerView(),
    resetPasswordView(),
    userImageView(),
    userTermsView(),
    userTermsView2(),
    userProfileView(),
    cognitiveView(),
    alertMessageView(),
    languagesView(),
    positionView(),
  ]);
}
