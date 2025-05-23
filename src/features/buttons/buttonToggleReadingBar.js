import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

// Variables globales
let cursorX = 0;
let cursorY = 0;

export function toggleReadingBar() {
    const isActive = !!document.querySelector('.reading-bar');
    const newState = !isActive;

    if (newState) {
        activateReadingBar();
    } else {
        deactivateReadingBar();
    }

    localStorage.setItem("readingBarEnabled", newState.toString());
    toggleCheckButton({ id: "readingBarEnabled", checked: newState, option: null });
}

function activateReadingBar() {
    const style = document.createElement('style');
    style.id = 'readingBarEnabled';
    style.innerHTML = `
      .reading-bar {
        position: absolute;
        width: 100%;
        height: 40px;
        background-color: rgba(255, 255, 0, 0.2);
        border-top: 1px solid rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        z-index: 9999;
        pointer-events: none;
      }
      .reading-bar .center-element {
        position: absolute;
        top: 10px;
        font-size: 22px;
        color: #333;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    const readingBar = document.createElement('div');
    readingBar.classList.add('reading-bar');

    const centerElement = document.createElement('span');
    centerElement.classList.add('center-element');
    centerElement.textContent = '•';

    readingBar.appendChild(centerElement);
    document.body.appendChild(readingBar);

    document.addEventListener('mousemove', moveReadingBar);
    document.addEventListener('scroll', updateReadingBarPosition);
}

function deactivateReadingBar() {
    const bar = document.querySelector('.reading-bar');
    if (bar) bar.remove();

    const style = document.getElementById('readingBarEnabled');
    if (style) style.remove();

    document.removeEventListener('mousemove', moveReadingBar);
    document.removeEventListener('scroll', updateReadingBarPosition);
}

function moveReadingBar(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
    updateReadingBarPosition();
}

function updateReadingBarPosition() {
    const bar = document.querySelector('.reading-bar');
    const dot = document.querySelector('.center-element');

    if (bar && dot) {
        const barWidth = bar.offsetWidth;
        const barHeight = bar.offsetHeight;
        const dotWidth = dot.offsetWidth;

        let newLeft = cursorX - barWidth / 2;
        let newTop = cursorY + window.scrollY - barHeight / 2;

        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - barWidth));
        newTop = Math.max(window.scrollY, Math.min(newTop, window.scrollY + window.innerHeight - barHeight));

        bar.style.left = `${newLeft}px`;
        bar.style.top = `${newTop}px`;

        const offset = cursorX - newLeft;
        dot.style.left = `${offset - dotWidth / 2}px`;
    }
}

// Llamar esta función al cargar la app
export function loadReadingBarSetting() {
    const enabled = localStorage.getItem("readingBarEnabled") === "true";
    if (enabled) {
        activateReadingBar();
        toggleCheckButton({ id: "readingBarEnabled", checked: true, option: null });
    }
}
