import "../styles/fullLayout.css";
import "../styles/views.css";
import "../styles/elements.css";
import { createButton, switchView, toggleMenu } from "../../widget";
import { host, isMobile } from "../constants/enviroments";
import { resetAllFunctionalities } from "../components/resetAllButton";
import { initializeGoogleLogin } from "../../api";

const header = () => {
  // Creamos el header
  const header = document.createElement("div");
  header.id = "accessibility-header";
  header.innerHTML = `
    <div id="accessibility-header-logo">
    </div>
    <div id="accessibility-header-nav">
    </div>
  `;
  // Agregamos el logo al header
  const logo = header.querySelector("#accessibility-header-logo");
  const logoImg = document.createElement("img");
  logoImg.src = `${host}/public/logos/LogoPrincipalBlue.svg`;
  logoImg.alt = "Logo de Unyco";
  const slogan = document.createElement("span");
  slogan.setAttribute("data-u-i18n", "fullLayout.slogan");
  slogan.innerHTML = "Connect With-U";
  slogan.style.userSelect = "none";
  logo.appendChild(logoImg);
  logo.appendChild(slogan);
  logo.style.cursor = "pointer";
  logo.addEventListener("click", () => {
    switchView("view-initial");
  });

  // Boton de usuario
  const userButton = createButton("accessibility-user-button", "", () => switchView("accessibility-user-profile-view"));
  userButton.classList.add("accessibility-circle-button");
  userButton.innerHTML = `<img src="${host}/public/icons/generals/icon-user.svg" alt="User Icon">`;

  // Boton de cerrar menu
  const closeButton = createButton("accessibility-close-menu", "❌", toggleMenu);
  closeButton.classList.add("accessibility-circle-button");
  closeButton.innerHTML = `<img src="${host}/public/icons/generals/icon-x.svg" alt="Close Icon">`;

  // Agregamos los botones al header
  const nav = header.querySelector("#accessibility-header-nav");
  nav.appendChild(userButton);
  nav.appendChild(closeButton);

  return header;
};

export const main = (outlet) => {
  // Creamos el main
  const main = document.createElement("div");
  main.id = "accessibility-main";
  main.classList.add("accessibility-custom-scroll");

  // Agregamos el outlet al main
  outlet.forEach((element) => {
    main.appendChild(element);
  });

  return main;
};

const footer = () => {
  // Creamos el footer
  const footer = document.createElement("div");
  footer.id = "accessibility-footer";

  const toggleLanguages = () => {
    const currentView = document.querySelector(".accessibility-view:not(.hidden)");
    if (currentView && currentView.id === "accessibility-languages-view") {
      switchView(-1);
    } else {
      switchView("accessibility-languages-view");
    }
  };
  console.log(localStorage.getItem("u-i18n"), navigator.language.slice(0, 2));
  // Boton de lenguajes
  const languageButton = createButton("accessibility-language-button", "", toggleLanguages);
  languageButton.classList.add("accessibility-flag-button");
  languageButton.style.backgroundImage = `url("${host}/public/icons/flags/${
    localStorage.getItem("u-i18n") ?? navigator.language.slice(0, 2)
  }.svg")`;
  languageButton.style.backgroundSize = "cover";
  languageButton.style.backgroundPosition = "center";
  languageButton.style.backgroundRepeat = "no-repeat";
  languageButton.setAttribute("aria-hidden", "false");

  // Boton de restaurar
  const resetButton = createButton("accessibility-reset-button", "", resetAllFunctionalities, false); // sin paréntesis
  resetButton.classList.add("accessibility-circle-button");
  resetButton.innerHTML = `<img src="${host}/public/icons/generals/icon-reset.svg" alt="Reset Icon">`;

  // Boton de tamaño xl
  let isXL = false;
  const changeSizeMenu = () => {
    const menu = document.querySelector("#accessibility-menu");
    if (!menu) return;
    if (isXL) {
      menu.style.width = "";
      menu.style.fontSize = "";
    } else {
      // menu.style.width = "min(100%, max(35%, 600px))";
      menu.style.width = "650px";
      menu.style.fontSize = "1.3em"; // Aumentamos el tamaño de fuente
    }
    isXL = !isXL;
  };

  let sizeXLButton = null;
  if (!isMobile && window.innerWidth >= 650) {
    sizeXLButton = createButton("accessibility-size-xl-button", "", changeSizeMenu);
    sizeXLButton.classList.add("accessibility-circle-button");
    sizeXLButton.innerHTML = `<img src="${host}/public/icons/generals/icon-xl.svg" alt="Size XL Icon">`;
  }

  const togglePosition = () => {
    const currentView = document.querySelector(".accessibility-view:not(.hidden)");
    if (currentView && currentView.id === "accessibility-position-view") {
      switchView(-1);
    } else {
      switchView("accessibility-position-view");
    }
  };

  const moveleftButton = createButton("accessibility-move-button", "", togglePosition);
  moveleftButton.classList.add("accessibility-circle-button");
  moveleftButton.innerHTML = `<img src="${host}/public/icons/generals/icon-arrow-multi.svg" alt="Move left Icon">`;

  // Boton de ayuda
  const helpButton = createButton("accessibility-help-button", "", toggleMenu);
  helpButton.classList.add("accessibility-circle-button");
  helpButton.innerHTML = `<img src="${host}/public/icons/generals/icon-help.svg" alt="Help Icon">`;

  // Agregamos los botones al footer
  const footerButtons = document.createElement("div");
  footerButtons.id = "accessibility-footer-buttons";
  footerButtons.appendChild(languageButton);
  footerButtons.appendChild(resetButton);
  if (sizeXLButton) {
    footerButtons.appendChild(sizeXLButton);
  }
  footerButtons.appendChild(moveleftButton);
  footerButtons.appendChild(helpButton);

  footer.appendChild(footerButtons);

  return footer;
};

export const fullLayout = (outlet) => {
  // Creamos la estructura del fullLayout y agregamos el header, main y footer
  const fullLayout = document.createElement("div");
  fullLayout.id = "accessibility-full-layout";
  fullLayout.classList.add("accessibility-custom-scroll");
  fullLayout.appendChild(header());
  fullLayout.appendChild(main(outlet));
  fullLayout.appendChild(footer());

  return fullLayout;
};
