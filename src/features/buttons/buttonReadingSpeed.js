import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

let currentSpeed = 0; // 0 = rápido, 1 = lento
let isReading = false;
let utterance;

export function toggleReadSpeed() {
  if (!isReading) {
    isReading = true;
    currentSpeed = 0;

    localStorage.setItem("readingSpeed", "0");
    toggleCheckButton({ id: "readingSpeed", checked: true, option: 0 });

    document.body.addEventListener("mouseover", startReading);
    document.body.addEventListener("mouseout", stopReading);
  } 
  else if (currentSpeed === 0) {
    currentSpeed = 1;

    localStorage.setItem("readingSpeed", "1");
    toggleCheckButton({ id: "readingSpeed", checked: true, option: 1 });
  } 
  else {
    isReading = false;
    currentSpeed = 0;

    localStorage.setItem("readingSpeed", "false");
    toggleCheckButton({ id: "readingSpeed", checked: false, option: null });

    stopReading();
    document.body.removeEventListener("mouseover", startReading);
    document.body.removeEventListener("mouseout", stopReading);
  }
}

function startReading(event) {
  if (isReading && isValidElement(event.target)) {
    document.querySelectorAll(".highlighted").forEach(el => el.classList.remove("highlighted"));
    event.target.classList.add("highlighted");

    utterance = new SpeechSynthesisUtterance(event.target.innerText);
    utterance.lang = "es-ES";
    utterance.rate = currentSpeed === 0 ? 1.5 : 0.5;
    utterance.pitch = 1;

    utterance.onend = () => {
      event.target.classList.remove("highlighted");
    };

    speechSynthesis.speak(utterance);
  }
}

function stopReading() {
  speechSynthesis.cancel();
  document.querySelectorAll(".highlighted").forEach(el => el.classList.remove("highlighted"));
}

function isValidElement(element) {
  const validTags = ["P", "H1", "H2", "H3", "SPAN", "BUTTON", "A"];
  return validTags.includes(element.tagName) && element.innerText.trim().length > 2;
}

// Restaurar configuración al cargar
export function loadReadingSetting() {
  const savedSpeed = localStorage.getItem("readingSpeed");

  if (savedSpeed === "0" || savedSpeed === "1") {
    isReading = true;
    currentSpeed = savedSpeed === "1" ? 1 : 0;

    document.body.addEventListener("mouseover", startReading);
    document.body.addEventListener("mouseout", stopReading);
    toggleCheckButton({ id: "readingSpeed", checked: true, option: currentSpeed });
  } else {
    toggleCheckButton({ id: "readingSpeed", checked: false, option: null });
  }
}

// Estilo de resaltado
const style = document.createElement("style");
style.innerHTML = `
  .highlighted {
    background-color: yellow;
    transition: background-color 0.3s ease;
  }
`;
document.head.appendChild(style);
