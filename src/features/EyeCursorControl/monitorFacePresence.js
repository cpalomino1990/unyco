let faceDetected = true;
let lostFaceTimeout = null;
let hasLookedAway = false;

export function monitorFacePresence() {
  // Este evento se engancha al procesamiento de FaceMesh
  faceMesh.onResults(results => {
    const facePresent = !!results.multiFaceLandmarks?.[0];

    if (!facePresent && faceDetected) {
      faceDetected = false;
      lostFaceTimeout = setTimeout(() => {
        hasLookedAway = true;
        console.log("👁️ Usuario dejó de mirar la pantalla");
      }, 2000); // espera 2 segundos antes de marcar como "mirada fuera"
    }

    if (facePresent && !faceDetected) {
      faceDetected = true;
      clearTimeout(lostFaceTimeout);

      if (hasLookedAway) {
        hasLookedAway = false;
        console.log("👁️ Usuario volvió a mirar — recalibrando...");
        startCalibration(); // <=== Aquí inicia automáticamente
      }
    }
  });
}
