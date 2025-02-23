

// Activa o desactiva el modo de alto contraste//
export function toggleContrast() {
    document.body.classList.toggle("high-contrast");
    localStorage.setItem("highContrast", document.body.classList.contains("high-contrast"));
  }