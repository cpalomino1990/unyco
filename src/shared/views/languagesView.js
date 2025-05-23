import { switchView } from "../../widget";
import { DynamicIcon } from "../assets/icons/generals/dinamicIcons";
import { host } from "../constants/enviroments";

export function languagesView() {
  const languagesView = document.createElement("div");
  languagesView.id = "accessibility-languages-view";
  languagesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  languagesView.setAttribute("aria-hidden", "true");
  languagesView.innerHTML = `
    <div class="accessibility-languages-view-content">
      <div class="accessibility-languages-view-head">
        <div id="accessibility-close-languages">
          ${DynamicIcon({ icon: "x" })}
        </div>
      </div>
      <div class="accessibility-languages-view-body">
        <h1 class="title" >Selecciona tu idioma</h1>
        <p class="subtitle" >Selecciona tu idioma preferido o nativo.</p>
        <div class="accessibility-languages-view-list accessibility-custom-scroll">
          ${Array.from({ length: 10 })
            .map(
              (_, index) => `
              <div class="accessibility-languages-view-item${index === 1 ? " active" : ""}">
                <div class="flag" style="background-image: url('${host}/src/shared/assets/icons/generals/Flag_of_Colombia.png')"></div>
                <p>Español (Colombia)</p>
              </div>
            `
            )
            .join("")}
        </div>
        <button class="accessibility-button-theme">Continuar</button>
      </div>
    </div>
  `;

  const buttonClose = languagesView.querySelector("#accessibility-close-languages");
  buttonClose.addEventListener("click", () => {
    switchView(-1)
  })

  return languagesView;
}
