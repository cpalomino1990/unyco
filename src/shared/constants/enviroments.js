// export const host = "https://merry-palmier-ba5f3e.netlify.app";
// export const host = "http://127.0.0.1:5502"
export const host = process.env.HOST_URL || "https://test1.unyco.co";
export const apiHost = process.env.APIHOST || "http://localhost:3001";
export const urlGif = process.env.URL_GIF || "https://uconect.nyc3.digitaloceanspaces.com/desoftinnvate.netlify.app";

// Detectar si es disposito movil
export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
