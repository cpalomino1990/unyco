import {initVirtualKeyboard} from './buttonActivateKeyBoard.js';
import {applyCalibration} from './startCalibration.js';

let eyeClosedStartTime = null;
let clickTriggered = false;
const EYE_CLOSED_THRESHOLD = 0.21;
const EYE_CLOSED_DURATION = 30;



export function initEyeCursorControl() {


  if (window.eyeCursorActive) return;
  // if (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)) {
  //   console.warn("Control ocular deshabilitado en móviles/tablets");
  //   return;
  // }
  window.eyeCursorActive = true;

  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "eye-loading-overlay";
  Object.assign(loadingOverlay.style, {
    position: "fixed", 
    top: 0, 
    left: 0, 
    width: "100vw", 
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)", 
    display: "flex", 
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: "center", 
    zIndex: 100000
  });
  loadingOverlay.innerHTML = `
    <div 
    style="color: white; 
    font-size: 1.5rem; 
    margin-bottom: 20px;"
    >Cargando control ocular...
    </div>
    <div 
    style="width: 40px; 
    height: 40px; 
    border: 5px solid #fff; 
    border-top: 5px solid transparent; 
    border-radius: 50%; 
    animation: spin 1s linear infinite;">
    </div>
  `;
  document.body.appendChild(loadingOverlay);

  if (!document.getElementById("eye-loading-style")) {
    const styleTag = document.createElement("style");
    styleTag.id = "eye-loading-style";
    styleTag.textContent = `
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes pulseCursor {
        0% { transform: scale(1); box-shadow: 0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5); }
        50% { transform: scale(1.2); box-shadow: 0 0 20px rgba(138,43,226,0.8), 0 0 30px rgba(0,240,255,0.7); }
        100% { transform: scale(1); box-shadow: 0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5); }
      }
      @keyframes pulseInteractive {
        0% { transform: scale(1.1); box-shadow: 0 0 15px rgba(0,255,136,0.7), 0 0 30px rgba(0,212,255,0.6); }
        50% { transform: scale(1.2); box-shadow: 0 0 25px rgba(0,255,136,0.8), 0 0 40px rgba(0,212,255,0.8); }
        100% { transform: scale(1.1); box-shadow: 0 0 15px rgba(0,255,136,0.7), 0 0 30px rgba(0,212,255,0.6); }
      }
    `;
    document.head.appendChild(styleTag);
  }

  const scripts = [
    "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.min.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
  ];
  const loadScript = src => new Promise(resolve => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => console.error(`Error cargando: ${src}`);
    document.head.appendChild(s);
  });

  Promise.all(scripts.map(loadScript)).then(() => {
    const videoElement = document.createElement("video");
    videoElement.id = "eye-cursor-video";
    videoElement.style.display = "none";
    document.body.appendChild(videoElement);

    const CURSOR_SIZE = 10;
    const MARGIN = 5;
    const scrollMargin = 10;
    const scrollSpeed = 35;

    const cursor = document.createElement("div");
    cursor.id = "eye-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      width: `${CURSOR_SIZE}px`,
      height: `${CURSOR_SIZE}px`,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #00f0ff, #8a2be2)",
      boxShadow: "0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5)",
      animation: "pulseCursor 1.5s ease-in-out infinite",
      zIndex: 99999, 
      pointerEvents: "none", 
      opacity: 0, 
      transform: "scale(0)",
      transition: "opacity 0.5s ease, transform 0.5s ease"
    });
    document.body.appendChild(cursor);
    requestAnimationFrame(() => {
      cursor.style.opacity = 1;
      cursor.style.transform = "scale(1.5)";
      setTimeout(() => cursor.style.transform = "scale(1)", 500);
    });

    if (!document.getElementById("eye-hover-style")) {
      const hoverStyle = document.createElement("style");
      hoverStyle.id = "eye-hover-style";
      hoverStyle.textContent = `.eye-hovered { outline: 2px dashed #00ff00 !important; transition: outline 0.2s ease; }`;
      document.head.appendChild(hoverStyle);
    }

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastHovered = null;

    const faceMesh = new window.FaceMesh({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}` });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

    faceMesh.onResults(results => {
      if (!results.multiFaceLandmarks.length) return;
      const lm = results.multiFaceLandmarks[0];
      const iris = lm[468];
      const calibrated = applyCalibration(iris);
      const rawX = (1 - calibrated.x) * window.innerWidth;
      const rawY = calibrated.y * window.innerHeight;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const amp = 12;
      const dx = rawX - centerX;
      const dy = rawY - centerY;
      const thresh = 3;
      const targetX = Math.abs(dx) > thresh ? centerX + dx * amp : lastX;
      const targetY = Math.abs(dy) > thresh ? centerY + dy * amp : lastY;
      lastX += (targetX - lastX) * 0.1;
      lastY += (targetY - lastY) * 0.1;

      let clampedX = Math.max(MARGIN, Math.min(window.innerWidth - CURSOR_SIZE - MARGIN, lastX));
      let clampedY = Math.max(MARGIN, Math.min(window.innerHeight - CURSOR_SIZE - MARGIN, lastY));

      const elUnderCursor = document.elementFromPoint(clampedX, clampedY);
      if (elUnderCursor) {
        const moveEvt = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: clampedX,
          clientY: clampedY
        });
        elUnderCursor.dispatchEvent(moveEvt);
      }

      const closest = getClosestInteractiveElement(clampedX, clampedY);

      if (closest) {
        const moveThreshold = 25;
        const dx = clampedX - closest.cx;
        const dy = clampedY - closest.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < moveThreshold) {
          clampedX += (closest.cx - clampedX) * 0.5;
          clampedY += (closest.cy - clampedY) * 0.5;
          lastX = clampedX;
          lastY = clampedY;
        }
      }

      cursor.style.left = `${clampedX}px`;
      cursor.style.top = `${clampedY}px`;

      if (lastY < scrollMargin) window.scrollBy(0, -scrollSpeed);
      else if (lastY > window.innerHeight - scrollMargin) window.scrollBy(0, scrollSpeed);

      const hovered = document.elementFromPoint(clampedX, clampedY);
      document.querySelectorAll('.eye-hovered').forEach(el => el.classList.remove('eye-hovered'));
      const interactive = hovered && (
        hovered.tagName === 'BUTTON' || hovered.tagName === 'A' || hovered.tagName === 'INPUT' || 
        hovered.getAttribute('role') === 'button' || hovered.hasAttribute('tabindex')
      );
      if (interactive) {
        cursor.style.background = "linear-gradient(135deg, #00ff88, #00d4ff)";
        cursor.style.boxShadow = "0 0 15px rgba(0,255,136,0.7), 0 0 30px rgba(0,212,255,0.6)";
        cursor.style.animation = "pulseInteractive 1s ease-in-out infinite";
        cursor.style.transform = "scale(1.2)";
        hovered.classList.add('eye-hovered');
      } else {
        cursor.style.background = "linear-gradient(135deg, #00f0ff, #8a2be2)";
        cursor.style.boxShadow = "0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5)";
        cursor.style.animation = "pulseCursor 1.5s ease-in-out infinite";
        cursor.style.transform = "scale(1)";
      }

      const closed = isEyeClosed(lm);

      if (closed) {
        if (!eyeClosedStartTime) {
          eyeClosedStartTime = Date.now();
          lastHovered = hovered;
          clickTriggered = false;
        } else if (Date.now() - eyeClosedStartTime > EYE_CLOSED_DURATION && hovered === lastHovered && !clickTriggered) {
          simulateClickAtCursor(clampedX, clampedY);
          clickTriggered = true;
        }
      } else {
        eyeClosedStartTime = null;
        lastHovered = null;
        clickTriggered = false;
      }
    });

    const camera = new window.Camera(videoElement, {
      onFrame: async () => await faceMesh.send({ image: videoElement }),
      width: 640,
      height: 480
    });
    camera.start();

    loadingOverlay.remove();
  });
}

export function stopEyeCursorControl() {
  window.eyeCursorActive = false;
  document.getElementById("eye-cursor")?.remove();
  document.getElementById("eye-loading-overlay")?.remove();
  document.getElementById("eye-loading-style")?.remove();
  document.getElementById("eye-hover-style")?.remove();
  document.getElementById("eye-cursor-video")?.remove();
}

function getEAR(landmarks, eyeIndices) {
  const vertical1 = Math.hypot(
    landmarks[eyeIndices[1]].x - landmarks[eyeIndices[5]].x,
    landmarks[eyeIndices[1]].y - landmarks[eyeIndices[5]].y
  );
  const vertical2 = Math.hypot(
    landmarks[eyeIndices[2]].x - landmarks[eyeIndices[4]].x,
    landmarks[eyeIndices[2]].y - landmarks[eyeIndices[4]].y
  );
  const horizontal = Math.hypot(
    landmarks[eyeIndices[0]].x - landmarks[eyeIndices[3]].x,
    landmarks[eyeIndices[0]].y - landmarks[eyeIndices[3]].y
  );
  return (vertical1 + vertical2) / (2.0 * horizontal);
}

function isEyeClosed(landmarks) {
  const leftEAR = getEAR(landmarks, [33, 160, 158, 133, 153, 144]);
  const rightEAR = getEAR(landmarks, [362, 385, 387, 263, 373, 380]);
  return leftEAR < EYE_CLOSED_THRESHOLD && rightEAR < EYE_CLOSED_THRESHOLD;
}

function simulateClickAtCursor(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return;

  if (['INPUT', 'TEXTAREA'].includes(el.tagName)) {
    initVirtualKeyboard(el);
    el.focus();
  }

  // Simula eventos de mouse como lo haría un cursor real
  ['mouseover', 'mousemove', 'mousedown', 'mouseup', 'click'].forEach(type => {
    const evt = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y
    });
    el.dispatchEvent(evt);
  });
}


function getClosestInteractiveElement(x, y, radius = 80) {
  const elements = document.querySelectorAll('button, a, input, textarea, [role="button"], [tabindex]');
  let closest = null;
  let minDistance = radius;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      closest = { el, cx, cy };
    }
  });

  return closest;
}