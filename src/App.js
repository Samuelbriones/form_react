import React, { useState } from "react";
import "./App.css";

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

  // Manejo de inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validaciones
  const validateForm = () => {
    const newErrors = [];

    if (!form.dni) {
      newErrors.push("El DNI es obligatorio");
    } else if (!/^[0-9]{8,10}$/.test(form.dni)) {
      newErrors.push("El DNI debe ser numérico y tener entre 8 y 10 dígitos");
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

  // Guardar
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editIndex !== null) {
      const updatedUsuarios = [...usuarios];
      updatedUsuarios[editIndex] = form;
      setUsuarios(updatedUsuarios);
      setEditIndex(null);
    } else {
      setUsuarios([...usuarios, form]);
    }

    setForm({
      dni: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      genero: "",
      ciudad: "",
    });
    setErrors([]);
  };

  const handleEdit = (index) => {
    setForm(usuarios[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Formulario de Registro</h1>

      {/* Mostrar errores */}
      {errors.length > 0 && (
        <div className="alert">
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={form.dni}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={form.nombres}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
        />

        <div className="radio-group">
          <span>Género:</span>
          <label>
            <input
              type="radio"
              name="genero"
              value="Masculino"
              checked={form.genero === "Masculino"}
              onChange={handleChange}
            />
            Masculino
          </label>
          <label>
            <input
              type="radio"
              name="genero"
              value="Femenino"
              checked={form.genero === "Femenino"}
              onChange={handleChange}
            />
            Femenino
          </label>
        </div>

        <select name="ciudad" value={form.ciudad} onChange={handleChange}>
          <option value="">Seleccione ciudad</option>
          <option value="Guayaquil">Guayaquil</option>
          <option value="Milagro">Milagro</option>
          <option value="Cuenca">Cuenca</option>
        </select>

        <button type="submit" className="btn">
          {editIndex !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <h2>Usuarios Registrados</h2>
      <ul className="lista">
        {usuarios.map((u, i) => (
          <li key={i} className="usuario-item">
            <strong>{u.dni}</strong> - {u.nombres} {u.apellidos} ({u.genero},{" "}
            {u.ciudad})
            <div>
              <button className="btn-edit" onClick={() => handleEdit(i)}>
                Editar
              </button>
              <button className="btn-delete" onClick={() => handleDelete(i)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
