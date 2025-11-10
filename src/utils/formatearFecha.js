export const formatearFecha = (fecha) => {
  if (!fecha) return "-";
  return new Date(fecha).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatearFechaLarga = (fecha) => {
  if (!fecha) return "-";

  const date = new Date(fecha);

  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).replace(" de ", " de ").replace(" ", " ") + "";
};

//formato para comentarios
export const recentTime = (fechaComentario) => {
  if (!fechaComentario) return "-";
  
  const fecha = new Date(fechaComentario);
  const ahora = new Date();
  const diferenciaMs = ahora.getTime() - fecha.getTime();
  const diferenciaMin = Math.floor(diferenciaMs / (1000 * 60));
  const diferenciaHoras = Math.floor(diferenciaMin / 60);

  let fechaFormateada;

  if (diferenciaHoras < 24) {
    if (diferenciaMin < 1) {
      fechaFormateada = "Justo ahora";
    } else if (diferenciaMin < 60) {
      fechaFormateada = `Hace ${diferenciaMin} min`;
    } else if (diferenciaHoras === 1) {
      fechaFormateada = "Hace 1 h";
    } else {
      fechaFormateada = `Hace ${diferenciaHoras} h`;
    }
  } else {
    fechaFormateada = fecha.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return fechaFormateada;
};
