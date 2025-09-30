function UserList({ usuarios, onEdit, onDelete }) {
  if (!usuarios.length) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <ul className="lista">
      {usuarios.map((u, i) => (
        <li key={u.id || i} className="usuario-item">
          <strong>{u.dni}</strong> - {u.nombres} {u.apellidos} ({u.genero},{" "}
          {u.ciudad})
          <div>
            <button className="btn-edit" onClick={() => onEdit(i)}>
              Editar
            </button>
            <button className="btn-delete" onClick={() => onDelete(i)}>
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
