import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";
import { startCalibration } from "./startCalibration";
import "../../shared/styles/loading.css";

export function showCalibrationInstructions(callback) {
    const isActive = document.body.classList.toggle("calibration-instructions-modal");
    localStorage.setItem("calibration-instructions-modal", isActive ? "true":"false")
    


  
  if (document.getElementById("calibration-instructions-modal")) return;

  const modal = document.createElement("div");
  modal.id = "calibration-instructions-modal";
  Object.assign(modal.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(165, 159, 159, 0.86)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100001,
    padding: "20px",
    fontFamily: "sans-serif",
    overflowY: "auto"
  });

  

 const content = document.createElement("div");
content.className = "calibration-instructions";

content.innerHTML = `
  <h2 class="calibration-title">Instrucciones para Calibración</h2>
  <ul class="calibration-list">
    <ul><strong>Siéntate</strong> frente a la pantalla con buena postura y sin moverte.</ul>
    <ul><strong>Evita mover la cabeza</strong> durante la calibración.</ul>
    <ul><strong>Mira fijamente</strong> el punto brillante cuando aparezca.</ul>
    <ul><strong>No parpadees</strong> mucho o desvíes la mirada.</ul>
    <ul><strong>Ilumina bien tu rostro</strong> (sin luz directa en la cámara).</ul>
    <ul><strong>Permite el acceso a la cámara</strong> si el navegador lo solicita.</ul>
    <ul><strong>Evita distracciones</strong> o movimientos a tu alrededor.</ul>
    <ul>La <strong>calibración</strong> puede durar aproximadamente 15 segundos.</ul>
    <ul>Puedes <strong>repetir la calibración</strong> si el cursor no sigue bien tus ojos.</ul>
  </ul>
  <button id="startCalibrationNow" class="calibration-button">Iniciar Calibración
  
   </button> 
`;



  modal.appendChild(content);
  document.body.appendChild(modal);

  // Botón para continuar
  document.getElementById("startCalibrationNow").addEventListener("click", () => {
    modal.remove();
    callback?.(startCalibration()); // Ejecuta la calibración si se pasa como parámetro
  });
}

