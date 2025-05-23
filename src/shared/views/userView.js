// components/loginView.js
import { createButton, switchView } from "../../widget";
import { DynamicIcon } from "../assets/icons/generals/dinamicIcons";
import { host } from "../constants/enviroments";
import { fetchLogin, fetchRegister } from "../services/authentication";
import { ChangeTheme } from "../utils/actions";
import {
  createCheckTermsForm,
  createCollapse,
  createInputFileForm,
  createInputForm,
  createInputsCode,
  createSelectForm,
} from "../utils/createElements";
import { executeAlertMessage } from "./alertMessageView";

// Crea la vista para el login de usuario
export function loginView() {
  const login = document.createElement("div");
  login.id = "accessibility-user-login-view";
  login.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  login.setAttribute("aria-hidden", "true");
  login.setAttribute("data-typeAuthRequired", "false");
  login.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-login-view-content-text">
        <p class="accessibility-title-card-text">Bienvenido a <span><img src="${host}/src/shared/assets/logos/isotipoBlue.svg" alt="logo de u"></span></p>
        <p class="accessibility-description-card-text">Elige cualquiera de estas opciones para iniciar sesion o crear una cuenta.</p>
      </div>
      <div class="accessibility-user-login-view-content-form">
      </div>
      <div class="accessibility-user-login-view-content-footer">
        <p>¿No tienes una cuenta? <a>Registrarme</a></p>
        <p>o</p>
        <p>puedes ingresar con</p>
        <div class="accessibility-user-login-view-content-footer-icons">
          <button class="accessibility-icon-button" id="email-button" aria-label="email">
            <img src="${host}/src/shared/assets/icons/socialMedia/email.svg" alt="email" aria-label="email" />
          </button>
          <button class="accessibility-icon-button" id="google-button" aria-label="Google">
            <img src="${host}/src/shared/assets/icons/socialMedia/google.svg" alt="Google" aria-label="Google" />
          </button>
          <button class="accessibility-icon-button" id="instagram-button" aria-label="instagram">
            <img src="${host}/src/shared/assets/icons/socialMedia/instagram.svg" alt="instagram" aria-label="instagram" />
          </button>
          <button class="accessibility-icon-button" id="facebook-button" aria-label="Facebook">
            <img src="${host}/src/shared/assets/icons/socialMedia/facebook.svg" alt="Facebook" aria-label="Facebook" />
          </button>
        </div>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView(-1));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Iniciar sesion"; // Texto del título

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agregar el contenedor izquierdo al header
  const header = login.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);

  // Creacion del formulario de inicio de sesion
  const content = login.querySelector(".accessibility-user-login-view-content-form");
  const form = document.createElement("form");
  form.classList.add("accessibility-user-login-form");
  form.appendChild(
    createInputForm({
      type: "text",
      id: "login-email",
      placeholder: "Ingresa tu correo electronico",
    })
  );
  form.appendChild(
    createInputForm({
      type: "password",
      id: "login-password",
      placeholder: "Ingresa tu contraseña",
    })
  );
  const button = document.createElement("div");
  button.innerHTML = `
      <a>¿Olvidaste tu contraseña?</a>
      <button id="accessibility-login-button" class="accessibility-button-theme" >Iniciar sesión</button>
  `;
  form.appendChild(button);
  content.appendChild(form);

  // Funcion onClick para el boton de iniciar sesion
  const resetPasswordButton = button.querySelector("a");
  resetPasswordButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    excuteResetPasswordView(1);
  });

  // Funcion onClick para el boton de iniciar sesion
  const loginButton = button.querySelector("#accessibility-login-button");
  loginButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const response = await fetchLogin({
      email,
      password,
    });

    if (response.success) {
      switchView("accessibility-user-profile-view");
    }
  });

  // Funcion onClick para el boton de ir a registrar
  const registerButton = login.querySelector(".accessibility-user-login-view-content-footer p a");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-account-view");
  });

  return login;
}

