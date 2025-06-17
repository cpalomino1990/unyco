import { switchView } from "../../widget";
import { DynamicIcon } from "/public/icons/generals/dinamicIcons";

export function alertMessageView() {
  const alertMessageView = document.createElement("div");
  alertMessageView.id = "accessibility-alert-message-view";
  alertMessageView.classList.add("accessibility-view", "hidden");
  alertMessageView.setAttribute("aria-hidden", "true");

  // Creacion del icono de la alerta
  const iconContent = document.createElement("div");
  iconContent.classList.add("accessibility-alert-message-icon");
  // Creacion del titulo de la alerta
  const title = document.createElement("p");
  title.classList.add("accessibility-alert-message-title");
  // Creacion del mensaje de la alerta
  const message = document.createElement("p");
  message.classList.add("accessibility-alert-message-message");

  // Creacion del boton de aceptar
  const button = document.createElement("button");
  button.id = "accessibility-alert-message-button";
  button.classList.add("accessibility-button-theme");
  button.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: center; width: 100%;">
      <span>Aceptar</span>
    </span>
  `;

  alertMessageView.appendChild(iconContent);
  alertMessageView.appendChild(title);
  alertMessageView.appendChild(message);
  alertMessageView.appendChild(button);

  return alertMessageView;
}

export const executeAlertMessage = (props = { icon, title, message, onclick }) => {
  document.querySelector("#accessibility-alert-message-view .accessibility-alert-message-icon").innerHTML = `
      ${DynamicIcon({ icon: props.icon || "check" })}
    `;
  document.querySelector("#accessibility-alert-message-view .accessibility-alert-message-title").innerHTML =
    props.title;
  document.querySelector("#accessibility-alert-message-view .accessibility-alert-message-message").innerHTML =
    props.message;

  // Onclick para el boton de aceptar
  const button = document.querySelector("#accessibility-alert-message-view #accessibility-alert-message-button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    props.onclick();
  });
  switchView("accessibility-alert-message-view");
};
