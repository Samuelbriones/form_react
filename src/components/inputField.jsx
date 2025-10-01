function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
}

export default InputField;
