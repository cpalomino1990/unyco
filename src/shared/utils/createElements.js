import { createButton, switchView } from "../../widget";
import { DynamicIcon } from "../assets/icons/generals/dinamicIcons";
import { host, isMobile } from "../constants/enviroments";

// Función para crear un botón tipo tarjeta (card) para categorías
export function createButtonCard(props = { id, text, view, icon }) {
  // Creamos el botón de tipo card
  const card = createButton(props.id, "", () => {
    // Cambiar la vista cuando se haga clic en el botón
    switchView(props.view);
  });

  // Añadimos clases para el estilo del botón
  card.classList.add("accessibility-card-button");
  card.classList.add("out-right");

  // HTML del contenido del card (incluye icono, texto, y una descripción adicional)
  card.innerHTML = `
    <div class="accessibility-card-button-info blue" style="display: ${isMobile ? "block" : "none"};">
      ${DynamicIcon({ icon: "info" })} <!-- Icono dinámico para información -->
    </div>
    <div class="accessibility-card-button-content">
      <div class="accessibility-card-button-icon">
        <img src="${props.icon}" alt="icono"></img>
      </div>
      <p class="accessibility-card-button-text">${props.text}</p> <!-- Texto de la tarjeta -->
    </div>
    <div class="accessibility-card-button-info-content">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p> <!-- Descripción adicional de la tarjeta -->
    </div>
  `;

  // Ajuste de estilo para móviles (mostrar/ocultar contenido adicional)
  if (isMobile) {
    const contentInfo = card.querySelector(".accessibility-card-button-info-content");
    contentInfo.style.paddingRight = "30px";
  }

  // Event listener para el botón de información (muestra/oculta la información adicional)
  card.querySelector(".accessibility-card-button-info")?.addEventListener("click", (event) => {
    event.stopPropagation(); // Evitar propagación del evento
    const buttonInfo = card.querySelector(".accessibility-card-button-info");

    // Toggle de la animación (muestra/oculta contenido adicional)
    if ([...card.classList].some((cls) => cls.startsWith("in-"))) {
      card.classList.remove("in-right");
      card.classList.add("out-right");
      if (isMobile) {
        buttonInfo.classList.remove("white");
        buttonInfo.classList.add("blue");
      }
    } else {
      card.classList.remove("out-right");
      card.classList.add("in-right");
      if (isMobile) {
        buttonInfo.classList.remove("blue");
        buttonInfo.classList.add("white");
      }
    }
  });

  // Animación de hover para efectos en escritorio (cubo de entrada y salida)
  if (!isMobile) {
    const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left" };
    const classNames = ["in", "out"]
      .map((p) => Object.values(directions).map((d) => `${p}-${d}`))
      .reduce((a, b) => a.concat(b));

    // Función para calcular la dirección del mouse y aplicar la animación correspondiente
    const getDirectionKey = (ev, node) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };

    // Clase para manejar la animación de entrada y salida
    class Item {
      constructor(element) {
        this.element = element;
        this.element.addEventListener("mouseover", (ev) => this.update(ev, "in"));
        this.element.addEventListener("mouseout", (ev) => this.update(ev, "out"));
      }

      update(ev, prefix) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
      }
    }

    // Iniciamos la animación de entrada/salida en el card
    new Item(card);
  }

  // Devolvemos el card creado
  return card;
}

// Función para crear un banner de bienvenida para el usuario
export function createBannerUser() {
  const card = document.createElement("div");
  card.id = "accessibility-banner-user";
  card.innerHTML = `
    <div class="accessibility-banner-user-top">
      <div class="accessibility-banner-user-top-image">
        <div class="accessibility-banner-user-top-image-internal">
          <img src="https://cdn.pixabay.com/photo/2020/12/08/19/12/woman-5815354_640.jpg" alt="user image">
        </div>
      </div>
    </div>
    <p class="accessibility-banner-user-title">
      Bienvenid@ <!-- Título del banner -->
    </p>
    <p class="accessibility-banner-user-subtitle">
      Te invitamos a registrarte para tener una experiencia personalizada
    </p> <!-- Subtítulo del banner -->
  `;

  const image = card.querySelector(".accessibility-banner-user-top-image");
  image.addEventListener("click", () => {
    switchView("accessibility-user-profile-view");
  });

  // Devolvemos el banner creado
  return card;
}

