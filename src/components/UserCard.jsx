function UserCard({ usuario, onEdit, onDelete }) {
  return (
    <div className="card">
      <p><b>DNI:</b> {usuario.dni}</p>
      <p><b>Nombre:</b> {usuario.nombres} {usuario.apellidos}</p>
      <p><b>Fecha Nac.:</b> {usuario.fechaNacimiento}</p>
      <p><b>Género:</b> {usuario.genero}</p>
      <p><b>Ciudad:</b> {usuario.ciudad}</p>

      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
}

export default UserCard;
