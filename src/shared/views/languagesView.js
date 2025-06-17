import { applyTranslations, switchView } from "../../widget";
import { DynamicIcon } from "/public/icons/generals/dinamicIcons";
import { host } from "../constants/enviroments";
import { languages } from "../constants/languages";
import i18next from "i18next";

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
        <h1 class="title" data-u-i18n="languagesView.title" ></h1>
        <p class="subtitle" data-u-i18n="languagesView.subtitle" ></p>
        <div class="accessibility-languages-view-list accessibility-custom-scroll">
          ${languages
            .map(
              (lang, index) => `
                <div class="accessibility-languages-view-item ${
                  localStorage.getItem("u-i18n") === lang.code ? "active" : ""
                }"  data-code="${lang.code}">
                <div class="flag" style="background-image: url('${host}/public/icons/flags/${lang.flag}.svg')"></div>
                  <p>${lang.name}</p>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  const options = languagesView.querySelectorAll(".accessibility-languages-view-item");
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      // Obtener el codigo
      const newLang = option.getAttribute("data-code");
      // Activar el item
      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
      // Colocar la bandera en el boton
      const languageButton = document.querySelector("#accessibility-language-button");
      languageButton.style.backgroundImage = `url("${host}/public/icons/flags/${
        languages.find((item) => item.code === newLang)?.flag
      }.svg")`;
      // Almacenar el codigo en localstorage
      localStorage.setItem("u-i18n", newLang);
      // Cambiar el idioma del widget
      i18next.changeLanguage(newLang, (err) => {
        if (err) return console.error("Error al cambiar idioma:", err);
        applyTranslations();
      });
    });
  });

  const buttonClose = languagesView.querySelector("#accessibility-close-languages");
  buttonClose.addEventListener("click", () => {
    switchView(-1);
  });

  return languagesView;
}
