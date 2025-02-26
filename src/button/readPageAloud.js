let isReading = false;
let utterance;

export function toggleReadOnHover() {
  isReading = !isReading;
  if (!isReading) {
    speechSynthesis.cancel();
    document.body.removeEventListener("mouseover", startReading);
    document.body.removeEventListener("mouseout", stopReading);
  } else {
    document.body.addEventListener("mouseover", startReading);
    document.body.addEventListener("mouseout", stopReading);
  }
}

export function startReading(event) {
  if (isReading && event.target.innerText.trim()) {
    utterance = new SpeechSynthesisUtterance(event.target.innerText);
    utterance.lang = "es-ES";
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }
}

function stopReading() {
  speechSynthesis.cancel();
}
