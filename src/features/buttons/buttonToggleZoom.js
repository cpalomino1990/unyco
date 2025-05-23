import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

let textMagnifierActive = false;
let tooltip = null;

export function toggleTextMagnifier() {
  if (textMagnifierActive) {
    deactivateTextMagnifier();
  } else {
    activateTextMagnifier();
  }
}

function activateTextMagnifier() {
  tooltip = document.createElement("div");
  tooltip.id = "text-magnifier-tooltip";
  document.body.appendChild(tooltip);

  document.addEventListener("mouseover", showTooltip);
  document.addEventListener("mouseout", hideTooltip);

  textMagnifierActive = true;
  localStorage.setItem("textMagnifierEnabled", "true");

  toggleCheckButton({ id: "textMagnifierEnabled", checked: true, option: null });
}

function deactivateTextMagnifier() {
  if (tooltip) {
    tooltip.remove();
    tooltip = null;
  }

  document.removeEventListener("mouseover", showTooltip);
  document.removeEventListener("mouseout", hideTooltip);
  document.removeEventListener("mousemove", positionTooltip);

  textMagnifierActive = false;
  localStorage.setItem("textMagnifierEnabled", "false");

  toggleCheckButton({ id: "textMagnifierEnabled", checked: false, option: null });
}

function showTooltip(event) {
  const target = event.target;

  if (
    target !== tooltip &&
    target.tagName.match(/^(P|SPAN|H1|H2|H3|H4|H5|H6|A|BUTTON|B)$/) &&
    target.textContent.trim().length > 0
  ) {
    tooltip.textContent = target.textContent.trim();
    tooltip.style.display = "block";

    document.addEventListener("mousemove", positionTooltip);
  }
}

function hideTooltip() {
  if (tooltip) {
    tooltip.style.display = "none";
    document.removeEventListener("mousemove", positionTooltip);
  }
}

function positionTooltip(event) {
  if (tooltip) {
    tooltip.style.left = `${event.pageX + 15}px`;
    tooltip.style.top = `${event.pageY + 15}px`;
  }
}

// Restaurar configuración al cargar
export function loadTextMagnifierSetting() {
  const enabled = localStorage.getItem("textMagnifierEnabled") === "true";

  if (enabled) {
    activateTextMagnifier();
  } else {
    toggleCheckButton({ id: "textMagnifierEnabled", checked: false, option: null });
  }
}

// Estilo del tooltip
const style = document.createElement("style");
style.innerHTML = `
  #text-magnifier-tooltip {
    position: absolute;
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 1.8em;
    font-weight: 500;
    font-family: system-ui, sans-serif;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: none;
    pointer-events: none;
    z-index: 1000;
    transition: opacity 0.2s ease, transform 0.2s ease;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