export function accountView() {
  const account = document.createElement("div");
  account.id = "accessibility-user-account-view";
  account.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  account.setAttribute("aria-hidden", "true");
  account.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-account-view-content">
        <div class="accessibility-user-login-view-content-text">
          <p class="accessibility-title-card-text">Bienvenido a <span><img src="${host}/src/shared/assets/logos/isotipoBlue.svg" alt="Logo de U" width="50px"></span></p>
          <p class="accessibility-description-card-text">Crea tu cuenta</p>
        </div>
        <div class="accessibility-user-account-view-content-form">
        </div>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-login-view"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Datos de la cuenta"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = account.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  const content = account.querySelector(".accessibility-user-account-view-content-form");
  const form = document.createElement("form");
  form.classList.add("accessibility-user-account-form");

  // Campos de formulario
  const emailInputContainer = createInputForm({
    type: "text",
    id: "create-email",
    placeholder: "Ingresa tu correo electronico",
  });

  const confirmEmailInputContainer = createInputForm({
    type: "text",
    id: "confirm-email",
    placeholder: "Confirma tu correo electronico",
  });

  const passwordInputContainer = createInputForm({
    type: "password",
    id: "create-password",
    placeholder: "Ingresa tu contraseña",
  });

  const confirmPasswordInputContainer = createInputForm({
    type: "password",
    id: "confirm-password",
    placeholder: "Confirma tu contraseña",
  });

  // Añadir los campos al formulario
  form.appendChild(emailInputContainer);
  form.appendChild(confirmEmailInputContainer);
  form.appendChild(passwordInputContainer);
  form.appendChild(confirmPasswordInputContainer);

  // Crear el botón "Siguiente"
  const button = document.createElement("button");
  button.classList.add("accessibility-button-theme");
  button.innerHTML = `
      <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <span>Guardar y continuar</span> 
        <span>
          ${DynamicIcon({
            icon: "right",
          })}
        </span>
      </span>
    `;
  button.disabled = true; // Deshabilitar el botón inicialmente

  // Funcion onClick para el boton de siguiente
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-register-view");
  });

  form.appendChild(button);

  content.appendChild(form);

  // Obtener los elementos de entrada reales dentro de los contenedores
  const emailInput = emailInputContainer.querySelector("input");
  const confirmEmailInput = confirmEmailInputContainer.querySelector("input");
  const passwordInput = passwordInputContainer.querySelector("input");
  const confirmPasswordInput = confirmPasswordInputContainer.querySelector("input");

  // Crear los elementos de texto de ayuda
  const emailErrorText = document.createElement("span");
  emailErrorText.classList.add("accessibility-helper-text");
  emailErrorText.style.display = "none"; // Ocultarlo inicialmente

  const passwordErrorText = document.createElement("span");
  passwordErrorText.classList.add("accessibility-helper-text");
  passwordErrorText.style.display = "none"; // Ocultarlo inicialmente

  // Añadir los mensajes de error debajo de los campos
  confirmEmailInputContainer.appendChild(emailErrorText);
  confirmPasswordInputContainer.appendChild(passwordErrorText);

  // Validación de correo electrónico y contraseñas
  const validateForm = (e) => {
    const email = emailInput.value.trim();
    const confirmEmail = confirmEmailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validar el correo
    const isEmailValid = email === confirmEmail && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // Mostrar mensaje de error si no coinciden
    if (e.target.id?.includes("email") && confirmEmail !== "") {
      if (email !== confirmEmail) {
        emailErrorText.textContent = "Los correos electrónicos no coinciden.";
        emailErrorText.style.display = "block"; // Mostrar el mensaje de error
      } else if (!isEmailValid) {
        emailErrorText.textContent = "Por favor, ingresa un correo válido.";
        emailErrorText.style.display = "block"; // Mostrar el mensaje de error
      } else {
        emailErrorText.style.display = "none"; // Ocultar el mensaje si la validación es correcta
      }
    }

    // Validar la contraseña
    const isPasswordValid = password === confirmPassword && password.length >= 6;

    if (e.target.id.includes("password") && confirmPassword !== "") {
      // Mostrar mensaje de error si no coinciden
      if (password !== confirmPassword) {
        passwordErrorText.textContent = "Las contraseñas no coinciden.";
        passwordErrorText.style.display = "block"; // Mostrar el mensaje de error
      } else if (password.length < 6) {
        passwordErrorText.textContent = "La contraseña debe tener al menos 6 caracteres.";
        passwordErrorText.style.display = "block"; // Mostrar el mensaje de error
      } else {
        passwordErrorText.style.display = "none"; // Ocultar el mensaje si la validación es correcta
      }
    }

    // Habilitar el botón solo si las validaciones son correctas
    button.disabled = !(isEmailValid && isPasswordValid && email === confirmEmail && password === confirmPassword);
  };

  // Añadir evento de input para validar el formulario al escribir
  emailInput.addEventListener("input", validateForm);
  confirmEmailInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);
  confirmPasswordInput.addEventListener("input", validateForm);

  return account;
}

