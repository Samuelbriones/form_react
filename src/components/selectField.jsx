function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="">Seleccione...</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
