import React from "react";

function UserForm({ form, onChange, onSubmit, editMode }) {
  return (
    <form onSubmit={onSubmit} className="formulario">
      <input
        type="text"
        name="dni"
        placeholder="DNI"
        value={form.dni}
        onChange={onChange}
      />
      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={form.nombres}
        onChange={onChange}
      />
      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={form.apellidos}
        onChange={onChange}
      />
      <input
        type="date"
        name="fechaNacimiento"
        value={form.fechaNacimiento}
        onChange={onChange}
      />

      <div className="radio-group">
        <span>Género:</span>
        <label>
          <input
            type="radio"
            name="genero"
            value="Masculino"
            checked={form.genero === "Masculino"}
            onChange={onChange}
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="Femenino"
            checked={form.genero === "Femenino"}
            onChange={onChange}
          />
          Femenino
        </label>
      </div>

      <select name="ciudad" value={form.ciudad} onChange={onChange}>
        <option value="">Seleccione ciudad</option>
        <option value="Guayaquil">Guayaquil</option>
        <option value="Milagro">Milagro</option>
        <option value="Cuenca">Cuenca</option>
      </select>

      <button type="submit" className="btn">
        {editMode ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}

export default UserForm;
