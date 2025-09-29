import React, { useState } from "react";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.dni || !form.nombres || !form.apellidos || !form.genero || !form.ciudad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editIndex !== null) {
      const updatedUsuarios = [...usuarios];
      updatedUsuarios[editIndex] = form;
      setUsuarios(updatedUsuarios);
      setEditIndex(null);
    } else {
      setUsuarios([...usuarios, form]);
    }

    setForm({ dni: "", nombres: "", apellidos: "", fechaNacimiento: "", genero: "", ciudad: "" });
  };

  const handleEdit = (index) => {
    setForm(usuarios[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
        <br />
        <input type="text" name="nombres" placeholder="Nombres" value={form.nombres} onChange={handleChange} />
        <br />
        <input type="text" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
        <br />
        <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
        <br />
        <div>
          Género:
          <label>
            <input type="radio" name="genero" value="Masculino" checked={form.genero === "Masculino"} onChange={handleChange} />
            Masculino
          </label>
          <label>
            <input type="radio" name="genero" value="Femenino" checked={form.genero === "Femenino"} onChange={handleChange} />
            Femenino
          </label>
        </div>
        <br />
        <select name="ciudad" value={form.ciudad} onChange={handleChange}>
          <option value="">Seleccione ciudad</option>
          <option value="Guayaquil">Guayaquil</option>
          <option value="Quito">Quito</option>
          <option value="Cuenca">Cuenca</option>
        </select>
        <br />
        <button type="submit">{editIndex !== null ? "Actualizar" : "Agregar"}</button>
      </form>

      <h2>Usuarios Registrados</h2>
      <ul>
        {usuarios.map((u, i) => (
          <li key={i}>
            {u.dni} - {u.nombres} {u.apellidos} ({u.genero}, {u.ciudad})
            <button onClick={() => handleEdit(i)}>Editar</button>
            <button onClick={() => handleDelete(i)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
