import * as PIXI from "pixi.js";
import icon1 from "../../../public/icons/iconsInitbutton/4-glasses.svg";
import icon2 from "../../../public/icons/iconsInitbutton/5-peoples.svg";
import icon3 from "../../../public/icons/iconsInitbutton/6-hands.svg";
import icon4 from "../../../public/icons/iconsInitbutton/3-arm.svg";
import icon5 from "../../../public/icons/iconsInitbutton/2-brain.svg";
import icon6 from "../../../public/icons/iconsInitbutton/1-people.svg";

function rgb2hex(rgbArray) {
  return ((rgbArray[0] * 255) << 16) + ((rgbArray[1] * 255) << 8) + rgbArray[2] * 255;
}

function hexToRgbArray(hex) {
  const cleanHex = hex.replace(/^#/, "");
  const bigint = parseInt(cleanHex, 16);
  return [((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255];
}

async function createPixiCanvasWithColorTint(containerId, imageUrl, hexColor) {
  const container = document.getElementById(containerId);
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";

  // Destruir el canvas Pixi anterior si existe y está en el DOM
  if (container._pixiApp) {
    if (container._pixiApp._lastImageUrl) {
      await PIXI.Assets.unload(container._pixiApp._lastImageUrl);
      container._pixiApp._lastImageUrl = null;
    }

    // Destruir sprites manualmente
    container._pixiApp.stage.removeChildren().forEach((child) => {
      if (child instanceof PIXI.Sprite) {
        child.destroy({ children: true, texture: true, baseTexture: true });
      }
    });

    if (container._pixiApp.canvas && container.contains(container._pixiApp.canvas)) {
      container.removeChild(container._pixiApp.canvas);
    }

    container._pixiApp.destroy(true, {
      children: true,
      texture: false,
      baseTexture: false,
    });

    container._pixiApp = null;
  }

  const app = new PIXI.Application();
  await app.init({
    width: 90,
    height: 90,
    backgroundAlpha: 0,
  });

  container.appendChild(app.canvas);
  container._pixiApp = app; // Guardar referencia para destruir luego

  const texture = await PIXI.Assets.load(imageUrl);
  const sprite = new PIXI.Sprite(texture);
  container._pixiApp._lastImageUrl = imageUrl; // Guardar la url para liberar la textura después

  // Ajusta el tamaño del sprite al 100% del canvas
  sprite.width = app.renderer.width;
  sprite.height = app.renderer.height;

  const [r, g, b] = hexToRgbArray(hexColor);
  sprite.tint = rgb2hex([r, g, b]);
  sprite.anchor.set(0.5);
  sprite.x = app.renderer.width / 2;
  sprite.y = app.renderer.height / 2;

  app.stage.addChild(sprite);
}

export function filterForInitIcons() {
  const listCanvas = document.querySelectorAll(".accessibility-card-button-canvas");
  const color = document.documentElement.getAttribute("data-theme-hex");
  listCanvas.forEach((canvasElem) => {
    canvasElem.innerHTML = "";
    const iconUrl = canvasElem.getAttribute("data-icon");
    const icons = {
      1: icon1,
      2: icon2,
      3: icon3,
      4: icon4,
      5: icon5,
      6: icon6,
    };
    if (icons[iconUrl]) {
      createPixiCanvasWithColorTint(canvasElem.id, icons[iconUrl], color ?? "#1e67e7");
    }
  });
}
