function ErrorAlert({ errors }) {
  if (!errors.length) return null;

  return (
    <div className="alert">
      <ul>
        {errors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorAlert;
