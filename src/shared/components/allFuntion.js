import { loadVirtualKeyboardSetting } from "../../features/buttons/buttonActivateKeyBoard.js";
import { loadFontsizeSetting } from "../../features/buttons/buttonChangeTextSize.js";
import { loadCursorSetting } from "../../features/buttons/buttonCursorSatyle.js";
import { createFilterActivator, loadHighlightSetting, loadHighlightSetting1 } from "../../features/buttons/buttondaltonismo.js";
import { insertDyslexiaFontCDN, loadDyslexiaFontSetting } from "../../features/buttons/buttonDyslexiaFont.js";
import { loadFocusFrameSetting } from "../../features/buttons/buttonFocusFrame.js";
import { loadHighlightImportantSetting } from "../../features/buttons/buttonhighlightimportant.js";
import { loadOutlineSettings } from "../../features/buttons/buttonhighlightLinks.js";
import { loadLetterSpacingSetting } from "../../features/buttons/buttonLetterSpacing.js";
import { loadAnimationSetting } from "../../features/buttons/buttonNoneAnimation.js";
import { loadOutlineSetting } from "../../features/buttons/buttonOutlineMode.js";
import { loadReadingMaskSetting } from "../../features/buttons/buttonReadingMask.js";
import { loadReadingSetting } from "../../features/buttons/buttonReadingSpeed.js";
import { loadAbruptScrollSetting } from "../../features/buttons/buttonScollControl.js";
import { loadSelectiveContrastSetting } from "../../features/buttons/buttonSelectiveContrast.js";
import { loadFontSetting } from "../../features/buttons/buttonToggleFont.js";
import { loadReadingBarSetting } from "../../features/buttons/buttonToggleReadingBar.js";
import { loadTextMagnifierSetting } from "../../features/buttons/buttonToggleZoom.js";
import {  toggleMediaVolume } from "../../features/buttons/buttonVolumeControlButton.js";


window.addEventListener("DOMContentLoaded", () => {
initAccessibilitySettings()
 loadOutlineSetting();
loadFontsizeSetting();
loadCursorSetting();
//localStartCalibrationNow();
loadOutlineSettings(); 
loadHighlightSetting();
createFilterActivator();
loadHighlightSetting1();
loadDyslexiaFontSetting();
insertDyslexiaFontCDN();
loadFocusFrameSetting();
loadReadingSetting();
loadHighlightImportantSetting();
loadLetterSpacingSetting();
loadAnimationSetting();
loadReadingMaskSetting();
loadReadingSetting();
loadTextMagnifierSetting();
loadReadingBarSetting();
loadFontSetting();
loadSelectiveContrastSetting();
loadAbruptScrollSetting()
loadVirtualKeyboardSetting()
toggleMediaVolume()

     
});



export function initAccessibilitySettings() {
  const defaultStates = {
   
   
    "contrast-style": "false",
    "dyslexia-font": "false",
    "outline-mode": "false",
    "highlightImportant": "false",
    "textMagnifierEnabled": "false",
    "letter-size-style": "false",
    "letter-size-style-space": "false",
    "readingEnabled": "false",
    "highlights": "false",
    "noneAnimation": "false",
    "readingBarEnabled": "false",
    "cursor-large": "false",
    "fontStyle": "false",
    "readingSpeed": "false",
    "highlightColors": "false",
    "volumeLevel": "false",
    "protanopia": "false",
    "deuteranopia": "false",
    "tritanopia": "false",
    "protanomaly": "false",
    "deuteranomaly": "false",
    "tritanomaly": "false",
    "achromatomaly": "false",
    "focus-frame-active": "false",
    "achromatopsia": "false",
    "selectiveContrast": "false",
    "guided-word": "false",
    "simplifiedText": "false",
    "toggle-mute": "false",
    "readingMask": "false",
    "control-scroll": "false",
    "lowContrast": "false",
    "calibration-instructions-modal": "false",
    "sig-lenguaje": "false",
    "virtualKeyboard": "false",
    "color-slider": "false",
    "volumeControl" : "false"
   
  };

  for (const key in defaultStates) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, defaultStates[key]);
    }
  }
}


