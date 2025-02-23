import './styles/widget.css';
import { toggleFontFamily } from './button/buttonToggleFont';
import { toggleReadingBar } from './button/buttonToggleReadingBar';
import { highlightLinks } from './button/highlightLinks';
import { resetAllSettings } from './button/buttonReset';
import {toggleContrast} from './button/buttonHighContrast';
import {toggleDarkMode} from './button/buttonDarkMode';
import {toggleAnimations} from './button/buttonNoneAnimation';
import {changeTextSize} from './button/buttonChangeTextSize';

function toggleMenu() {
  const menu = document.getElementById("accessibility-menu");
  menu.classList.toggle("hidden");
  menu.setAttribute("aria-hidden", menu.classList.contains("hidden"));
}

function switchView(viewId) {
  document.querySelectorAll(".accessibility-view, .main-menu").forEach(element => {
    element.classList.add("hidden");
    element.setAttribute("aria-hidden", "true");
  });
  const activeView = document.getElementById(viewId);
  if (activeView) {
    activeView.classList.remove("hidden");
    activeView.setAttribute("aria-hidden", "false");
  }
}

function createButton(id, text, onClick, isCategoryButton = false) {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  button.classList.add("toggle-button");

  button.addEventListener("click", function() {
    if (!isCategoryButton) {
      this.classList.toggle("active");
      updateCategoryButtons();
    }
    onClick();
  });

  return button;
}

function updateCategoryButtons() {
  const categories = {
    "btn-visual": ["toggle-contrast", "increase-text-size", "decrease-text-size", "toggle-dark-mode"],
    "btn-auditory": ["read-text-aloud", "toggle-font"],
    "btn-navigation": ["highlight-links", "toggle-animations", "toggle-reading-bar"]
  };

  Object.entries(categories).forEach(([categoryButtonId, buttonIds]) => {
    const categoryButton = document.getElementById(categoryButtonId);
    const hasActiveButton = buttonIds.some(id => document.getElementById(id)?.classList.contains("active"));

    if (hasActiveButton) {
      categoryButton.classList.add("active");
    } else {
      categoryButton.classList.remove("active");
    }
  });
}

function resetAllButtons() {
  document.querySelectorAll(".toggle-button").forEach(button => {
    button.classList.remove("active");
  });
  document.body.classList.remove("dark-mode", "high-contrast", "none-animation");
  updateCategoryButtons();
  location.reload();
}

function createResetButton() {
  return createButton("reset-all", "🔄 Restablecer", resetAllButtons);
}

function initWidget(accountId) {
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "my-widget";
  widgetContainer.className = "widget-container";

  const accessibilityButton = createButton("accessibility-button", "", toggleMenu);

  const accessibilityMenu = document.createElement("div");
  accessibilityMenu.id = "accessibility-menu";
  accessibilityMenu.classList.add("hidden");
  accessibilityMenu.setAttribute("role", "dialog");

  const closeButton = createButton("close-menu", "❌ Cerrar", toggleMenu);
  accessibilityMenu.appendChild(closeButton);

  const mainMenu = document.createElement("div");
  mainMenu.id = "main-menu";
  mainMenu.classList.add("main-menu");
  mainMenu.append(
    createButton("btn-visual", "Visual", () => switchView("view-visual"), true),
    createButton("btn-auditory", "Auditivo", () => switchView("view-auditory"), true),
    createButton("btn-navigation", "Navegación", () => switchView("view-navigation"), true)
  );

  const views = ["visual", "auditory", "navigation"].map(view => {
    const div = document.createElement("div");
    div.id = `view-${view}`;
    div.classList.add("accessibility-view", "hidden");
    div.setAttribute("aria-hidden", "true");
    div.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("main-menu")));
    div.appendChild(createResetButton());
    return div;
  });

  views[0].append(
    createButton("toggle-contrast", "Alto Contraste", toggleContrast),
    createButton("increase-text-size", "Aumentar Texto", () => changeTextSize(true)),
    createButton("decrease-text-size", "Disminuir Texto", () => changeTextSize(false)),
    createButton("toggle-dark-mode", "Modo Oscuro", toggleDarkMode)
  );

  views[1].append(
    createButton("read-text-aloud", "Leer en voz alta", () => {}),
    createButton("toggle-font", "Cambiar Letras", toggleFontFamily)
  );

  views[2].append(
    createButton("highlight-links", "Resaltar Enlaces", highlightLinks),
    createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
    createButton("toggle-reading-bar", "Activar Barra de Lectura", toggleReadingBar)
  );

  accessibilityMenu.append(mainMenu, ...views);
  widgetContainer.append(accessibilityButton, accessibilityMenu);
  document.body.appendChild(widgetContainer);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      accessibilityMenu.classList.add("hidden");
      accessibilityMenu.setAttribute("aria-hidden", "true");
    }
  });
}

initWidget("123434");