export function registerView() {
  const register = document.createElement("div");
  register.id = "accessibility-user-register-view";
  register.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  register.setAttribute("aria-hidden", "true");
  register.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-register-view-content">
        <div class="accessibility-banner-user-top-image" style="position: relative; top: 0; width: 120px; height: 120px; left: calc(50% - 60px);">
          <div class="accessibility-banner-user-top-image-internal" style="width: 105px; height: 105px;">
            <img src="https://cdn.pixabay.com/photo/2020/12/08/19/12/woman-5815354_640.jpg" alt="user image">
          </div>
        </div>
        <a class="accessibility-user-button-edit-img" >Editar imagen <span>${DynamicIcon({ icon: "pen" })}</span></a>
        <h2 class="accessibility-user-register-view-title">Bienvenido</h2>
        <p>Por favor completa todos los campos para crear tu perfil.</p>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-account-view"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Datos del perfil"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = register.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  // Creacion de los collapses
  const content = register.querySelector(".accessibility-user-register-view-content");
  const form = document.createElement("form");
  form.classList.add("accessibility-user-register-form");

  // Crear seccion del formulario para informacion personal basica
  const personalInfo = document.createElement("div");
  personalInfo.classList.add("accessibility-user-register-form-personal-info");

  // Nombre y apellido
  personalInfo.appendChild(
    createInputForm({ type: "text", id: "name", label: "Nombre", placeholder: "Ingresa tu nombre completo" })
  );
  // Tipos de documento
  personalInfo.appendChild(
    createSelectForm({
      id: "document-type",
      label: "Tipo de documento",
      options: [
        { value: "", text: "Seleccione" },
        { value: "cc", text: "Cédula de ciudadania" },
        { value: "ce", text: "Cédula de extrangeria" },
        { value: "pt", text: "Pasaporte" },
      ],
    })
  );
  // Numero de documento
  personalInfo.appendChild(
    createInputForm({
      type: "text",
      id: "document-number",
      label: "Número de documento",
      placeholder: "Ingresa tu número de documento",
    })
  );
  // Correo electronico
  personalInfo.appendChild(
    createInputForm({
      type: "email",
      id: "email",
      label: "Correo electronico",
      placeholder: "Ingresa tu correo electronico",
    })
  );
  // Fecha de nacimiento
  personalInfo.appendChild(
    createInputForm({
      type: "date",
      id: "birth-date",
      label: "Fecha de nacimiento",
      placeholder: "Ingresa tu fecha de nacimiento",
    })
  );
  // Pais de residencia
  personalInfo.appendChild(
    createSelectForm({
      id: "country",
      label: "País de residencia",
      options: [
        { value: "", text: "Seleccione" },
        { value: "colombia", text: "Colombia" },
        { value: "mexico", text: "México" },
      ],
    })
  );
  // Ciudad de residencia
  personalInfo.appendChild(
    createSelectForm({
      id: "city",
      label: "Ciudad de residencia",
      options: [
        { value: "", text: "Seleccione" },
        { value: "bogota", text: "Bogotá" },
        { value: "medellin", text: "Medellín" },
        { value: "cali", text: "Cali" },
      ],
    })
  );
  // zona de residencia
  personalInfo.appendChild(
    createSelectForm({
      id: "zone",
      label: "Zona de residencia",
      options: [
        { value: "", text: "Seleccione" },
        { value: "urbana", text: "Urbana" },
        { value: "rural", text: "Rural" },
      ],
    })
  );
  // Nivel educativo
  personalInfo.appendChild(
    createSelectForm({
      id: "education-level",
      label: "Nivel educativo",
      options: [
        { value: "", text: "Seleccione" },
        { value: "basico", text: "Básico" },
        { value: "medio", text: "Medio" },
        { value: "superior", text: "Superior" },
      ],
    })
  );
  // Situacion ocupacional
  personalInfo.appendChild(
    createSelectForm({
      id: "occupation-situation",
      label: "Situación ocupacional",
      options: [
        { value: "", text: "Seleccione" },
        { value: "estudiante", text: "Estudiante" },
        { value: "trabajando", text: "Trabajando" },
        { value: "desempleado", text: "Desempleado" },
      ],
    })
  );

  // Crear seccion del formulario para informacion de accesibilidad
  const accessibilityInfo = document.createElement("div");
  accessibilityInfo.classList.add("accessibility-user-register-form-accessibility-info");
  // Tiene alguna discapacidad
  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disability",
      label: "¿Tiene alguna capacidad diversa?",
      options: [
        { value: "", text: "Seleccione" },
        { value: "si", text: "Sí" },
        { value: "no", text: "No" },
      ],
    })
  );
  // Tipo de discapacidad
  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disability-type",
      label: "Tipo de capacidsad diversa",
      options: [
        { value: "", text: "Seleccione" },
        { value: "visual", text: "Visual" },
        { value: "auditiva", text: "Auditiva" },
        { value: "motora", text: "Motora" },
        { value: "intelectual", text: "Intelectual" },
      ],
    })
  );
  // nivel de discapacidad
  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disability-level",
      label: "Nivel de capacidad diversa",
      options: [
        { value: "", text: "Seleccione" },
        { value: "leve", text: "Leve" },
        { value: "moderada", text: "Moderada" },
        { value: "grave", text: "Grave" },
      ],
    })
  );

  // Agregamos los collapses al formulario
  form.appendChild(
    createCollapse({
      id: "register-collapse",
      title: "Información Personal Básica",
      content: personalInfo,
      visible: true,
    })
  );
  form.appendChild(
    createCollapse({
      id: "register-collapse2",
      title: "Información de Accesibilidad",
      content: accessibilityInfo,
      visible: true,
    })
  );

  // Agregamos el boton de registro
  const button = document.createElement("div");
  button.innerHTML = `
    <button id="register-button" class="accessibility-button-theme">
      <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <span>Guardar y continuar</span> 
        <span>
          ${DynamicIcon({
            icon: "right",
          })}
        </span>
      </span>
    </button>
  `;
  // Onclick para el boton de registro
  const registerButton = button.querySelector("#register-button");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-terms-view-1"); // Cambiar a la vista de terminos y condiciones
  });

  // Funcion onlcick para el editar la imagen de perfil
  const editButton = register.querySelector(".accessibility-user-button-edit-img");
  editButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-image-view"); // Cambiar a la vista de imagen de usuario
  });

  form.appendChild(button);
  content.appendChild(form);

  return register;
}

