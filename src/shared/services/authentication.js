import { apiHost, host } from "../constants/enviroments";
import { customFetch } from "./customFetch";

const API_URL = "https://your-api-url.com/auth"; // Cambia esto por tu endpoint real

export async function fetchLogin(body) {
  const { success, data } = await customFetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (success) {
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("authToken", data?.access_token);
  }
  return { success };
}

export async function fetchUserProfile() {
  const token = localStorage.getItem("authToken");

  if (!token) return { success: false, error: "No token found" };

  const { success, data } = await customFetch("/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  

  return { success, data };
}


export function logout() {
  // Elimina el token de autenticación
  localStorage.setItem("isAuth", "false");
  localStorage.removeItem("authToken");
}

export async function fetchRegister(body) {
  const response = await customFetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function fetchRecoveryPassSendCode(body) {
  const response = await customFetch("/auth/send-recovery-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function fetchRecoveryPassVerifyCode(body) {
  const response = await customFetch("/auth/verify-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function fetchRecoveryPassNewPass(body) {
  const response = await customFetch("/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response;
}

export function getUserIdFromToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || payload.id;
  } catch (e) {
    console.error("Token inválido:", e);
    return null;
  }
}
console.log("este es el consolo log de los id ",getUserIdFromToken())

export async function updateUserProfile(data) {
  const userId = getUserIdFromToken();
  const token = localStorage.getItem("authToken");

  if (!userId || !token) {
    alert("No estás autenticado.");
    return;
  }

  try {
    const response = await fetch(`${apiHost}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar el perfil.");
    }

    const updatedUser = await response.json();
    console.log("Perfil actualizado:", updatedUser);
    alert("Perfil actualizado correctamente.");
    switchView("accessibility-user-profile-view");

  } catch (err) {
    console.error(err);
    alert(err.message || "Hubo un error al actualizar el perfil.");
  }
}


export async function checkEmail(email) {
  try {
    const response = await fetch(`${apiHost}/auth/check-email?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    const data = await response.json();
    return data.registered === true;
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return false; 
  }
}
