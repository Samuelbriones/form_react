export function validateForm(form, usuarios, editIndex) {
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
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombres)) {
    newErrors.push("El nombre no debe contener números ni caracteres especiales");
  }

  if (!form.apellidos || form.apellidos.length < 2) {
    newErrors.push("El apellido debe tener al menos 2 caracteres");
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.apellidos)) {
    newErrors.push("El apellido no debe contener números ni caracteres especiales");
  }

  if (!form.fechaNacimiento) {
    newErrors.push("Debe ingresar una fecha de nacimiento");
  } else if (new Date(form.fechaNacimiento) > new Date()) {
    newErrors.push("La fecha de nacimiento no puede ser futura");
  }

  if (!form.genero) newErrors.push("Debe seleccionar un género");
  if (!form.ciudad) newErrors.push("Debe seleccionar una ciudad");

  return newErrors;
}
