/*let textSize = 16; 

const increaseTextSizeButton = document.getElementById('increase-text-size');
const decreaseTextSizeButton = document.getElementById('decrease-text-size');

increaseTextSizeButton.addEventListener('click', () => {
    textSize += 2;
    document.body.style.fontSize = `${textSize}px`;
});

decreaseTextSizeButton.addEventListener('click', () => {
    if (textSize > 10) { 
        textSize -= 2;
        document.body.style.fontSize = `${textSize}px`;
    }
});*/



  export function toggleFontFamily() {
    if (document.body.style.fontFamily === 'Georgia, serif') {
      document.body.style.fontFamily = 'Helvetica, sans-serif';
    } else {
      document.body.style.fontFamily = 'Georgia, serif';
    }
  }