// Función para crear tarjetas de perfil
export function createCardProfile(props = { id, title, description, onclick }) {
  const card = document.createElement("button");
  card.id = props.id;
  card.classList.add("accessibility-profile-card");
  card.innerHTML = `
    <div class="accessibility-profile-card-content">
      <div class="accessibility-check float-top-right" style="display: none;">
        <div class="accessibility-check-external">
          <div class="accessibility-check-internal"></div>
        </div>
      </div>
      <div class="accessibility-profile-card-top">
        <div class="accessibility-profile-card-top-icon">
          ${DynamicIcon({ icon: "user" })} <!-- Icono de perfil -->
        </div>
        <p>${props.title}</p> <!-- Título del perfil -->
      </div>
      <p class="description">
        ${props.description} <!-- Descripción del perfil -->
      </p>
    </div>
  `;

  // Event listener para manejar clics en la tarjeta de perfil
  card.addEventListener("click", props.onclick);

  // Devolvemos el card creado
  return card;
}

// Función para crear tarjetas de título con botón de retroceso y/o colapsables
export function createCardTitle(props = { id, text, btnBack, collapse, onclick }) {
  const card = document.createElement("div");
  card.id = props.id;
  card.classList.add("accessibility-title-card");

  // Creación del botón "atrás"
  const buttonBack = createButton("back-to-menu", "", props.onclick);
  buttonBack.classList.add("accessibility-circle-button-sm");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = props.text; // Texto del título

  // Contenedor izquierdo (con el botón de retroceso si es necesario)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-title-card-content-left");
  if (props.btnBack) {
    contentLeft.appendChild(buttonBack);
  }
  contentLeft.appendChild(title);

  // Contenedor derecho (icono de colapso si es necesario)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-title-card-content-right");
  contentRight.innerHTML = `${DynamicIcon({ icon: "down" })}`; // Icono de colapso

  // Agregamos los contenedores al card
  card.appendChild(contentLeft);
  if (props.collapse) {
    card.appendChild(contentRight);
  }

  return card;
}

// Función para crear botones de funcionalidad (con opciones de selección)
export function createFuncionalityButton(props = { id, title, icon, description, onclick, countOptions, type }) {
  const countOptions = props.countOptions || 1; // Si no se especifica, el valor por defecto es 1
  const card = document.createElement("button");
  card.setAttribute("data-id", props.id);

  // if (countOptions === 1) {
  card.style.position = "relative"; // Aseguramos que se posicionen bien las opciones si es solo una
  // }
  card.classList.add("accessibility-funcionality-button");
  card.innerHTML = `
    <div class="accessibility-card-button-info blue">
      ${DynamicIcon({ icon: "info" })} <!-- Icono dinámico para información -->
    </div>
    <div class="accessibility-funcionality-button-content">
      <div class="accessibility-funcionality-button-icon">
        ${props.icon ? props.icon : DynamicIcon({ icon: "user" })} <!-- Icono de la funcionalidad -->
      </div>
      <p>${props.title}</p> <!-- Título del botón -->
      <div>
        <div class="accessibility-content-checks hidden">
          <div class="accessibility-check float-top-right">
            <div class="accessibility-check-external">
              <div class="accessibility-check-internal"></div>
            </div>
          </div>
          ${
            props.type === "sliderColor"
              ? `
                <div class="accessibility-button-slide-color">
                  <input type="range" min="0" max="100" value="0" class="slider" id="colorRange" />
                </div>
              `
              : Array.from({ length: countOptions })
                  .map(
                    () => `
              <div class="accessibility-funcionality-button-bar-option" style="${
                countOptions === 1 && "display: none;"
              }">
              </div>
            `
                  )
                  .join("")
          }
        </div>
      </div>
    </div>
    <div class="accessibility-funcionality-button-content-info scale-up-tl-reverse">
      <p>${props.description}</p> <!-- Descripción del botón -->
    </div>
  `;

  const slider = card.querySelector("#colorRange");

  slider?.addEventListener("input", () => {
    const value = slider.value;
    const percentage = value / 100;
    const color = getColorFromPercentage(percentage);
    slider.style.setProperty("--thumb-color", color);
    slider.style.borderColor = color;

    // Cambia el borde del pulgar dinámicamente
    slider.style.setProperty("--thumb-border", color);
    slider.style.setProperty("--thumb-shadow", `0 0 4px ${color}`);
  });

  function getColorFromPercentage(pct) {
    const percent = Math.max(0, Math.min(1, pct));
    const hue = (1 - percent) * 270; // 270° (púrpura) → 0° (rojo)
    console.log(`hsl(${hue}, 100%, 50%)`);
    return `hsl(${hue}, 100%, 50%)`;
  }

  // Event listener para el botón de información (muestra/oculta la información adicional)
  card.querySelector(".accessibility-card-button-info")?.addEventListener("click", (event) => {
    event.stopPropagation(); // Evitar propagación del evento
    const buttonInfo = card.querySelector(".accessibility-card-button-info");
    const contentInfo = card.querySelector(".accessibility-funcionality-button-content-info");
    const isBlue = buttonInfo.classList.contains("blue");

    card.style.border = isBlue ? "none" : "";
    buttonInfo.style.top = isBlue ? "7px" : "";
    buttonInfo.style.left = isBlue ? "7px" : "";
    if (isBlue) {
      contentInfo.classList.remove("scale-up-tl-reverse");
      contentInfo.classList.add("scale-up-tl");
    } else {
      contentInfo.classList.remove("scale-up-tl");
      contentInfo.classList.add("scale-up-tl-reverse");
    }
    contentInfo.setAttribute("aria-hidden", isBlue ? "false" : "true");
    buttonInfo.classList.toggle("blue", !isBlue);
    buttonInfo.classList.toggle("white", isBlue);
    if (isBlue) {
      card.removeEventListener("click", props.onclick);
    } else {
      card.addEventListener("click", props.onclick);
    }
  });

  // Event listener para manejar el clic en el botón de funcionalidad
  card.addEventListener("click", props.onclick);

  return card;
}

