import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

let abruptScrollEnabled = false;
let originalScrollTo = window.scrollTo;
let originalScroll = window.scroll;
let originalScrollIntoView = Element.prototype.scrollIntoView;

export function preventAbruptScroll() {
  abruptScrollEnabled = !abruptScrollEnabled;

  toggleCheckButton({
    id: "scrollControl",
    checked: abruptScrollEnabled,
    option: null,
  });

  if (abruptScrollEnabled) {
    activateAbruptScrollControl();
    localStorage.setItem("scrollControl", "true");
  } else {
    deactivateAbruptScrollControl();
    localStorage.removeItem("scrollControl");
  }
}

function activateAbruptScrollControl() {
  // Interceptar window.scrollTo
  window.scrollTo = function (...args) {
    const opts = args[0];
    const isBrusco =
      (typeof opts === "object" && (!opts.behavior || opts.behavior === "auto")) ||
      (typeof args[0] === "number" && typeof args[1] === "number");

    if (isBrusco) {
      console.warn("🚫 Scroll bloqueado (window.scrollTo)");
      return;
    }

    return originalScrollTo.apply(window, args);
  };

  // Interceptar window.scroll
  window.scroll = function (...args) {
    const isBrusco = args[0] === 0 && args[1] === 0;

    if (isBrusco) {
      console.warn("🚫 Scroll bloqueado (window.scroll)");
      return;
    }

    return originalScroll.apply(window, args);
  };

  // Interceptar scrollIntoView de cualquier elemento
  Element.prototype.scrollIntoView = function (arg) {
    const isBrusco = !arg || (typeof arg === "object" && (!arg.behavior || arg.behavior === "auto"));

    if (isBrusco) {
      console.warn("🚫 Scroll bloqueado (element.scrollIntoView)");
      return;
    }

    return originalScrollIntoView.call(this, arg);
  };
}

function deactivateAbruptScrollControl() {
  window.scrollTo = originalScrollTo;
  window.scroll = originalScroll;
  Element.prototype.scrollIntoView = originalScrollIntoView;
}

export function loadAbruptScrollSetting() {
  const saved = localStorage.getItem("scrollControl");
  if (saved === "true") {
    abruptScrollEnabled = true;
    activateAbruptScrollControl();

    toggleCheckButton({
      id: "scrollControl",
      checked: true,
      option: null,
    });
  }
}