// Creacion de la vista de recuperacion de contraseña
export function resetPasswordView() {
  const reset = document.createElement("div");
  reset.id = "accessibility-user-reset-password-view";
  reset.classList.add("accessibility-view", "accessibility-custom-scroll", "hidden");
  reset.setAttribute("aria-hidden", "true");

  // Creacion del icono de la alerta
  const iconContent = document.createElement("div");
  iconContent.classList.add("accessibility-user-reset-password-icon");
  // Creacion del titulo de la alerta
  const title = document.createElement("p");
  title.classList.add("accessibility-user-reset-password-title");
  // Creacion del mensaje de la alerta
  const content = document.createElement("div");
  content.classList.add("accessibility-user-reset-password-content");

  // Creacion del boton de aceptar
  const button = document.createElement("button");
  button.id = "accessibility-user-reset-password-button";
  button.classList.add("accessibility-button-theme");
  button.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: center; width: 100%;">
      <span>Aceptar</span>
    </span>
  `;

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const stepResetPassword = localStorage.getItem("stepResetPassword");
    excuteResetPasswordView(Number(stepResetPassword) + 1);
  });

  // Creacion del boton de aceptar
  const buttonCancel = document.createElement("button");
  buttonCancel.id = "accessibility-user-cancel-reset-password-button";
  buttonCancel.classList.add("accessibility-button-theme");
  buttonCancel.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: center; width: 100%;">
      <span>Cancelar</span>
    </span>
  `;

  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    const stepResetPassword = localStorage.getItem("stepResetPassword");
    excuteResetPasswordView(Number(stepResetPassword) - 1);
  });

  const buttonsContent = document.createElement("div");
  buttonsContent.classList.add("accessibility-user-reset-password-button-content");
  buttonsContent.appendChild(button);
  buttonsContent.appendChild(buttonCancel);

  reset.appendChild(iconContent);
  reset.appendChild(title);
  reset.appendChild(content);
  reset.appendChild(buttonsContent);

  return reset;
}

