import { initEyeCursorControl } from "./buttonEyeCursorControl.js";
import "../../shared/styles/loading.css";

let calibrationOffset = { x: 0, y: 0 };
let isCalibrated = false;
let calibrationInProgress = false;

let faceMesh = null;
let camera = null;
let videoElement = null;

let faceDetected = true;
let lostFaceTimeout = null;
let hasLookedAway = false;

export async function startCalibration() {
 await requestWakeLock();
  let wakeLock = null;

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log("🔒 Pantalla activa: Wake Lock activado");

      // Si se libera el wake lock por pérdida de visibilidad, vuelve a solicitarlo
      document.addEventListener("visibilitychange", async () => {
        if (wakeLock !== null && document.visibilityState === "visible") {
          wakeLock = await navigator.wakeLock.request('screen');
          console.log("🔄 Wake Lock restaurado");
        }
      });
    } else {
      console.warn("Wake Lock API no soportada en este navegador.");
    }
  } catch (err) {
    console.error("Error al activar Wake Lock:", err);
  }
  await requestWakeLock();
}

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
    flexDirection: "column-reverse"
  });

  const message = document.createElement("div");
  message.textContent = "Mira el punto en la pantalla para calibrar el cursor ocular";
  overlay.appendChild(message);

  const dot = document.createElement("div");
  dot.id = "calibration-dot";
  Object.assign(dot.style, {
    position: "absolute",
    margin: "-87px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginTop: "20px",
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

  const loaderContainer = document.createElement("div");
  loaderContainer.className = "loader-container";

  const loader = document.createElement("div");
  loader.className = "loader";

  const loader1 = document.createElement("div");
  loader1.className = "loader1";

  loader.appendChild(loader1);
  loaderContainer.appendChild(loader);
  loaderContainer.appendChild(dot);

  overlay.appendChild(loaderContainer);
  overlay.appendChild(message);
  document.body.appendChild(overlay);

  // Crear video oculto
  videoElement = document.createElement("video");
  videoElement.style.display = "none";
  document.body.appendChild(videoElement);

  const samples = [];

  await Promise.all([
    loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.min.js"),
    loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js")
  ]);

  faceMesh = new window.FaceMesh({
    locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  });

  await faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

 let gazeAwayStartTime = null;
let gazeAwayTimeout = isMobileDevice() ? 5000 : 3000; // ms
let recalibrationScheduled = false;

faceMesh.onResults(results => {
  if (results.multiFaceLandmarks?.[0]) {
    const landmarks = results.multiFaceLandmarks[0];

    const iris = landmarks[468];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const nose = landmarks[1];

    const eyeCenterX = (leftEye.x + rightEye.x) / 2;
    const deltaX = iris.x - eyeCenterX;
    const deltaY = iris.y - nose.y;

    const horizontalThreshold = 0.05;
    const verticalThreshold = 0.06;

    const isLookingAway =
      Math.abs(deltaX) > horizontalThreshold || Math.abs(deltaY) > verticalThreshold;

    if (isLookingAway) {
      if (!gazeAwayStartTime) {
        gazeAwayStartTime = Date.now();
      } else if (
        !recalibrationScheduled &&
        Date.now() - gazeAwayStartTime > gazeAwayTimeout
      ) {
        recalibrationScheduled = true;
        startAutoRecalibration();
      }
    } else {
      // Si estaba fuera y volvió antes de recalibrar
      if (gazeAwayStartTime && !recalibrationScheduled) {
        showReturnedMessage(); // Mostrar aviso
      }
      gazeAwayStartTime = null;
    }

    // Guardar muestras si estamos calibrando
    if (calibrationInProgress && iris) {
      samples.push({ x: iris.x, y: iris.y });
    }
  }
});

  camera = new window.Camera(videoElement, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement });
    },
    width: 640,
    height: 480
  });

  camera.start();

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
      padding: "20px"
    });

    const loadin2 = document.createElement("div");
    loadin2.className = "loader2";

    fakeCalibrating.appendChild(dot);
    fakeCalibrating.appendChild(loadin2);

    document.body.appendChild(fakeCalibrating);

    setTimeout(() => {
      fakeCalibrating.remove();
    }, 4000);

  }, 10000);
}

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

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent);
}

function startAutoRecalibration() {
  const warning = document.createElement("div");
  warning.id = "recalibration-warning";
  warning.textContent = "Has dejado de mirar la pantalla. Recalibrando el cursor ocular...";
  Object.assign(warning.style, {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#c62828",
    color: "#fff",
    padding: "20px 30px",
    borderRadius: "12px",
    zIndex: 100001,
    fontSize: "1.2rem",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
  });
  document.body.appendChild(warning);

  setTimeout(() => {
    warning.remove();
    resetCalibration();
    startCalibration();
  }, 3000);
}

function showReturnedMessage() {
  const returnedMessage = document.createElement("div");
  returnedMessage.textContent = "Has vuelto a mirar la pantalla. Continuamos.";
  Object.assign(returnedMessage.style, {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    zIndex: 100001,
    fontSize: "1rem",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)"
  });
  document.body.appendChild(returnedMessage);
  setTimeout(() => returnedMessage.remove(), 2500);
}

//funcion para matener la pantalla activa
let iosVideo = null;

function startIOSKeepAwake() {
  iosVideo = document.createElement("video");
  iosVideo.src = "data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDFtcDQxaXNvbWF2YzEAAAAMbXNnAAAAAA==";
  iosVideo.loop = true;
  iosVideo.muted = true;
  iosVideo.playsInline = true;
  iosVideo.style.position = "fixed";
  iosVideo.style.width = "1px";
  iosVideo.style.height = "1px";
  iosVideo.style.opacity = "0";
  iosVideo.style.pointerEvents = "none";
  document.body.appendChild(iosVideo);

  iosVideo.play().then(() => {
    console.log("▶️ Video iOS oculto en reproducción para evitar suspensión");
  }).catch(err => {
    console.warn("⚠️ No se pudo iniciar el video oculto:", err);
  });
}

function stopIOSKeepAwake() {
  if (iosVideo) {
    iosVideo.pause();
    iosVideo.remove();
    iosVideo = null;
    console.log("⏹️ Video iOS oculto detenido");
  }
}
export function releaseWakeLock() {
  if (wakeLock !== null) {
    wakeLock.release().then(() => {
      wakeLock = null;
      console.log("🔓 Wake Lock liberado");
    });
  }
  stopIOSKeepAwake();
}