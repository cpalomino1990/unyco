import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";
import { startCalibration } from "./startCalibration";
import "../../shared/styles/loading.css";
import { stopEyeCursorControl } from "./buttonEyeCursorControl";

export function showCalibrationInstructions(callback) {
  const isActive = localStorage.getItem("calibration-instructions-modal") === "true";

  if (isActive) {
    stopEyeCursorControl();
    localStorage.setItem("calibration-instructions-modal", "false");
    document.body.classList.remove("calibration-instructions-modal");
    toggleCheckButton({ id: "calibration-instructions-modal", checked: false, option: null });

    const existingModal = document.getElementById("calibration-instructions-modal");
    if (existingModal) existingModal.remove();
    return;
  }

  // Activar estado
  document.body.classList.add("calibration-instructions-modal");
  localStorage.setItem("calibration-instructions-modal", "true");
  console.log("entro no 1")
  toggleCheckButton({ id: "calibration-instructions-modal", checked: true, option: null });
  createCalibrationModal(callback);
}

function createCalibrationModal() {
  const modal = document.createElement("div");
  modal.id = "calibration-instructions-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "calibration-instructions-title");

  const content = document.createElement("div");
  content.className = "calibration-instructions";

  content.innerHTML = `
    <h2 id="calibration-instructions-title">Instrucciones para Calibración</h2>
    <p>Lea atentamente y siga las instrucciones para una mejor experiencia</p>
    <ul>
      <li><strong><span class="accessibility-emoji">✅</span> Siéntese</strong> con buena postura.</li>
      <li><strong><span class="accessibility-emoji">✅</span> Evite mover la cabeza</strong>.</li>
      <li><strong><span class="accessibility-emoji">✅</span> Mire</strong> el punto brillante.</li>
      <li><strong><span class="accessibility-emoji">✅</span> No parpadee</strong> o mire a otro lado.</li>
      <li><strong><span class="accessibility-emoji">✅</span> Buena iluminación</strong> sin reflejos.</li>
      <li><strong><span class="accessibility-emoji">✅</span> Permita</strong> acceso a la cámara.</li>
      <li><strong><span class="accessibility-emoji">✅</span> Evite distracciones</strong>.</li>
      <li><strong><span class="accessibility-emoji">✅</span> Dura</strong> unos 15 segundos.</li>
      <li><strong><span class="accessibility-emoji">✅</span> Repita</strong> si es necesario.</li>
    </ul>
    <div>
      <button class="calibration-button" id="startCalibrationNow">Iniciar Calibración</button>
      <button class="calibration-button" id="cancelCalibrationNow">Cancelar Calibración</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Eventos
  document.getElementById("cancelCalibrationNow").addEventListener("click", () => {
    console.log("entro yo 1")
    modal.remove();
    document.body.classList.remove("calibration-instructions-modal");
    localStorage.setItem("calibration-instructions-modal", "false");
    stopEyeCursorControl();
    toggleCheckButton({ id: "calibration-instructions-modal", checked: false, option: null });
  });

  document.getElementById("startCalibrationNow").addEventListener("click", () => {
    modal.remove();
    startCalibration();
  });
}
