const API_URL = "http://localhost:5000/usuarios";

export const getUsuarios = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createUsuario = async (usuario) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return res.json();
};

export const updateUsuario = async (id, usuario) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return res.json();
};

export const deleteUsuario = async (id) => {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
