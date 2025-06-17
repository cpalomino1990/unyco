import { createButton, getDynamicTranslation, switchView } from "../../widget";
import { DynamicIcon } from "/public/icons/generals/dinamicIcons";
import { host, isMobile } from "../constants/enviroments";
import * as PIXI from "pixi.js";

// Función para crear un botón tipo tarjeta (card) para categorías
export function createButtonCard(props = { id, text, text_i18n, view, icon, description, description_i18n }) {
  // Creamos el botón de tipo card
  const card = createButton(props.id, "", () => {
    // Cambiar la vista cuando se haga clic en el botón
    switchView(props.view);
  });

  // Añadimos clases para el estilo del botón
  card.classList.add("accessibility-card-button");
  // card.classList.add("out-right");

  // HTML del contenido del card (incluye icono, texto, y una descripción adicional)
  card.innerHTML = `
    <div class="accessibility-card-button-info blue" style="display: ${isMobile ? "block" : "none"};">
      ${DynamicIcon({ icon: "info" })} <!-- Icono dinámico para información -->
    </div>
    <div class="accessibility-card-button-content">
      <div class="accessibility-card-button-icon">
        <!-- <img src="${props.icon}" alt="icono" hidden></img -->
        <div data-icon="${props.icon}" id="${props.id}-canvas" class="accessibility-card-button-canvas"></div>
      </div>
      <div class="accessibility-card-button-text" >
        <p data-u-i18n="${props.text_i18n}">${props.text}</p> <!-- Texto de la tarjeta -->
      </div>
    </div>
    <div class="accessibility-card-button-info-content">
      <p data-u-i18n="${props.description_i18n}" >${props.description}</p> <!-- Descripción adicional de la tarjeta -->
    </div>
  `;

  // Ajuste de estilo para móviles (mostrar/ocultar contenido adicional)
  if (isMobile) {
    const contentInfo = card.querySelector(".accessibility-card-button-info-content");
    contentInfo.style.paddingRight = "30px";
  }
  card.classList.add("out-initial");

  // Event listener para el botón de información (muestra/oculta la información adicional)
  card.querySelector(".accessibility-card-button-info")?.addEventListener("click", (event) => {
    event.stopPropagation(); // Evitar propagación del evento
    const buttonInfo = card.querySelector(".accessibility-card-button-info");

    // Toggle de la animación (muestra/oculta contenido adicional)
    if ([...card.classList].some((cls) => cls.startsWith("in-"))) {
      card.classList.remove("in-right");
      card.classList.add("out-right");
      card.classList.add("out-initial");
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
    const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left", 4: "initial" };
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
        this.element.addEventListener("animationend", (e) => {
          // Solo quitar clases si es animación de salida (out)
          if (this.element.className.includes("out-")) {
            // Remover todas las clases excepto "out-initial"
            this.element.classList.remove(...classNames.filter((cls) => cls !== "out-initial"));
          }
        });
        this.element.addEventListener("transitionend", (e) => {
          // Solo quitar clases si es transición de salida (out)
          if (this.element.className.includes("out-")) {
            // Remover todas las clases excepto "out-initial"
            this.element.classList.remove(...classNames.filter((cls) => cls !== "out-initial"));
          }
        });
      }

      update(ev, prefix) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
        if (prefix === "out") {
          this.element.classList.add(`${prefix}-initial`);
        }
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

  // Recuperar la imagen del usuario desde localStorage (si existe)
  const userImageBase64 = localStorage.getItem("inputFileFormImage_user-image");

  // Imagen por defecto si no hay imagen personalizada
  const defaultImage = `${host}/public/images/perfil.svg`;

  card.innerHTML = `
    <div class="accessibility-banner-user-top">
      <div class="accessibility-banner-user-top-image">
        <div class="accessibility-banner-user-top-image-internal">
        <img class="u-accessibility-profile-img" src="${
          userImageBase64 || defaultImage
        }" alt="Imagen de perfil del usuario">

        </div>
      </div>
    </div>
    <p class="accessibility-banner-user-title" data-u-i18n="bannerUser.welcome">
      Bienvenid@
    </p>
    <p class="accessibility-banner-user-subtitle" data-u-i18n="bannerUser.subwelcome">
      Te invitamos a registrarte para tener una experiencia personalizada
    </p>
  `;

  const image = card.querySelector(".accessibility-banner-user-top-image");
  image.addEventListener("click", () => {
    switchView("accessibility-user-profile-view");
  });

  // Devolvemos el banner creado
  return card;
}

// Función para crear tarjetas de perfil
export function createCardProfile(props = { id, title, title_i18n, description, description_i18n, onclick }) {
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
          ${DynamicIcon({ icon: "user" })}
        </div>
        <p data-u-i18n="${props.title_i18n}">${props.title}</p>
      </div>
      <p class="description" data-u-i18n="${props.description_i18n}">
        ${props.description}
      </p>
    </div>
  `;

  // Event listener para manejar clics en la tarjeta de perfil
  card.addEventListener("click", props.onclick);

  // Devolvemos el card creado
  return card;
}

// Función para crear tarjetas de título con botón de retroceso y/o colapsables
export function createCardTitle(props = { id, text, text_i18n, btnBack, collapse, onclick }) {
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
  title.setAttribute("data-u-i18n", props.text_i18n);

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
export function createFuncionalityButton(
  props = { id, title, title_i18n, icon, description, description_i18n, onclick, countOptions, type }
) {
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
      <p data-u-i18n="${props.title_i18n}">${getDynamicTranslation(props.title)}</p> <!-- Título del botón -->
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
                  <input type="range" min="0" max="100" value="0" class="slider" id="colorSlider" />
                  
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
      <p data-u-i18n="${props.description_i18n}">${props.description}</p> <!-- Descripción del botón -->
    </div>
  `;

  const slider = card.querySelector("#colorSlider");

  if (slider) {
    // Evitar que los clics en el slider se propaguen al botón padre
    slider.addEventListener("click", (e) => e.stopPropagation());
    slider.addEventListener("mousedown", (e) => e.stopPropagation());
    slider.addEventListener("mouseup", (e) => e.stopPropagation());

    slider.addEventListener("input", () => {
      const value = slider.value;
      const percentage = value / 100;
      const color = getColorFromPercentage(percentage);

      document.querySelectorAll("p, span, a, h1, h2, h3, h4, h5, h6, li, td, th").forEach((el) => {
        el.style.color = color;
      });

      localStorage.setItem("textColorValue", value);
    });
  }

  function getColorFromPercentage(pct) {
    const percent = Math.max(0, Math.min(1, pct));
    const hue = (1 - percent) * 270; // de púrpura a rojo
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

export function createCollapse(props = { id, title, i18n_title, content, visible }) {
  const hiddenClass = props.visible ? null : "hidden"; // Determina si el contenido está oculto o visible
  // Creación del elemento collapse
  const collapseContainer = document.createElement("div");
  collapseContainer.id = props.id;
  collapseContainer.classList.add("accessibility-collapse-container");

  const collapseHeader = document.createElement("div");
  collapseHeader.classList.add("accessibility-collapse-header");
  collapseHeader.innerHTML = `
    <p class="accessibility-collapse-title" data-u-i18n="${props.i18n_title}">${props.title || "Titulo"}</p>
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
export function createInputForm(
  props = { id, type, placeholder, i18n_placeholder, value, label, i18n_label, disabled, onchange }
) {
  const container = document.createElement("div");
  container.id = `${props.id}-container`;
  container.classList.add("accessibility-input-form-container");

  if (props.label) {
    const label = document.createElement("label");
    label.htmlFor = props.id;
    label.textContent = props.label;
    label.setAttribute("data-u-i18n", props.i18n_label);
    container.appendChild(label);
  }

  const input = document.createElement("input");
  input.id = props.id;
  input.type = props.type || "text";
  input.placeholder = props.placeholder || "";
  input.value = props.value || "";
  input.disabled = props.disabled || false;
  input.setAttribute("data-u-i18n-placeholder", props.i18n_placeholder);

  container.appendChild(input);

  // Si el tipo es password, agregar el botón de mostrar/ocultar
  if (props.type === "password") {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.classList.add("accessibility-input-password-toggle");
    toggleBtn.innerHTML = DynamicIcon({ icon: "eye" });
    toggleBtn.style.position = "absolute";
    toggleBtn.style.right = "10px";
    toggleBtn.style.top = "33px";
    toggleBtn.style.transform = "translateY(-50%)";
    toggleBtn.style.background = "none";
    toggleBtn.style.border = "none";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.color = "var(--primaryColor)";
    toggleBtn.setAttribute("tabindex", "-1");

    let visible = false;
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      visible = !visible;
      input.type = visible ? "text" : "password";
      toggleBtn.innerHTML = DynamicIcon({ icon: visible ? "eye-off" : "eye" });
    });

    container.style.position = "relative";
    container.appendChild(toggleBtn);
  }

  // Event listener para manejar cambios en el input
  if (props.onchange) {
    input.addEventListener("change", props.onchange);
  }

  return container;
}

// Creacion de check para aceptar terminos y condiciones
export function createCheckTermsForm(props = { id, label, i18n_label, onchange, disabled }) {
  const container = document.createElement("div");
  container.classList.add("accessibility-check-terms-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = props.id;
  checkbox.disabled = props.disabled ?? false;
  checkbox.addEventListener("change", props.onchange);

  const label = document.createElement("label");
  label.htmlFor = props.id;
  label.setAttribute("data-u-i18n", props.i18n_label);
  label.innerHTML = props.label || "Acepto los términos y condiciones";

  container.appendChild(checkbox);
  container.appendChild(label);

  return container;
}

// Creacion de selects forms
export function createSelectForm(props = { id, options, label, i18n_label, onchange }) {
  const container = document.createElement("div");
  container.id = `${props.id}-container`;
  container.classList.add("accessibility-select-form-container");

  if (props.label) {
    const label = document.createElement("label");
    label.htmlFor = props.id;
    label.textContent = props.label;
    label.setAttribute("data-u-i18n", props.i18n_label);
    container.appendChild(label);
  }

  const select = document.createElement("select");
  select.id = props.id;

  // Agregar las opciones
  props.options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value ?? option;
    opt.setAttribute("data-u-i18n", option.i18n);
    opt.textContent = option.text ?? option;
    select.appendChild(opt);
  });

  // Event listener para manejar cambios en el select
  if (props.onchange) {
    select.addEventListener("change", props.onchange);
  }

  container.appendChild(select);
  return container;
}

// Creacion de input file forms
export function createInputFileForm(props = { id, accept, onchange, targetWidth: 500, targetHeight: 500 }) {
  const container = document.createElement("div");
  container.id = `inputFileForm_${props.id}`;
  container.classList.add("accessibility-input-file-form-container");

  const dropabbleContainer = document.createElement("div");
  dropabbleContainer.classList.add("accessibility-dropabble-container");
  dropabbleContainer.innerHTML = `
    <button id="u-uploadBtn" class="accessibility-button-theme" >Cargar nueva imagen</button>
    <input type="file" id="u-imageLoader" accept="image/*" style="display:none;" />
    <div id="u-accessibility-editor"></div>
  `;

  const button = dropabbleContainer.querySelector("#u-uploadBtn");
  const input = dropabbleContainer.querySelector("#u-imageLoader");
  const canvasContainer = dropabbleContainer.querySelector("#u-accessibility-editor");
  button.addEventListener("click", () => {
    input.click();
  });

  let imageSprite = null;
  let dragging = false;
  let lastPosition = null;
  let mask = null;
  let app = null;

  // Inicializar color con el valor actual del atributo
  let color = document.documentElement.getAttribute("data-theme-hex");
  // Observar cambios en el atributo data-theme-hex y actualizar la variable color
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "data-theme-hex") {
        color = document.documentElement.getAttribute("data-theme-hex");
        // Si necesitas actualizar el fondo del renderer en caliente:
        if (app && app.renderer) {
          app.renderer.background.color = color;
          app.renderer.background.alpha = 0.7;
        }
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  async function init() {
    // Crear la aplicación PIXI
    app = new PIXI.Application();

    await app.init({
      width: 300,
      height: 300,
      backgroundAlpha: 0,
    });

    // Agregar el canvas al DOM
    canvasContainer.appendChild(app.canvas);

    // Crear una máscara circular
    mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawCircle(150, 150, 140); // centro (150,150) radio 140
    mask.endFill();
    app.renderer.background.color = color;
    app.renderer.background.alpha = 0.7;
    app.stage.addChild(mask);
  }

  // Cargar y mostrar imagen
  // Agregar slider de zoom
  let zoomSlider = dropabbleContainer.querySelector("#u-zoomSlider");
  if (!zoomSlider) {
    zoomSlider = document.createElement("input");
    zoomSlider.type = "range";
    zoomSlider.id = "u-zoomSlider";
    zoomSlider.min = 1;
    zoomSlider.max = 3;
    zoomSlider.step = 0.01;
    zoomSlider.value = 1;
    zoomSlider.style.width = "300px";
    zoomSlider.style.margin = "1rem auto";
    canvasContainer.appendChild(zoomSlider);
  }

  async function loadImage(url) {
    if (imageSprite) app.stage.removeChild(imageSprite);

    const texture = await PIXI.Assets.load(url);
    imageSprite = new PIXI.Sprite(texture);
    imageSprite.anchor.set(0.5);
    imageSprite.x = 150;
    imageSprite.y = 150;
    imageSprite.interactive = true;
    imageSprite.cursor = "grab";
    imageSprite.mask = mask;

    // COVER: Escalar para cubrir el círculo (300x300)
    const tw = texture.width;
    const th = texture.height;
    const baseScale = Math.max(300 / tw, 300 / th);
    let currentScale = baseScale;
    imageSprite.width = tw * currentScale;
    imageSprite.height = th * currentScale;

    // Configurar slider de zoom
    zoomSlider.min = baseScale;
    zoomSlider.max = baseScale * 3;
    zoomSlider.step = 0.01;
    zoomSlider.value = baseScale;

    zoomSlider.oninput = function () {
      currentScale = parseFloat(zoomSlider.value);
      imageSprite.width = tw * currentScale;
      imageSprite.height = th * currentScale;
      clampPosition();
    };

    // Limitar el arrastre para que los bordes no sean menores al borde del círculo
    function clampPosition() {
      const radius = 140;
      const left = imageSprite.x - imageSprite.width / 2;
      const right = imageSprite.x + imageSprite.width / 2;
      const top = imageSprite.y - imageSprite.height / 2;
      const bottom = imageSprite.y + imageSprite.height / 2;

      // Limitar horizontal
      if (left > 150 - radius) imageSprite.x = 150 - radius + imageSprite.width / 2;
      if (right < 150 + radius) imageSprite.x = 150 + radius - imageSprite.width / 2;
      // Limitar vertical
      if (top > 150 - radius) imageSprite.y = 150 - radius + imageSprite.height / 2;
      if (bottom < 150 + radius) imageSprite.y = 150 + radius - imageSprite.height / 2;
    }

    // Manejar eventos de arrastre
    imageSprite
      .on("pointerdown", (event) => {
        dragging = true;
        lastPosition = event.data.getLocalPosition(app.stage);
      })
      .on("pointerup", () => {
        dragging = false;
      })
      .on("pointerupoutside", () => {
        dragging = false;
      })
      .on("pointermove", (event) => {
        if (!dragging) return;
        const newPosition = event.data.getLocalPosition(app.stage);
        const dx = newPosition.x - lastPosition.x;
        const dy = newPosition.y - lastPosition.y;
        imageSprite.x += dx;
        imageSprite.y += dy;
        clampPosition();
        lastPosition = newPosition;
      });

    app.stage.addChild(imageSprite);
  }

  const getCroppedImage = () => {
    // Crear un canvas HTML
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = 300;
    outputCanvas.height = 300;
    const ctx = outputCanvas.getContext("2d");

    // Dibujar la máscara circular
    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 150, 140, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Dibujar la imagen con la posición y escala actual
    if (imageSprite && imageSprite.texture.baseTexture.resource.source) {
      // Obtener la imagen original
      const img = imageSprite.texture.baseTexture.resource.source;
      // Calcular escala y posición
      const scale = imageSprite.width / img.width;
      const dx = imageSprite.x - (img.width * scale) / 2;
      const dy = imageSprite.y - (img.height * scale) / 2;
      ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
    }

    ctx.restore();

    // Obtener el resultado como base64
    return outputCanvas.toDataURL("image/png");
  };

  // Leer archivo cargado
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      loadImage(event.target.result);
    };
    reader.readAsDataURL(file);
  });
  init();

  dropabbleContainer.appendChild(input);
  container.appendChild(dropabbleContainer);

  return container;
}

export function createInputsCode(cantidad = 6) {
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
