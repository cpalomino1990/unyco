// Paso 1: Registro básico
export async function registerBasic(email, password) {
  const res = await fetch('http://localhost:3001/auth/resgister', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Error en registro básico');

  const data = await res.json();
  // Guarda token o userId según respuesta
  localStorage.setItem('token', data.token);  // si usas JWT
  return data;
}

// Paso 2: Completar perfil
async function updateProfile(profileData) {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost/auth/profile', {
    method: 'PUT', // o PATCH
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) throw new Error('Error actualizando perfil');
  return await res.json();
}



function handleCredentialResponse(response) {
  // response.credential contiene el JWT (ID token)
  console.log("ID Token:", response.credential);

  // Enviar el token al backend para verificarlo e iniciar/registrar al usuario
  fetch("http://localhost:3000/auth/google-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ idToken: response.credential })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Usuario autenticado:", data);
  });
}

function loginWithGoogle() {
  google.accounts.id.initialize({
    client_id: "TU_CLIENT_ID_AQUI",
    callback: handleCredentialResponse
  });

  google.accounts.id.prompt(); // Usa un popup
}