export function createCollapse(props = { id, title, content, visible }) {
  const hiddenClass = props.visible ? null : "hidden"; // Determina si el contenido está oculto o visible
  // Creación del elemento collapse
  const collapseContainer = document.createElement("div");
  collapseContainer.id = props.id;
  collapseContainer.classList.add("accessibility-collapse-container");

  const collapseHeader = document.createElement("div");
  collapseHeader.classList.add("accessibility-collapse-header");
  collapseHeader.innerHTML = `
    <p class="accessibility-collapse-title">${props.title || "Titulo"}</p>
    <span class="accessibility-collapse-icon">${DynamicIcon({ icon: hiddenClass ? "down" : "up" })}</span>
  `;

  const collapseContent = document.createElement("div");
  collapseContent.classList.add("accessibility-collapse-content");
  hiddenClass && collapseContent.classList.add(hiddenClass); // Agregar clase para ocultar el contenido
  collapseContent.setAttribute("aria-hidden", "true"); // Atributo para accesibilidad
  collapseContent.appendChild(props.content); // Agregar el contenido al collapse

  // Agregar funcionalidad de colapso
  collapseHeader.addEventListener("click", () => {
    collapseContent.classList.toggle("hidden");
    const icon = collapseHeader.querySelector(".accessibility-collapse-icon");
    icon.innerHTML = collapseContent.classList.contains("hidden")
      ? DynamicIcon({ icon: "down" })
      : DynamicIcon({ icon: "up" });
    collapseContent.setAttribute("aria-hidden", collapseContent.classList.contains("hidden"));
  });

  // Agregar el header y el contenido al contenedor del collapse
  collapseContainer.appendChild(collapseHeader);
  collapseContainer.appendChild(collapseContent);

  // Devolver el contenedor del collapse
  return collapseContainer;
}

// Creacion de input forms
export function createInputForm(props = { id, type, placeholder, value, label, onchange }) {
  const container = document.createElement("div");
  container.classList.add("accessibility-input-form-container");

  if (props.label) {
    const label = document.createElement("label");
    label.htmlFor = props.id;
    label.textContent = props.label;
    container.appendChild(label);
  }

  const input = document.createElement("input");
  input.id = props.id;
  input.type = props.type || "text"; // Tipo de input por defecto es "text"
  input.placeholder = props.placeholder || ""; // Placeholder por defecto es vacío
  input.value = props.value || ""; // Valor por defecto es vacío

  // Event listener para manejar cambios en el input
  if (props.onchange) {
    input.addEventListener("change", props.onchange);
  }

  container.appendChild(input);
  return container; // Devolver el contenedor con el label y el input
}

// Creacion de check para aceptar terminos y condiciones
export function createCheckTermsForm(props = { id, label, onchange, disabled }) {
  const container = document.createElement("div");
  container.classList.add("accessibility-check-terms-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = props.id;
  checkbox.disabled = props.disabled ?? false;
  checkbox.addEventListener("change", props.onchange);

  const label = document.createElement("label");
  label.htmlFor = props.id;
  label.innerHTML = props.label || "Acepto los términos y condiciones";

  container.appendChild(checkbox);
  container.appendChild(label);

  return container;
}

// Creacion de selects forms
export function createSelectForm(props = { id, options, label, onchange }) {
  const container = document.createElement("div");
  container.classList.add("accessibility-select-form-container");

  if (props.label) {
    const label = document.createElement("label");
    label.htmlFor = props.id;
    label.textContent = props.label;
    container.appendChild(label);
  }

  const select = document.createElement("select");
  select.id = props.id;

  // Agregar las opciones al select
  props.options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value || option; // Valor de la opción
    opt.textContent = option.text || option; // Texto de la opción
    select.appendChild(opt);
  });

  // Event listener para manejar cambios en el select
  if (props.onchange) {
    select.addEventListener("change", props.onchange);
  }

  container.appendChild(select);
  return container; // Devolver el contenedor con el label y el select
}

