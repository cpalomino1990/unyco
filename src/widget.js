import { renderFullLayout } from "./view.js";
import "./shared/styles/widget.css";
import { animationInitButton } from "./shared/utils/animationInitButton";
import { initAccessibilitySettings } from "./shared/components/allFuntion.js";



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
}

let historyViews = [];

// Función para cambiar entre las vistas (Visual, Auditiva, etc.)
export function switchView(viewId) {
  document.querySelector("#accessibility-close-menu").focus();
  if (viewId === -1) {
    const previusViewId = historyViews[historyViews.length - 1];
    document.querySelectorAll(".accessibility-view").forEach((element) => {
      if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
        element.setAttribute("aria-hidden", "true");
      }
    });

    const activeView = document.getElementById(previusViewId);
    if (activeView) {
      activeView.classList.remove("hidden");
      activeView.setAttribute("aria-hidden", "false");
    }

    historyViews.pop();
  } else {
    document.querySelectorAll(".accessibility-view").forEach((element) => {
      if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
        element.setAttribute("aria-hidden", "true");

        const index = historyViews.findIndex((id) => id === viewId);
        if (index !== -1) {
          historyViews.splice(index);
        } else {
          historyViews.push(element.id);
        }
      }
    });

    const activeView = document.getElementById(viewId);
    if (activeView) {
      activeView.classList.remove("hidden");
      activeView.setAttribute("aria-hidden", "false");
    }
  }
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

    "btn-total-blindness": [
      "read-read-speed",
      "create-volume-control",
      "read-text-aloud",
      "selective-contrast",
    ],
    "btn-aspergers": [
      "Guided-Reading",
      "toggle-animationss",
      "toggle-Disléxica",
      "toggle-animations",
      "toggle-mute",
    ],
    "btn-hyperActivity": ["toggle-Reading-Mask", "eyes-cursor"],
    "btn-epilepsy": ["control-scroll", "low-contrast"],
  };

  // Iterar sobre cada categoría para actualizar los botones dentro de ella
  Object.entries(categories).forEach(([categoryButtonId, buttonIds]) => {
    const categoryButton = document.getElementById(categoryButtonId); // Obtener el botón de la categoría
    const hasActiveButton = buttonIds.some((id) =>
      document.getElementById(id)?.classList.contains("active")
    ); // Comprobar si algún botón de la categoría está activo

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
  const backButton = createButton("back-to-menu", "⬅ Volver", () =>
    switchView(returnToView)
  );

  div.appendChild(backButton); // Añadir el botón de "Volver" a la vista
  div.appendChild(createResetButton()); // Añadir el botón de "Restablecer" a la vista
  buttons.forEach((button) => div.appendChild(button)); // Añadir los botones de la categoría a la vista

  return div; // Devolver la vista creada
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

  const accessibilityButton = createButton(
    "accessibility-button",
    "",
    toggleMenu
  ); // Crear el botón de accesibilidad
  animationInitButton(); // Inicializar la animación del botón

  const accessibilityMenu = document.createElement("div"); // Crear el menú de accesibilidad
  accessibilityMenu.id = "accessibility-menu"; // Asignar un id al menú
  accessibilityMenu.classList.add("hidden"); // Ocultar el menú inicialmente
  accessibilityMenu.setAttribute("role", "dialog", true); // Establecer el rol ARIA del menú

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
}
