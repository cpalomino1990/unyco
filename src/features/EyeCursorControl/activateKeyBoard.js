let virtualKeyboard;
let removeKeyboardListeners;

// Activa o desactiva el teclado virtual según su estado actual
export function toggleVirtualKeyboard() {


    const isActive = document.body.classList.toggle("virtual-keyboard");
    localStorage.setItem("virtualKeyboard", isActive ? "true" : "false");
    if (!isActive) {
        // Si no está activo, lo inicializa y guarda la función de limpieza
        removeKeyboardListeners = initVirtualKeyboard();
    } else {
        // Si ya está activo, limpia los listeners y lo elimina del DOM
        if (removeKeyboardListeners) {
            removeKeyboardListeners();
        }
        virtualKeyboard = null;
    }
}

function loadVirtualKeyboardSetting() {
    if (localStorage.getItem("virtualKeyboard") === "true") {
        document.body.classList.add("virtual-keyboard");
        removeKeyboardListeners = initVirtualKeyboard();
    }
}

// Inicializa y renderiza el teclado virtual en la pantalla
export function initVirtualKeyboard() {
    // Estados del teclado
    let isShift = false;
    let isCaps = false;
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    let currentLayout = 'en';
    let currentTheme = 'auto';

    // Layouts para idiomas inglés y español

    const layouts = {
        en: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
            ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
            ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
            ['Lang', 'Space', 'Clear', 'Theme']
        ],
        es: [
            ['º', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\'', '¡', 'Backspace'],
            ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '`', '+', '\\'],
            ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', '´', 'Enter'],
            ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', 'Shift'],
            ['Lang', 'Space', 'Clear', 'Theme']
        ]
    };

    const shiftMap = {
        '`': '~', '1': '!', '2': '@', '3': '#', '4': '$',
        '5': '%', '6': '^', '7': '&', '8': '*', '9': '(',
        '0': ')', '-': '_', '=': '+', '[': '{', ']': '}',
        '\\': '|', ';': ':', '\'': '"', ',': '<', '.': '>', '/': '?',
        'º': 'ª', '\'': '\"', '`': '^', '+': '*', '´': '¨', '-': '_'
    };

     // Crear el contenedor del teclado
     const keyboard = document.createElement("div");
     keyboard.style = `
         position: fixed;
         bottom: 20px;
         left: 50%;
         transform: translateX(-50%);
         padding: 12px;
         border-radius: 12px;
         z-index: 999999;
         font-family: sans-serif;
         user-select: none;
         cursor: move;
     `;
 
     // Obtiene el tema efectivo en función de configuración o preferencia del sistema
     const getEffectiveTheme = () => {
         if (currentTheme === 'auto') {
             return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
         }
         return currentTheme;
     };
 
     // Aplica el tema (colores de fondo y texto) al teclado
     const updateTheme = () => {
         const theme = getEffectiveTheme();
         keyboard.style.background = theme === 'dark' ? '#1e1e1e' : '#f0f0f0';
         keyboard.style.boxShadow = theme === 'dark' ? '0 0 15px rgba(0,0,0,0.6)' : '0 0 15px rgba(0,0,0,0.2)';
         keyboard.querySelectorAll("button").forEach(btn => {
             btn.style.background = theme === 'dark' ? '#333' : '#ddd';
             btn.style.color = theme === 'dark' ? '#fff' : '#000';
         });
         updateKeyLabels(); // Refresca etiquetas después de aplicar tema
     };
 
     // Actualiza las etiquetas visibles de las teclas según Shift, CapsLock y tema
     const updateKeyLabels = () => {
         const buttons = keyboard.querySelectorAll("button[data-key]");
         buttons.forEach(btn => {
             const key = btn.getAttribute("data-key");
             if (!key) return;
 
             let label = key;
             if (key.length === 1) {
                 if (isShift && shiftMap[key]) {
                     label = shiftMap[key];
                 } else {
                     label = (isCaps ^ isShift) ? key.toUpperCase() : key.toLowerCase();
                 }
             } else if (key === "Theme") {
                 label = `Theme (${currentTheme})`;
             }
 
             btn.textContent = label;
         });
 
         // Visualmente resalta Shift o CapsLock si están activos
         keyboard.querySelectorAll("button[data-key='Shift'], button[data-key='CapsLock']")
             .forEach(btn => {
                 btn.style.outline = (
                     (btn.dataset.key === 'Shift' && isShift) ||
                     (btn.dataset.key === 'CapsLock' && isCaps)
                 ) ? "2px solid yellow" : "none";
             });
     };
 
     // Renderiza las teclas del teclado virtual en el DOM
     const renderKeys = () => {
         keyboard.innerHTML = '';
         layouts[currentLayout].forEach(row => {
             const rowDiv = document.createElement("div");
             rowDiv.style.display = "flex";
             row.forEach(key => {
                 const btn = document.createElement("button");
                 btn.setAttribute("data-key", key);
                 btn.style = `
                     flex: ${key === "Space" ? 6 : ["Backspace", "CapsLock", "Shift", "Enter", "Tab", "Lang", "Clear", "Theme"].includes(key) ? 2 : 1};
                     margin: 2px;
                     padding: 12px;
                     font-size: 18px;
                     border: none;
                     border-radius: 6px;
                     cursor: pointer;
                     transition: background 0.2s;
                 `;
                 // Evento que maneja la acción de la tecla al hacer clic
                 btn.addEventListener("click", () => {
                     btn.style.filter = "brightness(1.5)";
                     setTimeout(() => btn.style.filter = "", 150);
                     handleKeyPress(key);
                 });
                 rowDiv.appendChild(btn);
             });
             keyboard.appendChild(rowDiv);
         });
         updateTheme(); // Aplica tema tras renderizar
     };
 
     // Maneja la lógica de cada tecla presionada
     const handleKeyPress = (key) => {
         const input = document.activeElement;
         if (!input || !(input.tagName === "INPUT" || input.tagName === "TEXTAREA")) return;
 
         let cursorStart = input.selectionStart;
         let cursorEnd = input.selectionEnd;
 
         switch (key) {
            
             case 'Backspace':
                 if (cursorStart > 0) {
                     input.setRangeText("", cursorStart - 1, cursorEnd, "end");
                 }
                 break;
             case 'Tab':
                 input.setRangeText("\t", cursorStart, cursorEnd, "end");
                 break;
             case 'Enter':
                 input.setRangeText("\n", cursorStart, cursorEnd, "end");
                 break;
             case 'Space':
                 input.setRangeText(" ", cursorStart, cursorEnd, "end");
                 break;
             case 'Clear':
                 input.value = '';
                 break;
             case 'CapsLock':
                 isCaps = !isCaps;
                 updateKeyLabels();
                 break;
             case 'Shift':
                 isShift = !isShift;
                 updateKeyLabels();
                 break;
             case 'Lang':
                 currentLayout = currentLayout === 'en' ? 'es' : 'en';
                 renderKeys();
                 break;
             case 'Theme':
                 currentTheme = currentTheme === 'auto' ? 'dark' : currentTheme === 'dark' ? 'light' : 'auto';
                 updateTheme();
                 break;
             case 'Close':
                if (removeKeyboardListeners) removeKeyboardListeners();
                virtualKeyboard = null;
                document.body.classList.remove("virtual-keyboard");
                localStorage.setItem("virtualKeyboard", "false");
                break;

             default:
                 let char = key;
                 if (isShift && shiftMap[char]) {
                     char = shiftMap[char];
                 } else if (char.length === 1) {
                     char = (isCaps ^ isShift) ? char.toUpperCase() : char.toLowerCase();
                 }
                 input.setRangeText(char, cursorStart, cursorEnd, "end");
                 // Si Shift fue activado para una tecla, se desactiva luego de escribir
                 if (isShift && key !== 'Shift') {
                     isShift = false;
                     updateKeyLabels();
                 }
         }
     };
 
     // Lógica para arrastrar el teclado
     const onMouseDown = (e) => {
         isDragging = true;
         offsetX = e.clientX - keyboard.offsetLeft;
         offsetY = e.clientY - keyboard.offsetTop;
         e.preventDefault();
     };
     const onMouseMove = (e) => {
         if (isDragging) {
             keyboard.style.left = `${e.clientX - offsetX}px`;
             keyboard.style.top = `${e.clientY - offsetY}px`;
             keyboard.style.bottom = "auto";
             keyboard.style.transform = "none";
         }
     };
     const onMouseUp = () => { isDragging = false; };
 
     // Listeners de arrastre del teclado
     keyboard.addEventListener("mousedown", onMouseDown);
     document.addEventListener("mousemove", onMouseMove);
     document.addEventListener("mouseup", onMouseUp);
 
     // Render inicial de teclas
     renderKeys();
     document.body.appendChild(keyboard);
     virtualKeyboard = keyboard;
 
     // Listener para tema del sistema (modo auto)
     const themeListener = window.matchMedia('(prefers-color-scheme: dark)');
     themeListener.addEventListener('change', () => {
         if (currentTheme === 'auto') updateTheme();
     });
 
     // Función que limpia los eventos y elimina el teclado del DOM
     return () => {
         keyboard.removeEventListener("mousedown", onMouseDown);
         document.removeEventListener("mousemove", onMouseMove);
         document.removeEventListener("mouseup", onMouseUp);
         document.body.removeChild(keyboard);
     };
 }

