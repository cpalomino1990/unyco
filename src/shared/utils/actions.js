import { activateButtons, allButtons, unactivateButtons } from "../components/allButtons/allButtons";
import { createCardTitle } from "./createElements";

export async function ChangeTheme(value, customColor) {
  document.documentElement.setAttribute("data-theme", value);

  updateLogoAndIcons(value);

  document.documentElement.style.setProperty("--primaryColor", customColor);
}

function updateLogoAndIcons(theme) {
  const logo = document.querySelector("#accessibility-header-logo img");
  if (logo) {
    const baseLogo = logo.getAttribute("data-base-src") || logo.getAttribute("src");
    const newLogoSrc = baseLogo.replace(/(Blue|Purple)/, capitalize(theme === "custom" ? "blue" : theme));
    logo.setAttribute("src", newLogoSrc);
    logo.setAttribute("data-base-src", baseLogo);
  }

  const icons = document.querySelectorAll(".accessibility-card-button-icon img");
  console.log(icons);
  icons.forEach((img) => {
    const baseSrc = img.getAttribute("data-base-src") || img.getAttribute("src");
    const newSrc = baseSrc.replace(/(Blue|Purple)/, capitalize(theme === "custom" ? "blue" : theme));
    img.setAttribute("src", newSrc);
    img.setAttribute("data-base-src", baseSrc);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Simula una petición al backend
async function fetchCustomPrimaryColor() {
  const response = await fetch("/api/theme/customColor");
  if (!response.ok) {
    throw new Error("No se pudo obtener el color personalizado");
  }
  const data = await response.json();
  return data.primaryColor; // Asegúrate de que el backend devuelve { primaryColor: "#ff0000" }
}

// Array para almacenar los perfiles activos
export const activeProfiles = [];

// Función para activar o desactivar un perfil y reconstruir botones
export const ToggleActiveProfiles = (id, title, idCard) => {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle("active");

    const checkElement = element.querySelector(".accessibility-check");
    if (checkElement) {
      checkElement.style.display = checkElement.style.display === "none" ? "flex" : "none";
    }
  }

  const index = activeProfiles.findIndex((profile) => profile.id === id);

  if (index !== -1) {
    // Perfil ya activo → desactivarlo
    activeProfiles.splice(index, 1);
    const content = document.querySelector(`#accessibility-content-button-profiles-${id}`);
    if (content) content.remove();
    unactivateButtons([id]);
  } else {
    // Activar nuevo perfil
    activeProfiles.push({ id, title });

    let contentButtonProfiles = document.getElementById(`accessibility-content-button-profiles-${id}`);
    if (!contentButtonProfiles) {
      contentButtonProfiles = document.createElement("div");
      contentButtonProfiles.id = `accessibility-content-button-profiles-${id}`;
      contentButtonProfiles.style.display = "none";
    }

    // Agregar título del perfil
    const titleElement = createCardTitle({
      id: `accessibility-title-profile-select-${id}`,
      text: title,
      btnBack: false,
      collapse: false,
    });

    // Limpia todo y agrega el nuevo título
    contentButtonProfiles.innerHTML = "";
    contentButtonProfiles.appendChild(titleElement);

    // Agrega botones del perfil
    const botonesPerfil = allButtons("accessibility-buttons-active", [id]);
    contentButtonProfiles.appendChild(botonesPerfil);
    contentButtonProfiles.style.display = "block";

    const parent = document.querySelector(`#${idCard} #accessibility-content-button-profiles`);
    if (parent) {
      parent.appendChild(contentButtonProfiles);
    }

    activateButtons([id]);
  }
};

export function DeactivateProfile(id) {
  const index = activeProfiles.findIndex((profile) => profile.id === id);
  if (index !== -1) {
    // Eliminar clase "active" del botón
    const element = document.getElementById(id);
    if (element) {
      element.classList.remove("active");

      const checkElement = element.querySelector(".accessibility-check");
      if (checkElement) {
        checkElement.style.display = "none";
      }
    }

    // Quitar del array de perfiles activos
    activeProfiles.splice(index, 1);

    // Eliminar contenedor de botones adicionales
    const content = document.querySelector(`#accessibility-content-button-profiles-${id}`);
    if (content) content.remove();
  }
}
