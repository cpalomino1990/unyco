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

export function logout() {
  // Elimina el token de autenticación
  localStorage.setItem("isAuth", "false");
  localStorage.removeItem("authToken");
}

export async function fetchRegister(body) {
  const { success, data } = await customFetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return { success, data };
}
