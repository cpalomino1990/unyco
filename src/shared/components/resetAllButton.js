import { buttonsConfig } from "../../shared/components/allButtons/allButtons";
import { activeProfiles, DeactivateProfile } from "../utils/actions"; // Asegúrate que la ruta sea correcta
import Swal from "sweetalert2";




export function resetAllFunctionalities() {
  // 1. Desactivar perfiles activos
  if (Array.isArray(activeProfiles)) {
    const profilesToDeactivate = [...activeProfiles];
    profilesToDeactivate.forEach(({ id }) => {
      DeactivateProfile(id);
      
    });
  }

  // 2. Desactivar botones funcionales
  buttonsConfig.forEach((button) => {
    const { id, onclick, countOptions } = button;
    const storedValue = localStorage.getItem(id);

    if (!storedValue || storedValue === "false") return;

    if (countOptions) {
      let attempts = 0;
      while (localStorage.getItem(id) && localStorage.getItem(id) !== "false") {
        onclick();
        attempts++;
        if (attempts > countOptions + 1) break;
         Swal.fire({
          icon: 'success',
          title: '¡Listo!',
          text: 'Se han restablecido todas las funcionalidades correctamente.',
          timer: 2000,
          timerProgressBar: true,
          
        });
        
      }
    } else {
      onclick();
      Swal.fire({
    icon: 'success',
    title: '¡Listo!',
    text: 'Se han restablecido todas las funcionalidades correctamente.',
    timer: 2000,
    timerProgressBar: true,
  });
    }

    localStorage.removeItem(id);
  });

    
}


export function resetAllFunctionalities1() {
  // 1. Desactivar perfiles activos
  if (Array.isArray(activeProfiles)) {
    const profilesToDeactivate = [...activeProfiles];
    profilesToDeactivate.forEach(({ id }) => {
      DeactivateProfile(id);
      
    });
  }

  // 2. Desactivar botones funcionales
  buttonsConfig.forEach((button) => {
    const { id, onclick, countOptions } = button;
    const storedValue = localStorage.getItem(id);

    if (!storedValue || storedValue === "false") return;

    if (countOptions) {
      let attempts = 0;
      while (localStorage.getItem(id) && localStorage.getItem(id) !== "false") {
        onclick();
        attempts++;
        if (attempts > countOptions + 1) break;
        
        
      }
    } else {
      onclick();
  
    }

    localStorage.removeItem(id);
  });

    
}