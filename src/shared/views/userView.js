// components/loginView.js
import { getDynamicTranslation, createButton, switchView, applyTranslations } from "../../widget";
import { DynamicIcon } from "/public/icons/generals/dinamicIcons";
import { host } from "../constants/enviroments";
import {
  fetchLogin,
  fetchRecoveryPassNewPass,
  fetchRecoveryPassSendCode,
  fetchRecoveryPassVerifyCode,
  fetchRegister,
  logout,
  fetchUserProfile,
  getUserIdFromToken,
  updateUserProfile,
  checkEmail,
} from "../services/authentication";
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
        <p class="accessibility-title-card-text"><span data-u-i18n="loginView.welcome">Bienvenido a</span> <span><img src="${host}/public/logos/isotipoBlue.svg" alt="logo de u"></span></p>
        <p class="accessibility-description-card-text" data-u-i18n="loginView.subwelcome">Elige cualquiera de estas opciones para iniciar sesion o crear una cuenta.</p>
      </div>
      <div class="accessibility-user-login-view-content-form">
      </div>
      <div class="accessibility-user-login-view-content-footer">
        <p> <span data-u-i18n="loginView.notAccount.subtext1">¿No tienes una cuenta?</span> <a data-u-i18n="loginView.notAccount.subtext2">Registrate</a></p>
        <p data-u-i18n="loginView.notAccount.subtext3">O puedes ingresar con</p>
        <div class="accessibility-user-login-view-content-footer-icons">
          <button class="accessibility-icon-button" id="googleRegisterBtn" aria-label="Google">
            <img src="${host}/public/icons/socialMedia/google.svg" alt="Google" aria-label="Google" />
          </button>
          <button class="accessibility-icon-button" id="facebook-button" aria-label="Facebook">
            <img src="${host}/public/icons/socialMedia/facebook.svg" alt="Facebook" aria-label="Facebook" />
          </button>
        </div>
      </div>
    </div>
  `;

  window.addEventListener("message", (event) => {
    const user = event.data;

    // Aquí puedes cerrar el popup o actualizar tu UI
  });

  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("googleRegisterBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        window.open("https://apitest.unyco.co/auth/google", "login", "width=500,height=600");
      });
    }
  });

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView(-1));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.setAttribute("data-u-i18n", "loginView.title");
  title.innerHTML = "Iniciar sesión"; // Texto del título

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
      i18n_placeholder: "loginView.input.placeholderEmail",
    })
  );
  form.appendChild(
    createInputForm({
      type: "password",
      id: "login-password",
      placeholder: "Ingresa tu contraseña",
      i18n_placeholder: "loginView.input.placeholderPass",
    })
  );
  const button = document.createElement("div");
  button.innerHTML = `
      <a data-U-i18n="loginView.forgotPass">¿Olvidaste tu contraseña?</a>
      <button id="accessibility-login-button" class="accessibility-button-theme" data-U-i18n="loginView.buttonLogin" >Iniciar sesión</button>
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
      switchView("accessibility-user-profile-view"); // Cambiar a la vista inicial
    } else {
      executeAlertMessage({
        icon: "x",
        title: "Error al iniciar sesión",
        message: response.message || "Por favor, verifica tus credenciales e intenta nuevamente.",
        onclick: () => {
          switchView("accessibility-user-login-view"); // Volver a la vista de login
        },
      });
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

// Objeto donde se almacenan los datos del registro de usuario
let dataRegisterUser = {
  email: "",
  password: "",
  role: "",
  name: "",
  documentType: "",
  n_document: "",
  birthdate: "",
  residenceArea: "",
  educationalLevel: "",
  ocupacion: "",
  disability: "",
  disabilityType: "",
  disabilityLevel: "",
};

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
          <p class="accessibility-title-card-text"><span data-u-i18n="accountView.welcome">Bienvenido a</span> <span><img src="${host}/public/logos/isotipoBlue.svg" alt="Logo de U" width="50px"></span></p>
          <p class="accessibility-description-card-text" data-u-i18n="accountView.subwelcome">Crea tu cuenta</p>
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
  title.setAttribute("data-u-i18n", "accountView.title");
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
    i18n_placeholder: "accountView.input.placeholderEmail",
  });

  const confirmEmailInputContainer = createInputForm({
    type: "text",
    id: "confirm-email",
    placeholder: "Confirma tu correo electronico",
    i18n_placeholder: "accountView.input.placeholderConfirmEmail",
  });

  const passwordInputContainer = createInputForm({
    type: "password",
    id: "create-password",
    placeholder: "Ingresa tu contraseña",
    i18n_placeholder: "accountView.input.placeholderPass",
  });

  const confirmPasswordInputContainer = createInputForm({
    type: "password",
    id: "confirm-password",
    placeholder: "Confirma tu contraseña",
    i18n_placeholder: "accountView.input.placeholderConfirmPass",
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
        <span data-u-i18n="accountView.button">Guardar y continuar</span> 
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
    dataRegisterUser.email = emailInput.value.trim();
    dataRegisterUser.password = passwordInput.value.trim();
    executeRegisterView({});
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
 


let emailValid = false;
let passwordValid = false;

const validateForm = async (e) => {
  const email = emailInput.value.trim();
  const confirmEmail = confirmEmailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const isEmailFormatValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  if (e.target.id?.includes("email")) {
    emailValid = false;
    emailErrorText.style.display = "none";
    emailErrorText.textContent = "";

    if (email === confirmEmail && isEmailFormatValid) {
      const emailRegistered = await checkEmail(email);

      if (emailRegistered) {
        const translate = getDynamicTranslation("error.helperText.emailError3") || "Este correo ya está registrado.";
        emailErrorText.textContent = translate;
        emailErrorText.style.display = "block";
        emailValid = false;
      } else {
        emailValid = true;
      }
    } else {
      if (email !== confirmEmail) {
        emailErrorText.textContent = getDynamicTranslation("error.helperText.emailError1");
      } else if (!isEmailFormatValid) {
        emailErrorText.textContent = getDynamicTranslation("error.helperText.emailError2");
      }
      emailErrorText.style.display = "block";
    }
  }

  if (e.target.id?.includes("password")) {
    passwordValid = false;
    passwordErrorText.style.display = "none";

    if (password === confirmPassword && password.length >= 6) {
      passwordValid = true;
    } else {
      if (password !== confirmPassword) {
        passwordErrorText.textContent = getDynamicTranslation("error.helperText.passError1");
      } else if (password.length < 6) {
        passwordErrorText.textContent = getDynamicTranslation("error.helperText.passError2");
      }
      passwordErrorText.style.display = "block";
    }
  }

  // Habilitar botón solo si ambos campos están válidos
  button.disabled = !(emailValid && passwordValid);
};


  // Añadir evento de input para validar el formulario al escribir
  emailInput.addEventListener("input", validateForm);
  confirmEmailInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);
  confirmPasswordInput.addEventListener("input", validateForm);

  return account;
}



