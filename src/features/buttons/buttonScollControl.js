import { toggleCheckButton } from "../../shared/components/allButtons/allButtons";

let abruptScrollEnabled = false;
let originalScrollTo = null;
let originalScroll = null;

export function preventAbruptScroll() {
  abruptScrollEnabled = !abruptScrollEnabled;

  toggleCheckButton({
    id: "scrollControl",
    checked: abruptScrollEnabled,
    option:  null,
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
  if (!originalScrollTo) originalScrollTo = window.scrollTo;
  if (!originalScroll) originalScroll = window.scroll;

  window.scrollTo = function (...args) {
    const opts = args[0];
    const isAbrupt =
      (typeof opts === "object" && opts.top === 0 && opts.behavior === "auto") ||
      (args[0] === 0 && args[1] === 0);

    if (isAbrupt) {
      console.warn("⚠️ Scroll brusco bloqueado por accesibilidad");
      return;
    }

    return originalScrollTo.apply(window, args);
  };

  window.scroll = function (...args) {
    const isAbrupt = args[0] === 0 && args[1] === 0;

    if (isAbrupt) {
      console.warn("⚠️ Scroll brusco bloqueado por accesibilidad");
      return;
    }

    return originalScroll.apply(window, args);
  };
}

function deactivateAbruptScrollControl() {
  if (originalScrollTo) window.scrollTo = originalScrollTo;
  if (originalScroll) window.scroll = originalScroll;
}

export function loadAbruptScrollSetting() {
  const saved = localStorage.getItem("scrollControl");
  if (saved === "on") {
    abruptScrollEnabled = true;
    activateAbruptScrollControl();

    toggleCheckButton({
      id: "scrollControl",
      checked: true,
      option: null,
    });
  }
}
