import api from "../api/axiosConfig";

export const getComentariosByEvento = async (eventoId) => {
  try {
    const res = await api.get(`/comentarios/evento/${eventoId}`);
    return res.data;
  } catch (err) {
    console.error("Error al obtener comentarios:", err);
    return { error: err.message };
  }
};
