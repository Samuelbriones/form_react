import React, { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./components/userForm";
import UserList from "./components/userList";
import ErrorAlert from "./components/alertError";

import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./services/userService";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    ciudad: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getUsuarios()
      .then((data) => setUsuarios(data))
      .catch(() => setUsuarios([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const validateForm = () => {
  const newErrors = [];

  if (!form.dni) {
    newErrors.push("El DNI es obligatorio");
  } else if (!/^[0-9]{8,10}$/.test(form.dni)) {
    newErrors.push("El DNI debe ser numérico y tener entre 8 y 10 dígitos");
  } else {
    const dniDuplicado = usuarios.some((u, index) => {
      if (editIndex !== null && index === editIndex) return false;
      return u.dni === form.dni;
    });

    if (dniDuplicado) {
      newErrors.push("El DNI ya está registrado, debe ser único");
    }
  }

  if (!form.nombres || form.nombres.length < 2) {
    newErrors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (!form.apellidos || form.apellidos.length < 2) {
    newErrors.push("El apellido debe tener al menos 2 caracteres");
  }

  if (!form.fechaNacimiento) {
    newErrors.push("Debe ingresar una fecha de nacimiento");
  } else if (new Date(form.fechaNacimiento) > new Date()) {
    newErrors.push("La fecha de nacimiento no puede ser futura");
  }

  if (!form.genero) {
    newErrors.push("Debe seleccionar un género");
  }
  if (!form.ciudad) {
    newErrors.push("Debe seleccionar una ciudad");
  }

  setErrors(newErrors);
  return newErrors.length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editIndex !== null) {
      const usuarioEdit = usuarios[editIndex];
      try {
        await updateUsuario(usuarioEdit.id, form);
        const updatedUsuarios = [...usuarios];
        updatedUsuarios[editIndex] = { ...form, id: usuarioEdit.id };
        setUsuarios(updatedUsuarios);
        resetForm();
      } catch {
        setErrors(["Error al actualizar en el servidor"]);
      }
    } else {
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
