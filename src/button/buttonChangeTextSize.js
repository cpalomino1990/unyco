
// Cambia el tamaño del texto, aumentando o disminuyendo en 2px
export function changeTextSize(increase) {
    let textSize = parseInt(window.getComputedStyle(document.body).fontSize);
    textSize = increase ? Math.min(textSize + 2, 24) : Math.max(textSize - 2, 12);
    document.body.style.fontSize = `${textSize}px`;
    localStorage.setItem("textSize", textSize);
  }