// Creacion de input file forms
export function createInputFileForm(props = { id, accept, onchange }) {
  const container = document.createElement("div");
  container.classList.add("accessibility-input-file-form-container");

  // Creacion del contenedor dropabble
  const dropabbleContainer = document.createElement("div");
  dropabbleContainer.classList.add("accessibility-dropabble-container");
  dropabbleContainer.innerHTML += `
    <div class="accessibility-dropabble-container-text">
      <p>${DynamicIcon({ icon: "image" })}</p>
      <p>Arrastra y suelta el archivo aquí</p>
      <p>o selecciona uno de tu galeria</p>
    </div>
    <div class="accessibility-dropabble-container-img hidden">
      <div class="accessibility-dropabble-container-img-delete">${DynamicIcon({ icon: "x" })}</div>
      <img src="" alt="Imagen de usuario">
    </div>
  `;

  const input = document.createElement("input");
  input.id = props.id;
  input.type = "file"; // Tipo de input es "file"
  input.hidden = true; // Ocultar el input file por defecto
  input.accept = props.accept || "*"; // Aceptar cualquier tipo de archivo por defecto

  input.addEventListener("change", (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      dropabbleContainer.querySelector(".accessibility-dropabble-container-text")?.classList.add("hidden");
      dropabbleContainer.querySelector(".accessibility-dropabble-container-img")?.classList.remove("hidden");

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = dropabbleContainer.querySelector(".accessibility-dropabble-container-img img");
        img.src = e.target.result; // Asignar la URL de previsualización al src de la imagen
      };
      reader.readAsDataURL(file);

      if (props.onchange) {
        props.onchange(file); // Llamar a la función onchange con el archivo seleccionado
      }
    }
  });

  // Evento click para abrir el selector de archivos al hacer clic en el contenedor dropabble
  dropabbleContainer.querySelector(".accessibility-dropabble-container-text")?.addEventListener("click", () => {
    input.click(); // Simular clic en el input file
  });

  // Evento dragover para permitir el arrastre de archivos al contenedor dropabble
  dropabbleContainer.addEventListener("dragover", (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto al arrastrar
  });

  // Evento dragleave para manejar el evento de salir del contenedor dropabble
  dropabbleContainer.addEventListener("dragleave", (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto al salir
  });

  // Evento drop para manejar el archivo soltado en el contenedor dropabble
  dropabbleContainer.addEventListener("drop", (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto al soltar
    const file = event.dataTransfer.files[0]; // Obtener el primer archivo soltado
    if (file) {
      dropabbleContainer.querySelector(".accessibility-dropabble-container-text")?.classList.add("hidden");
      dropabbleContainer.querySelector(".accessibility-dropabble-container-img")?.classList.remove("hidden");

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = dropabbleContainer.querySelector(".accessibility-dropabble-container-img img");
        img.src = e.target.result; // Asignar la URL de previsualización al src de la imagen
      };
      reader.readAsDataURL(file);

      if (props.onchange) {
        props.onchange(file); // Llamar a la función onchange con el archivo seleccionado
      }
    }
  });

  // Evento click para eliminar el archivo
  dropabbleContainer
    .querySelector(".accessibility-dropabble-container-img-delete")
    ?.addEventListener("click", (event) => {
      event.preventDefault();
      dropabbleContainer.querySelector(".accessibility-dropabble-container-text")?.classList.remove("hidden");
      dropabbleContainer.querySelector(".accessibility-dropabble-container-img")?.classList.add("hidden");
      props.onchange(null);
      input.value = null;
    });

  dropabbleContainer.appendChild(input); // Agregar el input al contenedor dropabble
  container.appendChild(dropabbleContainer);

  return container; // Devolver el contenedor con el label y el input file
}

// Creacion de inputs code
export function createInputsCode(cantidad = 4) {
  const container = document.createElement("div");
  container.classList.add("accessibility-input-code-form-container");

  for (let i = 0; i < cantidad; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    container.appendChild(input);
  }

  const inputs = container.querySelectorAll("input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      if (value.match(/[0-9]/)) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
        inputs[index].classList.add("correct");
      } else {
        inputs[index].classList.remove("correct");
        e.target.value = "";
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
        inputs[index].classList.remove("correct");
      }
    });

    input.addEventListener("paste", (e) => {
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, inputs.length);
      for (let i = 0; i < pasted.length; i++) {
        inputs[i].value = pasted[i];
        inputs[i].classList.add("correct");
      }
      if (pasted.length === inputs.length) {
        inputs[inputs.length - 1].focus();
      }
      e.preventDefault();
    });
  });

  return container;
}