const excuteResetPasswordView = (step) => {
  localStorage.setItem("stepResetPassword", step);
  const icon = document.querySelector(
    "#accessibility-user-reset-password-view .accessibility-user-reset-password-icon"
  );
  const title = document.querySelector(
    "#accessibility-user-reset-password-view .accessibility-user-reset-password-title"
  );
  const content = document.querySelector(
    "#accessibility-user-reset-password-view .accessibility-user-reset-password-content"
  );
  console.log(step);
  switch (step) {
    case 0:
      switchView("accessibility-user-login-view");
      break;
    case 1:
      icon.innerHTML = DynamicIcon({ icon: "lock" });
      title.innerHTML = "Recuperar contraseña";
      content.innerHTML = "";
      content.appendChild(
        createInputForm({
          type: "text",
          id: "reset-email",
          label: "Ingrese su correo electronico",
          placeholder: "Ingrese su correo electronico",
        })
      );
      switchView("accessibility-user-reset-password-view");
      break;

    case 2:
      icon.innerHTML = DynamicIcon({ icon: "lock" });
      title.innerHTML = "Validación de seguridad";
      content.innerHTML = `
        <p>Ingrese el código de validacion enviado <br> a la direccion de correo electronico <br> ma***@correo.com</p>
        <div id="inputCode"></div>
        <p>No recibí el código. <a style="font-weight: bold">Reenviar</a></p>
        <p style="color: var(--primaryColor); font-weight: bold">1:20 Segundos pendientes</p>
      `;
      content.querySelector("#inputCode").appendChild(createInputsCode());
      break;

    case 3:
      icon.innerHTML = DynamicIcon({ icon: "unlock" });
      title.innerHTML = "Ingresar nueva  contraseña";
      content.innerHTML = "";
      content.appendChild(
        createInputForm({
          type: "text",
          id: "create-new-password",
          label: "Ingrese su contraseña",
          placeholder: "Nueva contraseña",
        })
      );
      content.appendChild(
        createInputForm({
          type: "text",
          id: "confirm-new-password",
          label: "Confirme su contraseña",
          placeholder: "Nueva contraseña",
        })
      );
      break;
    case 4:
      executeAlertMessage({
        title: "Cambio de contraseña",
        message: "Su contraseña ha sido actualizada con exito.",
        onclick: () => {
          switchView("accessibility-user-login-view");
        },
      });
      break;

    default:
      break;
  }
};

