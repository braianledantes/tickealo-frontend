export function validarProductora({
  nombre,
  cuit,
  direccion,
  telefono,
  username,
  email,
  password,
}) {
  const errores = {};

  const campos = [nombre, cuit, direccion, telefono, username, email, password];
  const todosVacios = campos.every(campo => !campo?.trim());

  if (todosVacios) {
    errores.global = "Todos los campos son obligatorios";
    return errores;
  }

  // Campos obligatorios
  if (!nombre?.trim()) errores.nombre = "El nombre es obligatorio";
  if (!cuit?.trim()) errores.cuit = "El CUIT es obligatorio";
  if (!direccion?.trim()) errores.direccion = "La dirección es obligatoria";
  if (!telefono?.trim()) errores.telefono = "El teléfono es obligatorio";
  if (!username?.trim()) errores.username = "El nombre de usuario es obligatorio";
  if (!email?.trim()) errores.email = "El email es obligatorio";
  if (!password?.trim()) errores.password = "La contraseña es obligatoria";

  // Validación de email
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = "Debe ser un correo electrónico válido";
  }

  // Validación de CUIT (solo números, 11 dígitos máximo)
  if (cuit && (!/^\d{1,11}$/.test(cuit))) {
    errores.cuit = "CUIT inválido. Solo números, máximo 11 dígitos";
  }

  // Validación de teléfono (solo números, máximo 15 dígitos)
  if (telefono && (!/^\d{10,15}$/.test(telefono))) {
    errores.telefono = "Teléfono inválido. Solo números, máximo 15 dígitos";
  }

  // Password mínima 6 caracteres (opcional)
  if (password && password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errores;
}
