import { renderFullLayout } from "./view.js";
import "./shared/styles/widget.css";
import { animationInitButton } from "./shared/utils/animationInitButton";
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import { filterForInitIcons } from "./shared/utils/canvas.js";

const URL_LOCALES = process.env.URL_LOCALES;

// Inicializa i18next
i18next
  .use(HttpBackend) // Carga recursos desde archivos JSON
  .init(
    {
      lng: navigator.language.slice(0, 2) ?? "es", // Idioma del usuario (p.ej. 'es', 'en')
      fallbackLng: "en", // Idioma por defecto si no hay traducción
      debug: false,
      backend: {
        loadPath: `${URL_LOCALES}/{{lng}}.json`, // Ruta de los archivos JSON
      },
    },
    (err, t) => {
      if (err) return console.error("Error al cargar i18next:", err);
      // Una vez cargado, traduce el contenido
      localStorage.setItem("u-i18n", navigator.language.slice(0, 2));
      applyTranslations();
    }
  );

// Función para aplicar las traducciones
export function applyTranslations() {
  document.querySelectorAll("[data-u-i18n]").forEach((element) => {
    const key = element.getAttribute("data-u-i18n");
    element.textContent = i18next.t(key);
  });

  document.querySelectorAll("[data-u-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-u-i18n-placeholder");
    const translated = i18next.t(key);
    element.setAttribute("placeholder", translated);
  });
}

export function getDynamicTranslation(key, options = {}) {
  const translate = i18next.t(`${key}`, options);
  return translate;
}

// fetch("https://ipapi.co/json/")
//   .then(res => res.json())
//   .then(data => {
//     console.log("Ciudad:", data.city);
//     console.log("País:", data.country_name);
//   });

// async function verificarDominio() {
//   const dominio = window.location.origin;
//   console.log(dominio);

//   try {
//     const response = await fetch(
//       `http://134.209.218.43:3000/domains/validate/${encodeURIComponent(
//         dominio
//       )}`
//     );
//     const data = await response.json();

//     if (data.authorized) {
//       // Ejecutar funciones
//       return true;
//       initAccessibilitySettings();
//     } else {
//       bloquearAcceso();
//       return false;
//     }
//   } catch (error) {
//     console.error("Error al verificar el dominio:", error);
//     bloquearAcceso();
//     return false;
//   }
// }

