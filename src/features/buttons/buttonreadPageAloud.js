import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

let isReading = false;
let utterance;

export function toggleReadOnHover() {
  isReading = !isReading;

  if (isReading) {
    localStorage.setItem("readingEnabled", "true");
    toggleCheckButton({ id: "readingEnabled", checked: true, option: null });

    document.body.addEventListener("mouseover", startReading);
    document.body.addEventListener("mouseout", stopReading);
  } else {
    localStorage.setItem("readingEnabled", "false");
    toggleCheckButton({ id: "readingEnabled", checked: false, option: null });

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
    utterance.rate = 1;
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

export function loadReadingSetting() {
  const saved = localStorage.getItem("readingEnabled") === "true";

  if (saved) {
    isReading = true;
    document.body.addEventListener("mouseover", startReading);
    document.body.addEventListener("mouseout", stopReading);
    toggleCheckButton({ id: "readingEnabled", checked: true, option: null });
  } else {
    toggleCheckButton({ id: "readingEnabled", checked: false, option: null });
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