// Crea la vista para cargar la imagen del perfil del usuario
export function userImageView() {
  const userImage = document.createElement("div");
  userImage.id = "accessibility-user-image-view";
  userImage.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  userImage.setAttribute("aria-hidden", "true");
  userImage.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-image-view-content">
        <div class="accessibility-user-image-view-content-text">
          <h2 class="accessibility-user-image-view-title">Tu imagen es nuestro foco</h2>
          <p>Agrega una foto de perfil</p>
        </div>
        <div class="accessibility-user-image-view-form" >
        </div>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-register-view"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Imagen de perfil"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = userImage.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  // Funcion para cambiar el archivo de imagen
  const changeFile = (file) => {
    if (file) {
      content.querySelector("button").disabled = false;
    } else {
      content.querySelector("button").disabled = true;
    }
  };

  // Creacion del formulario de carga de imagen
  const content = userImage.querySelector(".accessibility-user-image-view-form");
  content.appendChild(
    createInputFileForm({
      id: "user-image",
      accept: "image/*",
      onchange: changeFile,
    })
  );

  // Creacion del boton de continuar
  const button = document.createElement("button");
  button.id = "user-image-button";
  button.classList.add("accessibility-button-theme");
  button.disabled = true;
  button.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
      <span>Confirmar</span> 
      <span>
        ${DynamicIcon({
          icon: "right",
        })}
      </span>
    </span>
  `;

  // Onclick para el boton de guardar y continuar
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
  });

  content.appendChild(button);

  return userImage;
}

export function userTermsView() {
  const content = document.createElement("div");
  content.id = "accessibility-user-terms-view-1";
  content.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  content.setAttribute("aria-hidden", "true");
  content.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-terms-content accessibility-custom-scroll">
        <h1>Consentimiento para el Tratamiento de Datos Personales – Plataforma U</h1>
        <p>Al registrarme en la plataforma U, reconozco y acepto, de manera libre, informada, específica e inequívoca, que mis datos personales sean recolectados, tratados y almacenados conforme a los estándares internacionales de privacidad y protección de datos, con base en las siguientes condiciones:</p>

        <h2>1. Responsable del Tratamiento</h2>
        <p>Dsoft Innovate S.A.S. (en adelante “U”), identificada con domicilio en [dirección legal], actuando como responsable del tratamiento, tratará mis datos conforme a la presente autorización.</p>

        <h2>2. Finalidades del Tratamiento</h2>
        <p>Mis datos personales serán tratados para las siguientes finalidades:</p>
        <ul>
          <li>Personalizar la experiencia de accesibilidad dentro del widget U.</li>
          <li>Permitir el análisis y reporte agregado sobre el uso de herramientas de accesibilidad (sin identificar individualmente al usuario).</li>
          <li>Ofrecer soporte técnico y seguimiento personalizado cuando sea necesario.</li>
          <li>Cumplir con obligaciones legales y regulatorias en materia de accesibilidad, inclusión y no discriminación.</li>
          <li>Enviar actualizaciones técnicas, informativas o comerciales, solo si he dado consentimiento específico para ello.</li>
        </ul>

        <h2>3. Base Legal del Tratamiento</h2>
        <p>U basa el tratamiento de datos personales en:</p>
        <ul>
          <li>Consentimiento explícito del usuario.</li>
          <li>Interés legítimo para mejorar servicios de accesibilidad, siempre respetando la privacidad del usuario.</li>
          <li>El cumplimiento de normativas locales e internacionales, incluyendo GDPR (UE), CCPA (California), LGPD (Brasil), y otras leyes de protección de datos vigentes.</li>
        </ul>

        <h2>4. Transferencia Internacional de Datos</h2>
        <p>Los datos podrán ser transferidos y/o almacenados en servidores ubicados en distintos países. Unyco garantiza que, cuando ello ocurra, se aplicarán cláusulas contractuales estándar y medidas técnicas adecuadas para proteger los datos conforme al GDPR y demás normativas aplicables.</p>

        <h2>5. Derechos del Usuario</h2>
        <p>Como titular de los datos, tengo derecho a:</p>
        <ul>
          <li>Acceder, rectificar, limitar, suprimir o portar sus datos personales.</li>
          <li>Retirar su consentimiento en cualquier momento.</li>
          <li>Presentar reclamos ante la autoridad local competente en protección de datos (como la SIC en Colombia, EDPB en la UE o FTC en EE.UU.).</li>
        </ul>

        <h2>6. Tiempo de Conservación</h2>
        <p>Los datos serán conservados solo durante el tiempo necesario para las finalidades indicadas o mientras se mantenga la cuenta activa. Posteriormente, se eliminarán o anonimizarán según los principios de minimización.</p>

        <h2>7. Contacto para Ejercer Derechos</h2>
        <p>Puede ejercer sus derechos escribiendo a: <a href="mailto:privacy@u.app">privacy@u.app</a></p>
        <p>O visitando el formulario disponible en: <a href="https://www.u.app/privacy">www.u.app/privacy</a></p>
      </div>
      <div class="accessibility-user-terms-form">
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-register-view"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Términos y condiciones"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = content.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  // Creacion del boton de continuar
  const button = document.createElement("button");
  button.id = "user-image-button";
  button.classList.add("accessibility-button-theme");
  button.disabled = true;
  button.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
      <span>Confirmar</span> 
      <span>
        ${DynamicIcon({
          icon: "right",
        })}
      </span>
    </span>
  `;

  // Onclick para el boton de guardar y continuar
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-terms-view-2");
  });

  const onChangeCheck = (e) => {
    if (e.target.checked) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  const form = content.querySelector(".accessibility-user-terms-form");
  const message = document.createElement("p");
  message.classList.add("accessibility-helper-text");
  message.style.textAlign = "center";
  message.style.textDecoration = "underline";
  message.innerHTML = "Por favor debe leer todo el documento antes de aceptar";
  form.appendChild(message);
  form.appendChild(
    createCheckTermsForm({
      id: "check1",
      label:
        "Declaro que he leído y acepto los términos del tratamiento de mis datos personales conforme a lo aquí expuesto.",
      onchange: onChangeCheck,
      disabled: true,
    })
  );
  form.appendChild(button);

  // Detectar cuando el scroll llegue al final
  const termsContent = content.querySelector(".accessibility-user-terms-content");
  termsContent.addEventListener("scroll", () => {
    if (termsContent.scrollTop + termsContent.clientHeight >= termsContent.scrollHeight) {
      const check = form.querySelector("#check1");
      check.disabled = false; // Activar el checkbox
    }
  });

  return content;
}