function bloquearAcceso() {
  document.body.innerHTML = `
    <div style="display: flex; height: 100vh; justify-content: center; align-items: center; background: #111; color: white; font-family: sans-serif; text-align: center;">
      <div>
        <h1>⚠️ Acceso denegado</h1>
        <p>Este dominio no está autorizado para utilizar este widget.</p>
      </div>
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", initWidget());

// Función para mostrar u ocultar el menú de accesibilidad
export function toggleMenu() {
  const menu = document.getElementById("accessibility-menu");
  menu.classList.toggle("hidden");
  menu.setAttribute("aria-hidden", menu.classList.contains("hidden"));

  const anyVisible = document.querySelector(".accessibility-view:not(.hidden)");
  if (!anyVisible) {
    const initialView = document.getElementById("view-initial");
    if (initialView) {
      initialView.classList.remove("hidden");
      initialView.setAttribute("aria-hidden", "false");
    }
  }
}

let historyViews = [];

const protectedViews = ["accessibility-user-profile-view"];

function isUserLoggedIn() {
  // Reemplaza esto con tu lógica real de autenticación
  return Boolean(localStorage.getItem("isAuth") === "true");
}

function hideAllViews() {
  document.querySelectorAll(".accessibility-view").forEach((element) => {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
      element.setAttribute("aria-hidden", "true");
    }
  });
}

function showView(viewId) {
  const view = document.getElementById(viewId);
  if (view) {
    view.classList.remove("hidden");
    view.setAttribute("aria-hidden", "false");
  }
}

export function switchView(viewId) {
  document.querySelector("#accessibility-close-menu").focus();

  if (viewId === -1) {
    let viewToShow = historyViews[historyViews.length - 1];
    historyViews.pop();

    if (viewToShow) {
      hideAllViews();
      // Validación de seguridad
      if (protectedViews.includes(viewId) && !isUserLoggedIn()) {
        // Redirige al login si no está autenticado
        viewToShow = "accessibility-user-login-view";
      } else if (viewToShow === "accessibility-user-login-view") {
        viewToShow = "view-initial";
      }
      showView(viewToShow);
    }
    return;
  }

  // Validación de seguridad
  if (protectedViews.includes(viewId) && !isUserLoggedIn()) {
    // Redirige al login si no está autenticado
    viewId = "accessibility-user-login-view";
  } else if (viewId === "accessibility-user-login-view") {
    viewId = "view-initial";
  }

  const currentVisible = document.querySelector(".accessibility-view:not(.hidden)");

  if (currentVisible && currentVisible.id !== viewId) {
    historyViews.push(currentVisible.id);
  }

  const index = historyViews.indexOf(viewId);
  if (index !== -1) {
    historyViews.splice(index);
  }

  hideAllViews();
  showView(viewId);
}

// Función para crear un botón con un id, texto y función asociada
export function createButton(id, text, onClick, isActivateable = false) {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  button.classList.add("toggle-button");

  // Evento de clic para manejar el comportamiento del botón
  button.addEventListener("click", function () {
    if (id === "close-menu" || id === "back-to-menu") {
      onClick();
      return;
    }

    // Si el botón es activable, alternar la clase 'active'
    if (isActivateable) {
      this.classList.toggle("active"); // Alternar la clase 'active' para marcar el estado del botón
      updateCategoryButtons(); // Actualizar los botones de la categoría
    }
    onClick(); // Ejecutar la función asociada al botón
  });

  return button; // Devolver el botón creado
}

// Función para actualizar los botones de categorías (Visual, Auditiva, etc.)
export function updateCategoryButtons() {
  // Definición de categorías y botones asociados
  const categories = {
    "btn-visual": [
      // "highlight-Important",
      "outline-mode",
      "space-Text",
      "highlight-links",
      "toggle-animations",
      "toggle-reading-bar",
      "read-text-aloud",
      "test-Size",
      "toggle-Zoon",
      "cursor-style",
      "toggle-font",
    ],

    "btn-total-blindness": ["daltonismo-protanopia", "focus-frame"],

    "btn-total-blindness": ["read-read-speed", "create-volume-control", "read-text-aloud", "selective-contrast"],
    "btn-aspergers": ["Guided-Reading", "toggle-animationss", "toggle-Disléxica", "toggle-animations", "toggle-mute"],
    "btn-hyperActivity": ["toggle-Reading-Mask", "eyes-cursor"],
    "btn-epilepsy": ["control-scroll", "low-contrast"],
  };

  // Iterar sobre cada categoría para actualizar los botones dentro de ella
  Object.entries(categories).forEach(([categoryButtonId, buttonIds]) => {
    const categoryButton = document.getElementById(categoryButtonId); // Obtener el botón de la categoría
    const hasActiveButton = buttonIds.some((id) => document.getElementById(id)?.classList.contains("active")); // Comprobar si algún botón de la categoría está activo

    // Si algún botón está activo, agregar la clase 'active' a la categoría
    if (hasActiveButton) {
      categoryButton.classList.add("active");
    } else {
      categoryButton.classList.remove("active"); // Si no hay botones activos, remover la clase 'active'
    }
  });
}

// Función para crear la vista de una categoría
export function createCategoryView(categoryName, buttons, returnToView) {
  const div = document.createElement("div"); // Crear un contenedor div para la vista de la categoría
  div.id = `view-${categoryName.toLowerCase()}`; // Asignar un id único a la vista de la categoría
  div.classList.add("accessibility-view", "hidden"); // Agregar clases para ocultar la vista inicialmente
  div.setAttribute("aria-hidden", "false"); // Asegurar la accesibilidad

  // Crear un botón de "Volver" para regresar a la vista anterior
  const backButton = createButton("back-to-menu", "⬅ Volver", () => switchView(returnToView));

  div.appendChild(backButton); // Añadir el botón de "Volver" a la vista
  div.appendChild(createResetButton()); // Añadir el botón de "Restablecer" a la vista
  buttons.forEach((button) => div.appendChild(button)); // Añadir los botones de la categoría a la vista

  return div; // Devolver la vista creada
}

// funcion para Reestructuracion de svg
export function svgStructure() {
  const accessibilityMenu = document.querySelector("#accessibility-menu");
  const svgs = accessibilityMenu.querySelectorAll("svg");
  const listIdPatterns = [];
  svgs.forEach((element, idx) => {
    const rect = element.querySelector("rect");
    const defs = element.querySelector("defs");
    const pattern = defs?.querySelector("pattern");
    if (pattern) {
      if (listIdPatterns.includes(pattern.id)) {
        listIdPatterns.push(`${pattern.id}-${idx}`);
        pattern.id = `${pattern.id}-${idx}`;
        rect.setAttribute("fill", `url(#${pattern.id})`);
      } else {
        listIdPatterns.push(`${pattern.id}`);
      }
    }
  });
}

