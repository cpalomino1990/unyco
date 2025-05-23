import { host } from "./shared/constants/enviroments.js";
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

export function initialView() {
  const bannerUser = createBannerUser();

  const showVistualButton = createButtonCard({
    id: "show-Visual",
    view: "accessibility-visual-view",
    text: "Visual",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/4-glasses.svg`,
  });

  const showPsicosocialButton = createButtonCard({
    id: "show-Mental",
    view: "accessibility-mental-view",
    text: "Psicosocial o Mental",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/5-peoples.svg`,
  });

  const showAuditivaButton = createButtonCard({
    id: "show-Auditiva",
    view: "accessibility-auditory-view",
    text: "Auditiva",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/6-hands.svg`,
  });

  const showFisicaButton = createButtonCard({
    id: "show-Motora",
    view: "accessibility-physical-view",
    text: "Fisica o Motriz",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/3-arm.svg`,
  });

  const showCognitivaButton = createButtonCard({
    id: "show-Cognitiva",
    view: "accessibility-cognitive-view",
    text: "Cognitiva",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/2-brain.svg`,
  });

  const showCustomButton = createButtonCard({
    id: "show-custom",
    view: "accessibility-custom-view",
    text: "Personalizado",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/1-people.svg`,
  });

  // const showComunicaciónButton = createButtonCard("show-Comunicación", "", () => {
  //   switchView("view-categories4");
  // });

  const initialView = document.createElement("div");
  initialView.id = "view-initial";
  initialView.classList.add("accessibility-view");
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
  ]);
}