export function registerView() {
  // Recuperar la imagen del usuario desde localStorage (si existe)
  const storedImageUrl = localStorage.getItem("inputFileFormImage_user-image");

  // Imagen por defecto si no hay imagen personalizada
  const defaultImage = `${host}/public/images/perfil.svg`;

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
            <img class"u-accessibility-register-profile-img" src="${
              storedImageUrl || defaultImage
            }" alt="Imagen de perfil del usuario">
          </div>
        </div>
        <a class="accessibility-user-button-edit-img"><span data-u-i18n="registerView.edit">Editar imagen</span> <span>${DynamicIcon(
          {
            icon: "pen",
          }
        )}</span></a>
        <h2 class="accessibility-user-register-view-title" data-u-i18n="registerView.welcome">Bienvenido</h2>
        <p data-u-i18n="registerView.subwelcome">Por favor completa todos los campos para crear tu perfil.</p>
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
  title.setAttribute("data-u-i18n", "registerView.title");
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

  personalInfo.appendChild(
    createInputForm({
      type: "text",
      id: "name",
      label: "Nombre",
      placeholder: "Ingresa tu nombre completo",
      i18n_label: "registerView.input.labelName",
      i18n_placeholder: "registerView.input.placeholderName",
    })
  );

  personalInfo.appendChild(
    createSelectForm({
      id: "documentType",
      label: "Tipo de documento",
      i18n_label: "registerView.input.labelDocumentType",
      options: [
        { value: "", text: "Seleccione", i18n: "registerView.input.optionDocumentType.option1" },
        {
          value: "Cedula de Ciudadanía",
          text: "Cédula de Ciudadanía",
          i18n: "registerView.input.optionDocumentType.option2",
        },
        {
          value: "Tarjeta de Identidad",
          text: "Tarjeta de Identidad",
          i18n: "registerView.input.optionDocumentType.option3",
        },
        { value: "Pasaporte", text: "Pasaporte", i18n: "registerView.input.optionDocumentType.option4" },
        {
          value: "Cedula de Extranjería",
          text: "Cédula de Extranjería",
          i18n: "registerView.input.optionDocumentType.option5",
        },
        { value: "Otro", text: "Otro", i18n: "registerView.input.optionDocumentType.option6" },
        {
          value: "Documento de Identidad",
          text: "Documento de Identidad",
          i18n: "registerView.input.optionDocumentType.option7",
        },
      ],
    })
  );
  // Numero de documento
  personalInfo.appendChild(
    createInputForm({
      type: "text",
      id: "n_document",
      label: "Número de documento",
      placeholder: "Ingresa tu número de documento",
      i18n_label: "registerView.input.labelNDocument",
      i18n_placeholder: "registerView.input.placeholderNDocument",
    })
  );
  // Correo electronico
  personalInfo.appendChild(
    createInputForm({
      type: "email",
      id: "email",
      label: "Correo electronico",
      placeholder: "Ingresa tu correo electronico",
      i18n_label: "registerView.input.labelEmail",
      i18n_placeholder: "registerView.input.placeholderEmail",
      disabled: true,
    })
  );
  // Fecha de nacimiento
  personalInfo.appendChild(
    createInputForm({
      type: "date",
      id: "birthdate",
      label: "Fecha de nacimiento",
      placeholder: "Ingresa tu fecha de nacimiento",
      i18n_label: "registerView.input.labelBirthdate",
      i18n_placeholder: "registerView.input.placeholderBirthdate",
    })
  );

  personalInfo.appendChild(
    createSelectForm({
      id: "residenceArea",
      label: "Area de residencia",
      i18n_label: "registerView.input.labelResidenceArea",
      options: [
        { value: "", text: "Seleccione", i18n: "registerView.input.optionResidenceArea.option1" },
        { value: "Urbana", text: "Urbana", i18n: "registerView.input.optionResidenceArea.option2" },
        { value: "Rural", text: "Rural", i18n: "registerView.input.optionResidenceArea.option3" },
        { value: "Periurbana", text: "Periurbana", i18n: "registerView.input.optionResidenceArea.option4" },
      ],
    })
  );

  personalInfo.appendChild(
    createSelectForm({
      id: "educationalLevel",
      label: "Nivel educativo",
      i18n_label: "registerView.input.labelEducationalLevel",
      options: [
        { value: "", text: "Seleccione", i18n: "registerView.input.optionEducationalLevel.option1" },
        { value: "Ninguno", text: "Ninguno", i18n: "registerView.input.optionEducationalLevel.option2" },
        { value: "Primaria", text: "Primaria", i18n: "registerView.input.optionEducationalLevel.option3" },
        { value: "Secundaria", text: "Secundaria", i18n: "registerView.input.optionEducationalLevel.option4" },
        { value: "Universitaria", text: "Universitaria", i18n: "registerView.input.optionEducationalLevel.option5" },
        { value: "Postgrado", text: "Postgrado", i18n: "registerView.input.optionEducationalLevel.option6" },
      ],
    })
  );

  personalInfo.appendChild(
    createSelectForm({
      id: "ocupacion",
      label: "Situación ocupacional",
      i18n_label: "registerView.input.labelOcupacion",
      options: [
        { value: "", text: "Seleccione", i18n: "registerView.input.optionOcupacion.option1" },
        { value: "Empleado(a)", text: "Empleado(a)", i18n: "registerView.input.optionOcupacion.option2" },
        { value: "Desempleado(a)", text: "Desempleado(a)", i18n: "registerView.input.optionOcupacion.option3" },
        { value: "Estudiante", text: "Estudiante", i18n: "registerView.input.optionOcupacion.option4" },
        { value: "Jubilado(a)", text: "Jubilado(a)", i18n: "registerView.input.optionOcupacion.option5" },
        { value: "Independiente", text: "Independiente", i18n: "registerView.input.optionOcupacion.option6" },
      ],
    })
  );

  // Crear seccion del formulario para informacion de accesibilidad
  const accessibilityInfo = document.createElement("div");
  accessibilityInfo.classList.add("accessibility-user-register-form-accessibility-info");

  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disability",
      label: "¿Tiene alguna capacidad diversa?",
      i18n_label: "registerView.input.labelDisability",
      options: [
        { value: "", text: "Seleccione", i18n: "registerView.input.optionDisability.option1" },
        { value: "1", text: "Sí", i18n: "registerView.input.optionDisability.option2" },
        { value: "0", text: "No", i18n: "registerView.input.optionDisability.option3" },
      ],
    })
  );

  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disabilityType",
      label: "Tipo de capacidad diversa",
      i18n_label: "registerView.input.labelDisabilityType",
      options: [
        { value: "", text: "Seleccione", i18n: "registerView.input.optionDisabilityType.option1" },
        { value: "Visual", text: "Visual", i18n: "registerView.input.optionDisabilityType.option2" },
        { value: "Auditiva", text: "Auditiva", i18n: "registerView.input.optionDisabilityType.option3" },
        { value: "Motriz", text: "Motriz", i18n: "registerView.input.optionDisabilityType.option4" },
        { value: "Cognitiva", text: "Cognitiva", i18n: "registerView.input.optionDisabilityType.option5" },
        { value: "Psicosocial", text: "Psicosocial", i18n: "registerView.input.optionDisabilityType.option6" },
        { value: "Multiple", text: "Multiple", i18n: "registerView.input.optionDisabilityType.option7" },
      ],
    })
  );

  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disabilityLevel",
      label: "Nivel de capacidad diversa",
      i18n_label: "registerView.input.labelDisabilityLevel",
      options: [
        { value: "", text: "Seleccione", i18n: "registerView.input.optionDisabilityLevel.option1" },
        { value: "Leve", text: "Leve", i18n: "registerView.input.optionDisabilityLevel.option2" },
        { value: "Media", text: "Media", i18n: "registerView.input.optionDisabilityLevel.option3" },
        { value: "Alta", text: "Alta", i18n: "registerView.input.optionDisabilityLevel.option4" },
      ],
    })
  );

  // Agregamos los collapses al formulario
  form.appendChild(
    createCollapse({
      id: "register-collapse",
      title: "Información Personal Básica",
      i18n_title: "registerView.subtitle1",
      content: personalInfo,
      visible: true,
    })
  );
  form.appendChild(
    createCollapse({
      id: "register-collapse2",
      title: "Información de Accesibilidad",
      i18n_title: "registerView.subtitle2",
      content: accessibilityInfo,
      visible: true,
    })
  );

  // Agregamos el boton de registro
  const button = document.createElement("div");
  button.innerHTML = `
    <button id="register-button" class="accessibility-button-theme">
      <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <span data-u-i18n="registerView.button">Guardar y continuar</span> 
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
    // Obtener los valores de los inputs y agregarlos al objeto dataRegisterUser
    const formElement = register.querySelector(".accessibility-user-register-form");
    dataRegisterUser.documentType = formElement.querySelector("#documentType")?.value || "";
    dataRegisterUser.name = formElement.querySelector("#name")?.value?.trim() || "";
    dataRegisterUser.n_document = Number(formElement.querySelector("#n_document")?.value?.trim() || "");
    dataRegisterUser.email = formElement.querySelector("#email")?.value?.trim() || "";
    dataRegisterUser.birthdate = formElement.querySelector("#birthdate")?.value || "";
    dataRegisterUser.educationalLevel = formElement.querySelector("#educationalLevel")?.value || "";
    dataRegisterUser.residenceArea = formElement.querySelector("#residenceArea")?.value || "";
    dataRegisterUser.ocupacion = formElement.querySelector("#ocupacion")?.value || "";
    dataRegisterUser.disability = formElement.querySelector("#disability")?.value === "1" ? true : false;
    dataRegisterUser.disabilityType = formElement.querySelector("#disabilityType")?.value || "";
    dataRegisterUser.disabilityLevel = formElement.querySelector("#disabilityLevel")?.value || "";

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

// Ajusta la ruta

const executeRegisterView = async (props = { errorfields: null, isEdit: false }) => {
  const form = document.querySelector("#accessibility-user-register-view .accessibility-user-register-form");
  if (!form) return;

  let userId = null;

  const setInputValue = (selector, value) => {
    const input = form.querySelector(selector);
    console.log(input);
    if (input) input.value = value ?? "";
  };

  // Obtener datos reales del usuario desde la API
  if (props.isEdit) {
    const response = await fetchUserProfile();
    if (response.success) {
      const user = response.data;
      userId = user.id;

      setInputValue("#name", user.name);
      setInputValue("#documentType", user.documentType);
      setInputValue("#n_document", user.n_document);
      setInputValue("#email", user.email);
      setInputValue("#birthdate", user.birthdate);
      setInputValue("#residenceArea", user.residenceArea);
      setInputValue("#educationalLevel", user.educationalLevel);
      setInputValue("#ocupacion", user.ocupacion);
      setInputValue("#disability", user.disability ? "1" : "0");
      setInputValue("#disabilityType", user.disabilityType);
      setInputValue("#disabilityLevel", user.disabilityLevel);

      // Habilitar / deshabilitar selects según disability
      const disabilityValue = form.querySelector("#disability")?.value;
      const disabilityTypeSelect = form.querySelector("#disabilityType");
      const disabilityLevelSelect = form.querySelector("#disabilityLevel");
      if (disabilityTypeSelect) disabilityTypeSelect.disabled = disabilityValue !== "1";
      if (disabilityLevelSelect) disabilityLevelSelect.disabled = disabilityValue !== "1";

      const disabilitySelect = form.querySelector("#disability");
      if (disabilitySelect) {
        disabilitySelect.addEventListener("change", (e) => {
          const value = e.target.value;
          if (disabilityTypeSelect) disabilityTypeSelect.disabled = value !== "1";
          if (disabilityLevelSelect) disabilityLevelSelect.disabled = value !== "1";
        });
      }

      // Guardar cambios al enviar el formulario
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedData = {
          name: form.querySelector("#name")?.value,
          documentType: form.querySelector("#documentType")?.value,
          n_document: form.querySelector("#n_document")?.value,
          email: form.querySelector("#email")?.value,
          birthdate: form.querySelector("#birthdate")?.value,
          residenceArea: form.querySelector("#residenceArea")?.value,
          educationalLevel: form.querySelector("#educationalLevel")?.value,
          ocupacion: form.querySelector("#ocupacion")?.value,
          disability: form.querySelector("#disability")?.value === "1",
          disabilityType: form.querySelector("#disabilityType")?.value,
          disabilityLevel: form.querySelector("#disabilityLevel")?.value,
        };

        try {
          const response = await fetch(`https://apitest.unyco.co/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          });

          const result = await response.json();

          if (!response.ok) {
            console.error("Error al actualizar usuario:", result);
            alert("Ocurrió un error al actualizar tu perfil.");
          } else {
            // ✅ Mostrar notificación de éxito
            alert("Perfil actualizado correctamente.");
            // ✅ Redirigir a la vista de perfil
            switchView("accessibility-user-profile-view");
          }
        } catch (error) {
          console.error("Error al hacer la solicitud PUT:", error);
          alert("Error de conexión al actualizar tu perfil.");
        }
      });
    } else {
      console.error("Error al obtener perfil:", response.error);
      return;
    }
  } else {
    setInputValue("#name", dataRegisterUser.name);
    setInputValue("#documentType", dataRegisterUser.documentType);
    setInputValue("#n_document", dataRegisterUser.n_document);
    setInputValue("#email", dataRegisterUser.email);
    setInputValue("#birthdate", dataRegisterUser.birthdate);
    setInputValue("#residenceArea", dataRegisterUser.residenceArea);
    setInputValue("#educationalLevel", dataRegisterUser.educationalLevel);
    setInputValue("#ocupacion", dataRegisterUser.ocupacion);
    setInputValue("#disability", dataRegisterUser.disability ? "1" : "0");
    setInputValue("#disabilityType", dataRegisterUser.disabilityType);
    setInputValue("#disabilityLevel", dataRegisterUser.disabilityLevel);

    // Habilitar / deshabilitar selects según disability
    const disabilityValue = form.querySelector("#disability")?.value;
    const disabilityTypeSelect = form.querySelector("#disabilityType");
    const disabilityLevelSelect = form.querySelector("#disabilityLevel");
    if (disabilityTypeSelect) disabilityTypeSelect.disabled = disabilityValue !== "1";
    if (disabilityLevelSelect) disabilityLevelSelect.disabled = disabilityValue !== "1";

    const disabilitySelect = form.querySelector("#disability");
    if (disabilitySelect) {
      disabilitySelect.addEventListener("change", (e) => {
        const value = e.target.value;
        if (disabilityTypeSelect) disabilityTypeSelect.disabled = value !== "1";
        if (disabilityLevelSelect) disabilityLevelSelect.disabled = value !== "1";
      });
    }
  }

  // Mostrar errores si los hay
  if (props.errorfields && Array.isArray(props.errorfields)) {
    props.errorfields.forEach((error) => {
      if (typeof error === "string") {
        const [field, ...rest] = error.split(" ");
        const message = rest.join(" ");
        const inputContainer = form.querySelector(`#${field}-container`);
        if (inputContainer) {
          let helper = inputContainer.querySelector(".accessibility-helper-text");
          if (!helper) {
            helper = document.createElement("span");
            helper.classList.add("accessibility-helper-text");
            inputContainer.appendChild(helper);
          }
          helper.textContent = message;
          helper.style.display = "block";
          inputContainer.classList.add("accessibility-input-error");
        }
      }
    });
  }

  switchView("accessibility-user-register-view");
};

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
      <span data-u-i18n="resetPasswordView.buttonAccept"></span>
    </span>
  `;

  // Creacion del boton de cancelar
  const buttonCancel = document.createElement("button");
  buttonCancel.id = "accessibility-user-cancel-reset-password-button";
  buttonCancel.classList.add("accessibility-button-theme");
  buttonCancel.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: center; width: 100%;">
      <span data-u-i18n="resetPasswordView.buttonCancel"></span>
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

let dataReset = {};
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
  const buttonNext = document.querySelector("#accessibility-user-reset-password-button");
  buttonNext.replaceWith(buttonNext.cloneNode(true));
  const newButtonNext = document.querySelector("#accessibility-user-reset-password-button");

  switch (step) {
    case 0:
      switchView("accessibility-user-login-view");
      break;
    case 1:
      icon.innerHTML = DynamicIcon({ icon: "lock" });
      title.setAttribute("data-u-i18n", "resetPasswordView.title");
      title.innerHTML = ""; // El sistema de i18n lo llenará
      content.innerHTML = "";
      content.appendChild(
        createInputForm({
          type: "text",
          id: "reset-email",
          label: "resetPasswordView.labelEmail",
          i18n_label: "resetPasswordView.labelEmail",
          placeholder: "resetPasswordView.placeholderEmail",
          i18n_placeholder: "resetPasswordView.placeholderEmail",
        })
      );

      const emailInput = content.querySelector("#reset-email");
      emailInput.value = dataReset.email || ""; // Si hay un email guardado, lo muestra
      const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value.trim());
      newButtonNext.disabled = !isValidEmail;

      emailInput.addEventListener("input", () => {
        const email = emailInput.value.trim();
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        newButtonNext.disabled = !(email && isValidEmail);
      });

      // click boton continuar
      newButtonNext.addEventListener("click", async (e) => {
        e.preventDefault();
        const response = await fetchRecoveryPassSendCode({
          email: emailInput.value.trim(),
        });
        if (response.success) {
          excuteResetPasswordView(2);
          dataReset = { email: emailInput.value.trim() };
        } else {
          executeAlertMessage({
            icon: "x",
            title: "Error al enviar el código",
            message: response.message || "Ocurrió un error al enviar el código de recuperación.",
            onclick: () => {
              excuteResetPasswordView(1);
            },
          });
        }
      });

      switchView("accessibility-user-reset-password-view");
      break;

    case 2:
      icon.innerHTML = DynamicIcon({ icon: "lock" });
      title.setAttribute("data-u-i18n", "resetPasswordView.titleCode");
      title.innerHTML = "";
      content.innerHTML = `
      <p data-u-i18n="resetPasswordView.labelCode"></p>
      <div id="inputCode"></div>
      <p>
        <span data-u-i18n="resetPasswordView.resend"></span>
        <a style="font-weight: bold" data-u-i18n="resetPasswordView.resendLink"></a>
      </p>
      <p id="accessibility-time-discount" style="color: var(--primaryColor); font-weight: bold"></p>
    `;
      content.querySelector("#inputCode").appendChild(createInputsCode());

      // Bloquear el botón "Aceptar" si no se ha escrito el código completo
      const codeInputs = content.querySelectorAll("#inputCode input");
      newButtonNext.disabled = true;

      codeInputs.forEach((input) => {
        input.addEventListener("input", () => {
          // Habilitar solo si todos los inputs tienen un valor (asumiendo 6 dígitos)
          const allFilled = Array.from(codeInputs).every((inp) => inp.value.trim().length === 1);
          newButtonNext.disabled = !allFilled;
        });
      });

      // funcion para obtener los valores de los inputs del codigo
      function getCodeInputs() {
        const inputs = content.querySelectorAll("#inputCode input");
        return Array.from(inputs)
          .map((input) => input.value.trim())
          .join("");
      }

      // click boton continuar
      newButtonNext.addEventListener("click", async (e) => {
        e.preventDefault();
        const code = getCodeInputs();
        console.log("enviando codigo", code);
        const response = await fetchRecoveryPassVerifyCode({
          email: dataReset.email,
          code,
        });
        if (response.success) {
          excuteResetPasswordView(3);
        } else {
          executeAlertMessage({
            icon: "x",
            title: "Error al validar el código",
            message: response.message || "Ocurrió un error al validar el código de recuperación.",
            onclick: () => {
              excuteResetPasswordView(2);
              switchView("accessibility-user-reset-password-view");
            },
          });
        }
      });

      // click boton reenviar codigo
      const resendButton = content.querySelector("p a");
      resendButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const response = await fetchRecoveryPassSendCode({
          email: document.getElementById("reset-email").value.trim(),
        });
        if (response.success) {
          executeAlertMessage({
            icon: "check",
            title: "Código reenviado",
            message: "El código de recuperación ha sido reenviado a su correo electrónico.",
            onclick: () => {
              excuteResetPasswordView(2);
            },
          });
        } else {
          executeAlertMessage({
            icon: "x",
            title: "Error al reenviar el código",
            message: response.message || "Ocurrió un error al reenviar el código de recuperación.",
            onclick: () => {
              excuteResetPasswordView(2);
            },
          });
        }
      });

      let timeLeft = 300; // 5 minutos en segundos
      const timeDiscount = content.querySelector("#accessibility-time-discount");
      let timerInterval;

      function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDiscount.textContent = getDynamicTranslation("resetPasswordView.timer", {
          time: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        });
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timeDiscount.textContent = "El código ha expirado. Por favor, solicite uno nuevo.";
          // Deshabilitar los inputs de código y el botón de continuar
          const codeInputs = content.querySelectorAll("#inputCode input");
          codeInputs.forEach((input) => (input.disabled = true));
          const continueButton = document.querySelector("#accessibility-user-reset-password-button");
          if (continueButton) continueButton.disabled = true;
        }
      }

      updateTimer();
      timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
        }
      }, 1000);

      break;

    case 3:
      icon.innerHTML = DynamicIcon({ icon: "unlock" });
      title.setAttribute("data-u-i18n", "resetPasswordView.titleNewPass");
      title.innerHTML = "";
      content.innerHTML = "";
      content.appendChild(
        createInputForm({
          type: "password",
          id: "create-new-password",
          label: "resetPasswordView.labelNewPass",
          i18n_label: "resetPasswordView.labelNewPass",
          placeholder: "resetPasswordView.placeholderNewPass",
          i18n_placeholder: "resetPasswordView.placeholderNewPass",
        })
      );
      content.appendChild(
        createInputForm({
          type: "password",
          id: "confirm-new-password",
          label: "resetPasswordView.labelConfirmPass",
          i18n_label: "resetPasswordView.labelConfirmPass",
          placeholder: "resetPasswordView.placeholderConfirmPass",
          i18n_placeholder: "resetPasswordView.placeholderConfirmPass",
        })
      );

      // click boton continuar
      newButtonNext.addEventListener("click", async (e) => {
        e.preventDefault();
        const response = await fetchRecoveryPassNewPass({
          email: dataReset.email,
          newPassword: content.querySelector("#create-new-password")?.value.trim(),
        });
        if (response.success) {
          excuteResetPasswordView(4);
        } else {
          executeAlertMessage({
            icon: "x",
            title: "Error al actualizar la contraseña",
            message: response.message || "Ocurrió un error al actualizar la contraseña.",
            onclick: () => {
              excuteResetPasswordView(3);
              switchView("accessibility-user-reset-password-view");
            },
          });
        }
      });

      break;
    case 4:
      executeAlertMessage({
        title: getDynamicTranslation("resetPasswordView.successTitle"),
        message: getDynamicTranslation("resetPasswordView.successMessage"),
        onclick: () => {
          switchView("accessibility-user-login-view");
        },
      });
      break;

    default:
      break;
  }
  applyTranslations();
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
  button.setAttribute("aria-label", "Confirmar imagen de perfil");
  button.disabled = true;
  button.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
      <span>Confirmar</span>
      <span>${DynamicIcon({ icon: "right" })}</span>
    </span>
  `;

  // Evento del botón confirmar
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    console.log(userId);
    if (!userId) {
      alert("No se pudo identificar al usuario.");
      return;
    }

    const input = document.querySelector("#inputFileForm_user-image input[type='file']");
    const file = input?.files[0];

    if (!file) {
      alert("No se ha seleccionado una imagen válida.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiHost}/upload/profile/${userId}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) throw new Error("Error al subir la imagen.");

      const result = await response.json();

      // Actualiza la imagen en el DOM
      document
        .querySelectorAll(
          "#accessibility-user-profile-view .accessibility-banner-user-top-image-internal img, " +
            "#accessibility-banner-user .accessibility-banner-user-top-image-internal img"
        )
        .forEach((img) => {
          img.src = result.imageUrl;
          // console.log(imageUrl)
        });

      // Cambiar la vista
      switchView(-1);
    } catch (err) {
      console.error("Fallo la subida de la imagen:", err);
      alert("No se pudo subir la imagen. Intenta nuevamente.");
    }
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
        <h1 data-u-i18n="userTermsView.title2"></h1>
        <p data-u-i18n="userTermsView.intro"></p>

        <h2 data-u-i18n="userTermsView.section1Title"></h2>
        <p data-u-i18n="userTermsView.section1Text"></p>

        <h2 data-u-i18n="userTermsView.section2Title"></h2>
        <p data-u-i18n="userTermsView.section2Text"></p>
        <ul>
          <li data-u-i18n="userTermsView.section2List.item1"></li>
          <li data-u-i18n="userTermsView.section2List.item2"></li>
          <li data-u-i18n="userTermsView.section2List.item3"></li>
          <li data-u-i18n="userTermsView.section2List.item4"></li>
          <li data-u-i18n="userTermsView.section2List.item5"></li>
        </ul>

        <h2 data-u-i18n="userTermsView.section3Title"></h2>
        <p data-u-i18n="userTermsView.section3Text"></p>
        <ul>
          <li data-u-i18n="userTermsView.section3List.item1"></li>
          <li data-u-i18n="userTermsView.section3List.item2"></li>
          <li data-u-i18n="userTermsView.section3List.item3"></li>
        </ul>

        <h2 data-u-i18n="userTermsView.section4Title"></h2>
        <p data-u-i18n="userTermsView.section4Text"></p>

        <h2 data-u-i18n="userTermsView.section5Title"></h2>
        <p data-u-i18n="userTermsView.section5Text"></p>
        <ul>
          <li data-u-i18n="userTermsView.section5List.item1"></li>
          <li data-u-i18n="userTermsView.section5List.item2"></li>
          <li data-u-i18n="userTermsView.section5List.item3"></li>
        </ul>

        <h2 data-u-i18n="userTermsView.section6Title"></h2>
        <p data-u-i18n="userTermsView.section6Text"></p>

        <h2 data-u-i18n="userTermsView.section7Title"></h2>
        <p data-u-i18n="userTermsView.section7Text1"></p>
        <p data-u-i18n="userTermsView.section7Text2"></p>
      </div>
      <div class="accessibility-user-terms-form">
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-register-view"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`;

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.setAttribute("data-u-i18n", "userTermsView.title");
  title.innerHTML = "Términos y condiciones";

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`;

  // Contenedores de header
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);
  contentRight.appendChild(buttonHome);

  const header = content.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  // Botón de continuar
  const button = document.createElement("button");
  button.id = "user-image-button";
  button.classList.add("accessibility-button-theme");
  button.disabled = true;
  button.innerHTML = `
    <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
      <span data-u-i18n="userTermsView.button"></span> 
      <span>
        ${DynamicIcon({
          icon: "right",
        })}
      </span>
    </span>
  `;

  // Onclick para el boton de guardar y continuar
  button.addEventListener("click", (e) => {
    e.preventDefault();
    switchView("accessibility-user-terms-view-2");
  });

  const onChangeCheck = (e) => {
    button.disabled = !e.target.checked;
  };

  const form = content.querySelector(".accessibility-user-terms-form");
  const message = document.createElement("p");
  message.classList.add("accessibility-helper-text");
  message.style.textAlign = "center";
  message.style.textDecoration = "underline";
  message.setAttribute("data-u-i18n", "userTermsView.helperText");
  form.appendChild(message);
  form.appendChild(
    createCheckTermsForm({
      id: "check1",
      label: "userTermsView.checkboxLabel",
      i18n_label: "userTermsView.checkboxLabel",
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
      check.disabled = false;
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
        <h1 data-u-i18n="userTermsView2.title2"></h1>
        <p data-u-i18n="userTermsView2.intro"></p>
        <p data-u-i18n="userTermsView2.accept"></p>

        <h2 data-u-i18n="userTermsView2.section1Title"></h2>
        <p data-u-i18n="userTermsView2.section1Text"></p>
        <ul>
          <li data-u-i18n="userTermsView2.section1List.item1"></li>
          <li data-u-i18n="userTermsView2.section1List.item2"></li>
          <li data-u-i18n="userTermsView2.section1List.item3"></li>
          <li data-u-i18n="userTermsView2.section1List.item4"></li>
        </ul>
        <p data-u-i18n="userTermsView2.section1Note"></p>

        <h2 data-u-i18n="userTermsView2.section2Title"></h2>
        <ul>
          <li data-u-i18n="userTermsView2.section2List.item1"></li>
          <li data-u-i18n="userTermsView2.section2List.item2"></li>
          <li data-u-i18n="userTermsView2.section2List.item3"></li>
          <li data-u-i18n="userTermsView2.section2List.item4"></li>
        </ul>

        <h2 data-u-i18n="userTermsView2.section3Title"></h2>
        <p data-u-i18n="userTermsView2.section3Text1"></p>
        <p data-u-i18n="userTermsView2.section3Text2"></p>

        <h2 data-u-i18n="userTermsView2.section4Title"></h2>
        <ul>
          <li data-u-i18n="userTermsView2.section4List.item1"></li>
          <li data-u-i18n="userTermsView2.section4List.item2"></li>
          <li data-u-i18n="userTermsView2.section4List.item3"></li>
        </ul>
      </div>
      <div class="accessibility-user-terms-form">
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-terms-view-1"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`;

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.setAttribute("data-u-i18n", "userTermsView2.title");
  title.innerHTML = "Términos y condiciones";

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`;

  // Contenedores de header
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);
  contentRight.appendChild(buttonHome);

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
      <span data-u-i18n="userTermsView2.button"></span> 
      <span>
        ${DynamicIcon({
          icon: "right",
        })}
      </span>
    </span>
  `;

  // Onclick para el boton de guardar y continuar
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await fetchRegister(dataRegisterUser);
    if (response.success) {
      executeAlertMessage({
        icon: null,
        title: "¡Cuenta Creada!",
        message: "Su perfil ha sido creado con éxito </br> Ingrese y comience a disfrutar.",
        onclick: () => {
          switchView("accessibility-user-login-view");
        },
      });
    } else {
      executeRegisterView({ errorfields: response.data?.message });
    }
  });

  const onChangeCheck = (e) => {
    button.disabled = !e.target.checked;
  };

  const form = content.querySelector(".accessibility-user-terms-form");
  const message = document.createElement("p");
  message.classList.add("accessibility-helper-text");
  message.style.textAlign = "center";
  message.style.textDecoration = "underline";
  message.setAttribute("data-u-i18n", "userTermsView2.helperText");
  form.appendChild(message);
  form.appendChild(
    createCheckTermsForm({
      id: "check2",
      label: "userTermsView2.checkboxLabel",
      i18n_label: "userTermsView2.checkboxLabel",
      onchange: onChangeCheck,
      disabled: true,
    })
  );

  // Detectar cuando el scroll llegue al final
  const termsContent = content.querySelector(".accessibility-user-terms-content");
  termsContent.addEventListener("scroll", () => {
    if (termsContent.scrollTop + termsContent.clientHeight >= termsContent.scrollHeight) {
      const check = form.querySelector("#check2");
      check.disabled = false;
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

  // Obtiene la imagen desde localStorage o usa una por defecto
  const storedImageUrl = localStorage.getItem("user-profile-image-url");
  if (storedImageUrl) {
    document.getElementById("profile-image").src = storedImageUrl;
  }

  // Imagen por defecto si no hay imagen personalizada
  const defaultImage = `${host}/public/images/perfil.svg`;

  content.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-profile-view-content"> 
        <div class="accessibility-banner-user-top-image" style="position: relative; top: 0; width: 120px; height: 120px; left: calc(50% - 60px);">
          <div class="accessibility-banner-user-top-image-internal" style="width: 105px; height: 105px;">
            <img class="u-accessibility-profile-img"  src="${
              storedImageUrl || defaultImage
            }" alt="Imagen de perfil del usuario">
          </div>
        </div>
        <a class="accessibility-user-button-edit-img"><span data-u-i18n="userProfileView.editImage"></span> <span>${DynamicIcon(
          { icon: "pen" }
        )}</span></a>
        <div class="accessibility-user-profile-view-info">
          <!-- Aquí puedes agregar más info del perfil -->
        </div>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView(-1));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`;

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.setAttribute("data-u-i18n", "userProfileView.title");
  title.innerHTML = "Datos del perfil";

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`;

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
    name: "",
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
    <p class="title" data-u-i18n="userProfileView.email"></p>
    <p class="subtitle">${userData.email}</p>
    <p class="title" data-u-i18n="userProfileView.birthDate"></p>
    <p class="subtitle">${userData.birthDate}</p>
    <p class="title" data-u-i18n="userProfileView.id"></p>
    <p class="subtitle">${userData.id}</p>
    <p class="title" data-u-i18n="userProfileView.allData"></p>
    <p class="title" data-u-i18n="userProfileView.theme"></p>
    <div class="list-checks">
      ${userData.themes
        .map(
          (theme) => `
          <div data-value="${theme.color}" data-hex="${theme.hex}" class="accessibility-check"
            style="${theme.active && `border: 2px solid ${theme.hex}`}">
            <div class="accessibility-check-external"
              style="${`background: color-mix(in srgb, ${theme.hex} 33%, transparent);`}">
              <div class="accessibility-check-internal"
                style="${`background: ${theme.hex};`}"></div>
            </div>
          </div>
        `
        )
        .join("")}
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: 20px; gap: 10px;">
      <button class="accessibility-button-theme" id="accessibility-user-edit-profile-button">
        <span style="display: flex; align-items: center; justify-content: center; width: 100%;">
          <span data-u-i18n="userProfileView.editProfile"></span>
        </span>
      </button>
      <button class="accessibility-button-theme" id="accessibility-user-logout-button">
        <span style="display: flex; align-items: center; justify-content: center; width: 100%;">
          <span data-u-i18n="userProfileView.logout"></span>
        </span>
    </div>
  `;

  const editImgButton = content.querySelector(".accessibility-user-button-edit-img");
  editImgButton.addEventListener("click", (e) => {
    e.preventDefault();
    switchView("accessibility-user-image-view");
  });

  const editProfileButton = contentInfo.querySelector("#accessibility-user-edit-profile-button");
  editProfileButton.addEventListener("click", (e) => {
    e.preventDefault();
    executeRegisterView({
      errorfields: null,
      isEdit: true,
    });
  });

  const logoutButton = contentInfo.querySelector("#accessibility-user-logout-button");
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
    switchView("accessibility-user-login-view");
  });

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