// Función para inicializar el widget de accesibilidad
export async function initWidget(accountId) {
  // const isVerificado = verificarDominio();
  // if (!isVerificado) {
  //   return null;
  // }
  document.documentElement.setAttribute("data-theme", "blue"); // Establecer el tema del widget
  const widgetContainer = document.createElement("div"); // Crear el contenedor del widget
  widgetContainer.id = "my-widget"; // Asignar un id único al contenedor del widget
  widgetContainer.className = "widget-container"; // Asignar una clase para el estilo del widget

  const accessibilityButton = createButton("accessibility-button", "", toggleMenu); // Crear el botón de accesibilidad
  accessibilityButton.setAttribute("data-direction", "bottom-right"); // Establecer la dirección inicial del botón
  accessibilityButton.classList.add("bottom-right"); // Asignar la clase para la posición inicial del botón
  animationInitButton(); // Inicializar la animación del botón

  const accessibilityMenu = document.createElement("div"); // Crear el menú de accesibilidad
  accessibilityMenu.id = "accessibility-menu"; // Asignar un id al menú

  accessibilityMenu.setAttribute("role", "dialog", true); // Establecer el rol ARIA del menú
  accessibilityMenu.setAttribute("data-direction", "right"); // Establecer la dirección inicial del menu
  accessibilityMenu.classList.add("right");

  const resetaAll = createButton(
    "reset-all",
    "🔄 Restablecer",
    toggleMenu // Esta función puede estar vacía o añadir lógica para reiniciar los botones
  );

  const mainMenu = document.createElement("div"); // Crear el contenedor del menú principal
  mainMenu.id = "accessibility-main-menu"; // Asignar un id único al menú principal
  mainMenu.classList.add("accessibility-main-menu"); // Asignar la clase para el estilo del menú principal
  mainMenu.setAttribute("aria-hidden", "false"); // Cambiar el atributo ARIA para accesibilidad//

  // Añadir todo al contenedor del widget
  mainMenu.append(renderFullLayout());
  accessibilityMenu.append(mainMenu);

  widgetContainer.append(accessibilityButton, accessibilityMenu); // Añadir el botón y el menú al contenedor
  document.body.appendChild(widgetContainer); // Añadir el widget al cuerpo del documento

  // Evento para cerrar el menú cuando se presiona la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      accessibilityMenu.classList.add("hidden"); // Ocultar el menú
      accessibilityMenu.setAttribute("aria-hidden", "false"); // Cambiar atributo ARIA para accesibilidad
    }
  });

  svgStructure();
  filterForInitIcons();
  // Ocultar el menú inicialmente solo si no viene el parámetro #widgetu en la URL
  if (window.location.hash.includes("#widgetu")) {
    const anyVisible = document.querySelector(".accessibility-view:not(.hidden)");
    if (!anyVisible) {
      const initialView = document.getElementById("view-initial");
      if (initialView) {
        initialView.classList.remove("hidden");
        initialView.setAttribute("aria-hidden", "false");
      }
    }
  } else {
    accessibilityMenu.classList.add("hidden");
  }
}

console.log("Widget de accesibilidad cargado correctamente.");
