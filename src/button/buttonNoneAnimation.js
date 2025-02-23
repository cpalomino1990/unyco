
// Activa o desactiva las animaciones en la página
export function toggleAnimations() {
    document.body.classList.toggle("none-animation");
    localStorage.setItem("noneAnimation", document.body.classList.contains("none-animation"));
  }