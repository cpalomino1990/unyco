import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

let currentVolume = 1; // 0 = máximo, 1 = medio
let isVolumeControlActive = false;

export function toggleVolumeControl() {
  if (!isVolumeControlActive) {
    isVolumeControlActive = true;
    currentVolume = 1;

    localStorage.setItem("volumeControl", "0");
    toggleCheckButton({ id: "volumeControl", checked: true, option: 0 });
    applyVolumeToMediaElements(currentVolume);
  } 
  else if (currentVolume === 1) {
    currentVolume = 0.5;

    localStorage.setItem("volumeControl", "1");
    toggleCheckButton({ id: "volumeControl", checked: true, option: 1 });
    applyVolumeToMediaElements(currentVolume);
  } 
  else {
    isVolumeControlActive = false;
    currentVolume = 1;

    localStorage.setItem("volumeControl", "false");
    toggleCheckButton({ id: "volumeControl", checked: false, option: null });
    applyVolumeToMediaElements(currentVolume); // Restaurar al máximo
  }
}

function applyVolumeToMediaElements(volume) {
  const mediaElements = document.querySelectorAll("video, audio").forEach(e => {
});
}

// Restaurar configuración al cargar
export function loadVolumeSetting() {
  const savedVolume = localStorage.getItem("volumeControl");

  if (savedVolume === "0" || savedVolume === "1") {
    isVolumeControlActive = true;
    currentVolume = parseFloat(savedVolume);

    toggleCheckButton({ id: "volumeControl", checked: true, option: currentVolume });
    applyVolumeToMediaElements(currentVolume);
  } else {
    toggleCheckButton({ id: "volumeControl", checked: false, option: null });
  }
}
