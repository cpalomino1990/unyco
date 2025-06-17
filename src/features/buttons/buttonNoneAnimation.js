import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

// Activa o desactiva las animaciones en la página y pausa/reanuda videos
function injectNoneAnimationStyles() {
  if (!document.getElementById("none-animation-style")) {
    const styleTag = document.createElement("style");
    styleTag.id = "none-animation-style";
   styleTag.innerHTML = `
 .none-animation * :not(#my-widget):not(#my-widget *) {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
  caret-color: transparent !important;
 
}
}
  
`;
    document.head.appendChild(styleTag);
  }
}

export function toggleAnimations() {
  document.body.classList.toggle("none-animation");
  const isAnimationDisabled = document.body.classList.contains("none-animation");
  localStorage.setItem("noneAnimation", isAnimationDisabled);
  console.log("Animations toggled:", isAnimationDisabled);
  toggleCheckButton({ id: "noneAnimation", checked: isAnimationDisabled, option: null });

  const videos = Array.from(document.querySelectorAll("video")).filter(
    video => !video.closest("#my-widget")
  );

  videos.forEach(video => {
    if (isAnimationDisabled) {
      video.dataset.wasPaused = video.paused.toString();
      video.pause();
    } else {
      if (video.dataset.wasPaused === "false") {
        video.play();
      }
      delete video.dataset.wasPaused;
    }
  });

  injectNoneAnimationStyles();
}

export function loadAnimationSetting() {
  const disabled = localStorage.getItem("noneAnimation") === "true";

  if (disabled) {
    document.body.classList.add("none-animation");
    toggleCheckButton({ id: "noneAnimation", checked: true, option: null });
    injectNoneAnimationStyles();
  } else {
    toggleCheckButton({ id: "noneAnimation", checked: false, option: null });
  }
}
