

import { initEyeCursorControl } from "./buttonEyeCursorControl.js";
import "../../shared/styles/loading.css";

let calibrationOffset = { x: 0, y: 0 };
let isCalibrated = false;
let calibrationInProgress = false;

let faceMesh = null;
let camera = null;
let videoElement = null;

export async function startCalibration() {

  const isActive = document.body.classList.toggle("calibrationInProgress");
  
  console.log(isActive)
  localStorage.setItem("calibrationInProgress",isActive ? "true" : "false"
  
  )
  if (calibrationInProgress) return;

  calibrationInProgress = true;
  isCalibrated = false;

  // Crear overlay
  const overlay = document.createElement("div");
  overlay.id = "calibration-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(10, 3, 3, 0.83)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100000,
    color: "#fff",
    fontSize: "1.5rem",
    flexDirection: "column",
    flexDirection: "column-reverse"
  });

  const message = document.createElement("div");
  message.textContent = "Mira el punto en la pantalla para calibrar el cursor ocular";
  overlay.appendChild(message);
  
  // Crear el punto de calibración
  const dot = document.createElement("div");
  dot.id = "calibration-dot";
  Object.assign(dot.style, {
    position: "absolute",
    margin: "-87px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    
    marginTop: "20px",
    bborderRadius: "50%",
    background: "linear-gradient(135deg, #00f0ff, #8a2be2)",
    boxShadow: "0 0 15px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5)",
    animation: "pulseCursor 1.5s ease-in-out infinite",
    zIndex: 999999, 
    pointerEvents: "none", 
    opacity: 0, 
    transform: "scale(0)",
    transition: "opacity 0.5s ease, transform 0.5s ease"
  });
  document.body.appendChild(dot);
  requestAnimationFrame(() => {
    dot.style.opacity = 1;
    dot.style.transform = "scale(1.5)";
    setTimeout(() => dot.style.transform = "scale(1)", 300);
    
  });
  
  const loaderContainer = document.createElement("div")
  loaderContainer.className = "loader-container"

  const loader = document.createElement("div");
  loader.className = "loader"; 

  const loader1 = document.createElement("div");
  loader1.className = "loader1";
     
  loader.appendChild(loader1);
  loaderContainer.appendChild(loader)
  loaderContainer.appendChild(dot)
    
  // Añadir al overlay
  overlay.appendChild(loaderContainer)
  overlay.appendChild(message);
  
  // Añadir al body
  document.body.appendChild(overlay);
  

  // Crear video oculto
  videoElement = document.createElement("video");
  videoElement.style.display = "none";
  document.body.appendChild(videoElement);

  const samples = [];

  // Cargar FaceMesh y CameraUtils
  await Promise.all([
    loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.min.js"),
    loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js")
  ]);

  // Inicializar FaceMesh
  faceMesh = new window.FaceMesh({
    locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  });

  await faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  faceMesh.onResults(results => {
    if (results.multiFaceLandmarks?.[0]?.[468]) {
      const iris = results.multiFaceLandmarks[0][468];
      samples.push({ x: iris.x, y: iris.y });
    }
  });

  // Iniciar cámara
  camera = new window.Camera(videoElement, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement });
    },
    width: 640,
    height: 480
  });

  camera.start();

  // Esperar 6 segundos para recolectar muestras
  setTimeout(() => {
    camera.stop();
    overlay.remove();
    videoElement.remove();

    if (samples.length > 0) {
      const avgX = samples.reduce((sum, p) => sum + p.x, 0) / samples.length;
      const avgY = samples.reduce((sum, p) => sum + p.y, 0) / samples.length;
      calibrationOffset = { x: avgX - 0.5, y: avgY - 0.5 };
      isCalibrated = true;
    }
    initEyeCursorControl();
    calibrationInProgress = false;

    // Mostrar pantalla de calibración falsa
    const fakeCalibrating = document.createElement("div");
    fakeCalibrating.id = "fake-calibration";
    fakeCalibrating.textContent = "Finalizando calibración...";
    Object.assign(fakeCalibrating.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100000,
      color: "#fff",
      fontSize: "1.5rem",
      flexDirection: "column",
      pading: "20px",
    
  }); 
    
    const loadin2 = document.createElement("div");
    loadin2.className = "loader2";

    fakeCalibrating.appendChild(dot)
    fakeCalibrating.appendChild(loadin2);

    document.body.appendChild(fakeCalibrating);

  
    setTimeout(() => {
      fakeCalibrating.remove();
      
    }, 3000);

  }, 9000);
}

export function localstartCalibration(){
  if(localStorage.getItem("calibrationInProgress")=== true);
  document.body.classLinst.add("calibrationInProgress")

}

// Cargar scripts dinámicamente
function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

export function applyCalibration(iris) {
  if (!isCalibrated || !iris) return iris;
  return {
    x: iris.x - calibrationOffset.x,
    y: iris.y - calibrationOffset.y
  };
}

export function resetCalibration() {
  isCalibrated = false;
  calibrationOffset = { x: 0, y: 0 };
}
