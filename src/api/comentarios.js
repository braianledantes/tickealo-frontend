import api from "../api/axiosConfig";

export const getComentariosByEvento = async (eventoId) => {
  const res = await api.get(`api/comentarios/evento/${eventoId}`);
  return res.data;
};

export const getComentario = async (comentarioId) => {
  const res = await api.get(`api/comentarios/${comentarioId}`);
  return res.data;
};

export const postComentario = async (eventoId, data) => {
  const res = await api.post(`api/comentarios/evento/${eventoId}`, data);
  return res.data;
};

export const patchComentario = async (comentarioId, data) => {
  const res = await api.patch(`api/comentarios/${comentarioId}`, data);
  return res.data;
};

export const deleteComentario = async (comentarioId) => {
  const res = await api.delete(`api/comentarios/${comentarioId}`);
  return res.data;
};

export const patchFijar = async (eventoId) => {
  const res = await api.patch(`api/comentarios/${eventoId}/fijar`);
  return res.data;
}

export const patchDesfijar = async (eventoId) => {
  const res = await api.patch(`api/comentarios/${eventoId}/desfijar`);
  return res.data;
}