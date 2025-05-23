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
  const res = await fetch('http://localhost:3001/auth/profile', {
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