export function userTermsView2() {
  const content = document.createElement("div");
  content.id = "accessibility-user-terms-view-2";
  content.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  content.setAttribute("aria-hidden", "true");
  content.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-terms-content accessibility-custom-scroll">
        <h1>Consentimiento Informado sobre el Uso de Datos – Widget U</h1>
        <p>En U respetamos tu privacidad y queremos que sepas exactamente cómo usamos tus datos.</p>
        <p>Al registrarte en nuestra plataforma y usar el widget, aceptas que recolectemos y utilicemos cierta información con los siguientes propósitos:</p>

        <h2>📌 ¿Qué datos recopilamos?</h2>
        <p>Recopilamos únicamente los datos necesarios para ofrecerte una experiencia accesible y personalizada. Estos pueden incluir:</p>
        <ul>
          <li>Tus datos de contacto (nombre, correo electrónico).</li>
          <li>Tu país, idioma y nivel de accesibilidad requerido.</li>
          <li>Tu tipo de discapacidad (si decides compartirlo).</li>
          <li>Las configuraciones que activas en el widget (por ejemplo: agrandar texto, activar lector, etc.).</li>
        </ul>
        <p>🔒 No recolectamos datos bancarios ni accedemos a tu contenido personal en la web.</p>

        <h2>📌 ¿Para qué usamos esta información?</h2>
        <ul>
          <li>Para adaptar automáticamente el widget a tus necesidades.</li>
          <li>Para generar reportes anónimos y estadísticos que ayuden a mejorar el acceso digital.</li>
          <li>Para proteger tus derechos de accesibilidad, conforme a normas como la WCAG 2.2, la GDPR, la CCPA y otras leyes locales.</li>
          <li>Si aceptas recibir noticias, te enviaremos actualizaciones sobre nuevas funciones o mejoras del widget.</li>
        </ul>

        <h2>📌 ¿Quién puede ver tus datos?</h2>
        <p>Solo tú y el sistema tienen acceso a tus configuraciones personales.</p>
        <p>Si decides compartir tus datos con una institución (por ejemplo, una universidad que implementa Unyco), ellos solo recibirán reportes agregados y anónimos, nunca datos individuales sin tu permiso.</p>

        <h2>📌 ¿Qué control tienes sobre tu información?</h2>
        <ul>
          <li>Puedes modificar o eliminar tu cuenta en cualquier momento.</li>
          <li>Puedes pedir una copia de los datos que tenemos sobre ti.</li>
          <li>Puedes revocar este consentimiento escribiéndonos a: <a href="mailto:privacy@u.app">privacy@u.app</a></li>
        </ul>
      </div>
      <div class="accessibility-user-terms-form">
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-terms-view-1"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Términos y condiciones"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = content.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  // Creacion del boton de continuar
  const button = document.createElement("button");
  button.id = "user-image-button";
  button.classList.add("accessibility-button-theme");
  button.disabled = true;
  button.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
      <span>Confirmar</span> 
      <span>
        ${DynamicIcon({
          icon: "right",
        })}
      </span>
    </span>
  `;

  // Onclick para el boton de guardar y continuar
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    executeAlertMessage({
      icon: null,
      title: "¡Cuenta Creada!",
      message: "Su perfil ha sido creado con éxito </br> Ingrese y comience a disfrutar.",
      onclick: () => {
        const response = fetchRegister({
          email: emailInput.value.trim(),
          password: passwordInput.value.trim(),
        });
        console.log(response);
        switchView("accessibility-user-login-view");
      },
    });
  });

  const onChangeCheck = (e) => {
    if (e.target.checked) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  const form = content.querySelector(".accessibility-user-terms-form");
  const message = document.createElement("p");
  message.classList.add("accessibility-helper-text");
  message.style.textAlign = "center";
  message.style.textDecoration = "underline";
  message.innerHTML = "Por favor debe leer todo el documento antes de aceptar";
  form.appendChild(message);
  form.appendChild(
    createCheckTermsForm({
      id: "check2",
      label:
        "Declaro que he leído y acepto los términos del tratamiento de mis datos personales conforme a lo aquí expuesto.",
      onchange: onChangeCheck,
      disabled: true,
    })
  );

  // Detectar cuando el scroll llegue al final
  const termsContent = content.querySelector(".accessibility-user-terms-content");
  termsContent.addEventListener("scroll", () => {
    if (termsContent.scrollTop + termsContent.clientHeight >= termsContent.scrollHeight) {
      const check = form.querySelector("#check2");
      check.disabled = false; // Activar el checkbox
    }
  });

  form.appendChild(button);

  return content;
}

export function userProfileView() {
  const content = document.createElement("div");
  content.id = "accessibility-user-profile-view";
  content.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  content.setAttribute("data-typeAuthRequired", "true");
  content.setAttribute("aria-hidden", "true");
  content.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-profile-view-content"> 
        <div class="accessibility-banner-user-top-image" style="position: relative; top: 0; width: 120px; height: 120px; left: calc(50% - 60px);">
          <div class="accessibility-banner-user-top-image-internal" style="width: 105px; height: 105px;">
            <img src="https://cdn.pixabay.com/photo/2020/12/08/19/12/woman-5815354_640.jpg" alt="user image">
          </div>
        </div>
        <a class="accessibility-user-button-edit-img" >Editar imagen <span>${DynamicIcon({ icon: "pen" })}</span></a>
        <div class="accessibility-user-profile-view-info">
        </div>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView(-1));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Datos del perfil"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = content.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  const contentInfo = content.querySelector(".accessibility-user-profile-view-info");
  // Datos de ejemplo, reemplaza por los datos reales del usuario
  const userData = {
    name: "Lina Marulanda",
    email: "linamarulanda@gmail.com",
    birthDate: "02 April 2021",
    id: "abcd123456",
    themes: [
      { color: "blue", hex: "#1e67e7", active: true },
      { color: "purple", hex: "#5d04d8", active: false },
      { color: "custom", hex: "#ff5733", active: false },
    ],
  };

  contentInfo.innerHTML = `
    <h2 style="text-align: center; width: 100%; margin-bottom: 30px;">${userData.name}</h2>
    <p class="title">Correo</p>
    <p class="subtitle">${userData.email}</p>
    <p class="title">Fecha de nacimiento</p>
    <p class="subtitle">${userData.birthDate}</p>
    <p class="title">Identificación</p>
    <p class="subtitle">${userData.id}</p>
    <p class="title">Todos los datos</p>
    <p class="title">Tema</p>
    <div class="list-checks">
      ${userData.themes
        .map(
          (theme) => `
          <div data-value="${theme.color}" data-hex="${theme.hex}" class="accessibility-check"
            style="${theme.active && `border: 2px solid ${theme.hex}`}"
          >
            <div class="accessibility-check-external"
              style="${`background: color-mix(in srgb, ${theme.hex} 33%, transparent);`}"
            >
              <div class="accessibility-check-internal"
                style="${`background: ${theme.hex};`}"
              ></div>
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;

  const checks = contentInfo.querySelectorAll(".accessibility-check");
  checks.forEach((check, idx) => {
    check.addEventListener("click", () => {
      checks.forEach((c, i) => {
        c.style.border = "";
        userData.themes[i].active = false;
      });
      check.style.border = `2px solid ${userData.themes[idx].hex}`;
      userData.themes[idx].active = true;
      ChangeTheme(check.getAttribute("data-value"), check.getAttribute("data-hex"));
    });
  });

  return content;
}
