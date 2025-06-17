// Importa la función toggleCheckButton para cambiar el estado visual del botón de lenguaje de señas,
// el mapa de datos gifMapData que contiene las frases y sus gifs asociados,
// y la variable host desde archivos de constantes compartidas.
import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";
import { gifMapData } from "../../shared/constants/data";
import { host } from "../../shared/constants/enviroments";

const gifMap = gifMapData.sort((a, b) => b.phrase.length - a.phrase.length);

let on = false;
let sigObserver = null;
let sigObserverActive = false;
let lastFullNodes = [];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (!node.nodeValue.trim()) continue;

    // Verifica que ni el nodo ni sus padres estén ocultos
    let parent = node.parentElement;
    let isHidden = false;
    while (parent) {
      const style = window.getComputedStyle(parent);
      if (style.display === "none" || style.visibility === "hidden" || parent.hidden) {
        isHidden = true;
        break;
      }
      parent = parent.parentElement;
    }

    if (!isHidden) {
      nodes.push(node);
    }
  }
  return nodes;
}

localStorage.setItem("createElementPlaySigLanguge", "false");

function createElementPlaySigLanguge() {
  let sigDiv = document.querySelector("#play-sig-language");
  if (!sigDiv) {
    sigDiv = document.createElement("div");
    sigDiv.id = "play-sig-language";
    sigDiv.style.position = "fixed";
    sigDiv.style.top = "0";
    sigDiv.style.right = "0";
    sigDiv.style.zIndex = "9999";
    sigDiv.style.width = "200px";
    sigDiv.style.height = "200px";
    sigDiv.style.minWidth = "200px";
    sigDiv.style.minHeight = "200px";
    sigDiv.style.maxWidth = "350px";
    sigDiv.style.maxHeight = "350px";
    sigDiv.style.backgroundColor = "rgba(14, 14, 14, 0.4)";
    sigDiv.style.cursor = "move";
    sigDiv.style.left = "auto";
    sigDiv.style.bottom = "auto";
    sigDiv.style.resize = "both";
    sigDiv.style.overflow = "hidden";
    sigDiv.style.userSelect = "none";
    sigDiv.style.border = "2px solid var(--primaryColor)";
    sigDiv.style.borderRadius = "8px";
    document.body.appendChild(sigDiv);

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (clientX, clientY) => {
      const rect = sigDiv.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      isDragging = true;
      document.body.style.userSelect = "none";
    };

    const onDrag = (clientX, clientY) => {
      if (!isDragging) return;
      let left = clientX - offsetX;
      let top = clientY - offsetY;
      left = Math.max(0, Math.min(left, window.innerWidth - sigDiv.offsetWidth));
      top = Math.max(0, Math.min(top, window.innerHeight - sigDiv.offsetHeight));
      sigDiv.style.left = left + "px";
      sigDiv.style.top = top + "px";
      sigDiv.style.right = "auto";
      sigDiv.style.bottom = "auto";
    };

    const endDrag = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    sigDiv.addEventListener("mousedown", (e) => {
      const rect = sigDiv.getBoundingClientRect();
      if (e.clientX > rect.right - 16 && e.clientY > rect.bottom - 16) return;
      startDrag(e.clientX, e.clientY);
    });

    document.addEventListener("mousemove", (e) => onDrag(e.clientX, e.clientY));
    document.addEventListener("mouseup", endDrag);

    sigDiv.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const rect = sigDiv.getBoundingClientRect();
      if (touch.clientX > rect.right - 16 && touch.clientY > rect.bottom - 16) return;
      startDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        e.preventDefault();
        onDrag(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: false }
    );

    document.addEventListener("touchend", endDrag);
  }
}

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s([,.!?;:])/g, "$1")
    .trim()
    .toLowerCase();
}

export function toggleSigLanguge() {
  on = !on;
  if (on) {
    console.log("🔄 Activando lenguaje de señas...");
    document.body.classList.add("sigLanguage");
    toggleCheckButton({ id: "sigLanguage", checked: true, option: null });
    localStorage.setItem("sigLanguage", "true");
    sigLanguage();
    startSigObserver();
  } else {
    console.log("🛑 Desactivando lenguaje de señas...");
    document.body.classList.remove("sigLanguage");
    toggleCheckButton({ id: "sigLanguage", checked: false, option: null });
    localStorage.setItem("sigLanguage", "false");
    stopSigObserver();

    // Elimina el sigdiv
    const sigDiv = document.querySelector("#play-sig-language");
    if (sigDiv) sigDiv.remove();
    const elements = document.querySelectorAll("[data-sig-id]");
    elements.forEach((el) => {
      el.removeAttribute("data-sig-id");
      el.onmouseenter = null;
      el.onmouseleave = null;
      el.onclick = null;
      el.style.outline = "";
    });
  }
}

function compararArrays(lastFullNodes, fullNodes) {
  const setLast = new Set(lastFullNodes);
  const setFull = new Set(fullNodes);
  if (setLast.size === setFull.size && [...setLast].every((val) => setFull.has(val))) return false;
  return true;
}

