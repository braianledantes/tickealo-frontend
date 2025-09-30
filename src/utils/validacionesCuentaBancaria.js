export const validarCuentaBancaria = (cuenta) => {
  const errores = {};

  // Nombre titular
    if (!cuenta.nombreTitular) {
    errores.nombreTitular = "El nombre del titular es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(cuenta.nombreTitular)) {
    errores.nombreTitular = "El nombre del titular solo puede contener letras y espacios.";
    } else if (cuenta.nombreTitular.length > 50) {
    errores.nombreTitular = "El nombre del titular no puede superar los 50 caracteres.";
    }

  // Banco
  if (!cuenta.nombreBanco) {
    errores.nombreBanco = "Debe seleccionar un banco.";
  } else if (cuenta.nombreBanco.length > 50) {
    errores.nombreBanco = "El nombre del banco no puede superar los 50 caracteres.";
  }

  // Alias
  if (!cuenta.alias) {
    errores.alias = "El alias es obligatorio.";
  } else if (cuenta.alias.length < 6 || cuenta.alias.length > 20) {
    errores.alias = "El alias debe tener entre 6 y 20 caracteres.";
  } else if (!/^[a-z0-9]+(\.[a-z0-9]+)*$/.test(cuenta.alias)) {
    errores.alias =
      "El alias solo puede contener letras minúsculas, números y puntos. No puede comenzar ni terminar con punto ni tener puntos consecutivos.";
  }

  // CBU
  if (!cuenta.cbu) {
    errores.cbu = "El CBU es obligatorio.";
  } else if (!/^\d{22}$/.test(cuenta.cbu)) {
    errores.cbu = "El CBU debe contener exactamente 22 números.";
  }

  // Instrucciones (opcional)
  if (cuenta.instrucciones && cuenta.instrucciones.length > 255) {
    errores.instrucciones = "Las instrucciones no pueden superar los 255 caracteres.";
  }

  return errores;
};