import { apiHost } from "../constants/enviroments";

/**
 * customFetch - Realiza peticiones HTTP y maneja mensajes de éxito y error.
 * @param {string} url - URL del recurso.
 * @param {object} options - Opciones para fetch (method, headers, body, etc).
 * @returns {Promise<object>} - Respuesta con { success, data, message }.
 */

export async function customFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${apiHost}${endpoint}`, options);

    // Intenta parsear la respuesta como JSON
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Mensaje de error personalizado o por defecto
      const message = (data && data.message) || "Ocurrió un error en la petición.";
      return { success: false, data, message };
    }

    // Mensaje de éxito opcional
    const message = (data && data.message) || "Operación realizada con éxito.";
    return { success: true, data, message };
  } catch (error) {
    // Error de red u otro error inesperado
    return { success: false, data: null, message: error.message || "Error al conectarse con el servidor." };
  }
}