export function sigLanguage() {
  createElementPlaySigLanguge();

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const widget = document.getElementById("my-widget");
  let textNodes = [];
  if (widget) {
    const allNodes = getTextNodes(document.body);
    textNodes = allNodes.filter((node) => !widget.contains(node));
  } else {
    textNodes = getTextNodes(document.body);
  }

  const nodeMap = textNodes.map((node) => ({
    node,
    normalized: normalizeText(node.nodeValue),
    raw: node.nodeValue,
  }));

  const fullNormalized = nodeMap.map((n) => n.normalized).join(" ");
  const fullNodes = nodeMap.map((n) => n.raw);
  const usedRanges = [];

  if (Array.isArray(lastFullNodes) && compararArrays(lastFullNodes, fullNodes)) {
    lastFullNodes = [...fullNodes];
  } else {
    return;
  }

  gifMap.forEach(({ id, phrase }) => {
    const normalizedPhrase = normalizeText(phrase);
    const index = fullNormalized.indexOf(normalizedPhrase);
    if (index === -1) return;
    let currentIndex = 0;
    let startNodeIndex = -1;
    let endNodeIndex = -1;
    let phraseOffset = 0;

    for (let i = 0; i < nodeMap.length; i++) {
      const part = nodeMap[i].normalized;
      if (currentIndex <= index && index < currentIndex + part.length) {
        startNodeIndex = i;
        phraseOffset = index - currentIndex;
      }
      if (startNodeIndex !== -1 && currentIndex + part.length >= index + normalizedPhrase.length) {
        endNodeIndex = i;
        break;
      }
      currentIndex += part.length + 1;
    }

    if (startNodeIndex === -1 || endNodeIndex === -1) return;

    const matchedNodes = nodeMap.slice(startNodeIndex, endNodeIndex + 1).map((n) => n.node);
    const nodeKey = matchedNodes.map((n) => textNodes.indexOf(n)).join("-");
    if (usedRanges.includes(nodeKey)) return;
    usedRanges.push(nodeKey);

    // const node = matchedNodes[0];
    const node = matchedNodes[0];
    const el = node.parentElement;
    el.setAttribute("data-sig-id", id);
    el.onmouseenter = null;
    el.onmouseleave = null;
    el.ontouchstart = null;
    el.ontouchend = null;
    el.onclick = null;

    const handleShow = () => playGif(id, true);

    if (isTouchDevice) {
      let gifShown = false;
      el.addEventListener("click", (e) => {
        if (!gifShown) {
          e.stopPropagation();
          handleShow();
          gifShown = true;
        } else {
          gifShown = false;
          // Permite que el click original se ejecute normalmente
        }
      });
      // Oculta el gif si se hace click fuera del elemento seleccionado
      document.addEventListener(
        "click",
        (event) => {
          if (!el.contains(event.target)) {
            playGif(id, false);
            gifShown = false;
          }
        },
        true
      );
    } else {
      el.addEventListener("mouseenter", handleShow);
      el.addEventListener("mouseleave", () => playGif(id, false));
    }
  });
}

export function playGif(id, show = true) {
  const sigDiv = document.querySelector("#play-sig-language");
  const elements = document.querySelectorAll(`[data-sig-id="${id}"]`);
  const gifObj = gifMap.find((g) => g.id === id);

  elements.forEach((el) => {
    if (show && sigDiv && gifObj) {
      sigDiv.innerHTML = "";
      const img = document.createElement("img");
      img.src = gifObj.gif;
      img.alt = `GIF de ${gifObj.id}`;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.objectPosition = "center";
      sigDiv.appendChild(img);
      el.style.outline = "2px dashed #007bff";
    } else if (sigDiv) {
      sigDiv.innerHTML = "";
      el.style.outline = "";
    }
  });
}

export function startSigObserver() {
  if (sigObserverActive) return;

  sigObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "characterData" ||
        (mutation.type === "childList" &&
          [...mutation.addedNodes].some(
            (n) =>
              (n.nodeType === Node.TEXT_NODE && n.nodeValue.trim()) ||
              (n.nodeType === Node.ELEMENT_NODE && n.textContent && n.textContent.trim())
          ))
      ) {
        sigLanguage();
        break;
      }
    }
  });

  // sigObserver = new MutationObserver((mutationsList) => {
  //   for (const mutation of mutationsList) {
  //     if (mutation.type === "characterData" || mutation.type === "childList") {
  //       sigLanguage(); // Ejecutar siempre que se agregue o elimine algo
  //       break;
  //     }
  //   }
  // });

  sigObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  sigObserverActive = true;
  console.log("✅ Observer activado");
}

export function stopSigObserver() {
  if (sigObserver && sigObserverActive) {
    sigObserver.disconnect();
    sigObserver = null;
    sigObserverActive = false;
    console.log("🛑 Observer desactivado");
  }
}
