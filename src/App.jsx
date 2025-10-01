import React, { useState, useEffect } from "react";
import UserForm from "./components/userForm";
import UserList from "./components/userList";
import ErrorAlert from "./components/alertError";
import { validateForm } from "./services/validation";

import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./services/userService";

function App() {
  const [form, setForm] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    ciudad: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState([]);

  // Cargar datos desde el backend
  useEffect(() => {
    getUsuarios()
      .then((data) => setUsuarios(data))
      .catch(() => setUsuarios([]));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(form, usuarios, editIndex);
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editIndex !== null) {
      // actualizar en DB
      try {
        const usuarioEdit = usuarios[editIndex];
        await updateUsuario(usuarioEdit.id, form);

        const updatedUsuarios = [...usuarios];
        updatedUsuarios[editIndex] = { ...form, id: usuarioEdit.id };
        setUsuarios(updatedUsuarios);

        resetForm();
      } catch {
        setErrors(["Error al actualizar en el servidor"]);
      }
    } else {
      // registrar en DB
      try {
        const nuevo = await createUsuario(form);
        setUsuarios([...usuarios, { ...form, id: nuevo.id }]);
        resetForm();
      } catch {
        setErrors(["Error al guardar en el servidor"]);
      }
    }
  };

  const handleEdit = (index) => {
    setForm({ ...usuarios[index] });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const usuario = usuarios[index];
    try {
      await deleteUsuario(usuario.id);
      setUsuarios(usuarios.filter((_, i) => i !== index));
    } catch {
      setErrors(["Error al eliminar en el servidor"]);
    }
  };

  const resetForm = () => {
    setForm({
      dni: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      genero: "",
      ciudad: "",
    });
    setEditIndex(null);
    setErrors([]);
  };

  return (
    <div className="container">
      <h1>Formulario de Registro</h1>

      <ErrorAlert errors={errors} />

      <UserForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editMode={editIndex !== null}
      />

      <h2>Usuarios Registrados</h2>
      <UserList usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
