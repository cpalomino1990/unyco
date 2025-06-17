import { host } from "../constants/enviroments";
import "../styles/AccesibilityButton.css";

export const animationInitButton = () => {
  
  const images = [
    `${host}/public/icons/iconsInitbutton/1-people.svg`,
    `${host}/public/icons/iconsInitbutton/2-brain.svg`,
    `${host}/public/icons/iconsInitbutton/3-arm.svg`,
    `${host}/public/icons/iconsInitbutton/4-glasses.svg`,
    `${host}/public/icons/iconsInitbutton/5-peoples.svg`,
    `${host}/public/icons/iconsInitbutton/6-hands.svg`,
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const initButton = document.querySelector("#accessibility-button");
    if (initButton) {
      initButton.innerHTML = `
        <div class="line">
          <div class="internal">
            <div class="flip-container">
              <div class="flip-card">
                <div class="flip-card-front">
                  <img id="imagefront" src="${images[1]}" alt="Imagen 1">
                </div>
                <div class="flip-card-back">
                  <img id="imageback" src="${images[0]}" alt="Imagen 2">
                </div>
              </div>
            </div>
            <div class="circle"></div>
            <div class="circle2"></div>
          </div>
        </div>
      `;

      let currentIndex = 1;
      let side = "back"; // Intervalo en milisegundos

      // Actualizar ambas imágenes al mismo tiempo para sincronizar el flip
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;

        if (side === "back") {
          const imgBack = initButton.querySelector("#imageback");
          imgBack.src = images[currentIndex];
          imgBack.alt = `Icon-${currentIndex + 1}`;
          side = "front";
        } else {
          const imgFront = initButton.querySelector("#imagefront");
          imgFront.src = images[currentIndex];
          imgFront.alt = `Icon-${currentIndex + 1}`;
          side = "back";
        }
      }, 5000);
    }
  });
};
