import { switchView } from "../../widget";
import { DynamicIcon } from "/public/icons/generals/dinamicIcons";
import { host } from "../constants/enviroments";

export function positionView() {
  const positionView = document.createElement("div");
  positionView.id = "accessibility-position-view";
  positionView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  positionView.setAttribute("aria-hidden", "true");
  positionView.innerHTML = `
    <div class="accessibility-languages-view-content">
      <div class="accessibility-languages-view-head">
        <div id="accessibility-close-languages">
          ${DynamicIcon({ icon: "x" })}
        </div>
      </div>
      <div class="accessibility-languages-view-body">
        <h1 class="title" data-u-i18n="positionView.title">Selecciona la ubicación del widget</h1>
        <p class="subtitle" data-u-i18n="positionView.subtitle">Por favor selecciona la ubicación preferida.</p>
        <div class="accessibility-postion-view-options">
          <div class="accessibility-position-option top-left"></div>
          <div class="accessibility-position-option top-center"></div>
          <div class="accessibility-position-option top-right"></div>
          <div class="accessibility-position-option center-left"></div>
          <div class="accessibility-position-option center-right"></div>
          <div class="accessibility-position-option bottom-left"></div>
          <div class="accessibility-position-option bottom-center"></div>
          <div class="accessibility-position-option bottom-right"></div>
        </div>
      </div>
    </div>
  `;

  // Activar la posición inicial por defecto
  const defaultPosition = "bottom-right";
  const defaultOption = positionView.querySelector(`.accessibility-position-option.${defaultPosition}`);
  if (defaultOption) {
    defaultOption.classList.add("active");
  }

  const options = positionView.querySelectorAll(".accessibility-position-option");
  let selectedOption = null;

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
      selectedOption = option;

      if (!selectedOption) return;
      const classes = Array.from(selectedOption.classList);
      const positionClass = classes.find((cls) =>
        [
          "top-left",
          "top-center",
          "top-right",
          "center-left",
          "center-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ].includes(cls)
      );
      if (!positionClass) return;

      const direction = positionClass;

      const widget = document.querySelector("#accessibility-button");
      const menu = document.querySelector("#accessibility-menu");
      if (widget && menu) {
        widget.setAttribute("data-direction", direction);
        widget.className = `toggle-button ${direction}`;
        // For menu, use only horizontal part
        const horizontal = direction.split("-")[1];
        menu.setAttribute("data-direction", horizontal);
        menu.className = horizontal;
      }
    });
  });

  const buttonClose = positionView.querySelector("#accessibility-close-languages");
  buttonClose.addEventListener("click", () => {
    switchView(-1);
  });

  return positionView;
}
